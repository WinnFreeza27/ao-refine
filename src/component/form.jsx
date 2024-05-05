export default function Form({placeholder,inputType, id, styleClass, noDefaultClass}) {
    return(
        <>
            <input type={inputType} id={id} name={id} className={`outline-none ${noDefaultClass ? "" : "input-form"} ${styleClass}`} placeholder={placeholder}/>
        </>
    )
}