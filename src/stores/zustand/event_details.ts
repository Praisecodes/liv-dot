import { create } from "zustand";

interface IUseEventDetailsState {
  details: IEvent | null;
  setDetails: (details: IEvent) => void;
  clearDetails: () => void;
}

const useEventDetails = create<IUseEventDetailsState>()(set => ({
  details: null,
  setDetails: (details) => set({ details }),
  clearDetails: () => set({ details: null }),
}));

export default useEventDetails;
