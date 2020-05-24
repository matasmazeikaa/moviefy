import React from 'react';
import { observer } from 'mobx-react';
import Table from './components/Table';
import Pagination from './components/Pagination/Pagination';
import styles from './App.module.scss';
import Header from './components/Header';

const App = () => (
    <div className={styles.rootContainer}>
        <Header />
        <Table />
        <Pagination />
    </div>
);

export default observer(App);
