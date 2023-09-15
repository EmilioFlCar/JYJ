import { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient, getClients } from '../../redux/actions/clientActions';
import EditClient from './EditClient';


const DatosTabla = () => {
    
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [client, setClient] = useState()

    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])

    const { clients } = useSelector(state => state.clients)

    const columnas = [
        { field: 'name', headerName: 'Nombre', width: 170 },
        { field: 'id', headerName: 'Cédula', width: 150 },
        { field: 'phoneNumber', headerName: 'Teléfono', width: 170 },
        { field: 'address', headerName: 'Dirección', width: 200 },
        { field: 'email', headerName: 'Correo Electrónico', width: 200 },
        {
            field: 'actions',
            headerName: 'Acciones',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    key={params.id}
                    icon={<EditIcon color='primary' />}
                    label="Edit"
                    onClick={() => {
                        setIsModalOpen(true)
                        setClient(params.row)
                        }
                    }
                />,
                <GridActionsCellItem
                    key={params.id}
                    icon={<DeleteIcon color='error' />}
                    label="Delete"
                    onClick={() => dispatch(deleteClient(params.id))}
                />,

            ],
        },
    ];

    return (
        <div style={{ height: 500 }}>
            <DataGrid
                rows={clients}
                columns={columnas}
            />
            <EditClient isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} client={client} />
        </div>
    );
};

export default DatosTabla;