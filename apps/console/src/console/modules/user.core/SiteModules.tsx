import type { RouteObject } from 'react-router-dom';
import { createWorkRoutes } from '@/console/createWorkRoutes';
import { AdminModule } from '@/web/admin/AdminModule';
import { createAdminRoutes } from '@/web/admin/createAdminRoutes';

const WorkModule = defineModule({
  name: 'focus',
  title: '工作台',
  path: '/work',
  createRoutes: createWorkRoutes,
});
export const SiteModules = {
  work: WorkModule,
  // work: {
  //   title: '工作台',
  //   name: 'focus',
  //   path: '/work',
  //   createRoutes: createWorkRoutes,
  // },
  // admin: {
  //   ...AdminModule,
  //   path: '/admin',
  //   createRoutes: () => {
  //     return [
  //       {
  //         path: '/admin',
  //         children: createAdminRoutes(),
  //       },
  //     ];
  //   },
  // },
};

type ModuleDef = {
  name: string;
  title: string;
  path: string;
  createRoutes: () => RouteObject[];
};

type DefineModuleOptions = {
  name: string;
  title: string;
  path?: string;
  createRoutes: () => RouteObject[];
};

function defineModule(opts: DefineModuleOptions) {
  const def: ModuleDef = {
    path: opts.path || `/${opts.name}`,
    ...opts,
  };
  return def;
}
