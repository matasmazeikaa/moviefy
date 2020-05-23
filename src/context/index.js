import { createContext } from 'react';
import { TableStore } from '../components/TableStore';

const tableStore = new TableStore();

export const storeContext = createContext({
    tableStore,
});
