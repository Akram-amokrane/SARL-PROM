import { createRouter, createWebHistory } from 'vue-router'
import App from '@/views/App/app.vue'
import DashBoard from '@/views/App/Dashboard.vue'
import Profile from '@/views/App/profile.vue'
import Settings from '@/views/App/settings.vue'
import Biens from '@/views/App/Biens.vue'
import Clients from '@/views/App/Clients.vue'
import Projects from '@/views/App/Projects.vue'
import dialogs from '@/views/Dialogs/dialogs.vue'
import splash from '@/views/Splash/splash.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      children: [
        {
          path: "/",
          redirect: "/dashboard"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: DashBoard
        },
        {
          path: "/clients",
          name: "clients",
          component: Clients
        },
        {
          path: "/projects",
          name: "projects",
          component: Projects
        },
        {
          path: "/biens",
          name: "biens",
          component: Biens
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile
        },
        {
          path: "/settings",
          name: "settings",
          component: Settings
        }
      ]
    },
    {
      path: '/dialogs',
      name: 'dialogs',
      component: dialogs
    },
    {
      path: '/splash',
      name: 'splash',
      component: splash
    }
  ]
})

export default router
