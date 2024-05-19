import Searchlogo from './component/common/Header/Header'
import ListItem from './component/common/Card/ItemRefine'
import Refineinput from './component/common/Refine/RefineInput'
import CalculationDetail from './component/common/Calculation/CalculationDetail'
import useFetchData from './hooks/useFetch'
import LoadingCircle from './component/ui/Status/LoadingStatus'
import ErrorApp from './component/ui/Status/ErrorStatus'




function App() {
  const { isLoading, error} = useFetchData()
  
  if(isLoading) return (<LoadingCircle />)
  if(error) return (<ErrorApp status={error}/>)
  return (
    
      <div className="h-full font-poppins bg-black">
        <Searchlogo />
        <ListItem />
        <Refineinput />
        <CalculationDetail />
      </div>
  )
}

export default App

