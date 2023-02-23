import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _51b53e80 = () => interopDefault(import('../pages/forums/index.vue' /* webpackChunkName: "pages/forums/index" */))
const _15e822a4 = () => interopDefault(import('../pages/leaderboards/index.vue' /* webpackChunkName: "pages/leaderboards/index" */))
const _447b502e = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _9d675c20 = () => interopDefault(import('../pages/notifications/index.vue' /* webpackChunkName: "pages/notifications/index" */))
const _78e4fbf6 = () => interopDefault(import('../pages/partners.vue' /* webpackChunkName: "pages/partners" */))
const _661ab230 = () => interopDefault(import('../pages/staff/index.vue' /* webpackChunkName: "pages/staff/index" */))
const _6e1e8452 = () => interopDefault(import('../pages/support/index.vue' /* webpackChunkName: "pages/support/index" */))
const _9e3a5784 = () => interopDefault(import('../pages/wiki/index.vue' /* webpackChunkName: "pages/wiki/index" */))
const _f1fa71c4 = () => interopDefault(import('../pages/jobs/artists.vue' /* webpackChunkName: "pages/jobs/artists" */))
const _2c782d47 = () => interopDefault(import('../pages/jobs/developers.vue' /* webpackChunkName: "pages/jobs/developers" */))
const _e9d4b93e = () => interopDefault(import('../pages/jobs/support.vue' /* webpackChunkName: "pages/jobs/support" */))
const _ffdc5d12 = () => interopDefault(import('../pages/legal/privacy.vue' /* webpackChunkName: "pages/legal/privacy" */))
const _98306c94 = () => interopDefault(import('../pages/legal/terms.vue' /* webpackChunkName: "pages/legal/terms" */))
const _03f548aa = () => interopDefault(import('../pages/staff/dashboard.vue' /* webpackChunkName: "pages/staff/dashboard" */))
const _cc53e180 = () => interopDefault(import('../pages/staff/register/index.vue' /* webpackChunkName: "pages/staff/register/index" */))
const _96a5cf06 = () => interopDefault(import('../pages/store/crypto/index.vue' /* webpackChunkName: "pages/store/crypto/index" */))
const _120b87af = () => interopDefault(import('../pages/support/tickets/index.vue' /* webpackChunkName: "pages/support/tickets/index" */))
const _18606b7c = () => interopDefault(import('../pages/user/activate.vue' /* webpackChunkName: "pages/user/activate" */))
const _27daf38c = () => interopDefault(import('../pages/user/forgot-password.vue' /* webpackChunkName: "pages/user/forgot-password" */))
const _290bb8c2 = () => interopDefault(import('../pages/user/friends/index.vue' /* webpackChunkName: "pages/user/friends/index" */))
const _122c86a2 = () => interopDefault(import('../pages/user/notifications.vue' /* webpackChunkName: "pages/user/notifications" */))
const _7f703aac = () => interopDefault(import('../pages/user/settings.vue' /* webpackChunkName: "pages/user/settings" */))
const _27c10a8a = () => interopDefault(import('../pages/staff/register/complete.vue' /* webpackChunkName: "pages/staff/register/complete" */))
const _42ba7e8f = () => interopDefault(import('../pages/staff/tickets/all.vue' /* webpackChunkName: "pages/staff/tickets/all" */))
const _7d671760 = () => interopDefault(import('../pages/staff/tickets/assigned.vue' /* webpackChunkName: "pages/staff/tickets/assigned" */))
const _cec90286 = () => interopDefault(import('../pages/support/tickets/new.vue' /* webpackChunkName: "pages/support/tickets/new" */))
const _0f2ff1f2 = () => interopDefault(import('../pages/user/friends/requests.vue' /* webpackChunkName: "pages/user/friends/requests" */))
const _6d70c374 = () => interopDefault(import('../pages/store/crypto/transaction/_id.vue' /* webpackChunkName: "pages/store/crypto/transaction/_id" */))
const _59427bb0 = () => interopDefault(import('../pages/staff/tickets/_id.vue' /* webpackChunkName: "pages/staff/tickets/_id" */))
const _f634ac52 = () => interopDefault(import('../pages/support/tickets/_id.vue' /* webpackChunkName: "pages/support/tickets/_id" */))
const _30dbcbfb = () => interopDefault(import('../pages/forums/_slug/index.vue' /* webpackChunkName: "pages/forums/_slug/index" */))
const _3a48c2d2 = () => interopDefault(import('../pages/player/_username.vue' /* webpackChunkName: "pages/player/_username" */))
const _26896cb8 = () => interopDefault(import('../pages/player/_username/stats/practice.vue' /* webpackChunkName: "pages/player/_username/stats/practice" */))
const _71a36370 = () => interopDefault(import('../pages/player/_username/stats/prison.vue' /* webpackChunkName: "pages/player/_username/stats/prison" */))
const _c1ef33ee = () => interopDefault(import('../pages/forums/_slug/new.vue' /* webpackChunkName: "pages/forums/_slug/new" */))
const _bdac8bdc = () => interopDefault(import('../pages/forums/_thread/_slug.vue' /* webpackChunkName: "pages/forums/_thread/_slug" */))
const _7ad3ad17 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/forums",
    component: _51b53e80,
    name: "forums"
  }, {
    path: "/leaderboards",
    component: _15e822a4,
    name: "leaderboards"
  }, {
    path: "/login",
    component: _447b502e,
    name: "login"
  }, {
    path: "/notifications",
    component: _9d675c20,
    name: "notifications"
  }, {
    path: "/partners",
    component: _78e4fbf6,
    name: "partners"
  }, {
    path: "/staff",
    component: _661ab230,
    name: "staff"
  }, {
    path: "/support",
    component: _6e1e8452,
    name: "support"
  }, {
    path: "/wiki",
    component: _9e3a5784,
    name: "wiki"
  }, {
    path: "/jobs/artists",
    component: _f1fa71c4,
    name: "jobs-artists"
  }, {
    path: "/jobs/developers",
    component: _2c782d47,
    name: "jobs-developers"
  }, {
    path: "/jobs/support",
    component: _e9d4b93e,
    name: "jobs-support"
  }, {
    path: "/legal/privacy",
    component: _ffdc5d12,
    name: "legal-privacy"
  }, {
    path: "/legal/terms",
    component: _98306c94,
    name: "legal-terms"
  }, {
    path: "/staff/dashboard",
    component: _03f548aa,
    name: "staff-dashboard"
  }, {
    path: "/staff/register",
    component: _cc53e180,
    name: "staff-register"
  }, {
    path: "/store/crypto",
    component: _96a5cf06,
    name: "store-crypto"
  }, {
    path: "/support/tickets",
    component: _120b87af,
    name: "support-tickets"
  }, {
    path: "/user/activate",
    component: _18606b7c,
    name: "user-activate"
  }, {
    path: "/user/forgot-password",
    component: _27daf38c,
    name: "user-forgot-password"
  }, {
    path: "/user/friends",
    component: _290bb8c2,
    name: "user-friends"
  }, {
    path: "/user/notifications",
    component: _122c86a2,
    name: "user-notifications"
  }, {
    path: "/user/settings",
    component: _7f703aac,
    name: "user-settings"
  }, {
    path: "/staff/register/complete",
    component: _27c10a8a,
    name: "staff-register-complete"
  }, {
    path: "/staff/tickets/all",
    component: _42ba7e8f,
    name: "staff-tickets-all"
  }, {
    path: "/staff/tickets/assigned",
    component: _7d671760,
    name: "staff-tickets-assigned"
  }, {
    path: "/support/tickets/new",
    component: _cec90286,
    name: "support-tickets-new"
  }, {
    path: "/user/friends/requests",
    component: _0f2ff1f2,
    name: "user-friends-requests"
  }, {
    path: "/store/crypto/transaction/:id?",
    component: _6d70c374,
    name: "store-crypto-transaction-id"
  }, {
    path: "/staff/tickets/:id?",
    component: _59427bb0,
    name: "staff-tickets-id"
  }, {
    path: "/support/tickets/:id",
    component: _f634ac52,
    name: "support-tickets-id"
  }, {
    path: "/forums/:slug",
    component: _30dbcbfb,
    name: "forums-slug"
  }, {
    path: "/player/:username?",
    component: _3a48c2d2,
    name: "player-username",
    children: [{
      path: "stats/practice",
      component: _26896cb8,
      name: "player-username-stats-practice"
    }, {
      path: "stats/prison",
      component: _71a36370,
      name: "player-username-stats-prison"
    }]
  }, {
    path: "/forums/:slug/new",
    component: _c1ef33ee,
    name: "forums-slug-new"
  }, {
    path: "/forums/:thread/:slug?",
    component: _bdac8bdc,
    name: "forums-thread-slug"
  }, {
    path: "/",
    component: _7ad3ad17,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
