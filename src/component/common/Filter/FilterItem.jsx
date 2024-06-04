export default function FilterItem({checkedFn, onChangeFn, inputValue, inputId, inputName}) {
    return(
        <div className="w-full">
        <input
          type="radio"
          id={inputId}
          name={inputName}
          value={inputValue}
          className={`peer appearance-none`}
          onChange={onChangeFn}
          checked={checkedFn}
        />
        <label
          htmlFor={inputId}
          className={`filterItem`}
        >
          {inputValue}
        </label>
        </div>
    )
}