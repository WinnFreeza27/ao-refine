import ZodForm from "./zodForm"

export default function Imageform({url,text,additionalText,highlightedText, register, id, errors}) {
    return (
        <div className="flex">
                        <img className="w-28 h-28" src={url}/>
                                <label className="flex flex-col justify-end gap-1" htmlFor={id}>
                                <span className="text-xs">{additionalText}<span className="text-cyanide">{highlightedText}</span></span>
                                <span>{text}</span>
                                <ZodForm 
                                inputType={"number"} 
                                id = {id}
                                noDefaultClass={false} 
                                styleClass={"w-44 remove-arrow px-3 py-2 mb-4"} 
                                register = {register(id , {
                                    required: 'Please fill out this field',
                                    pattern: {
                                        value: /^\d*\.?\d*$/,
                                        message: 'Invalid number format',
                                    }})}
                                />
                                {errors[id] && <p className="-mt-4 text-xs text-rose-500">{errors[id].message}</p>}
                                </label>
                        </div>
    )
}