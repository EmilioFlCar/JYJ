import { Grid } from "@mui/material";
import ClientesForm from "./ClientesForm";
import ClientesView from "./ClientesView";

export default function Registro() {
    return (
            <Grid container
                sx={{ mt: 10 }}
                spacing={3}
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
                >
                <Grid item xs={3}>
                    <ClientesForm/>
                </Grid>

                <Grid item xs={9}>
                    <ClientesView />
                </Grid>
            </Grid>
    )
}