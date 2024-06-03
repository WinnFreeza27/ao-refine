import React from "react";

export default function RefineHeader ({ selectedData, onClose }) {
    return (
        <div className="flex items-center justify-between w-full mb-4">
            <svg onClick={onClose} className="justify-self-start w-6 cursor-pointer" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#fdfdfd" stroke="#fdfdfd">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                    <path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                </g>
            </svg>
            <div className="flex items-center">
                <h1 className="font-bold text-lg md:text-xl xl:text-2xl">{selectedData["resource-items"].ItemsLocalizedName}</h1>
            </div>
            <div></div>
        </div>
    );
};
