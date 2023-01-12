import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4a2307e9 = () => interopDefault(import('../pages/forums/index.vue' /* webpackChunkName: "pages/forums/index" */))
const _40ac070d = () => interopDefault(import('../pages/leaderboards/index.vue' /* webpackChunkName: "pages/leaderboards/index" */))
const _50e115b6 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _41f60ab2 = () => interopDefault(import('../pages/notifications/index.vue' /* webpackChunkName: "pages/notifications/index" */))
const _2e1e9f9f = () => interopDefault(import('../pages/partners.vue' /* webpackChunkName: "pages/partners" */))
const _35680eda = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _2b7ef69f = () => interopDefault(import('../pages/staff/index.vue' /* webpackChunkName: "pages/staff/index" */))
const _94b00864 = () => interopDefault(import('../pages/support/index.vue' /* webpackChunkName: "pages/support/index" */))
const _037b9cb2 = () => interopDefault(import('../pages/wiki/index.vue' /* webpackChunkName: "pages/wiki/index" */))
const _0bff2372 = () => interopDefault(import('../pages/jobs/artists.vue' /* webpackChunkName: "pages/jobs/artists" */))
const _6f506d04 = () => interopDefault(import('../pages/jobs/developers.vue' /* webpackChunkName: "pages/jobs/developers" */))
const _03d96aec = () => interopDefault(import('../pages/jobs/support.vue' /* webpackChunkName: "pages/jobs/support" */))
const _6cc90f6e = () => interopDefault(import('../pages/legal/privacy.vue' /* webpackChunkName: "pages/legal/privacy" */))
const _1274196d = () => interopDefault(import('../pages/legal/terms.vue' /* webpackChunkName: "pages/legal/terms" */))
const _61c1c63e = () => interopDefault(import('../pages/register/complete.vue' /* webpackChunkName: "pages/register/complete" */))
const _c056363e = () => interopDefault(import('../pages/staff/dashboard.vue' /* webpackChunkName: "pages/staff/dashboard" */))
const _411e0634 = () => interopDefault(import('../pages/store/crypto/index.vue' /* webpackChunkName: "pages/store/crypto/index" */))
const _978642b4 = () => interopDefault(import('../pages/support/tickets/index.vue' /* webpackChunkName: "pages/support/tickets/index" */))
const _0517a973 = () => interopDefault(import('../pages/user/activate.vue' /* webpackChunkName: "pages/user/activate" */))
const _9d913c96 = () => interopDefault(import('../pages/user/forgot-password.vue' /* webpackChunkName: "pages/user/forgot-password" */))
const _163e0808 = () => interopDefault(import('../pages/user/friends/index.vue' /* webpackChunkName: "pages/user/friends/index" */))
const _21ada118 = () => interopDefault(import('../pages/user/notifications.vue' /* webpackChunkName: "pages/user/notifications" */))
const _6c2778a3 = () => interopDefault(import('../pages/user/settings.vue' /* webpackChunkName: "pages/user/settings" */))
const _6523e906 = () => interopDefault(import('../pages/staff/tickets/all.vue' /* webpackChunkName: "pages/staff/tickets/all" */))
const _6545fc39 = () => interopDefault(import('../pages/staff/tickets/assigned.vue' /* webpackChunkName: "pages/staff/tickets/assigned" */))
const _7357b118 = () => interopDefault(import('../pages/support/tickets/new.vue' /* webpackChunkName: "pages/support/tickets/new" */))
const _cacd4404 = () => interopDefault(import('../pages/user/friends/requests.vue' /* webpackChunkName: "pages/user/friends/requests" */))
const _0174f89d = () => interopDefault(import('../pages/store/crypto/transaction/_id.vue' /* webpackChunkName: "pages/store/crypto/transaction/_id" */))
const _146fa6c2 = () => interopDefault(import('../pages/staff/tickets/_id.vue' /* webpackChunkName: "pages/staff/tickets/_id" */))
const _9ac35ae4 = () => interopDefault(import('../pages/support/tickets/_id.vue' /* webpackChunkName: "pages/support/tickets/_id" */))
const _5b9fb064 = () => interopDefault(import('../pages/forums/_slug/index.vue' /* webpackChunkName: "pages/forums/_slug/index" */))
const _1a5cad7b = () => interopDefault(import('../pages/player/_username.vue' /* webpackChunkName: "pages/player/_username" */))
const _07a08a22 = () => interopDefault(import('../pages/player/_username/stats/practice.vue' /* webpackChunkName: "pages/player/_username/stats/practice" */))
const _989e8382 = () => interopDefault(import('../pages/player/_username/stats/prison.vue' /* webpackChunkName: "pages/player/_username/stats/prison" */))
const _7f1c50b2 = () => interopDefault(import('../pages/forums/_slug/new.vue' /* webpackChunkName: "pages/forums/_slug/new" */))
const _2a86283b = () => interopDefault(import('../pages/forums/_thread/_slug.vue' /* webpackChunkName: "pages/forums/_thread/_slug" */))
const _0de7d20e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _4a2307e9,
    name: "forums"
  }, {
    path: "/leaderboards",
    component: _40ac070d,
    name: "leaderboards"
  }, {
    path: "/login",
    component: _50e115b6,
    name: "login"
  }, {
    path: "/notifications",
    component: _41f60ab2,
    name: "notifications"
  }, {
    path: "/partners",
    component: _2e1e9f9f,
    name: "partners"
  }, {
    path: "/register",
    component: _35680eda,
    name: "register"
  }, {
    path: "/staff",
    component: _2b7ef69f,
    name: "staff"
  }, {
    path: "/support",
    component: _94b00864,
    name: "support"
  }, {
    path: "/wiki",
    component: _037b9cb2,
    name: "wiki"
  }, {
    path: "/jobs/artists",
    component: _0bff2372,
    name: "jobs-artists"
  }, {
    path: "/jobs/developers",
    component: _6f506d04,
    name: "jobs-developers"
  }, {
    path: "/jobs/support",
    component: _03d96aec,
    name: "jobs-support"
  }, {
    path: "/legal/privacy",
    component: _6cc90f6e,
    name: "legal-privacy"
  }, {
    path: "/legal/terms",
    component: _1274196d,
    name: "legal-terms"
  }, {
    path: "/register/complete",
    component: _61c1c63e,
    name: "register-complete"
  }, {
    path: "/staff/dashboard",
    component: _c056363e,
    name: "staff-dashboard"
  }, {
    path: "/store/crypto",
    component: _411e0634,
    name: "store-crypto"
  }, {
    path: "/support/tickets",
    component: _978642b4,
    name: "support-tickets"
  }, {
    path: "/user/activate",
    component: _0517a973,
    name: "user-activate"
  }, {
    path: "/user/forgot-password",
    component: _9d913c96,
    name: "user-forgot-password"
  }, {
    path: "/user/friends",
    component: _163e0808,
    name: "user-friends"
  }, {
    path: "/user/notifications",
    component: _21ada118,
    name: "user-notifications"
  }, {
    path: "/user/settings",
    component: _6c2778a3,
    name: "user-settings"
  }, {
    path: "/staff/tickets/all",
    component: _6523e906,
    name: "staff-tickets-all"
  }, {
    path: "/staff/tickets/assigned",
    component: _6545fc39,
    name: "staff-tickets-assigned"
  }, {
    path: "/support/tickets/new",
    component: _7357b118,
    name: "support-tickets-new"
  }, {
    path: "/user/friends/requests",
    component: _cacd4404,
    name: "user-friends-requests"
  }, {
    path: "/store/crypto/transaction/:id?",
    component: _0174f89d,
    name: "store-crypto-transaction-id"
  }, {
    path: "/staff/tickets/:id?",
    component: _146fa6c2,
    name: "staff-tickets-id"
  }, {
    path: "/support/tickets/:id",
    component: _9ac35ae4,
    name: "support-tickets-id"
  }, {
    path: "/forums/:slug",
    component: _5b9fb064,
    name: "forums-slug"
  }, {
    path: "/player/:username?",
    component: _1a5cad7b,
    name: "player-username",
    children: [{
      path: "stats/practice",
      component: _07a08a22,
      name: "player-username-stats-practice"
    }, {
      path: "stats/prison",
      component: _989e8382,
      name: "player-username-stats-prison"
    }]
  }, {
    path: "/forums/:slug/new",
    component: _7f1c50b2,
    name: "forums-slug-new"
  }, {
    path: "/forums/:thread/:slug?",
    component: _2a86283b,
    name: "forums-thread-slug"
  }, {
    path: "/",
    component: _0de7d20e,
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
