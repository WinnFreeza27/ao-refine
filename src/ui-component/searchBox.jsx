import Form from "./form";

export default function Searchbox() {
    return (
        <div className="h-12 col-span-4 sm:col-span-4 sm:mr-10 lg:col-start-5 lg:col-span-1 lg:mr-0 rounded-lg bg-bg-transparent border border-bd-grey flex items-center justify-between gap-3">
            <Form inputType={"search"} styleClass={"p-4 h-full w-full bg-transparent rounded-lg text-white"} noDefaultClass={true} placeholder={"Search something here..."} id={"search-form"}/>
            <button type="button" className="w-12 h-10 bg-white rounded-lg justify-center items-center mr-1 hidden sm:inline-flex">
                <div className="w-5 h-5">
                <svg className="w-full h-full" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </div>
            </button>
        </div>
    )
}