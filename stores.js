import create from 'zustand';

export const useSearchStore = create(() => ({
  search: '',
  nutriFilter: true,
  ecoFilter: true,
}));
