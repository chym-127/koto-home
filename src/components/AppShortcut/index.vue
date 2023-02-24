<script setup lang="ts">
import type { PropType } from 'vue';
import type { App } from '../../apps/index';

const props = defineProps({
  app: {
    type: Object as PropType<App>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'startApp', app: App): void;
}>();
</script>
<template>
  <div
    class="app-shortcut flex flex-col items-center p-2 box-broder"
    :key="props.app.uuid"
    @click="emit('startApp', app)"
  >
    <img :src="props.app.icon" class="app-shortcut_icon" alt="" srcset="" />
    <span class="text-[#fff] text-ellipsis">{{ props.app.name }}</span>
  </div>
</template>

<style lang="less" scoped>
.app-shortcut {
  width: 66px;
  .app-shortcut_icon {
    width: 50px;
    height: 50px;
  }
}
</style>
