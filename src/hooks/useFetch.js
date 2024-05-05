import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tssmmdquadbhkfqywkld.supabase.co'
const supabaseKey = `${__SUPABASEKEY__}`
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function fetchData() {
    try{
        const {data, error} = await supabase
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
            throw new Error(error)
        }
        const sorted = data.sort((a,b) => {
            return a.ItemsName > b.ItemsName
        })
        return sorted
       
    } catch(err) {
        console.error(err)
    }
}