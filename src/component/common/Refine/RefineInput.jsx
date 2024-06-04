import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useNavigationType } from "react-router-dom";


import LoadingStatus from "../../ui/Status/LoadingStatus.jsx";
import RefineForm from "./RefineForm.jsx";
import RefineHeader from "./RefineHeader.jsx";

import { useSelectedItem } from "../../../hooks/useSelectedItem.js";
import { useCalculateData } from "../../../hooks/useCalculateData.js";
import { useFormData } from "../../../hooks/useFormData.js";
import { useFetchPrice } from "../../../hooks/useFetchPrice.js";

import { formList } from "./storage.js";
import { recipeListMaker } from "../../../utils/recipeListMaker.js";
import { findItemToFetch } from "../../../utils/findItemToFetch.js";
import { labelMaker } from "../../../utils/labelMaker.js";
import RefineFilter from "./RefineFilter.jsx";

export default function RefineInput() {
    const [fetchPriceData, setFetchPriceData] = useState(null);
    const [recipeSelected, setRecipeSelected] = useState(0);
    const [labelToFieldName, setLabelToFieldName] = useState({});

    const navigate = useNavigate();
    const navType = useNavigationType();

    const { selected, removeSelected, selectedData } = useSelectedItem();
    const { calculateData, updateCalculateData, removeCalculateData } = useCalculateData();
    const recipeList = recipeListMaker(selectedData);
    const itemToFetch = findItemToFetch(selectedData, recipeSelected);

    const formMethods = useForm();
    const { formData, setFormData, resetFormData } = useFormData();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = formMethods;
    const { loading, fetchData } = useFetchPrice(itemToFetch);

    useEffect(() => {
        if (Object.keys(selectedData).length > 0) {
            setLabelToFieldName(labelMaker(selectedData, recipeSelected));
        }
    }, [selectedData, recipeSelected]);

    useEffect(() => {
        if (fetchPriceData) {
            //loop over the label keys before populate the form with fetched price 
            const keys = Object.keys(labelToFieldName);
            for (const key of keys) {
                const price = Math.round(fetchPriceData[key]) || 0
                setDataByLabel(key, price)
    }
        }
    }, [fetchPriceData]);

    useEffect(() => {
        if (navType === "POP" && calculateData !== null) {
            removeCalculateData();
        }
        if (selected == null) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (recipeList.length > 0 && recipeList.length <= recipeSelected) {
            setRecipeSelected(recipeList.length - 1);
        }
    }, [recipeList, recipeSelected]);

    useEffect(() => {
        Object.keys(formData).forEach(key => {
            setValue(key, formData[key]);
        });
    }, [formData, setValue]);

    const formValues = watch();
    useEffect(() => {
        if (JSON.stringify(formValues) !== JSON.stringify(formData)) {
            setFormData(formValues);
        }
    }, [formValues, formData, setFormData]);

    const handleFetchPrice = async () => {
        try {
            const fetchedData = await fetchData(itemToFetch);
            setFetchPriceData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSubmit = (data) => {
        const recipeData = recipeList[recipeSelected].data;
        updateCalculateData({
            formData: { ...data, itemPerCraft: recipeList[recipeSelected].amountCrafted },
            data: { ...selectedData, "craft-resource": recipeData }
        });
        navigate("/result");
    };

    const setDataByLabel = (label, value) => {
        const fieldName = labelToFieldName[label];
        if (fieldName) {
          setValue(fieldName, value);
        }
      };

    const onClose = () => {
        setRecipeSelected(0);
        removeSelected();
        resetFormData();
        navigate("/");
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
                            handleFetchPrice={handleFetchPrice}
                        />
                    </form>
                </div>
                : null
            }
        </>
    );
}
