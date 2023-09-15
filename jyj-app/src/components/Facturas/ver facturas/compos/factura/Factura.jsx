import { Paper, Typography } from "@mui/material";


export default function Factura(props) {
    const { invoice } = props
    console.log(invoice);
    return (
        <Paper>
            <Typography>
                {invoice.id} - {invoice.Client?.name} - {invoice.Rents[0]?.startDate}
            </Typography>
        </Paper>
    )
}