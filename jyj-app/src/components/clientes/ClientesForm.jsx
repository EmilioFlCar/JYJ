import { useState } from 'react';
import { Box, Button, Paper, TextField } from "@mui/material";
import { addClient } from '../../redux/actions/clientActions';
import { useDispatch } from 'react-redux';

export default function ClientesForm() {
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        phoneNumber: '',
        address: '',
        email: ''
    })

    function handleChange(e){
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addClient(inputs))
        setInputs({
            id: '',
            name: '',
            phoneNumber: '',
            address: '',
            email: ''
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
                    name='id'
                        label="Cédula"
                        value={ inputs.id}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                            Registrar
                        </Button>
                    </Box>
                </form>
            </Paper>
    );
}