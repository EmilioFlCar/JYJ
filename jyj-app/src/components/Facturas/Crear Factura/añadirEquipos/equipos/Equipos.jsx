/* eslint-disable react/prop-types */
import { Box, Grid, Paper, TextField } from "@mui/material"
import EquipoCard from "./equipoCard"
import { useEffect, useState } from "react";

export default function RentEquipos(props) {
    const { items } = props
    
    const [filteredItems, setFilteredItems] = useState(items);

    const search = (e) => {
        const { value } = e.target;
        const normalizedSearchValue = value.toLowerCase();

        const filtered = items.filter((item) =>
            item.name.toLowerCase().includes(normalizedSearchValue)
        );
        setFilteredItems(filtered);
    };

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                }}>
                <Box>
                    <TextField
                        onChange={search}
                        placeholder="Buscar item"
                        sx={{
                            paddingBottom: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </Box>
                <Box
                    component="div"
                    sx={{
                        overflow: 'auto',
                        height: 350
                    }}>
                    <Grid container spacing={3} columns={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flexEnd' , paddingLeft: 7}}>

                        <Grid item xs={2} >
                            Nombre
                        </Grid>
                        <Grid item xs={2}>
                            Disponile
                        </Grid>
                        <Grid item xs={2}>
                            Precio
                        </Grid>
                        <Grid item xs={2}>
                            Cantidad
                        </Grid>
                    </Grid>

                    {filteredItems.map((item, index) => (
                        <EquipoCard key={index} item={item} />
                    ))}
                </Box>
            </Paper>
        </>
    )
}