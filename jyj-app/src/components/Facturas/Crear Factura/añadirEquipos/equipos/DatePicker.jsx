import { Box, Button, Input, Modal, Typography } from "@mui/material"

const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-around',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function DatePicker(props) {
    const { isModalOpen, handleClose, handleChange, saveData, date } = props
    return (

        <Modal
            open={isModalOpen}
            onClose={handleClose}>
            <Box sx={style}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography>Inicio</Typography>
                    <Input
                        type="date"
                        name="startDate"
                        onChange={handleChange}
                        value={date.startDate} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography >Fin</Typography>
                    <Input
                        type="date"
                        name="endDate"
                        onChange={handleChange}
                        value={date.endDate} />
                </Box>
                <Button
                    onClick={saveData}
                    
                >Añadir</Button>
            </Box>
        </Modal>
    )
}