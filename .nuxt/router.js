import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _49b85c3e = () => interopDefault(import('../pages/forums/index.vue' /* webpackChunkName: "pages/forums/index" */))
const _153b7705 = () => interopDefault(import('../pages/leaderboards/index.vue' /* webpackChunkName: "pages/leaderboards/index" */))
const _185d1ba6 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _c738eca2 = () => interopDefault(import('../pages/notifications/index.vue' /* webpackChunkName: "pages/notifications/index" */))
const _dd79b4d2 = () => interopDefault(import('../pages/partners.vue' /* webpackChunkName: "pages/partners" */))
const _ed438a5c = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _fa7de4b2 = () => interopDefault(import('../pages/staff/index.vue' /* webpackChunkName: "pages/staff/index" */))
const _44c070d6 = () => interopDefault(import('../pages/support/index.vue' /* webpackChunkName: "pages/support/index" */))
const _2a5d199f = () => interopDefault(import('../pages/wiki/index.vue' /* webpackChunkName: "pages/wiki/index" */))
const _e9fd8f82 = () => interopDefault(import('../pages/jobs/artists.vue' /* webpackChunkName: "pages/jobs/artists" */))
const _19b1c6f4 = () => interopDefault(import('../pages/jobs/developers.vue' /* webpackChunkName: "pages/jobs/developers" */))
const _e1d7d6fc = () => interopDefault(import('../pages/jobs/support.vue' /* webpackChunkName: "pages/jobs/support" */))
const _083cf714 = () => interopDefault(import('../pages/legal/privacy.vue' /* webpackChunkName: "pages/legal/privacy" */))
const _69b63075 = () => interopDefault(import('../pages/legal/terms.vue' /* webpackChunkName: "pages/legal/terms" */))
const _f934642e = () => interopDefault(import('../pages/register/complete.vue' /* webpackChunkName: "pages/register/complete" */))
const _6ab7902e = () => interopDefault(import('../pages/staff/dashboard.vue' /* webpackChunkName: "pages/staff/dashboard" */))
const _97ff2644 = () => interopDefault(import('../pages/store/crypto/index.vue' /* webpackChunkName: "pages/store/crypto/index" */))
const _d79868a4 = () => interopDefault(import('../pages/support/tickets/index.vue' /* webpackChunkName: "pages/support/tickets/index" */))
const _d79fc30a = () => interopDefault(import('../pages/user/activate.vue' /* webpackChunkName: "pages/user/activate" */))
const _c0aa98a6 = () => interopDefault(import('../pages/user/forgot-password.vue' /* webpackChunkName: "pages/user/forgot-password" */))
const _2a651000 = () => interopDefault(import('../pages/user/friends/index.vue' /* webpackChunkName: "pages/user/friends/index" */))
const _1385dde0 = () => interopDefault(import('../pages/user/notifications.vue' /* webpackChunkName: "pages/user/notifications" */))
const _098024aa = () => interopDefault(import('../pages/user/settings.vue' /* webpackChunkName: "pages/user/settings" */))
const _196a9a0e = () => interopDefault(import('../pages/staff/tickets/all.vue' /* webpackChunkName: "pages/staff/tickets/all" */))
const _f7a69f9e = () => interopDefault(import('../pages/staff/tickets/assigned.vue' /* webpackChunkName: "pages/staff/tickets/assigned" */))
const _f89a9308 = () => interopDefault(import('../pages/support/tickets/new.vue' /* webpackChunkName: "pages/support/tickets/new" */))
const _7a904b06 = () => interopDefault(import('../pages/user/friends/requests.vue' /* webpackChunkName: "pages/user/friends/requests" */))
const _1652d295 = () => interopDefault(import('../pages/store/crypto/transaction/_id.vue' /* webpackChunkName: "pages/store/crypto/transaction/_id" */))
const _abe244b2 = () => interopDefault(import('../pages/staff/tickets/_id.vue' /* webpackChunkName: "pages/staff/tickets/_id" */))
const _6ffce196 = () => interopDefault(import('../pages/support/tickets/_id.vue' /* webpackChunkName: "pages/support/tickets/_id" */))
const _302f205c = () => interopDefault(import('../pages/forums/_slug/index.vue' /* webpackChunkName: "pages/forums/_slug/index" */))
const _4977bb73 = () => interopDefault(import('../pages/player/_username.vue' /* webpackChunkName: "pages/player/_username" */))
const _4147fdf7 = () => interopDefault(import('../pages/player/_username/stats/practice.vue' /* webpackChunkName: "pages/player/_username/stats/practice" */))
const _3a8e2347 = () => interopDefault(import('../pages/player/_username/stats/prison.vue' /* webpackChunkName: "pages/player/_username/stats/prison" */))
const _a39142ac = () => interopDefault(import('../pages/forums/_slug/new.vue' /* webpackChunkName: "pages/forums/_slug/new" */))
const _18f97a33 = () => interopDefault(import('../pages/forums/_thread/_slug.vue' /* webpackChunkName: "pages/forums/_thread/_slug" */))
const _2a29cf16 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _49b85c3e,
    name: "forums"
  }, {
    path: "/leaderboards",
    component: _153b7705,
    name: "leaderboards"
  }, {
    path: "/login",
    component: _185d1ba6,
    name: "login"
  }, {
    path: "/notifications",
    component: _c738eca2,
    name: "notifications"
  }, {
    path: "/partners",
    component: _dd79b4d2,
    name: "partners"
  }, {
    path: "/register",
    component: _ed438a5c,
    name: "register"
  }, {
    path: "/staff",
    component: _fa7de4b2,
    name: "staff"
  }, {
    path: "/support",
    component: _44c070d6,
    name: "support"
  }, {
    path: "/wiki",
    component: _2a5d199f,
    name: "wiki"
  }, {
    path: "/jobs/artists",
    component: _e9fd8f82,
    name: "jobs-artists"
  }, {
    path: "/jobs/developers",
    component: _19b1c6f4,
    name: "jobs-developers"
  }, {
    path: "/jobs/support",
    component: _e1d7d6fc,
    name: "jobs-support"
  }, {
    path: "/legal/privacy",
    component: _083cf714,
    name: "legal-privacy"
  }, {
    path: "/legal/terms",
    component: _69b63075,
    name: "legal-terms"
  }, {
    path: "/register/complete",
    component: _f934642e,
    name: "register-complete"
  }, {
    path: "/staff/dashboard",
    component: _6ab7902e,
    name: "staff-dashboard"
  }, {
    path: "/store/crypto",
    component: _97ff2644,
    name: "store-crypto"
  }, {
    path: "/support/tickets",
    component: _d79868a4,
    name: "support-tickets"
  }, {
    path: "/user/activate",
    component: _d79fc30a,
    name: "user-activate"
  }, {
    path: "/user/forgot-password",
    component: _c0aa98a6,
    name: "user-forgot-password"
  }, {
    path: "/user/friends",
    component: _2a651000,
    name: "user-friends"
  }, {
    path: "/user/notifications",
    component: _1385dde0,
    name: "user-notifications"
  }, {
    path: "/user/settings",
    component: _098024aa,
    name: "user-settings"
  }, {
    path: "/staff/tickets/all",
    component: _196a9a0e,
    name: "staff-tickets-all"
  }, {
    path: "/staff/tickets/assigned",
    component: _f7a69f9e,
    name: "staff-tickets-assigned"
  }, {
    path: "/support/tickets/new",
    component: _f89a9308,
    name: "support-tickets-new"
  }, {
    path: "/user/friends/requests",
    component: _7a904b06,
    name: "user-friends-requests"
  }, {
    path: "/store/crypto/transaction/:id?",
    component: _1652d295,
    name: "store-crypto-transaction-id"
  }, {
    path: "/staff/tickets/:id?",
    component: _abe244b2,
    name: "staff-tickets-id"
  }, {
    path: "/support/tickets/:id",
    component: _6ffce196,
    name: "support-tickets-id"
  }, {
    path: "/forums/:slug",
    component: _302f205c,
    name: "forums-slug"
  }, {
    path: "/player/:username?",
    component: _4977bb73,
    name: "player-username",
    children: [{
      path: "stats/practice",
      component: _4147fdf7,
      name: "player-username-stats-practice"
    }, {
      path: "stats/prison",
      component: _3a8e2347,
      name: "player-username-stats-prison"
    }]
  }, {
    path: "/forums/:slug/new",
    component: _a39142ac,
    name: "forums-slug-new"
  }, {
    path: "/forums/:thread/:slug?",
    component: _18f97a33,
    name: "forums-thread-slug"
  }, {
    path: "/",
    component: _2a29cf16,
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
