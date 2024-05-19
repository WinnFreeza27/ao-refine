import ImageLazy from "../Image/ImageLazy.jsx"
import FormRefine from "./FormRefine.jsx"
import propTypes from "prop-types"

function ImageForm({imageUrl, formData, register, errors}) {
    const {additionalText, tooltip, text, highlightedText} = formData || {}

    const images = [
        {
            src: imageUrl,
            alt: "",
        }
    ]
            
    return (
        <div className="flex w-max">
            {formData !== undefined ? (
                <>
                <ImageLazy images={images} style={{img: "w-28 h-28"}} imageOnly={true}/>
                <FormRefine
                register={register}
                text={text}
                id={formData.id}
                errors = {errors}
                required={formData.required}
                tooltipText={tooltip}
                additionalText={additionalText}
                highlightedText={highlightedText}
                formClass={"remove-arrow py-2 px-3 w-36"}
                />
                {errors[formData.id] && <p className="-mt-4 text-xs text-rose-500">{errors[formData.id].message}</p>}
                </>
            ) : null}         
       </div>
    )
}

ImageForm.propTypes = {
    imageUrl: propTypes.string,
    register: propTypes.func,
    errors: propTypes.object,
    formData: propTypes.object
}

export default ImageForm

{/* <label className="flex flex-col justify-end gap-1" htmlFor={id}>
                                    <span className="text-xs">{additionalText}<span className="text-cyanide">{highlightedText}</span></span>
                                    <span>{item.text}</span> */}