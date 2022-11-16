import { createWebHistory, createRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const authCheck = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
      return true;
    } else {
      return false;
    }
  });
};

const ifNotAuthenticated = (to, from, next) => {
  if (!authCheck()) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (!authCheck()) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    redirect: "/chatlist",
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    name: "Signup",
    path: "/signup",
    component: () => import("../views/Signup.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    name: "ChatList",
    path: "/chatlist",
    component: () => import("../views/ChatList.vue"),
    beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
