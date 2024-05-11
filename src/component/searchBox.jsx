import { useState } from "react";
import Form from "./form.jsx";
import { debounce } from "lodash";
import { useFilterData } from "../hooks/useFilterData.js";
import { useSearchQuery } from "../hooks/useSearchQuery.js";
import { useEffect } from "react";

export default function Searchbox() {
    const searchQuery = useSearchQuery((state) => state.searchQuery)
    const [title, setTitle] = useState(searchQuery)
    const updateSearchQuery = useSearchQuery((state) => state.updateSearchQuery)
    const debouncedUpdateSearchQuery = debounce(updateSearchQuery, 300);
    const handleChange = (value) => {
        setTitle(value)
        debouncedUpdateSearchQuery(value);
    }
    
    useEffect(() => {
        debouncedUpdateSearchQuery.cancel();
    },[])

    return (
        <div className="relative h-12 col-span-4 sm:col-span-4 sm:mr-10 lg:col-start-5 lg:col-span-1 lg:mr-0 rounded-lg bg-bg-transparent border border-bd-grey flex items-center justify-between gap-3">
            <Form inputType={"search"} 
            styleClass={"p-4 h-full w-full bg-transparent rounded-lg text-white"} 
            noDefaultClass={true} placeholder={"Search something here..."} 
            id={"search-form"}
            onChange={(e) => handleChange(e.target.value)}
            value={title}
            />
           
        </div>
    )
}