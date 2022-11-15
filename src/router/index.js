import { createWebHistory, createRouter } from "vue-router";
// import jwtService from "../service/jwtService";

// const ifNotAuthenticated = (to, from, next) => {
//   if (!jwtService.getToken()) {
//     next();
//     return;
//   }
//   next("/");
// };

// const ifAuthenticated = (to, from, next) => {
//   if (jwtService.getToken()) {
//     next();
//     return;
//   }
//   next("/login");
// };

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue"),
    // beforeEnter: ifNotAuthenticated,
  },
  {
    name: "Signup",
    path: "/signup",
    component: () => import("../views/Signup.vue"),
    // beforeEnter: ifAuthenticated,
  },
  {
    name: "ChatList",
    path: "/chatlist",
    component: () => import("../views/ChatList.vue"),
    // beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
