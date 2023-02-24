import * as turf from '@turf/turf'
import ghostPng from '@assets/ghost.png'
import playerImgPath from '@assets/animations.gif'
export default function start() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let cellSize = 20;

  let pacmanMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let rows = pacmanMap.length;
  let cols = pacmanMap[0].length;
  const playerImg = new Image();
  playerImg.src = playerImgPath
  canvas.width = cols * cellSize;
  canvas.height = rows * cellSize;
  console.log(canvas.width, canvas.height);
  let currentDirection = null;
  let nextDirection = null;
  let foods = [];
  function renderMap(flag = false) {
    let rows = pacmanMap.length;
    let cols = pacmanMap[0].length;
    ctx.save();
    ctx.fillStyle = 'blue';
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        let type = pacmanMap[x][y];
        if (!flag && type === 2) {
          foods.push(new Food(y, x));
        }
        if (type === 1) {
          //绘制墙
          ctx.fillRect(y * cellSize, x * cellSize, cellSize, cellSize);
        }
      }
    }
    ctx.restore();
  }
  class Food {
    constructor(x, y, size = 4) {
      this.x = x * cellSize + (cellSize - size) / 2;
      this.y = y * cellSize + (cellSize - size) / 2;
      this.size = size;
      this.color = 'red';
      this.state = 1;
      this.rect = turf.bboxPolygon([this.x, this.y, this.x + this.size, this.y + this.size]);
    }

    clear() {
      if (this.state === 1) {
        score++;
      }
      this.state = 0;
    }

    draw() {
      if (this.state) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
      }
    }
  }

  function renderFood() {
    foods.forEach((food) => {
      food.draw();
    });
  }

  class Ghost {
    constructor(x, y) {
      this.padding = 2;
      this.drawSize = cellSize - this.padding * 2;
      this.x = cellSize * x;
      this.y = cellSize * y;
      this.runSpeed = 1;
      this.lastT = 0;
      this.direction = null;
      this.currentFrameIndex = 0;
      this.frames = [cellSize * 0];
      this.nextA = null;
      ctx.drawImage(ghostImg, 0, 0, 118, 118, this.x + this.padding, this.y + this.padding, this.drawSize, this.drawSize);
    }

    update(t) {
      if (t - this.lastT >= 100) {
        this.currentFrameIndex += 1;
        if (this.currentFrameIndex === this.frames.length) {
          this.currentFrameIndex = 0;
        }
        this.lastT = t;
      }
      if (this.nextA) {
        if (this.x % cellSize === 0 && this.y % cellSize === 0) {
          let x = this.x / cellSize;
          let y = this.y / cellSize;
          if (this.nextA.x > x) {
            this.direction = 'ArrowRight';
          } else if (this.nextA.x < x) {
            this.direction = 'ArrowLeft';
          } else if (this.nextA.y > y) {
            this.direction = 'ArrowDown';
          } else if (this.nextA.y < y) {
            this.direction = 'ArrowUp';
          }
        }
      } else {
        window.gameState = 'stop';
        this.direction = null;
      }
      if (this.direction) {
        switch (this.direction) {
          case 'ArrowRight':
            this.x += this.runSpeed;
            break;
          case 'ArrowLeft':
            this.x -= this.runSpeed;
            break;
          case 'ArrowDown':
            this.y += this.runSpeed;
            break;
          case 'ArrowUp':
            this.y -= this.runSpeed;
            break;
        }
      }
      this.rect = turf.bboxPolygon([this.x, this.y, this.x + cellSize, this.y + cellSize]);
    }

    draw() {
      ctx.drawImage(ghostImg, this.frames[this.currentFrameIndex], 0, 118, 118, this.x, this.y, cellSize, cellSize);
    }

    findPath(startX, startY) {
      this.endPoint = `${startX}-${startY}`;
      let targetX = Math.ceil(this.x / cellSize);
      let targetY = Math.ceil(this.y / cellSize);

      let openList = [];
      let closeList = [];
      let start = new A(startX, startY, null, 1, getHn(startX, startY, targetX, targetY));
      openList.push(start);
      let pointMap = {};
      let cur = null;
      while (openList.length) {
        cur = openList.pop();
        pointMap[`${cur.x}-${cur.y}`] = true;
        if (cur.x === targetX && cur.y === targetY) {
          break;
        }
        closeList.push(cur);
        let neighbors = getNeighborsByPoint(cur.x, cur.y, targetX, targetY, cur, pointMap);
        if (neighbors && neighbors.length) {
          openList.push(...neighbors);
          openList.sort((a, b) => {
            return b.fn - a.fn;
          });
        }
      }
      window.cur = cur;
      this.nextA = cur.parent;
    }
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function getHn(startX, startY, endX, endY) {
    // 获取当前节点到目标节点的预估距离，使用曼哈顿距离
    return Math.abs(startX - endX) + Math.abs(startY - endY);
  }

  function getNeighborsByPoint(x, y, endX, endY, parent = null, pointMap) {
    let neighbors = [];
    if (!pointMap[`${x - 1}-${y}`] && x - 1 >= 0 && pacmanMap[y][x - 1] === 2) {
      //左边的节点
      neighbors.push(new A(x - 1, y, parent, parent.gn + 1, getHn(x - 1, y, endX, endY)));
    }

    if (!pointMap[`${x + 1}-${y}`] && x + 1 < cols && pacmanMap[y][x + 1] === 2) {
      //右边的节点
      neighbors.push(new A(x + 1, y, parent, parent.gn + 1, getHn(x + 1, y, endX, endY)));
    }

    if (!pointMap[`${x}-${y - 1}`] && y - 1 >= 0 && pacmanMap[y - 1][x] === 2) {
      //上边的节点
      neighbors.push(new A(x, y - 1, parent, parent.gn + 1, getHn(x, y - 1, endX, endY)));
    }
    if (!pointMap[`${x}-${y + 1}`] && y + 1 < rows && pacmanMap[y + 1][x] === 2) {
      //上边的节点
      neighbors.push(new A(x, y + 1, parent, parent.gn + 1, getHn(x - 1, y, endX, endY)));
    }
    neighbors.sort((a, b) => {
      return b.fn - a.fn;
    });
    return neighbors;
  }

  function A(x, y, parent = null, gn, hn) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.gn = gn;
    this.hn = hn;
    this.fn = gn + hn;
  }

  class Player {
    constructor(x = 1, y = 1) {
      this.padding = 2;
      this.drawSize = cellSize - this.padding * 2;
      this.x = cellSize * x;
      this.y = cellSize * y;
      this.runSpeed = 2;
      this.lastT = 0;
      this.currentFrameIndex = 1;
      this.frames = [cellSize * 0, cellSize * 1, cellSize * 2, cellSize * 3, cellSize * 4, cellSize * 5, cellSize * 6];
      playerImg.addEventListener('load', (e) => {
        ctx.drawImage(
          playerImg,
          this.frames[0],
          this.frames[0],
          cellSize,
          cellSize,
          this.x + this.padding,
          this.y + this.padding,
          this.drawSize,
          this.drawSize
        );
      });
    }

    update(t, flag) {
      if (flag && t - this.lastT >= 100) {
        this.currentFrameIndex += 1;
        if (this.currentFrameIndex === this.frames.length) {
          this.currentFrameIndex = 0;
        }
        this.lastT = t;
      }
      if (flag) {
        switch (currentDirection) {
          case 'ArrowRight':
            this.x += this.runSpeed;
            break;
          case 'ArrowLeft':
            this.x -= this.runSpeed;
            break;
          case 'ArrowDown':
            this.y += this.runSpeed;
            break;
          case 'ArrowUp':
            this.y -= this.runSpeed;
            break;
          default:
            break;
        }
      }
      this.rect = turf.bboxPolygon([this.x, this.y, this.x + cellSize, this.y + cellSize]);
    }

    draw() {
      let angle = 0;
      switch (currentDirection) {
        case 'ArrowLeft':
          angle = 180;
          break;
        case 'ArrowDown':
          angle = 90;
          break;
        case 'ArrowUp':
          angle = -90;
          break;
      }
      ctx.save();
      ctx.translate(this.x + cellSize / 2, this.y + cellSize / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(
        playerImg,
        this.frames[this.currentFrameIndex],
        0,
        cellSize,
        cellSize,
        -cellSize / 2,
        -cellSize / 2,
        cellSize,
        cellSize
      );
      ctx.rotate((-90 * Math.PI) / 180);
      ctx.translate(-this.x - cellSize / 2, -this.y - cellSize / 2);
      ctx.restore();
    }
  }
  let walls = [];
  for (let i = 0; i < pacmanMap.length; i++) {
    const item = pacmanMap[i];
    for (let j = 0; j < item.length; j++) {
      if (pacmanMap[i][j] === 1) {
        walls.push({
          x: i,
          y: j,
        });
      }
    }
  }

  let player = new Player(2, 6);
  let ghost = null;
  let ghosts = [];
  let ghostImg = new Image(); // Create new img element
  ghostImg.addEventListener(
    'load',
    () => {
      ghost = new Ghost(1, 1);
    },
    false
  );
  ghostImg.src = ghostPng; // Set source path
  renderMap();
  function loop(t) {
    if (window.gameState === 'stop') {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderMap(true);
    renderFood();
    player.update(t, checkMove(player.x, player.y, currentDirection, player.runSpeed));
    player.draw();
    if (ghosts && ghosts.length) {
      let endX = Math.ceil(player.x / cellSize);
      let endY = Math.ceil(player.y / cellSize);
      ghosts.forEach((ghost) => {
        ghost.findPath(endX, endY);
        ghost.update(t);
        ghost.draw();
      });
    }
    eatFood();
    if (nextDirection && checkMove(player.x, player.y, nextDirection, player.runSpeed)) {
      currentDirection = nextDirection;
      nextDirection = null;
    }
    if (score === foods.length) {
      window.gameState = 'stop';
      alert('YOU WIN!!!');
    }
    window.requestAnimationFrame(loop);
  }
  // window.requestAnimationFrame(loop)

  document.addEventListener('keydown', (event) => {
    if (!currentDirection) {
      currentDirection = event.key;
    } else if (currentDirection != nextDirection) {
      nextDirection = event.key;
    } else {
      nextDirection = null;
    }
  });
  let score = 0;
  function eatFood() {
    foods.forEach((food) => {
      if (turf.booleanIntersects(player.rect, food.rect)) {
        food.clear();
      }
    });
  }

  function startGame() {
    window.gameState = 'running';
    ghosts = [];
    score = 0;
    player = new Player(2, 6);
    ghosts.push(new Ghost(1, 1));
    ghosts.push(new Ghost(1, 19));

    window.requestAnimationFrame(loop);
  }

  function checkMove(x, y, direction, runSpeed) {
    switch (direction) {
      case 'ArrowRight':
        x += cellSize + runSpeed;
        break;
      case 'ArrowLeft':
        x -= runSpeed;
        break;
      case 'ArrowDown':
        y += cellSize + runSpeed;
        break;
      case 'ArrowUp':
        y -= runSpeed;
        break;
      default:
        break;
    }

    if (x % cellSize > 0 && y % cellSize > 0) {
      return false;
    }

    if (x % cellSize > 0) {
      if (pacmanMap[y / cellSize][parseInt(x / cellSize)] === 1) {
        return false;
      }
    }
    if (y % cellSize > 0) {
      if (pacmanMap[parseInt(y / cellSize)][x / cellSize] === 1) {
        return false;
      }
    }
    return true;
  }

  return startGame
}
