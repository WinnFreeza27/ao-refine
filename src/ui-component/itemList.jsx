import { useSelectedItem } from "../hooks/useSelectedItem"
import { useState } from "react"
import Refineinput from "./refineInput"
export default function ListItem() {
    const selected = useSelectedItem((state) => state.selected)
    console.log(selected)
    const update = useSelectedItem((state) => state.updateSelected)
    const handleClick = (id) => {
        update(id)
    }
    return (
    <>
    {selected !== null ? <Refineinput /> : null}
        <div className="grid grid-cols-3 gap-3 items-center justify-start mt-5 p-3 min-[430px]:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:flex lg:flex-wrap lg:px-3">
            <div className="item-card">
                <img className="w-full h-full" src="https://render.albiononline.com/v1/item/T2_METALBAR.png" id="T2_METALBAR" onClick={(el) => handleClick(el.target.id)} />
            </div>
            <div className="item-card">
                <img src="https://render.albiononline.com/v1/item/T3_METALBAR.png" id="T3_METALBAR" onClick={(el) => handleClick(el.target.id)}/>
            </div>
            <div className="item-card">
                <img src="https://render.albiononline.com/v1/item/T4_METALBAR.png" id="T4_METALBAR" onClick={(el) => handleClick(el.target.id)}/>
            </div>
            <div className="item-card">
                <img src="https://render.albiononline.com/v1/item/T5_METALBAR.png" id="T5_METALBAR" onClick={(el) => handleClick(el.target.id)}/>
            </div>
            <div className="item-card">
                <img src="https://render.albiononline.com/v1/item/T6_METALBAR.png" id="T6_METALBAR" onClick={(el) => handleClick(el.target.id)}/>
            </div>
            <div className="item-card">
                <img src="https://render.albiononline.com/v1/item/T7_METALBAR.png" id="T7_METALBAR" onClick={(el) => handleClick(el.target.id)}/>
            </div>
            <div className="item-card">
                <img src="https://render.albiononline.com/v1/item/T8_METALBAR.png" id="T8_METALBAR" onClick={(el) => handleClick(el.target.id)}/>
            </div>
        </div>
    </>
    )
}