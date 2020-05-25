import React from 'react';
import { observer } from 'mobx-react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import styles from './App.module.scss';
import Header from './components/Header';
import { useStore } from './utils/useStore';

const App = () => {
    const { tableStore, paginationStore } = useStore();

    return (
        <div className={styles.rootContainer}>
            <Header tableStore={tableStore} paginationStore={paginationStore}/>
            <Table tableStore={tableStore} paginationStore={paginationStore}/>
            <Pagination tableStore={tableStore} paginationStore={paginationStore}/>
        </div>
    );
};

export default observer(App);
