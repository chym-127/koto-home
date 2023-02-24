import { registerEvent, MoveDirection, ClickState } from '../../plugins/mouseHelper';
import type { MouseEvent } from '../../plugins/mouseHelper';
import { Ref, watch } from 'vue';
export default function (x: Ref<number>, y: Ref<number>, isDrag: Ref<boolean>) {
  let o_x = x.value;
  let o_y = y.value;
  function move(event: MouseEvent) {
    if (isDrag.value) {
      if (event.mouseState.moveDirection!.x === MoveDirection.X_LEFT) {
        x.value = o_x + event.mouseState.moveDistance!.x;
      }

      if (event.mouseState.moveDirection!.x === MoveDirection.X_RIGHT) {
        x.value = o_x - event.mouseState.moveDistance!.x;
      }

      if (event.mouseState.moveDirection!.y === MoveDirection.Y_UP) {
        y.value = o_y - event.mouseState.moveDistance!.y;
      }

      if (event.mouseState.moveDirection!.y === MoveDirection.Y_DOWN) {
        y.value = o_y + event.mouseState.moveDistance!.y;
      }
    }
  }
  watch(isDrag, () => {
    if (!isDrag.value) {
      o_x = x.value;
      o_y = y.value;
    }
  });
  registerEvent(move);
}
