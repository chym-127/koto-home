import { AppInstanceState } from '../apps';
import { useStore } from 'vuex';
import { key } from '../store';
export default function (uuid: string) {
  const store = useStore(key);

  function changeAppInstanceState(state: AppInstanceState) {
    store.commit('changeAppInstanceState', {
      instanceState: state,
      uuid: uuid,
    });
  }
  function removeAppInstance() {
    store.commit('removeAppInstance', uuid);
  }

  return { changeAppInstanceState, removeAppInstance };
}
