import React from 'react';
import { HiAdjustmentsHorizontal, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { PiSquaresFour, PiSquaresFourLight } from 'react-icons/pi';
import { RiFocus2Fill, RiFocus2Line } from 'react-icons/ri';
import { getApplets } from '@wener/console/console';
import { ClockWidget } from '@wener/console/console/applets';
import { addLaunchItems, toggleLauncher } from '@wener/console/console/ConsoleLauncher';
import { type DynamicModule } from '@wener/console/web';
import { getUserAbility } from '@/casl';
import { SiteModules } from '@/console/modules/user.core/SiteModules';
import type { ConsoleLayoutContext, DashMenuItem } from '../../ConsoleLayoutContext';
import { createRoutes } from '../../createRoutes';

export default {
  createRoutes,
  onModuleInit: (ctx) => {
    ctx.as<ConsoleLayoutContext>().add('console.menu.bottom', [
      {
        type: 'group',
        name: 'setting',
        items: [
          {
            title: '设置',
            href: '/setting',
            icon: <HiOutlineAdjustmentsHorizontal className={'h-6 w-6'} />,
            iconActive: <HiAdjustmentsHorizontal className={'h-6 w-6'} />,
          },
        ],
      },
    ]);

    // trigger registry
    console.log('Module Init', {
      widgets: Object.keys({ ClockWidget }),
    });

    const applets = getApplets();
    addLaunchItems(
      applets.map((app) => {
        const options = app.options;
        return {
          key: options.name,
          title: options.title,
          icon: options.window.icon,
          onLaunch: () => {
            app.toggle();
          },
        };
      }),
    );

    const ability = getUserAbility();
    let items: DashMenuItem[] = [
      {
        title: SiteModules.work.title,
        href: SiteModules.work.path,
        icon: <RiFocus2Line className={'h-6 w-6'} />,
        iconActive: <RiFocus2Fill className={'h-6 w-6'} />,
      },
      {
        title: '应用',
        icon: <PiSquaresFourLight className={'h-6 w-6'} />,
        iconActive: <PiSquaresFour className={'h-6 w-6'} />,
        onClick: () => {
          toggleLauncher();
        },
      },
      //
      // {
      //   title: SiteModules.admin.title,
      //   href: SiteModules.admin.path,
      //   icon: SiteModules.admin.icon,
      //   iconActive: SiteModules.admin.iconActive,
      // },
    ];

    items = items.filter((v) => {
      return ability.can('view', 'page', v.href);
    });

    // as ConsoleLayoutContext
    ctx.add('console.menu.center', [
      {
        type: 'group',
        name: 'focus',
        items: items,
      },
    ]);
  },
} satisfies DynamicModule;
