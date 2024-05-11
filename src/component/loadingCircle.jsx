export default function LoadingCircle() {
    
 return (
    <div className='absolute inset-0 top-0 flex justify-center items-center bg-transparent h-screen'>
    <span className='text-white mr-2'>Loading</span>
     <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
   <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s] mx-1'></div>
   <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
</div>
 )
}

