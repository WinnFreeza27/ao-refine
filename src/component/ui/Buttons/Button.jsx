export default function ButtonXn({type, text, customStyle, onClick}) {
    return (
            <button 
            type={type} 
            className={`bg-[#EDEDED] text-xl transition-all text-bg-transparent hover:bg-[#CCCCCC] px-6 py-4 rounded-lg ${customStyle}`} 
            onClick={onClick}
            >{text}</button>
    )
}