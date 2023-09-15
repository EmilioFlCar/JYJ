/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";

export default function SelectClient(props) {
    const {clients, handleSelectClientChange} = props
    
    useEffect(() => {
    }, [clients])

    return (
        <Autocomplete
            id="select"
            freeSolo
            onChange={handleSelectClientChange}
            options={clients?.map((option) => ` ${option.id} - ${option.name}`)}
            renderInput={(params) => <TextField {...params} label="Seleccionar cliente..." />}
        />

    )
}