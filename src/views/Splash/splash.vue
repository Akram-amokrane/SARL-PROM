<template>
  <div
    class="w-screen h-screen overflow-hidden flex flex-col justify-center items-center bg-white rounded-lg"
    :style="{
      backgroundImage: `url(${SplashBg})`,
      backgroundSize: 'cover',
      backgroundPosition: ' 40%'
    }"
  >
    <div class="h-2/3 flex flex-col items-center">
      <div class="flex flex-col justify-center items-center">
        <Logo class="w-52 h-auto" />
      </div>
      <div class="mt-14">
        <PulseLoader />
      </div>
      <div class="mt-7 text-sm font-semibold text-slate-700">{{ process }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/logo/Logo.vue'
import PulseLoader from '@/components/loaders/PulseLoader.vue'
import { onMounted, ref } from 'vue'
import { WebviewWindow } from '@tauri-apps/api/window'
import { createDir, writeTextFile, exists } from '@tauri-apps/api/fs'
import { BaseDirectory } from '@tauri-apps/api/path'
import { useDbStore } from '@/stores/db-store'
import DBCreator from '@/services/db'
import SplashBg from '@/assets/images/splash_bg.png'

const app = WebviewWindow.getByLabel('main')
const splash = WebviewWindow.getByLabel('splash')

const process = ref('')
const dbStore = useDbStore()

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function checkDirs() {
  process.value = 'Checking application directory'
  await wait(400)
  if (!(await exists('', { dir: BaseDirectory.AppData }))) {
    process.value = 'Creating application directory'
    await wait(400)
    await createDir('', { dir: BaseDirectory.AppData, recursive: true })
  }
  process.value = '.....'
}

async function checkFiles() {
  process.value = 'Checking config file'
  await wait(400)
  if (!(await exists('config.json', { dir: BaseDirectory.AppData }))) {
    process.value = 'Creating config file'
    await wait(400)
    await writeTextFile('config.json', '', { dir: BaseDirectory.AppData })
  }
  process.value = '.....'
  process.value = 'Checking database'
  await wait(400)
  if (!(await exists('data.db', { dir: BaseDirectory.AppData }))) {
    process.value = 'Creating the database'
    await wait(400)
    await writeTextFile('data.db', '', { dir: BaseDirectory.AppData })
  }
  process.value = '.....'
}

async function checkDb() {
  process.value = 'Connecting to Database'
  await wait(400)
  await dbStore.connect()
  process.value = 'Checking Tables'
  await wait(400)
  let dbCreator = new DBCreator()
  await dbCreator.createAllTables()
  process.value = 'Done'
  await dbStore.disconnect()
  await wait(400)
}

async function goToMain() {
  await app?.show()
  await splash?.close()
}

onMounted(async () => {
  await checkDirs()
  await checkFiles()
  await checkDb()
  await goToMain()
})
</script>
