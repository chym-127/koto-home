<script setup lang="ts">
import { ref } from 'vue';
import { AppInstanceState } from '../../apps';

import useDrag from './drag';
const props = defineProps({
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 300,
  },
  icon: {
    type: String,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  },
});

// 拖拽逻辑
const x = ref<number>(0);
const y = ref<number>(0);
const isDrag = ref(false);

function setDragTrue() {
  isDrag.value = true;
}
function resetDragState() {
  isDrag.value = false;
}

useDrag(x, y, isDrag);

// 基于类型
const emit = defineEmits<{
  (e: 'minusApp'): void;
  (e: 'closeApp'): void;
}>();

function minusApp() {}
function closeApp() {
  emit('closeApp');
}
</script>

<template>
  <div
    :style="{
      minWidth: props.width + 'px',
      minHeight: props.height + 'px',
      transform: `translateX(${x}px) translateY(${y}px)`,
    }"
    class="app-wrap-box bg-[#fff] rounded-md"
    :class="state === AppInstanceState.NORMAL ? 'show' : 'closed'"
  >
    <div class="h-full w-full flex flex-col rounded-md">
      <div
        class="header-bar h-[30px] rounded-md justify-between items-center flex"
        @mousedown="setDragTrue()"
        @mouseup="resetDragState()"
      >
        <div class="left flex items-center ml-2">
          <img :src="icon" class="app-icon" alt="" srcset="" />
        </div>
        <div class="right flex justify-center">
          <i class="iconfont icon-minus mr-2 hover:cursor-pointer" @click="minusApp()"></i>
          <i class="iconfont icon-close mr-2 hover:cursor-pointer" @click="closeApp()"></i>
        </div>
      </div>
      <div class="content flex-1 p-1">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-wrap-box {
  position: fixed;
  border: 1px solid #f0f0f0;
  transition: opacity 0.7s;
  box-shadow: 7px 5px 12px -3px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 7px 5px 12px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 7px 5px 12px -3px rgba(0, 0, 0, 0.75);
}
.header-bar {
  border-bottom: 1px solid #f0f0f0;
}

.show {
  opacity: 1;
}
.closed {
  opacity: 0;
  pointer-events: none;
}
</style>
