import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import parseDate from '../../../../../functions/pasrseDate';
import { Button, Chip } from '@mui/material';

export default function Factura(props) {
    const { invoices, setInvoice } = props;

    const columnas = [
        { field: 'id', headerName: 'Id factura', width: 80 },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 200,
            renderCell: (params) => params.row.Client.name
        },
        {
            field: 'creationDate',
            headerName: 'Fecha',
            width: 110,
            renderCell: (params) => parseDate(params.row.creationDate)
        },
        {
            field: 'state',
            headerName: 'Estado',
            width: 130,
            renderCell: (params) => (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {params.row.state === "PENDING" ? (
                        <Chip label="PENDIENTE" color="warning" size="small" />
                    ) : (
                        <Chip label="PAGO" color="success" size="small" />
                    )}
                </span>
            )
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            type: 'actions',
            width: 90,
            renderCell: (params) => (
                <Button
                    size="small"
                    color="info"
                    variant="contained"
                    endIcon={<InfoIcon />}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setInvoice(params.row)}
                >
                    Info
                </Button>
            )
        },
    ];

    return (
        <DataGrid rows={invoices} columns={columnas} />
    );
}
