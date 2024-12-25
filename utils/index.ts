/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useGlobalChatsStore = create((set) => ({
  globalChats: true,
  toggleGlobalChats: () =>
    set((state: any) => ({ globalChats: !state.globalChats })),
}));

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
