import { storeFormData } from "../store/storeFormData"

export const useFormData = () => {
    const forms = storeFormData((state) => state.forms)
    const setForms = storeFormData((state) => state.setForms)

    return {forms, setForms}
}