<script setup>
import { InputText, Card, Button } from "../components";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const auth = useAuthStore();

const goToLogin = () => {
  router.push("/login");
};

const register = () => {
  auth.register(form).then(()=>{
    router.push("/chatlist");
  })
};

const form = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <div class="login-container">
    <Card class="card-design">
      <template #title> <h4 class="card-header">Sign Up</h4> </template>
      <template #content>
        <div class="login-input">
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
          <Button label="Register" @click="register()" icon="pi pi-check" iconPos="right" />
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
  width: 42%;
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
  width: 40%;
}
.register-link {
  font-size: 14px;
}
.redirectlink {
  cursor: pointer;
}
</style>
