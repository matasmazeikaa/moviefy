import { createContext } from 'react';
import { TableStore } from '../stores/TableStore';
import { PaginationStore } from '../stores/PaginationStore';

const tableStore = new TableStore();
const paginationStore = new PaginationStore(tableStore);

export const storeContext = createContext({
    tableStore,
    paginationStore,
});
