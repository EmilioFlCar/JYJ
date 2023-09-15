import {Grid} from '@mui/material';

import InventarioForm from './InventarioForm';
import InventarioLista from './inventarioLista';


const InventoryApp = () => {

  return (
    <Grid container spacing={2} sx={{ mt: 10 }}>
      <Grid item xs={3}>
        <InventarioForm />
      </Grid>
      <Grid item xs={9}>
        <InventarioLista />
      </Grid>
    </Grid>
  );
};

export default InventoryApp;