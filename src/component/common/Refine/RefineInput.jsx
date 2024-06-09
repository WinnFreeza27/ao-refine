import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useNavigationType } from "react-router-dom";


import LoadingStatus from "../../ui/Status/LoadingStatus.jsx";
import RefineForm from "./RefineForm.jsx";
import RefineHeader from "./RefineHeader.jsx";
import RefineFilter from "./RefineFilter.jsx";

import { useSelectedItem } from "../../../hooks/useSelectedItem.js";
import { useCalculateData } from "../../../hooks/useCalculateData.js";
import { useFormData } from "../../../hooks/useFormData.js";
import { useFetchPrice } from "../../../hooks/useFetchPrice.js";
import { useServerData } from "../../../hooks/useServerData.js";

import { formList } from "./storage.js";
import { serverUrlList } from "./storage.js";
import { recipeListMaker } from "../../../utils/recipeListMaker.js";
import { findItemToFetch } from "../../../utils/findItemToFetch.js";
import { labelMaker } from "../../../utils/labelMaker.js";
import { useLocation } from "react-router-dom";



/**
 * RefineInput component
 * 
 * Component for refining an item. Uses react-hook-form for form handling.
 * Fetches price data from an API and populates the form with the fetched data.
 */
export default function RefineInput() {
    // State variables
    const [fetchPriceData, setFetchPriceData] = useState(null); // Fetched price data
    const [recipeSelected, setRecipeSelected] = useState(0); // Selected recipe
    const [labelToFieldName, setLabelToFieldName] = useState({}); // Mapping between label and form field name

    // Hooks
    const navigate = useNavigate(); // Navigation hook
    const navType = useNavigationType(); // Navigation type hook
    const location = useLocation()

    const { selected, removeSelected, selectedData } = useSelectedItem(); // Selected item hook
    const { calculateData, updateCalculateData, removeCalculateData } = useCalculateData(); // Calculate data hook
    const recipeList = recipeListMaker(selectedData); // List of recipes
    const itemToFetch = findItemToFetch(selectedData, recipeSelected); // Item to fetch price data for
    const { serverData } = useServerData();
    const formMethods = useForm(); // Form hook
    const { formData, setFormData, resetFormData } = useFormData(); // Form data hook
    const { register, handleSubmit, formState: { errors }, watch, setValue } = formMethods; // Form methods
    const { loading, fetchData } = useFetchPrice(itemToFetch); // Price fetching hook

    // Effect hooks
    useEffect(() => {
        // Update label to field name mapping on selected data change
        if (Object.keys(selectedData).length > 0) {
            setLabelToFieldName(labelMaker(selectedData, recipeSelected));
        }
    }, [selectedData, recipeSelected]);
    
    /**
     * Fetch price data if auto price is enabled and the page is not being
     * reloaded due to a pop state event.
     */
    useEffect(() => {
        // Check if auto price is enabled and an item is selected
        if (selected && serverData.AutoPrice === "ON" && location.state !== "POP") {
            // Fetch price data from the server
            const serverUrl = serverUrlList[serverData?.Server];
            handleFetchPrice(serverUrl);
        }

        // If the page is being reloaded due to a pop state event,
        // navigate to the location's pathname with a query parameter
        // indicating the fetch was successful.
        if(location.state === "POP"){
            navigate(location.pathname, { state: { from: 'fetch-success' } });
        }
    }, [selected, serverData]); // Run the effect whenever selected or serverData changes

    useEffect(() => {
        // Populate form with fetched price data
        if (fetchPriceData) {
            // Iterate over the keys of labelToFieldName
            const keys = Object.keys(labelToFieldName);
            for (const key of keys) {
                // Round the corresponding price in fetchPriceData
                // If the rounded price is falsy, set the form data value to undefined
                const price = Math.round(fetchPriceData[key]) || undefined
                setDataByLabel(key, price)
            }
        }
        }, [fetchPriceData]);

    useEffect(() => {
        // Reset state and navigate to home page if selected item is null
        if (navType === "POP" && calculateData !== null) {
            removeCalculateData();
        }
        if (selected == null) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        // Set recipe selected to last index if out of range
        if (recipeList.length > 0 && recipeList.length <= recipeSelected) {
            setRecipeSelected(recipeList.length - 1);
        }
    }, [recipeList, recipeSelected]);

    useEffect(() => {
        // Sync form values with form data state
        Object.keys(formData).forEach(key => {
            setValue(key, formData[key]);
        });
    }, [formData, setValue]);

    // Get form values
    const formValues = watch();

    useEffect(() => {
        // Update form data state with form values if changed
        if (JSON.stringify(formValues) !== JSON.stringify(formData)) {
            setFormData(formValues);
        }
    }, [formValues, formData, setFormData]);

     // Fetch price data from API
     const handleFetchPrice = async (serverUrl) => {
        try {
            const fetchedData = await fetchData(itemToFetch, serverUrl);
            setFetchPriceData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Submit form
    const onSubmit = (data) => {
        const recipeData = recipeList[recipeSelected].data;
        updateCalculateData({
            formData: { ...data, itemPerCraft: recipeList[recipeSelected].amountCrafted },
            data: { ...selectedData, "refine-resource": recipeData }
        });
        navigate("/refine/result");
    };

    // Set form data value by label
    const setDataByLabel = (label, value) => {
        const fieldName = labelToFieldName[label];
        if (fieldName) {
          setValue(fieldName, value);
        }
      };

    // Close form
    const onClose = () => {
        setRecipeSelected(0);
        removeSelected();
        resetFormData();
        navigate("/refine");
    };

    if (loading) return (<LoadingStatus />);

    return (
        <>
            {selected !== null && calculateData == null && recipeList[recipeSelected] !== undefined ?
                <div className="refine-box text-sm md:text-base">
                    <RefineHeader selectedData={selectedData} onClose={onClose} />
                    <RefineFilter />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3 p-1">
                        <RefineForm
                            register={register}
                            errors={errors}
                            recipeList={recipeList}
                            recipeSelected={recipeSelected}
                            formList={formList}
                            watch={watch}
                            selectedData={selectedData}
                            setRecipeSelected={setRecipeSelected}
                            labelToFieldName={labelToFieldName}
                        />
                    </form>
                </div>
                : null
            }
        </>
    );
}

