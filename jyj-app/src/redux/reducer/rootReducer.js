import { combineReducers } from 'redux';
import clientReducer from './clientReducer' 
import itemReducer from './itemReducer'
import rentReducer from './rentReducer'
import invoiceReducer from './invoiceReducer';

const rootReducer = combineReducers({
  clients: clientReducer,
  items: itemReducer,
  rent: rentReducer,
  invoice: invoiceReducer
});

export default rootReducer;