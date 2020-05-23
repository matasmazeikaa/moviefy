import React from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination/Pagination';
import styles from './App.module.scss';

const App = () => (
    <div className={styles.rootContainer}>
        <Table />
        <Pagination />
    </div>
);

export default App;
