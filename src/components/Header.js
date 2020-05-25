import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { observer } from 'mobx-react';
import styles from './Header.module.scss';
import moviefyIcon from '../assets/icon-moviefy.svg';

const Header = ({ tableStore, paginationStore }) => {
    const { isInfiniteListEnabled } = tableStore;

    const handleInfiniteListToggle = useCallback(() => {
        if (!isInfiniteListEnabled) {
            paginationStore.setPageNumber(tableStore.lastConsecutivePage);
        }

        tableStore.toggleInfiniteList();
    }, [isInfiniteListEnabled, paginationStore, tableStore]);

    return (
        <div className={styles.headerContainer}>
            <img src={moviefyIcon} alt='Moviefy' />
            <span>Moviefy</span>
            <label className={cx(styles.checkboxContainer, isInfiniteListEnabled && styles.checkboxContainerFixed)}>
                Enable infinite list
                <input type='checkbox' checked={isInfiniteListEnabled} onChange={handleInfiniteListToggle} />
                <span className={styles.checkmark} />
            </label>
        </div>
    );
};

Header.propTypes = {
    tableStore: PropTypes.object.isRequired,
    paginationStore: PropTypes.object.isRequired,
};

export default observer(Header);
