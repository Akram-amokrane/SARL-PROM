<template>
  <div class="w-80 h-screen px-1 py-2 bg-gray-800">
    <div class="w-12 h-full flex flex-col justify-between items-center text-white">
      <div class="flex flex-col gap-2">
        <label
          for="menu-toggle"
          class="block cursor-pointer hover:bg-orange-600 dark:hover:bg-blue-900 rounded-lg"
        >
          <input type="checkbox" id="menu-toggle" class="peer hidden" v-model="appStore.menuOpen" />
          <XMarkIcon class="w-10 h-10 fill-white peer-checked:block hidden" />
          <MenuIcon class="w-10 h-10 fill-white block peer-checked:hidden" />
        </label>
        <div class="w-fit rounded-xl relative">
          <Logo class="w-10 h-auto" :min="true" />
          <div
            class="absolute w-36 h-10 flex justify-start items-center left-full top-0 pl-3 font-bold text-xl"
          >
            SARL PROM
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3 h-1/2">
        <NavLink group="navlink" to-name="dashboard" title="Tableu de bord" :checked="true">
          <dashboardIcon class="w-7 h-7 fill-white" />
        </NavLink>
        <NavLink group="navlink" to-name="clients" title="Gestion des clients">
          <UsersIcon class="w-7 h-7 text-white" />
        </NavLink>
        <NavLink group="navlink" to-name="projects" title="Gestion des projets">
          <RectangleStackIcon class="w-7 h-7 text-white" />
        </NavLink>
        <NavLink group="navlink" to-name="biens" title="Gestion des biens">
          <HomeIcon class="w-7 h-7 stroke-white" />
        </NavLink>
      </div>
      <div class="flex flex-col gap-3">
        <NavLink group="navlink" to-name="profile" title="Akram Amokrane">
          <img :src="me" alt="profile" class="w-7 h-7 rounded-full" />
        </NavLink>
        <NavLink group="navlink" to-name="settings" title="Parametres">
          <SettingsIcon class="w-7 h-7 fill-white" />
        </NavLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue'
import dashboardIcon from './icons/dashboardIcon.vue'
import SettingsIcon from './icons/settingsIcon.vue'
import Logo from './logo/Logo.vue'
import MenuIcon from './icons/MenuIcon.vue'
import { XMarkIcon, UsersIcon, RectangleStackIcon, HomeIcon } from '@heroicons/vue/24/outline'
import { useAppStore } from '@/stores/app-store'
import me from '@/assets/images/me-draw.webp'

const appStore = useAppStore()
</script>
