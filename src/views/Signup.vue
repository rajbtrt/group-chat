<script setup>
import { InputText, Card, Button, Toast } from "../components";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useAuthStore } from "../store/auth";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  avatar: "",
  fullName: "",
});

const goToLogin = () => {
  router.push("/login");
};

const register = () => {
  form.avatar =
    Array.from(form.firstName.toUpperCase())[0] +
    Array.from(form.lastName.toUpperCase())[0];
  form.fullName = form.firstName + " " + form.lastName;
  console.log(form);
  auth.register(form).then(() => {
    toast.add({
      severity: "success",
      summary: "User Register Successfully",
      detail: "Welcome",
      life: 3000,
    });
    setTimeout(() => {
      router.push("/chatlist");
    }, 3000);
  });
};
</script>

<template>
  <div class="login-container">
    <Toast />
    <Card class="card-design">
      <template #title> <h4 class="card-header">Sign Up</h4> </template>
      <template #content>
        <div class="login-input">
          <InputText
            class="input-field"
            type="text"
            v-model="form.firstName"
            placeholder="First Name"
          />
          <InputText
            class="input-field"
            type="text"
            v-model="form.lastName"
            placeholder="Last Name"
          />
          <InputText
            class="input-field"
            type="text"
            v-model="form.email"
            placeholder="Email"
          />
          <InputText
            class="input-field"
            type="password"
            v-model="form.password"
            placeholder="Password"
          />
          <Button
            label="Register"
            @click="register()"
            icon="pi pi-check"
            iconPos="right"
          />
        </div>
        <span class="register-link">
          Already have an account!!
          <b @click="goToLogin" class="redirectlink">Login</b>
        </span>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.card-design {
  padding: 25px 50px;
  width: 70%;
  border-radius: 20px;
}
.card-header {
  margin: 15px 0px;
}
.login-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.input-field {
  width: 20%;
}
.register-link {
  font-size: 14px;
}
.redirectlink {
  cursor: pointer;
}
</style>
