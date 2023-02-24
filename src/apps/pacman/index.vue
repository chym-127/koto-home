<script setup lang="ts">
import AppWrap from '../../components/AppWrap/index.vue';
import pacmanIco from '@assets/app-icons/pac-man.ico';
import { onMounted } from 'vue';
import type { PropType, Ref } from 'vue';
import start from './index';
import { AppInstance, AppInstanceState } from '../index';
import useInstance from '../useInstance';
const props = defineProps({
  instance: Object as PropType<AppInstance>,
});
let startGame: any = null;
function run() {
  startGame();
}

onMounted(() => {
  console.log('onMounted');
  startGame = start();
});

function closeApp() {
  changeAppInstanceState(AppInstanceState.CLOSE);
  setTimeout(() => {
    removeAppInstance();
  }, 700);
}

const { changeAppInstanceState, removeAppInstance } = useInstance(props.instance!.uuid);
</script>

<template>
  <AppWrap
    ref="appWrapRef"
    :state="props.instance!.state"
    :icon="pacmanIco"
    :width="420"
    :height="460"
    @closeApp="closeApp"
  >
    <button @click="run()">开始游戏</button>
    <canvas id="canvas"></canvas>
  </AppWrap>
</template>

<style lang="less" scoped>
#canvas {
  background-color: #000;
}
</style>
