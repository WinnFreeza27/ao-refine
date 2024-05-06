import { useState } from 'react'
import Searchlogo from './component/searchLogo'
import ListItem from './component/itemList'
import { useQuery } from 'react-query'
import fetchData from './hooks/useFetch'
import { useData } from './hooks/useData'
import convertData from './utils/convertData'


function App() {

  const updateData = useData((state) => state.updateData)
  const { isLoading, error, data:item } = useQuery('repoData', () =>
    fetchData() ,{  
      refetchOnWindowFocus: false,
      onSuccess: (item) => {
        console.log(item)
        const convert = convertData(item)
        updateData(convert)
      }
    }
  )
  
  if(isLoading) return (<div>Loading...</div>)
  if(error) return (<div>Something error</div>)

  return (
    
      <div className="h-full font-poppins bg-black">
        <Searchlogo />
        <ListItem />
      </div>
  )
}

export default App

