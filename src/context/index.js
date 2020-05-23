import { createContext } from 'react';
import { TableStore } from '../components/TableStore';
import { PaginationStore } from '../components/Pagination/PaginationStore';

const tableStore = new TableStore();
const paginationStore = new PaginationStore(tableStore);

export const storeContext = createContext({
    tableStore,
    paginationStore,
});
