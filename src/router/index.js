import Vue from "vue";
import VueRouter from "vue-router";
import onboarding from "./onboarding";

Vue.use(VueRouter);

const routes = [
  ...onboarding,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => { 
    next()
});

export default router;
