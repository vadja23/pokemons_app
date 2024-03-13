import React from 'react';
import { Radio, FormControl, RadioGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredData, fetchPokemon } from "../../store/slice/apiSlice";

export function Filters() {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.api.currentPage);
    const data = useSelector((state) => state.api.data);

    if (data == null) {
        dispatch(fetchPokemon({page:currentPage,limit:5}));
    }

    const handleRadioChange = (e) => {
        let value = e.target.attributes.value.value;
        let name = e.target.name;
        dispatch(fetchFilteredData({name, value}));
    };

    const handleCheckboxChange = (e) => {
        let value = e.target.checked;
        let name = e.target.name;
        dispatch(fetchFilteredData({name, value}));
    };

    const handleSearchChange = e => {
        let value = e.target.value;
        let name = e.target.name;
        dispatch(fetchFilteredData({name, value}));
    };
    
    return (
        <div className='filters'>
            <TextField id="search" label="Поиск" name='search' variant="outlined" fullWidth onChange={handleSearchChange} size="small"/>
            <FormControl>
                <RadioGroup row defaultValue="0"  onChange={handleRadioChange}>
                    <FormControlLabel value="0" name="male" control={<Radio />} label="Любой" />
                    <FormControlLabel value="1" name="male" control={<Radio />} label="Мальчик" />
                    <FormControlLabel value="2" name="male" control={<Radio />} label="Девочка" />
                </RadioGroup>
            </FormControl>
            <FormControlLabel
                label="Избранное"
                control={
                    <Checkbox color='primary' size='medium' name="favorite" aria-label='dsf' onChange={(e) => handleCheckboxChange(e)} />
                }     
            />
            
        </div>
    );
}