<script setup>
import { InputText, Card, Button, Avatar, Divider } from "../components";
</script>

<template>
  <div>
    <div class="header">
      <img src="../assets/chat.png" height="48" alt="" />
      <Avatar
        label="R"
        class="mr-2 chat-avatar"
        size="large"
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
            v-model="value1"
            placeholder="Search"
          />
        </span>

        <!-- Chat List -->
        <div class="chat-list-container">
          <div class="chatroom-list-item">
            <Avatar
              label="P"
              class="mr-2 chat-avatar"
              size="xlarge"
              shape="circle"
            />
            <div class="chatroom-list-info">
              <h3>Paul williams</h3>
              <span>Hi, How are you?</span>
            </div>
            <h3 class="chatroom-list-info-time">9:00</h3>
          </div>
          <Divider />
          <div class="chatroom-list-item">
            <Avatar
              label="P"
              class="mr-2 chat-avatar"
              size="xlarge"
              shape="circle"
            />
            <div class="chatroom-list-info">
              <h3>Paul williams</h3>
              <span>Hi, How are you?</span>
            </div>
            <h3 class="chatroom-list-info-time">9:00</h3>
          </div>
          <Divider />
          <div class="chatroom-list-item">
            <Avatar
              label="P"
              class="mr-2 chat-avatar"
              size="xlarge"
              shape="circle"
            />
            <div class="chatroom-list-info">
              <h3>Paul williams</h3>
              <span>Hi, How are you?</span>
            </div>
            <h3 class="chatroom-list-info-time">9:00</h3>
          </div>
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
            <h3>Tech Community</h3>
            <span>Paul Williams, Adam Walker, Ion Smith</span>
          </div>
          <Button icon="pi pi-plus" class="add-btn" />
          <Button icon="pi pi-sign-out" class="remove-btn" />
        </div>

        <div class="chatroom-container">
          <div class="chat-box-container">
            <div class="reciever-message">
              <div class="reciever-info">
                <Avatar
                  label="P"
                  class="mr-2 chat-avatar"
                  size="large"
                  shape="circle"
                />
                <span class="message-time">9:00</span>
              </div>
              <div class="reciever-message-bubble">
                <span>Hi, How are you?</span>
              </div>
            </div>
            <div class="sender-message-bubble">
              <span>Hi, I am good Thanks for asking</span>
            </div>
            <div class="sender-message-bubble">
              <span>How are you?</span>
            </div>
          </div>
          <div class="write-box">
            <InputText
              class="input-field"
              type="text"
              v-model="value1"
              placeholder="Write a message"
            />
            <Button icon="pi pi-send" class="send-btn" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-layout {
  display: flex;
}

.header{
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
}

.reciever-message {
  display: flex;
  align-self: flex-start;
  margin: 5px 0;
}

.reciever-message-bubble {
  background-color: #f6f7fb;
  height: fit-content;
  padding: 20px;
  margin: 0 0 0 15px;
  border-radius: 0 15px 15px 15px;
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
  margin: 0 0 0 15px;
  border-radius: 15px 15px 0 15px;
  align-self: flex-end;
  margin: 5px 0;
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
  width: 100%;
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
</style>
