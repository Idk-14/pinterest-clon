import { create } from 'zustand'

export const useBookStore = create((set) => ({
  value: 'husky',
  updateValue: (newValue) => set({ value: newValue}),
}))