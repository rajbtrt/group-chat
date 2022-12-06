<script setup>
import {
  InputText,
  Button,
  Avatar,
  Divider,
  Dialog,
  MultiSelect,
  Toast,
  Menu,
  FileUpload,
  SpeedDial,
} from "../components";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { useGroupStore } from "../store/group";
import { useUserStore } from "../store/user";
import { useMessageStore } from "../store/message";
import { reactive, ref, onMounted, computed } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();
const auth = useAuthStore();
const group = useGroupStore();
const user = useUserStore();
const message = useMessageStore();

const attachementLoad = ref(false);
const fileInput = ref();
const menu = ref();
let chatMessage = ref("");
const searchText = ref();
let groupSelected = ref();
const displayCreateGroupModal = ref(false);
const displayJoinGroupModel = ref(false);
let form = reactive({
  groupName: "",
  groupMembers: [],
  groupAdmin: "",
  createDate: new Date().getTime(),
  groupCode: "",
});
let groupCode = ref("");
let groupMemberName = ref();
const getAllRoom = computed(() => group.getAllGroup);
const getCurrentUser = computed(() => user.getCurrentUser);
const getGroupMessages = computed(() => message.getGroupMessage);
const getGroupMemebers = computed(() => user.getGroupMembersDetails);
const userListToAddGroupMember = computed(() =>
  user.getUserslist.filter((res) => res.uid !== getCurrentUser.value.uid)
);

const loading = ref([false, false, false]);
const load = (index) => {
  loading.value[index] = true;
  setTimeout(() => (loading.value[index] = false), 1000);
};

const fileUploadBtn = ref([
  {
    label: "Image",
    icon: "pi pi-camera",
    command: () => {
      onSelectedFiles("image");
    },
  },
  {
    label: "Video",
    icon: "pi pi-play",
    command: () => {
      onSelectedFiles("video");
    },
  },
  {
    label: "Audio",
    icon: "pi pi-volume-up",
    command: () => {
      onSelectedFiles("audio");
    },
  },
]);

const logout = () => {
  auth.logout().then(() => {
    router.push("/login");
  });
};

onMounted(() => {
  // group.fetchAllGroup();
  user.fetchCurrentUser().then(() => {
    group.fetchGroup(getCurrentUser.value.uid);
  });
  user.fetchAllUsers();
});

const items = ref([
  {
    label: "Create Group",
    icon: "pi pi-plus",
    command: () => {
      createGroupPopup();
    },
  },
  {
    label: "Join",
    icon: "pi pi-user-plus",
    command: () => {
      joinGroupPopup();
    },
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const createGroup = () => {
  getCurrentUser.value.admin = true;
  form.groupCode = makeid(10);
  form.groupMembers.push(getCurrentUser.value.uid);
  group.createGroup(form).then(() => {
    form.groupAdmin = "";
    form.groupName = "";
    form.groupMembers = [];
    form.createDate = "";
    closeCreateGroupPopup();
  });
};

const joinGroup = () => {
  group.joinGroup(groupCode.value, getCurrentUser.value.uid).then(() => {
    closeJoinGroupPopup();
  }); 
};

const createGroupPopup = () => {
  displayCreateGroupModal.value = true;
};

const closeCreateGroupPopup = () => {
  displayCreateGroupModal.value = false;
};

const joinGroupPopup = () => {
  displayJoinGroupModel.value = true;
};

const closeJoinGroupPopup = () => {
  displayJoinGroupModel.value = false;
};

const getGroupDetails = () => {
  user.fetchUser(groupSelected.value.groupMembers).then(() => {
    groupMemberName.value = getGroupMemebers.value
      .map((res) => res.fullName)
      .join();
  });
};

const selectGroup = (arg) => {
  groupSelected.value = arg;
  message.fetchAllMessageOfGroup(groupSelected.value.id);
  message.getNewMessage(groupSelected.value.id);
  getGroupDetails();
};

const sendMessage = () => {
  let chatDetails = {
    messageText: chatMessage.value,
    sentAt: new Date().getTime(),
    sentBy: getCurrentUser.value.uid,
  };
  chatMessage.value = "";
  message.sendMessage(chatDetails, groupSelected.value.id).then(() => {});
};

const tp = () => {
  console.log(getAllRoom);
};

const dateFormat = (args) => {
  let date = new Date(args);
  return date.getHours() + ":" + date.getMinutes();
};

const getMessageAvatar = (id) => {
  let user = getGroupMemebers.value.filter((res) => res.uid === id);
  let avatar = user.map((res) => {
    return res.avatar;
  });
  return avatar.find((res) => res);
};

const loadNewMessage = (arg) => {
  message.getLoadMessage(arg.id, getGroupMessages.value.slice(-1)[0].id);
};

const uploadAttachment = (args) => {
  fileInput.value.click();
  attachementLoad.value = true;
};

const onSelectedFiles = (event) => {
  console.log(event.target.files);
  // event.target.files.forEach((file) => {
  message.UploadImage(event.target.files[0]).then((res) => {
    let chatDetails = {
      messageText: res.metadata.fullPath,
      sentAt: new Date().getTime(),
      sentBy: getCurrentUser.value.uid,
      type: res.metadata.contentType,
    };
    message.sendMessage(chatDetails, groupSelected.value.id).then(() => {
      chatMessage.value = "";
      attachementLoad.value = false;
    });
    // });
  });
};

const openInTab = (args) => {
  window.open(args, "_blank");
};
</script>

<template>
  <div>
    <Toast />
    <div class="header">
      <img src="../assets/chat.png" height="48" alt="" />
      <Avatar
        :label="getCurrentUser.avatar"
        class="mr-2 chat-avatar"
        size="large"
        @click="logout()"
        shape="circle"
      />
    </div>
    <div class="chat-layout">
      <div class="chat-grid-1">
        <span class="p-input-icon-left search">
          <i class="pi pi-search search-icon" />
          <InputText
            class="search-field"
            type="text"
            v-model="searchText"
            placeholder="Search"
          />
          <!-- @click="addRoomDetailsPopup" -->
          <Button icon="pi pi-ellipsis-v" class="add-btn" @click="toggle" />
          <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
        </span>

        <!-- Chat List -->
        <div class="chat-list-container">
          <template v-for="item in getAllRoom">
            <div class="chatroom-list-item" @click="selectGroup(item)">
              <Avatar
                label="P"
                class="mr-2 chat-avatar"
                size="xlarge"
                shape="circle"
              />
              <div class="chatroom-list-info">
                <h3>{{ item.groupName }}</h3>
                <span>Hi, How are you?</span>
              </div>
              <h3 class="chatroom-list-info-time">9:00</h3>
            </div>
            <Divider />
          </template>
        </div>
      </div>
      <div v-if="groupSelected" class="chat-grid-2">
        <div class="chatroom-details">
          <Avatar
            label="TC"
            class="mr-2 chat-avatar"
            size="xlarge"
            shape="circle"
          />
          <div class="chatroom-list-info">
            <h3>
              {{ groupSelected?.groupName }} {{ groupSelected?.groupCode }}
            </h3>
            <span>{{ groupMemberName }}</span>
          </div>
          <Button icon="pi pi-plus" class="add-btn" />
          <!-- <Button icon="pi pi-sign-out" class="remove-btn" /> -->
        </div>

        <div class="chatroom-container">
          <Button
            type="button"
            label="Load messages"
            icon="pi pi-arrow-up"
            :loading="loading[0]"
            @click="loadNewMessage(groupSelected, getGroupMessages)"
            class="p-button-sm load-msg-btn"
          />
          <div class="chat-box-container">
            <template v-for="item in getGroupMessages">
              <div
                :class="[
                  item.sentBy === getCurrentUser.uid
                    ? 'sender-message'
                    : 'reciever-message',
                ]"
              >
                <div
                  class="reciever-info"
                  v-if="item.sentBy !== getCurrentUser.uid"
                >
                  <Avatar
                    :label="getMessageAvatar(item.sentBy)"
                    class="mr-2 chat-avatar"
                    size="large"
                    shape="circle"
                  />
                  <span class="message-time">{{
                    dateFormat(item.sentAt)
                  }}</span>
                </div>
                <!-- Image -->
                <div
                  :class="[
                    item.sentBy === getCurrentUser.uid
                      ? 'sender-message-bubble'
                      : 'reciever-message-bubble',
                  ]"
                  v-if="item.type === 'image/png'"
                  @click="openInTab(item.messageText)"
                >
                  <img :src="item.messageText" height="200" alt="" />
                </div>

                <!-- Video -->
                <div
                  :class="[
                    item.sentBy === getCurrentUser.uid
                      ? 'sender-message-bubble'
                      : 'reciever-message-bubble',
                  ]"
                  v-else-if="item.type === 'video/mp4'"
                  @click="openInTab(item.messageText)"
                >
                  <video
                    width="320"
                    height="240"
                    poster="../assets/play.png"
                    controls
                  >
                    <source :src="item.messageText" type="video/mp4" />
                  </video>
                </div>

                <!-- Audio -->
                <div
                  :class="[
                    item.sentBy === getCurrentUser.uid
                      ? 'sender-message-bubble'
                      : 'reciever-message-bubble',
                  ]"
                  v-else-if="item.type === 'audio/mpeg'"
                  @click="openInTab(item.messageText)"
                >
                  <audio
                    width="320"
                    height="240"
                    poster="../assets/play.png"
                    controls
                  >
                    <source :src="item.messageText" type="audio/mpeg" />
                  </audio>
                </div>

                <!-- Message -->
                <div
                  v-else
                  :class="[
                    item.sentBy === getCurrentUser.uid
                      ? 'sender-message-bubble'
                      : 'reciever-message-bubble',
                  ]"
                >
                  <span>{{ item.messageText }}</span>
                </div>
              </div>
            </template>
          </div>
          <div class="write-box">
            <InputText
              class="input-field"
              type="text"
              v-model="chatMessage"
              placeholder="Write a message"
            />
            <div class="action">
              <Button
                type="button"
                icon="pi pi-paperclip"
                class="send-btn"
                :loading="attachementLoad"
                @click="uploadAttachment"
              />
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                @change="onSelectedFiles"
              />
              <Button
                icon="pi pi-send"
                class="send-btn"
                @click="sendMessage()"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="chat-grid-2-empty">
        <h4>Please select group</h4>
      </div>
    </div>

    <!-- Create Group Dialog -->
    <Dialog
      header="Create New Group"
      v-model:visible="displayCreateGroupModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <InputText
        class="group-name-input"
        type="text"
        v-model="form.groupName"
        placeholder="Group Name"
      />

      <MultiSelect
        v-model="form.groupMembers"
        :options="userListToAddGroupMember"
        optionLabel="fullName"
        placeholder="Add Users"
        :filter="true"
        display="chip"
        optionValue="uid"
        class="group-name-input"
      >
      </MultiSelect>

      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeCreateGroupPopup"
          class="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" @click="createGroup" autofocus />
        <Button label="tp" icon="pi pi-check" @click="tp" autofocus />
      </template>
    </Dialog>

    <!-- Join Group Dialog -->
    <Dialog
      header="Join Group"
      v-model:visible="displayJoinGroupModel"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <InputText
        class="group-name-input"
        type="text"
        v-model="groupCode"
        placeholder="Please Enter group code"
      />

      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeJoinGroupPopup"
          class="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" @click="joinGroup" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.action {
  display: flex;
}
.chat-layout {
  display: flex;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
}

.chat-grid-1 {
  flex: 1;
}

.chat-grid-2 {
  flex: 3;
  height: 100%;
}

.chat-grid-2-empty {
  flex: 3;
  margin: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-list-container {
  margin: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  overflow-y: auto;
  height: 77vh;
}

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: #f6f7fb;
  margin: 20px;
}

*::-webkit-scrollbar-thumb {
  background-color: #4e426d;
  border-radius: 20px;
  border: 3px solid #4e426d;
}

.chat-list-container > div:first-child {
  padding-top: 10px;
}

.chat-list-container > div:last-child {
  padding-bottom: 10px;
}

.chatroom-container {
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  height: 72vh;
}

.chatroom-list-item {
  display: flex;
  align-items: flex-start;
  padding: 0 20px;
}

.chat-avatar {
  cursor: pointer;
  font-size: 1rem !important;
}

.chatroom-list-info {
  flex: 5;
  margin: 5px 0 0 20px;
}

.chatroom-list-info h3 {
  margin: 0 0 5px 0;
}

.chatroom-list-info-time {
  flex: 1;
  margin: 5px 0 0 0;
}

.chat-box-container {
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  overflow-y: auto;
}

.load-msg-btn {
  width: 14%;
  align-self: center;
  background-color: #4e426d;
  border-radius: 25px;
}

.sender-message {
  margin: 5px 0;
  display: flex;
  justify-content: flex-end;
}

.reciever-message {
  margin: 5px 0;
  display: flex;
  justify-content: flex-start;
}

.reciever-message-bubble {
  background-color: #f6f7fb;
  height: fit-content;
  padding: 20px;
  margin: 0 0 0 15px;
  border-radius: 0 15px 15px 15px;
  width: fit-content;
}

.reciever-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sender-message-bubble {
  background-color: #4e426d;
  color: #ffffff;
  height: fit-content;
  padding: 20px;
  margin: 5px 0 5px 15px;
  border-radius: 15px 15px 0 15px;
  width: fit-content;
}

.write-box {
  display: flex;
  margin: 15px 0;
  position: relative;
}

.input-field {
  flex: 1;
  border-radius: 30px;
}

.file-btn {
  right: 100px !important;
  bottom: 0 !important;
}

.send-btn {
  width: 60px;
  margin: 0px 10px;
  background-color: #3ba58a;
  border-radius: 50px;
  height: 60px;
}

.search {
  margin: 20px;
  display: flex;
}

.search-icon {
  left: 1.75rem !important;
}

.search-field {
  border-radius: 30px;
  border: 0;
  padding: 20px 20px 20px 60px;
  width: 85%;
}

.chatroom-details {
  display: flex;
  margin: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
}

.add-btn {
  width: 60px;
  margin: 0px 5px;
  background-color: #4e426d;
  border-radius: 50px;
  height: 60px;
  border: 0;
}
.remove-btn {
  width: 60px;
  margin: 0px 5px;
  background-color: #dee2e6;
  border-radius: 50px;
  height: 60px;
  border: 0;
}

.group-name-input {
  width: 100%;
  margin-bottom: 10px;
}
</style>
