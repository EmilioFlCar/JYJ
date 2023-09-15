/* eslint-disable react/prop-types */
import { Box, Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
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
        itemID: "",
        itemsToRent: "",
        startDate: "",
        endDate: "",
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
        const { itemID, itemsToRent, startDate, endDate } = date
        if (itemID == "" || itemsToRent == "" || startDate == "" || endDate == "") {
            return alert('Faltan datos sobre el producto por ingresar')
        } else {
            dispatch(pushEquipment(date))
            setDate({
                itemID: "",
                itemsToRent: "",
                startDate: "",
                endDate: ""
            })
             setIsModalOpen(false)
        }
    }
    return (
        <div>
            {item ? (<Paper display="flex"
                elevation={3}
                sx={{
                    padding: 1,
                    margin: 1.5,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <Grid container spacing={1} columns={16}>
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
                                name="itemsToRent"
                                sx={{ maxWidth: 70 }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                color="primary"
                                aria-label="add to shopping cart"
                                onClick={() => { setIsModalOpen(true), setDate({ ...date, itemID: item.id }) }}
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <DatePicker isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} handleChange={handleChange} date={date} saveData={saveData} />
            </Paper>) : (
                <p>Loading...</p>
            )}

        </div>


    )
}