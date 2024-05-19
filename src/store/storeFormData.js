import { create } from "zustand";
export const storeFormData = create((set) => ({
    forms: null,
    setForms: (useForm) => set(() => ({forms: useForm}))
}))