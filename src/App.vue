<script setup lang="ts">
import AppShortcut from '@components/AppShortcut/index.vue';
import { getApps, createAppInstance, AppInstanceState } from './apps';
import type { App, AppInstance } from './apps';
import { computed, reactive } from 'vue';
import { provide } from 'vue';
import { useStore } from 'vuex';
import { key } from './store';

const store = useStore(key);
const apps = getApps();
let instanceCountMapper: any = {};

function startApp(app: App) {
  if (!instanceCountMapper[app.uuid]) {
    instanceCountMapper[app.uuid] = 1;
  } else {
    instanceCountMapper[app.uuid] += 1;
  }
  store.commit('pushAppInstances', createAppInstance(app));
}

const menus = computed(() => {
  const temp: any = {};
  store.state.appInstances.forEach((instance) => {
    if (instance.state === AppInstanceState.CLOSE) {
      return;
    }
    if (!temp[instance.appUuid]) {
      temp[instance.appUuid] = {
        count: 1,
        icon: instance.icon,
        instances: [instance],
      };
    } else {
      temp[instance.appUuid].count += 1;
      temp[instance.appUuid].instances.push(instance);
    }
  });
  return temp;
});
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="desktop flex-1">
      <div class="app-shortcut-list_box">
        <AppShortcut :app="app" v-for="app in apps" @start-app="startApp"></AppShortcut>
      </div>
      <!-- <video class="video-el" src="./assets/video/background-animate.webm" autoplay muted></video> -->
      <component
        :is="instance.componentName"
        :instance="instance"
        v-for="instance in store.state.appInstances"
        :key="instance.uuid"
      ></component>
      <!-- <Pacman></Pacman> -->
    </div>
    <div class="footer w-full h-[50px] bg-[#fff]">
      <div class="menus-list">
        <div class="menu-item" v-for="menu in menus">
          <img :src="menu.icon" class="menu-item_icon" alt="" srcset="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.video-el {
  position: absolute;
  width: 100vw;
  object-fit: fill;
  height: calc(100vh - 50px);
}
</style>
<style lang="less" scoped>
.desktop {
  position: relative;
  background-image: url(./assets/win11-bg.jpg);
  background-size: cover;
  overflow: hidden;
}
.footer {
  border-top: 1px solid #a8c1c1;
  background: #f3f3f3;
}
.app-shortcut-list_box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 50px;
  width: 100vw;
}

.menus-list {
  .menu-item {
    .menu-item_icon {
      width: 38px;
      height: 38px;
    }
  }
}
</style>
