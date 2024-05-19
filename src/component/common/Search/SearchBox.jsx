import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import Form from "../../ui/Forms/Form.jsx";

export default function SearchBox() {
    const {searchQuery, updateSearchQuery} = useSearchQuery()
    const [title, setTitle] = useState(searchQuery)
    
    const debouncedUpdateSearchQuery = useMemo(() => debounce((value) => {
        updateSearchQuery(value);
    }, 1500), []); // Only recreate the debounced function if the delay duration changes
    
    const handleChange = (value) => {
        setTitle(value);
        debouncedUpdateSearchQuery(value);
    }
    
    useEffect(() => {
        return () => {
            debouncedUpdateSearchQuery.cancel(); // Cancel the debounced function on unmount
        };
    }, [debouncedUpdateSearchQuery]);

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