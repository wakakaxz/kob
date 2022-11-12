// defalut 不许要加花括号, 类名随便写
import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '@/views/pk/PkIndexView'
import RecordIndexView from '@/views/record/RecordIndexView'
import RanklistIndexView from '@/views/ranklist/RanklistIndexView'
import UserBotIndexView from '@/views/user/bot/UserBotIndexView'
import NotFound from '@/views/error/NotFound'
import UserAccountLoginView from '@/views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '@/views/user/account/UserAccountRegisterView'
import store from "@/store/index"

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/pk/',
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/pk/',
    name: 'pk_index',
    component: PkIndexView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/record/',
    name: 'record_index',
    component: RecordIndexView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/ranklist/',
    name: 'ranklist_index',
    component: RanklistIndexView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/user/bot/',
    name: 'user_bot_index',
    component: UserBotIndexView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/user/account/login/',
    name: 'user_account_login',
    component: UserAccountLoginView,
    meta: {
      requestAuth: false
    }
  },
  {
    path: '/user/account/register/',
    name: 'user_account_register',
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false
    }
  },
  {
    path: '/404/',
    name: '404',
    component: NotFound,
    meta: {
      requestAuth: false
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 判断是否需要授权的页面, 若需要授权并且未登录 => 跳转到登录界面
router.beforeEach((to, from, next) => {
  const jwt_token = localStorage.getItem('jwt_token');
  if (jwt_token) {
    store.commit('updateToken', jwt_token);
    store.dispatch('getinfo', {
      success() {
        next();
      },
      error() {
        store.dispatch('logout');
        alert("token无效，请重新登录！");
        next({ name: "user_account_login" });
      }
    })
  } else {
    if (to.meta.requestAuth && !store.state.user.is_login) {
      next({ name: "user_account_login" });
    } else {
      next();
    }
  }
})

export default router
