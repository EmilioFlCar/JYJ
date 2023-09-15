import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteItem, getItems } from '../../redux/actions/itemAction'
import EditItem from './EditItem'



const InventarioLista = () => {

  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [item, setItem] = useState()

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const { items } = useSelector(state => state.items)

  const columnas = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 100 },
    { field: 'amount', headerName: 'Cantidad', width: 100 },
    { field: 'price', headerName: 'Precio', width: 100 },
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
            setItem(params.row)
          }
          }
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon color='error' />}
          label="Delete"
          onClick={() => dispatch(deleteItem(params.id))}
        />,

      ],
    }
  ]

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={items}
        columns={columnas}>
      </DataGrid>
      <EditItem isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} item={item} />
    </div>
  );
};

export default InventarioLista