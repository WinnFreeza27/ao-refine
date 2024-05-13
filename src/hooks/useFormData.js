import { create } from "zustand";


export const useFormData = create((set) => ({
    forms: null,
    setForm: (useForm) => set(() => ({forms: useForm}))
}))