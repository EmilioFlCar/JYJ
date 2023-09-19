import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../../redux/actions/InvoiceActions";
import Factura from "./compos/factura/Factura";
import DetalleView from "./compos/detalles/detalleView";


export default function VerFacturas() {
    const dispatch = useDispatch()
    const { invoices } = useSelector((state) => state.invoice)
    const [invoice, setInvoice] = useState(null)

    useEffect(() => {
        dispatch(getInvoices())
    }, [])

    return (
        <Grid
            container
            sx={{ mt: 12 }}
            spacing={3}
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
        >
            <Grid item xs={5}>
                {invoices.map((invoice, index) => (
                        <Factura key={index} invoice={invoice} setInvoice={setInvoice}/>
                ))}

            </Grid>
            <Grid item xs={5}>

            {invoice != null? <DetalleView invoice={invoice}/>:<span>Detalles de la factura</span>}
            </Grid>

        </Grid>
    )
}