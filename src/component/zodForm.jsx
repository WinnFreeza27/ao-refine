export default function ZodForm({ placeholder, inputType, id, styleClass, noDefaultClass, register ,disabled}) {
    return (
        <>
            <input 
                type={inputType}
                id={id}
                name={id}
                className={`outline-none ${noDefaultClass ? "" : "input-form"} ${styleClass}`}
                placeholder={placeholder}
                disabled={disabled}
                {...register}
            />
        </>
    )
}