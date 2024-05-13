export default function Recipeinput({recipeSelected, handleRecipe,text,id}) {
    const selectedId = `recipe${recipeSelected}-form`
    return(
        
        <>
            <input type="radio" className={`appearance-none`} id={id} name="recipe-radio" onChange={() => handleRecipe(text)} checked={selectedId == id}/>
                <label htmlFor={id}
                className={`cursor-pointer hover:bg-bd-grey bg-bg-transparent border border-bd-grey w-8 h-8 rounded-lg text-center inline-flex items-center justify-center`}>
                {text + 1}</label>
        </>
    )
}
