import { create } from "zustand";
export const storeFormData = create((set) => ({
    formData: {},
    setFormData: (newData) => set((state) => ({formData: {...state.formData, ...newData}})),
    resetFormData: () => set({formData: {}})
}))