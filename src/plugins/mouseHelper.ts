enum ClickState {
  IS_DOWN,
  IS_UP,
  UNKNOW,
}

enum MoveDirection {
  X_LEFT,
  X_RIGHT,
  Y_UP,
  Y_DOWN,
  UNKNOW,
}

interface MouseState {
  clickedPoint: {
    x: number;
    y: number;
  };
  clickState: ClickState;
  moveDirection: {
    x: MoveDirection;
    y: MoveDirection;
  };
  moveDistance: {
    x: number;
    y: number;
  };
}
const mouseState: MouseState = {
  clickedPoint: {
    x: 0,
    y: 0,
  },
  clickState: ClickState.IS_UP,
  moveDirection: {
    x: MoveDirection.UNKNOW,
    y: MoveDirection.UNKNOW,
  },
  moveDistance: {
    x: 0,
    y: 0,
  },
};

function mousedownCallback(event: any) {
  mouseState.clickedPoint.x = event.pageX;
  mouseState.clickedPoint.y = event.pageY;
  mouseState.clickState = ClickState.IS_DOWN;
  mouseState.moveDistance.x = 0;
  mouseState.moveDistance.y = 0;
}

function mouseupCallback() {
  mouseState.clickedPoint.x = 0;
  mouseState.clickedPoint.y = 0;
  mouseState.clickState = ClickState.IS_UP;
  mouseState.moveDistance.x = 0;
  mouseState.moveDistance.y = 0;
}

function mousemoveCallback(event: any) {
  if (mouseState.clickState === ClickState.IS_UP) {
    return;
  }
  let m_x = event.pageX;
  let m_y = event.pageY;
  let { x, y } = mouseState.clickedPoint;

  if (m_x - x > 0) {
    mouseState.moveDirection.x = MoveDirection.X_LEFT;
  } else {
    mouseState.moveDirection.x = MoveDirection.X_RIGHT;
  }

  if (m_y - y > 0) {
    mouseState.moveDirection.y = MoveDirection.Y_DOWN;
  } else {
    mouseState.moveDirection.y = MoveDirection.Y_UP;
  }

  mouseState.moveDistance.x = Math.abs(m_x - x);
  mouseState.moveDistance.y = Math.abs(m_y - y);
  callbacks.forEach((callBack) => {
    const mouseEvent: MouseEvent = {
      name: MouseEventName.CLICKED_MOVE,
      mouseState: mouseState,
    };
    callBack(mouseEvent);
  });
}
enum MouseEventName {
  CLICKED_MOVE,
}
interface MouseEvent {
  name: MouseEventName;
  mouseState: MouseState;
}
const callbacks: Function[] = [];
function registerEvent(callBack: Function) {
  callbacks.push(callBack);
}

window.addEventListener('mousedown', mousedownCallback);
window.addEventListener('mouseup', mouseupCallback);
window.addEventListener('mousemove', mousemoveCallback);

// window.removeEventListener('mousedown', mousedownCallback);
// window.removeEventListener('mouseup', mouseupCallback);
// window.removeEventListener('mousemove', mousemoveCallback);

export { ClickState, MoveDirection, registerEvent };

export type { MouseState, MouseEvent };
