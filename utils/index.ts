import { create } from "zustand";

export const useAccountStore = create((set) => ({
  userId: "",
  setUserId: (userId: string) => set({ userId }),
}));

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
