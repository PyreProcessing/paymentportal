import UserType from '@/types/UserType';
import { create } from 'zustand';

interface Layout {
  merchant: UserType;
  setMerchant: (merchant: UserType) => void;
}

export const useMerchantStore = create<Layout>((set) => ({
  merchant: {} as UserType,
  setMerchant: (merchant: UserType) => set({ merchant }),
}));
