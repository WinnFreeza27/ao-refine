export default function Form({placeholder,inputType, id, styleClass, noDefaultClass, onChange, value}) {
    return(
        <>
            <input type={inputType} 
            id={id} 
            name={id} 
            className={`outline-none ${noDefaultClass ? "" : "input-form"} ${styleClass}`} 
            placeholder={placeholder} 
            onChange={onChange} 
            value={value || ""}/>
        </>
    )
}