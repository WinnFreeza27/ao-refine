import supabase from '../api/supabase'
import { useQuery } from 'react-query'
import { useData } from './useData'
import {convertData} from '../utils/convertData'

export default function useFetchData() {
    const {updateData} = useData()
    return useQuery('repoData', () =>
        fetchSupabase() ,{  
          refetchOnWindowFocus: false,
          onSuccess: (item) => {
            const convert = convertData(item)
            updateData(convert)
          },
        }
      )
}

async function fetchSupabase() {
        const {data, error, status} = await supabase()
        .from('crafting-requirements')
        .select(`*, craft-resource(
        *,
        resource-items(
            *
        )
        ),
        resource-items(
        *
        )`)
        
        if(error) {
            throw status;
        }
        const sorted = data.sort((a,b) => {
            return a.ItemsName > b.ItemsName
        })

        return sorted
       
}