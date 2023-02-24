import { v4 as uuidv4 } from 'uuid';
import Pacman from './pacman/index.vue';
import pacmanIco from '@assets/app-icons/pac-man.ico';

enum AppState {
  RUNNNING,
  STOP,
}

interface App {
  name: string;
  uuid: string;
  state: AppState;
  icon: string;
  componentName: string;
  // 窗口配置
  windowOptions: {
    width: number;
    height: number;
  };
  options: {
    maxInstanceCount: number;
  };
  instances: AppInstance[];
  component: any;
}

enum AppInstanceState {
  MINUS,
  CLOSE,
  NORMAL,
}

interface AppInstance {
  uuid: string;
  appUuid: string;
  componentName: string;
  icon: string,
  state: AppInstanceState;
  zIndex: number;
}

const pacman: App = {
  name: '吃豆人',
  uuid: uuidv4(),
  state: AppState.STOP,
  componentName: 'Pacman',
  icon: pacmanIco,
  windowOptions: {
    width: 420,
    height: 460,
  },
  options: {
    maxInstanceCount: 1,
  },
  instances: [],
  component: Pacman,
};

const apps: App[] = [pacman];
const appInstances: AppInstance[] = [];
function getApps(): App[] {
  return apps;
}

function getAppInstances(): AppInstance[] {
  return appInstances;
}

function findAppInstanceByUuid(uuid: string): AppInstance | null {
  const instance = appInstances.find((instance) => {
    return (instance.uuid = uuid);
  });
  return instance ? instance : null;
}

function createAppInstance(app: App): AppInstance {
  const appInstance: AppInstance = {
    uuid: uuidv4(),
    icon: app.icon,
    appUuid: app.uuid,
    componentName: app.componentName,
    state: AppInstanceState.NORMAL,
    zIndex: 0,
  };
  //   appInstances.push(appInstance);
  return appInstance;
}

const installAppPlugin = {
  install(vueApp: any, options: any) {
    apps.forEach((app) => {
      vueApp.component(app.componentName, app.component);
    });
  },
};

export {
  installAppPlugin,
  getApps,
  getAppInstances,
  createAppInstance,
  findAppInstanceByUuid,
  AppInstanceState,
  AppState,
};

export type { App, AppInstance };
