/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Button, Paper, TextField } from "@mui/material";
import { editClient } from '../../redux/actions/clientActions';
import { useDispatch } from 'react-redux';

export default function EditClientForm(props) {
    const dispatch = useDispatch()
    const{id, name, phoneNumber, address, email} = props.client
    const [inputs, setInputs] = useState({
        id,
        name,
        phoneNumber,
        address,
        email
    })

    function handleChange(e){
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editClient(inputs))
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
                        label="Cédula"
                        value={ inputs.id}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                    name='phoneNumber'
                        label="Teléfono"
                        value={inputs.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                    name='address'
                        label="Dirección"
                        value={inputs.address}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                    name='email'
                        label="Correo Electrónico"
                        type="email"
                        value={inputs.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="center" marginTop="1rem">
                        <Button type="submit" variant="contained" color="primary">
                            Confirmar
                        </Button>
                    </Box>
                </form>
            </Paper>
    );
}