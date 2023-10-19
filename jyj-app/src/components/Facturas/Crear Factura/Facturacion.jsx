import { Box, Grid } from "@mui/material"
import SelectClient from "./selectClient/SelectClient"
import RentEquipos from "./añadirEquipos/equipos/Equipos"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getItems } from "../../../redux/actions/itemAction"
import InvoiceDetails from "./detalles/InvoiceDetails"
import { getClients } from "../../../redux/actions/clientActions"
import { setInvoiceClient } from "../../../redux/actions/InvoiceActions"


function Facturacion() {
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.items)
    const { clients } = useSelector(state => state.clients)

    const [facturaData, setFacturaData] = useState({
        clientID: null,
        equipmentData: []

    })

    useEffect(() => {
        dispatch(getItems())
        dispatch(getClients())
    }, [dispatch])


    const addItem = (data) => {
        setFacturaData({
            ...facturaData,
            equipmentData: [...facturaData.equipmentData, data]
        })
    }

    function handleSelectClientChange(e, newValue) {
        const parts = newValue.split(" - ")
        const id = parts[0]
        const selectedClient = clients.find((client) => client.id === parseInt(id, 10));
        dispatch(setInvoiceClient(selectedClient))
    }
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
                <Box sx={{
                    display: 'grid',
                    rowGap: 3
                }
                }>
                    <SelectClient clients={clients} handleSelectClientChange={handleSelectClientChange} />
                    <RentEquipos items={items} />
                </Box>
            </Grid>
            <Grid item xs={7}>
                <InvoiceDetails />
            </Grid>
        </Grid>
    )
}

export default Facturacion