import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import cx from 'classnames';
import styles from './Pagination.module.scss';

const Pagination = ({ paginationStore, tableStore }) => {
    const { isInfiniteListEnabled } = tableStore;
    const { visiblePageSelections, currentPage } = paginationStore;

    const handlePageSet = useCallback(
        (page) => () => {
            if (tableStore.isLoadingTableData) {
                return;
            }

            paginationStore.setPage(page);
        },
        [paginationStore, tableStore.isLoadingTableData],
    );

    const renderPreviousPageSelect = () =>
        currentPage > 1 && (
            <li className={cx(styles.pagerItem, styles.pagerPrevIcon)} onClick={paginationStore.setPreviousPage}>
                <div className={styles.pagerLink} />
            </li>
        );

    const renderNextPageButton = () =>
        currentPage !== paginationStore.totalPages && (
            <li className={cx(styles.pagerItem, styles.pagerNextIcon)} onClick={paginationStore.setNextPage}>
                <div className={styles.pagerLink} />
            </li>
        );

    const renderGoToLastPageButton = () =>
        currentPage < paginationStore.totalPages - 1 && (
            <li className={styles.pagerItem} onClick={handlePageSet(paginationStore.totalPages)}>
                <div className={styles.pagerLink}>...</div>
            </li>
        );

    const renderGoToFirstPageButton = () =>
        currentPage > 2 && (
            <li className={styles.pagerItem} onClick={handlePageSet(1)}>
                <div className={styles.pagerLink}>...</div>
            </li>
        );

    const renderMoviesPerPageSelect = () => (
        <select onChange={paginationStore.setMoviesPerPage}>
            <option value='20'>20</option>
            <option value='40'>40</option>
            <option value='60'>60</option>
        </select>
    );

    return (
        !isInfiniteListEnabled && (
            <div className={styles.wrapper}>
                <nav>
                    <ul className={styles.pager}>
                        {renderPreviousPageSelect()}
                        {renderGoToFirstPageButton()}

                        {visiblePageSelections.map((page, index) => (
                            <li
                                className={cx(styles.pagerItem, page === currentPage && styles.active)}
                                onClick={handlePageSet(page)}
                                key={index}
                                value={page}
                                id={page}
                            >
                                <div className={styles.pagerLink} href='#' id={page}>
                                    {page}
                                </div>
                            </li>
                        ))}

                        {renderGoToLastPageButton()}
                        {renderNextPageButton()}
                    </ul>
                </nav>
                {renderMoviesPerPageSelect()}
            </div>
        )
    );
};

Pagination.propTypes = {
    tableStore: PropTypes.object.isRequired,
    paginationStore: PropTypes.object.isRequired,
};

export default observer(Pagination);
