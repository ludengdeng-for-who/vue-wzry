import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

const CategoryEdit = ()=> import ("../views/CategoryEdit.vue");
const CategoryList = ()=> import ( "../views/CategoryList.vue");

const ItemEdit =()=>import ( "../views/ItemEdit.vue");
const ItemList = ()=>import ( "../views/ItemList.vue");

const HeroEdit =()=>import ("../views/HeroEdit.vue");
const HeroList =()=> import ("../views/HeroList.vue");

const ActicleEdit = ()=>import ("../views/ActicleEdit.vue");
const ActicleList =()=>import ("../views/ActicleList.vue");

const AdEdit =()=>import ("../views/AdEdit.vue");
const AdList =()=>import ("../views/AdList.vue");

const AdminUserEdit =()=>import ("../views/AdminUserEdit.vue");
const AdminUserList =()=> import ("../views/AdminUserList.vue");

const Login = ()=> import ("../views/Login.vue");
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
