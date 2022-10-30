import create from 'zustand';

export const useSearchStore = create((set) => ({
  search: '',
  clear: () => set({search: ''}),
}));
