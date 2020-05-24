import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../utils/useStore';
import styles from './Header.module.scss';
import moviefyIcon from '../assets/icon-moviefy.svg';

const Header = () => {
    const { tableStore } = useStore();
    const { isInfiniteListEnabled } = tableStore;

    return (
        <div className={styles.headerContainer}>
            <img src={moviefyIcon} alt='Moviefy' />
            <span>Moviefy</span>
            <label className={styles.checkboxContainer} >
                Enable infinite list
                <input type='checkbox' checked={isInfiniteListEnabled} onClick={tableStore.toggleInfiniteList}/>
                <span className={styles.checkmark} />
            </label>
        </div>
    );
};

export default observer(Header);
