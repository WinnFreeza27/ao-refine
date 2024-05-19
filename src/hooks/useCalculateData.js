import { storeCalculateData } from "../store/storeCalculateData"

export const useCalculateData = () => {
    const calculateData = storeCalculateData((state) => state.calculateData)
    const updateCalculateData = storeCalculateData((state) => state.updateCalculateData)
    const removeCalculateData = storeCalculateData((state) => state.removeCalculateData)

    return {calculateData, updateCalculateData, removeCalculateData}
}