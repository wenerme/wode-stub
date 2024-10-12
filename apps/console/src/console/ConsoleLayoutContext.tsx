import type { ComponentPropsWithoutRef, ReactElement } from 'react';

export interface ConsoleLayoutContext {
  console?: {
    icon?: ReactElement;
    menu?: {
      top?: DashMenu[];
      center?: DashMenu[];
      bottom?: DashMenu[];
    };
  };
}

export type DashMenuItem = Pick<ComponentPropsWithoutRef<'a'>, 'onClick'> & {
  title: string;
  href?: string;
  icon: ReactElement;
  iconActive?: ReactElement;
};

export type DashMenu =
  | {
      type: 'group';
      name?: string;
      title?: string;
      items: DashMenuItem[];
    }
  | DashMenuItem;

interface DefineConsoleMenuOptions {
  position?: 'top' | 'center' | 'bottom';
  items: DashMenu[];
}
