import { Box, Button, Chip, IconButton, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import parseDate from '../../../../../functions/pasrseDate'

export default function Factura(props) {
    const { invoice, setInvoice } = props
    return (
        <Paper
            display="flex"
            elevation={3}
            sx={{ padding: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: 'center'
                }}>
                <Typography>
                    {invoice.id}
                </Typography>
                <Typography>
                    {invoice.Client?.name}
                </Typography>
                <Typography>
                    {parseDate(invoice.Rents[0]?.startDate)}
                </Typography>
                <span>
                    {invoice.state === "PENDING" ? <Chip label="PAGO PENDIENTE" color="warning" size="small" /> : <Chip label="PAGADO" color="success" size="small" />}
                </span>
                <Button size="small" color="info" variant="contained" endIcon={<InfoIcon />} onClick={() => setInvoice(invoice)} >
                    Info
                </Button>
            </Box>
        </Paper>

    )
}