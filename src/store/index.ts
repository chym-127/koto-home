import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import type { AppInstance } from '../apps';
import { AppInstanceState } from '../apps';

// 为 store state 声明类型
export interface State {
  appInstances: AppInstance[];
}

export const key: InjectionKey<Store<State>> = Symbol();

// 创建一个新的 store 实例
export const store = createStore<State>({
  state() {
    return {
      appInstances: [],
    };
  },
  mutations: {
    pushAppInstances(state: State, instance: AppInstance) {
      state.appInstances.push(instance);
    },
    changeAppInstanceState(state: State, obj: { instanceState: AppInstanceState; uuid: string }) {
      const targetInstance = state.appInstances.find((item: AppInstance) => {
        return item.uuid === obj.uuid;
      });
      targetInstance!.state = obj.instanceState;
    },
    removeAppInstance(state: State, uuid: string) {
      for (let index = 0; index < state.appInstances.length; index++) {
        const item = state.appInstances[index];
        if (item.uuid === uuid) {
          state.appInstances.splice(index, 1);
          return;
        }
      }
    },
  },
});
