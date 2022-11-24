<script setup>
import {
  InputText,
  Button,
  Avatar,
  Divider,
  Dialog,
  MultiSelect,
  Toast,
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

let chatMessage = ref("");
const searchText = ref();
let groupSelected = ref();
const displayModal = ref(false);
let form = reactive({
  groupName: "",
  groupMembers: [],
  groupAdmin: "",
  createDate: new Date().getTime(),
});
const getAllRoom = computed(() => group.getAllGroup);
const getCurrentUser = computed(() => user.getCurrentUser);
const getGroupMessages = computed(() => message.getGroupMessage);
const userListToAddGroupMember = computed(() =>
  user.getUserslist.filter((res) => res.uid !== getCurrentUser.value.uid)
);

const logout = () => {
  auth.logout().then(() => {
    router.push("/login");
  });
};

onMounted(() => {
  group.fetchAllGroup();
  user.fetchAllUsers();
  user.fetchCurrentUser();
});

const createGroup = () => {
  getCurrentUser.value.admin = true;
  form.groupMembers.push(getCurrentUser.value.uid);
  console.log(form);
  group.createGroup(form).then(() => {
    form.groupAdmin = "";
    form.groupName = "";
    form.groupMembers = [];
    form.createDate = "";
    closeRoomDetailsPopup();
  });
};

const addRoomDetailsPopup = () => {
  displayModal.value = true;
};

const closeRoomDetailsPopup = () => {
  displayModal.value = false;
};

const selectGroup = (arg) => {
  groupSelected.value = arg;
  message.fetchAllMessageOfGroup(groupSelected.value.id);
  message.getNewMessage(groupSelected.value.id);
};

const sendMessage = () => {
  let chatDetails = {
    messageText: chatMessage.value,
    sentAt: new Date().getTime(),
    sentBy: getCurrentUser.value.uid,
  };
  message.sendMessage(chatDetails, groupSelected.value.id).then(() => {
    chatMessage.value = "";
  });
};

const tp = () => {
  console.log(getAllRoom);
};

const dateFormat = (args) => {
  let date = new Date(args);
  return date.getHours() + ":" + date.getMinutes();
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
          <Button
            icon="pi pi-plus"
            class="add-btn"
            @click="addRoomDetailsPopup"
          />
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
      <div class="chat-grid-2">
        <div class="chatroom-details">
          <Avatar
            label="TC"
            class="mr-2 chat-avatar"
            size="xlarge"
            shape="circle"
          />
          <div class="chatroom-list-info">
            <h3>{{ groupSelected?.groupName }}</h3>
            <span>Paul Williams, Adam Walker, Ion Smith</span>
          </div>
          <Button icon="pi pi-plus" class="add-btn" />
          <Button icon="pi pi-sign-out" class="remove-btn" />
        </div>

        <div class="chatroom-container">
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
                    label="P"
                    class="mr-2 chat-avatar"
                    size="large"
                    shape="circle"
                  />
                  <span class="message-time">{{
                    dateFormat(item.sentAt)
                  }}</span>
                </div>
                <div
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
            <Button icon="pi pi-send" class="send-btn" @click="sendMessage()" />
          </div>
        </div>
      </div>
    </div>

    <Dialog
      header="Create New Group"
      v-model:visible="displayModal"
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
          @click="closeRoomDetailsPopup"
          class="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" @click="createGroup" autofocus />
        <Button label="tp" icon="pi pi-check" @click="tp" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
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

.chat-list-container {
  margin: 20px;
  background-color: #ffffff;
  border-radius: 20px;
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
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
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
}

.input-field {
  flex: 1;
  border-radius: 30px;
}

.send-btn {
  width: 60px;
  margin: 0px 15px;
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
