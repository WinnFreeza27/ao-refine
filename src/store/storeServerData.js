import {create} from "zustand";

export const storeServerData = create((set) => ({
    serverData: {"AutoPrice": "OFF", "Server": "EAST"},
    updateServerData : (newData) => set((prev) => ({serverData: {...prev.serverData, ...newData}}))
}))