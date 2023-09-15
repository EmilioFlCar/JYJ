import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import { createInvoice, deleteEquipment } from "../../../../redux/actions/InvoiceActions";

export default function InvoiceDetails() {
    const invoice = useSelector(state => state.invoice)
    const dispatch = useDispatch()

    useEffect(() => {
    }, [invoice])
    
    function calcularDias(start, end) {
        const fecha1 = new Date(start);
        const fecha2 = new Date(end);
        const diferenciaEnMilisegundos = fecha2 - fecha1;
        const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
        return diferenciaEnDias
    }
    function total(items) {
        let result = 0
        items.map((item) => {
            result = result + (item.itemInfo.price * parseInt(item.itemsToRent)) * calcularDias(item.startDate, item.endDate)
        })
        return result
    }
    const handleDelete = (index) => {
        const updatedEquipmentData = [...invoice.equipmentData];
        updatedEquipmentData.splice(index, 1)
        dispatch(deleteEquipment(updatedEquipmentData));
    };
    const handleSubmit = ()=>{
        dispatch(createInvoice(invoice))
    }

    return (
        <Paper>
            <Typography variant="h5" gutterBottom>
                Datos del Cliente
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        ID del Cliente: {invoice.client?.id}
                    </Typography>
                    <Typography variant="subtitle1">Nombre: {invoice.client?.name}</Typography>
                    <Typography variant="subtitle1">
                        Número de Teléfono: {invoice.client?.phoneNumber}
                    </Typography>
                    <Typography variant="subtitle1">Email: {invoice.client?.email}</Typography>
                    <Typography variant="subtitle1">Dirección: {invoice.client?.address}</Typography>
                </Grid>
            </Grid>
            <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
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
                        {invoice.equipmentData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.itemInfo.id}</TableCell>
                                <TableCell align="right">{item.itemInfo.name}</TableCell>
                                <TableCell align="right">{item.itemInfo.price}</TableCell>
                                <TableCell align="right">{item.itemsToRent}</TableCell>
                                <TableCell align="right">{calcularDias(item.startDate, item.endDate)}</TableCell>
                                <TableCell align="right">{(item.itemInfo.price * parseInt(item.itemsToRent)) * calcularDias(item.startDate, item.endDate)}</TableCell>
                                <TableCell>
                                    <IconButton color="error">
                                        <DeleteIcon onClick={() => handleDelete(index)} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* <TableRow>
                            <TableCell align="right" colSpan={5}>Subtotal</TableCell>
                            <TableCell align="right">{123}</TableCell>
                        </TableRow> */}
                        <TableRow>
                            <TableCell align="right" colSpan={5}>Total</TableCell>
                            <TableCell align="right">{total(invoice.equipmentData)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={handleSubmit} > CREAR </Button>
        </Paper>
    )
}