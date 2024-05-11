import ZodForm from "./zodForm"


export default function Forminput({ percentage, text, id, register ,errors, readOnly, readOnlyText, required}) {

    if(readOnly) {
        
        return (
            <div className="inline-flex flex-col gap-1 lg:w-max">
                <span className="inline-flex gap-2 items-center">Total Focus
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5"></circle> <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <circle cx="12" cy="16" r="1" fill="#ffffff"></circle> </g></svg>
                </span>
                <div className="w-full lg:w-44 bg-bg-transparent flex input-form items-center p-1">
                    <div className="h-full py-1 px-2 w-full text-gray-600 overflow-auto">{readOnlyText}</div>
                </div>
            </div>
        )
    }

    return(
        <>
        <label className="inline-flex flex-col gap-1 lg:w-max" htmlFor={id}>
                            <span className="inline-flex gap-2 items-center">{text}
                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5"></circle> <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <circle cx="12" cy="16" r="1" fill="#ffffff"></circle> </g></svg>
                            </span>
        {percentage == true 
                            ?
                            <div className="w-full lg:w-44 bg-bg-transparent flex input-form items-center p-1">
                                <ZodForm 
                                inputType={"text"} 
                                id={id} 
                                styleClass={"bg-bg-transparent remove-arrow py-1 px-2 w-full"} 
                                noDefaultClass={true}
                                register = {register(id , {
                                    required,
                                    pattern: {
                                        value: /^\d*\.?\d*$/,
                                        message: 'Invalid number format',
                                    }})}
                                />
                                <span className="mr-3">%</span>
                            </div>
                        : 
                            <ZodForm 
                            inputType={"text"} id={id} 
                            styleClass={"bg-bg-transparent remove-arrow py-2 px-3 w-full lg:w-44"} 
                            register = {register(id , {
                                    required,
                                    pattern: {
                                        value: /^\d*\.?\d*$/,
                                        message: 'Invalid number format',
                                    }})}/>
        }   
        {errors[id] && <p className="text-[10px] text-rose-500">{errors[id].message}</p>}
        </label> 
        </>
    )
}