import propTypes from "prop-types"

function VariationSelector({recipeSelected, handleRecipe, text, id, selectedId}) {
    const selected = `recipe${recipeSelected}-form`;
    return(
        <>
            <input type="radio" className={`appearance-none`} id={id} name="recipe-radio" onChange={() => handleRecipe(selectedId)} checked={selected == id}/>
                <label htmlFor={id}
                className={`cursor-pointer hover:bg-bd-grey bg-bg-transparent border border-bd-grey w-8 h-8 rounded-lg text-center inline-flex items-center justify-center`}>
                {text}</label>
        </>
    )
}

VariationSelector.propTypes = {
    recipeSelected: propTypes.number,
    handleRecipe: propTypes.func,
    text: propTypes.string,
    id: propTypes.string,
    selectedId: propTypes.number,
}

export default VariationSelector