import { Box, Chip, Paper, Typography } from "@mui/material";


export default function Factura(props) {
    const { invoice } = props
    invoice.status = "PAID"
    return (
        <Paper
        display="flex"
        elevation={3}
        sx={{ padding: 2 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-evenly",
            }}>
                <Typography>
                    {invoice.id}
                </Typography>
                <Typography>
                    {invoice.Client?.name}
                </Typography>
                <Typography>
                    {invoice.Rents[0]?.startDate}
                </Typography>
                <span>
                    {invoice.state === "PENDING" ? <Chip label="Pendiente" color="warning" size="small" /> : <Chip label="Pagado" color="success" size="small" />}
                </span>
            </Box>
        </Paper>

    )
}