export default function LoadingStatus() {
    
 return (
    <div className='absolute inset-0 bottom-0 left-0 z-[200] flex justify-center items-start md:items-center bg-black h-[100vh] md:h-full overflow-hidden'>
      <div className="flex items-center mt-80 md:mt-0">
         <span className='text-white mr-2'>Loading</span>
         <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
         <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s] mx-1'></div>
         <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
      </div>
   </div>
 )
}

