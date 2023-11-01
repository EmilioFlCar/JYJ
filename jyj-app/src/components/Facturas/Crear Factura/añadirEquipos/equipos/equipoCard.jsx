/* eslint-disable react/prop-types */
import { Box, Grid, IconButton, Paper, TextField, Typography, Button } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import DatePicker from "./DatePicker"
import { pushEquipment } from "../../../../../redux/actions/InvoiceActions"


export default function EquipoCard(props) {
    const { item } = props
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [date, setDate] = useState({
        numberOfItemsToRent: "",
        daysToRent: "",
        itemInfo: item
    })

    useEffect(() => {
    }, [date])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDate({
            ...date,
            [name]: value
        });
    }

    const saveData = () => {
        const { numberOfItemsToRent, daysToRent } = date;
        if (numberOfItemsToRent === "" || daysToRent === "") {
            return alert('Faltan datos sobre el producto por ingresar');
        } else {
            dispatch(pushEquipment({ ...date }));
            setDate({
                numberOfItemsToRent: "",
                daysToRent: "",
                itemInfo: item
            });
        }
    };

    return (
        <div>
            {item ? (<Paper display="flex"
                elevation={3}
                sx={{
                    padding: 1,
                    margin: 1.5,
                }}>
                <Box>
                    <Grid container spacing={1} columns={16} sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h6" component="h2">{item.name}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                value={item.amount}
                                disabled
                                size="small"
                                sx={{ maxWidth: 50 }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={item.price}
                                disabled
                                size="small"
                                sx={{ maxWidth: 80 }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                size="small"
                                type="number"
                                name="numberOfItemsToRent"
                                value={date.numberOfItemsToRent}
                                sx={{ maxWidth: 70 }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                size="small"
                                type="number"
                                name="daysToRent"
                                sx={{ maxWidth: 70 }}
                                value={date.daysToRent}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button>
                                <IconButton
                                    color="primary"
                                    aria-label="add to shopping cart"
                                    onClick={() => saveData()}
                                >
                                    <AddShoppingCartIcon />
                                </IconButton>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>) : (
                <p>Loading...</p>
            )}

        </div>


    )
}