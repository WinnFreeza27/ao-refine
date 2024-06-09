import RefinePage from './pages/Refine/RefinePage'
import useFetchData from './hooks/useFetch'
import LoadingCircle from './component/ui/Status/LoadingStatus'
import ErrorApp from './component/ui/Status/ErrorStatus'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RefineInputPage from './pages/Refine/RefineInputPage'
import RefineCalculationPage from './pages/Refine/RefineCalculationPage'
import FilterSetting from './component/common/NavSetting/FilterSetting'
import HomePage from './pages/Main/HomePage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/refine",
    element: <RefinePage />
  },
  {
    path: "/refine/input",
    element: <RefineInputPage />
  },
  {
    path: "/refine/result",
    element: <RefineCalculationPage />
  }
])


function App() {
  const { isLoading, error} = useFetchData()
  
  if(isLoading) return (<LoadingCircle />)
  if(error) return (<ErrorApp status={error}/>)
  return (
      <>
      <FilterSetting />
      <RouterProvider router={router} />
      </>
  )
}

export default App

