/* eslint-disable react/prop-types */
import { Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateInvoice } from "../../../../../redux/actions/InvoiceActions";
import generatePDF from "../../../../../functions/generatePDF";
import SaveIcon from '@mui/icons-material/Save';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

export default function DetalleView(props) {
    const { invoice } = props
    const [state, setState] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
    }, [invoice])

    const handleChange = (e) => {
        const { value } = e.target
        setState(value)
    }

    const handleSubmit = () => {
        dispatch(updateInvoice(invoice.id, state))
        setState(null)
    }
    return (
        <Paper>
            <Typography variant="h5" gutterBottom sx={{ padding: 2, display: 'flex', justifyContent: 'center' }} >FACTURA</Typography >
            <Grid container spacing={1.5} sx={{ paddingLeft: 4 }}>
                <Grid item xs={7}>
                    <Typography variant="subtitle1">
                        ID del Cliente: {invoice.Client?.id}
                    </Typography>
                    <Typography variant="subtitle1">Nombre: {invoice.Client?.name}</Typography>
                    <Typography variant="subtitle1">
                        Número de Teléfono: {invoice.Client?.phoneNumber}
                    </Typography>
                    <Typography variant="subtitle1">Email: {invoice.Client?.email}</Typography>
                    <Typography variant="subtitle1">Dirección: {invoice.Client?.address}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Actualizar pago</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={"PAID"}>{<Chip label="PAGADO" color="success" size="small" />}</MenuItem>
                            <MenuItem value={"PENDING"}>{<Chip label="PAGO PENDIENTE" color="warning" size="small" />}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>
                                DETALLES
                            </TableCell>
                            <TableCell align="right">PRECIO</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">EQUIPO</TableCell>
                            <TableCell align="right">UNIDAD</TableCell>
                            <TableCell align="right">CANTIDAD</TableCell>
                            <TableCell align="right">DÍAS</TableCell>
                            <TableCell align="right">SUMA</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoice.Rents?.map((rent, index) => (
                            <TableRow key={index}>
                                <TableCell>{rent.id}</TableCell>
                                <TableCell align="right">{rent.Equipment[0].name}</TableCell>
                                <TableCell align="right">{rent.Equipment[0].price}</TableCell>
                                <TableCell align="right">{rent.rentedQuantity}</TableCell>
                                <TableCell align="right">{rent.days}</TableCell>
                                <TableCell align="right">{rent.cost}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align="right" colSpan={5}>Total</TableCell>
                            <TableCell align="right">{invoice.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={1} justifyContent="center" flexDirection= "column" alignItems="center" marginTop='10px'>
                <Grid item>
                    <Button
                        size="big"
                        color="info"
                        variant="contained"
                        endIcon={<SaveIcon />}
                        onClick={handleSubmit}
                    >
                        Actualizar factura
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="big"
                        color="success"
                        variant="contained"
                        endIcon={<LocalPrintshopIcon />}
                        onClick={() => generatePDF(invoice)}
                    >
                        Imprimir
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}