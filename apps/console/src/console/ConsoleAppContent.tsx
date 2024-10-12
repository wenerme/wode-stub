import React from 'react';
import { ConsoleLauncher, ConsoleLoader } from '@wener/console/console';
import { UserAuthExpireOverlay, UserLoader, UserLockOverlay } from '@wener/console/console/user';
import { WindowHost } from '@wener/console/web/window';
import { loadModule } from '@/console/loadModule';
import { ConsoleLayout } from './ConsoleLayout';

export const ConsoleAppContent = () => {
  return (
    <UserLoader>
      <ConsoleLoader
        loadModule={loadModule}
        modules={[
          //
          'site.core',
          'user.core',
        ]}
        render={(content) => {
          return <ConsoleLayout>{content}</ConsoleLayout>;
        }}
      >
        <UserAuthExpireOverlay />
        <UserLockOverlay />
        <WindowHost />
        <ConsoleLauncher />
      </ConsoleLoader>
    </UserLoader>
  );
};

export default ConsoleAppContent;
