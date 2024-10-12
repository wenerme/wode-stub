import { createPubSub } from 'graphql-yoga';
import type { GeneralResponseObject } from '@/type-graphql';

const pubSub = createPubSub<{
  TICKER: [GeneralResponseObject];
  USER: [string, IMessage];
}>();

export function getPubSub() {
  return pubSub;
}

export type GraphPubSub = typeof pubSub;

interface IMessage {
  type: string;
  payload?: any;
  metadata?: any;
}
