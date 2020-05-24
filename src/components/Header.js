import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styles from './Header.module.scss';
import moviefyIcon from '../assets/icon-moviefy.svg';

const Header = ({ tableStore }) => {
    const { isInfiniteListEnabled } = tableStore;

    return (
        <div className={styles.headerContainer}>
            <img src={moviefyIcon} alt='Moviefy' />
            <span>Moviefy</span>
            <label className={styles.checkboxContainer}>
                Enable infinite list
                <input type='checkbox' checked={isInfiniteListEnabled} onChange={tableStore.toggleInfiniteList} />
                <span className={styles.checkmark} />
            </label>
        </div>
    );
};

Header.propTypes = {
    tableStore: PropTypes.object.isRequired,
}

export default observer(Header);
