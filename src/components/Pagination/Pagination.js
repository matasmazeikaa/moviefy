import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { useStore } from '../../utils/useStore';
import styles from './Pagination.module.scss';

const Pagination = () => {
    const { paginationStore, tableStore } = useStore();
    const { isInfiniteListEnabled } = tableStore;
    const { visiblePageSelections, currentPage } = paginationStore;

    const setPage = useCallback(
        (page) => () => {
            paginationStore.setPage(page);
        },
        [paginationStore],
    );

    const renderPreviousPageSelect = () =>
        currentPage > 1 && (
            <li className={cx(styles.pagerItem, styles.pagerPrevIcon)} onClick={paginationStore.setPreviousPage}>
                <a className={styles.pagerLink} href='#' />
            </li>
        );

    const renderNextPageSelect = () =>
        currentPage !== paginationStore.totalPages && (
            <li className={cx(styles.pagerItem, styles.pagerNextIcon)} onClick={paginationStore.setNextPage}>
                <a className={styles.pagerLink} href='#' />
            </li>
        );

    const renderGoToLastPageButton = () =>
        currentPage !== paginationStore.totalPages && (
            <li className={styles.pagerItem} onClick={setPage(paginationStore.totalPages)}>
                <a className={styles.pagerLink} href='#'>
                    ...
                </a>
            </li>
        );

    const renderGoToFirstPageButton = () =>
        currentPage > 2 && (
            <li className={styles.pagerItem} onClick={setPage(1)}>
                <a className={styles.pagerLink} href='#'>
                    ...
                </a>
            </li>
        );

    const renderMoviesPerPageSelect = () => (
        <select onChange={paginationStore.setMoviesPerPage}>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
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
                                onClick={setPage(page)}
                                key={index}
                                value={page}
                                id={page}
                            >
                                <a className={styles.pagerLink} href='#' id={page}>
                                    {page}
                                </a>
                            </li>
                        ))}

                        {renderGoToLastPageButton()}
                        {renderNextPageSelect()}
                    </ul>
                </nav>
                {renderMoviesPerPageSelect()}
            </div>
        )
    );
};

export default observer(Pagination);
