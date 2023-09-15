import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../../redux/actions/InvoiceActions";
import Factura from "./compos/factura/Factura";


export default function VerFacturas() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInvoices())
    }, [])

    const { invoices } = useSelector((state) => state.invoice)
    return (
        <Grid
            container
            sx={{ mt: 10 }}
            spacing={3}
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
        >
            <Grid item xs={5}>
                {invoices.map((invoice, index) => (
                    <Factura key={index} invoice={invoice} />
                ))}
            </Grid>
            <Grid item xs={5}>

            </Grid>

        </Grid>
    )
}