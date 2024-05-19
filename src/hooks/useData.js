import { storeData } from "../store/storeData"

export const useData = () => {
    const data = storeData((state) => state.data)
    const updateData = storeData((state) => state.updateData)

    return {data, updateData}
}