import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";

import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";

import ActicleEdit from "../views/ActicleEdit.vue";
import ActicleList from "../views/ActicleList.vue";

import AdEdit from "../views/AdEdit.vue";
import AdList from "../views/AdList.vue";

import AdminUserEdit from "../views/AdminUserEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";

import Login from "../views/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      inPublic: true
    }
  },
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "items/list",
    children: [
      {
        path: "categories/create",
        component: CategoryEdit
      },
      {
        path: "categories/edit/:id",
        component: CategoryEdit,
        props: true
      },
      {
        path: "categories/list",
        component: CategoryList
      },

      {
        path: "items/create",
        component: ItemEdit
      },
      {
        path: "items/edit/:id",
        component: ItemEdit,
        props: true
      },
      {
        path: "items/list",
        component: ItemList
      },
      {
        path: "heros/create",
        component: HeroEdit
      },
      {
        path: "heros/edit/:id",
        component: HeroEdit,
        props: true
      },
      {
        path: "heros/list",
        component: HeroList
      },

      {
        path: "arcitles/create",
        component: ActicleEdit
      },
      {
        path: "arcitles/edit/:id",
        component: ActicleEdit,
        props: true
      },
      {
        path: "arcitles/list",
        component: ActicleList
      },

      {
        path: "ads/create",
        component: AdEdit
      },
      {
        path: "ads/edit/:id",
        component: AdEdit,
        props: true
      },
      {
        path: "ads/list",
        component: AdList
      },
      {
        path: "admin_users/create",
        component: AdminUserEdit
      },
      {
        path: "admin_users/edit/:id",
        component: AdminUserEdit,
        props: true
      },
      {
        path: "admin_users/list",
        component: AdminUserList
      }
    ]
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // if (!to.meta.isPublic && !localStorage.token) {
  //   return next("/login");
  // }
  next();
});
export default router;
