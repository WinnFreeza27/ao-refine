import { storeSelectedItem } from "../store/storeSelectedItem"

export const useSelectedItem = () => {
    const selected = storeSelectedItem((state) => state.selected)
    const selectedData = storeSelectedItem((state) => state.selectedData)
    const updateSelected = storeSelectedItem((state) => state.updateSelected)
    const removeSelected = storeSelectedItem((state) => state.removeSelected)
    const updateSelectedData = storeSelectedItem((state) => state.updateSelectedData)
    const removeSelectedData = storeSelectedItem((state) => state.removeSelectedData)

    return {selected, selectedData, updateSelected, removeSelected, updateSelectedData, removeSelectedData}
}