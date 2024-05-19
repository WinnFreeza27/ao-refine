import propTypes from "prop-types";

function Form({ placeholder, inputType, id, styleClass, noDefaultClass, onChange, value, register, disabled }) {
    if(onChange == undefined) {
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
    return (
        <>
            <input
                type={inputType}
                id={id}
                name={id}
                className={`outline-none ${noDefaultClass ? "" : "input-form"} ${styleClass}`}
                placeholder={placeholder}
                onChange={onChange}
                value={value !== undefined ? value : ""}
                {...register}
            />
        </>
    );
}

Form.propTypes = {
    placeholder: propTypes.string,
    inputType: propTypes.string,
    id: propTypes.string,
    styleClass: propTypes.string,
    noDefaultClass: propTypes.bool,
    onChange: propTypes.func,
    value: propTypes.string,
    register: propTypes.object,
    disabled: propTypes.bool
}

export default Form