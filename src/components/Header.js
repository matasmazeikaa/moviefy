import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../utils/useStore';
import styles from './Header.module.scss';
import moviefyIcon from '../assets/icon-moviefy.svg';

const Header = () => {
    const { tableStore, paginationStore } = useStore();
    const { isInfiniteListEnabled } = tableStore;

    const handleInfiniteList = useCallback(() => {
        if (tableStore.loadedPages.length === 1) {
            paginationStore.setNextPage();
        }

        tableStore.toggleInfiniteList();
    }, [paginationStore, tableStore]);

    return (
        <div className={styles.headerContainer}>
            <img src={moviefyIcon} alt='Moviefy' />
            <span>Moviefy</span>
            <label className={styles.checkboxContainer}>
                Enable infinite list
                <input type='checkbox' checked={isInfiniteListEnabled} onChange={handleInfiniteList} />
                <span className={styles.checkmark} />
            </label>
        </div>
    );
};

export default observer(Header);
