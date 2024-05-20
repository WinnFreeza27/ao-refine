import { storeFormData } from "../store/storeFormData"

export const useFormData = () => {
    const formData = storeFormData((state) => state.formData)
    const setFormData = storeFormData((state) => state.setFormData)
    const resetFormData = storeFormData((state) => state.resetFormData)
    return {formData, setFormData, resetFormData}
}