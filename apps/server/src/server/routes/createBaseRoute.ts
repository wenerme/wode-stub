import { HttpBindings } from '@hono/node-server';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { firstOfMaybeArray } from '@wener/utils';
import { z } from 'zod';

export function createBaseRoute() {
  const app = new OpenAPIHono<{ Bindings: HttpBindings }>();

  app.openapi(
    createRoute({
      description: 'Ping',
      method: 'get',
      path: '/ping',
      responses: {
        200: {
          content: {
            'application/json': {
              schema: z.object({
                success: z.boolean(),
                now: z.string(),
              }),
            },
          },
          description: 'Ping',
        },
      },
    }),
    (c) => {
      return c.json({
        success: true,
        now: new Date(),
      });
    },
  );

  app.openapi(
    createRoute({
      description: 'Get IP',
      method: 'get',
      path: '/ip',
      responses: {
        200: {
          content: {
            'text/plain': {
              schema: z.string(),
            },
          },
          description: 'Get IP',
        },
      },
    }),
    (c) => {
      let hdr = c.req.header();
      const ip = hdr['x-forwarded-for'] || hdr['cf-connecting-ip'] || c.env.incoming.socket?.remoteAddress;
      return c.text(firstOfMaybeArray(ip)?.split(',')?.[0].trim() ?? '');
    },
  );

  return app;
}
