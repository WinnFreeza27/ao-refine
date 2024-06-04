import { storeServerData } from "../store/storeServerData"

export const useServerData = () => {
    const serverData = storeServerData((state) => state.serverData)
    const updateServerData = storeServerData((state) => state.updateServerData)

    return {serverData, updateServerData}
}