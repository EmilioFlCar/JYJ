import { useDispatch } from "react-redux";
import { addItem } from "../../redux/actions/itemAction";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import validateForm from "./validateForm";

export default function InventarioForm() {
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    name: '',
    amount: '',
    price: ''
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

    dispatch(addItem(inputs))
    setInputs({
      name: '',
      amount: '',
      price: ''
    })
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