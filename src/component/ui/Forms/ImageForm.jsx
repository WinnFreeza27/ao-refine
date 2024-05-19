import ImageLazy from "../Image/ImageLazy.jsx"
import Form from "./Form.jsx"
import propTypes from "prop-types"

function ImageForm({url,text,additionalText,highlightedText, register, id, errors}) {
    const images = [
        {
            src: url,
            alt: "",
        }
    ]
            
    return (
        <div className="flex">
                        {/* <img className="w-28 h-28" src={url}/> */}
                        <ImageLazy images={images} style={{img: "w-28 h-28"}} imageOnly={true}/>
                                <label className="flex flex-col justify-end gap-1" htmlFor={id}>
                                <span className="text-xs">{additionalText}<span className="text-cyanide">{highlightedText}</span></span>
                                <span>{text}</span>
                                <Form 
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

ImageForm.propTypes = {
    url: propTypes.string,
    text: propTypes.string,
    additionalText: propTypes.string,
    highlightedText: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]),
    register: propTypes.func,
    id: propTypes.string,
    errors: propTypes.object
}

export default ImageForm