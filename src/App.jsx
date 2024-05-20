import RefinePage from './pages/Refine/RefinePage'
import useFetchData from './hooks/useFetch'
import LoadingCircle from './component/ui/Status/LoadingStatus'
import ErrorApp from './component/ui/Status/ErrorStatus'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RefineInputPage from './pages/Refine/RefineInputPage'
import RefineCalculationPage from './pages/Refine/RefineCalculationPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RefinePage />
  },
  {
    path: "/input",
    element: <RefineInputPage />
  },
  {
    path: "/result",
    element: <RefineCalculationPage />
  }
])


function App() {
  const { isLoading, error} = useFetchData()
  
  if(isLoading) return (<LoadingCircle />)
  if(error) return (<ErrorApp status={error}/>)
  return (
      <>
      <RouterProvider router={router} />
      </>
  )
}

export default App

