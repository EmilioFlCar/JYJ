import { useDispatch } from "react-redux";
import { editItem } from "../../redux/actions/itemAction";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import validateForm from "./validateForm";

export default function EditItemForm(props) {
  const dispatch = useDispatch()
  const { id, name, amount, price } = props.item
  const [inputs, setInputs] = useState({
    id,
    name,
    amount,
    price
  })

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(inputs) === false) {
      return (
        alert('Faltan datos')
      )
    }

    dispatch(editItem(inputs))
    props.handleClose()
  };

  return (
    <Paper
      display="flex"
      elevation={3}
      sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='name'
          label="Nombre"
          value={inputs.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name='id'
          label="ID"
          value={inputs.id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          name='amount'
          label="Cantidad"
          type='number'
          value={inputs.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          name='price'
          label="Precio"
          type='number'
          value={inputs.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <Box display="flex" justifyContent="center" marginTop="1rem">
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </form>


    </Paper>
  )
}