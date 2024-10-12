import { computeIfAbsent, type MaybePromise } from '@wener/utils';
import { startCase } from 'es-toolkit';

type DefineInitOptions = {
  name: string;
  title?: string;
  onInit?: () => any;
  metadata?: Record<string, any>;
};
type InitDef = {
  name: string;
  title: string;
  onInit?: () => any;
  metadata: Record<string, any>;
};
let _all: InitDef[] = [];

export function defineInit(o: DefineInitOptions) {
  const def = {
    title: startCase(o.name),
    metadata: {},
    ...o,
  };
  let idx = _all.findIndex((v) => v.name === def.name);
  if (idx >= 0) {
    console.warn(`skip redefined init: ${def.name}`);
  } else {
    _all.push(def);
  }

  return def;
}

let result = new Map<any, MaybePromise<InitResult>>();

type InitResult = {
  name: string;
  success: boolean;
  error?: any;
};

export async function runInit(): Promise<InitResult[]> {
  return Promise.all(
    _all.map((init) => {
      // parallel
      return computeIfAbsent(result, init, async () => {
        let out: InitResult = {
          name: init.name,
          success: true,
        };
        try {
          await init.onInit?.();
        } catch (e) {
          console.error(`Failed to init ${init.name}`, e);
          out.success = false;
          out.error = e;
        }
        result.set(init, out);
        return out;
      });
    }),
  );
}
