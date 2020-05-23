import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { useStore } from '../../utils/useStore';
import styles from './Pagination.module.scss';

const Pagination = () => {
    const { paginationStore } = useStore();
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
                <a className={styles.pagerLink} href='#'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'>
                        <g fill='none' fillRule='evenodd'>
                            <path fill='#33313C' d='M7.41 1.41L6 0 0 6l6 6 1.41-1.41L2.83 6z'></path>
                        </g>
                    </svg>
                </a>
            </li>
        );

    const renderNextPageSelect = () =>
        currentPage !== paginationStore.totalPages && (
            <li className={cx(styles.pagerItem, styles.pagerNextIcon)} onClick={paginationStore.setNextPage}>
                <a className={styles.pagerLink} href='#'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'>
                        <g fill='none' fillRule='evenodd'>
                            <path fill='#33313C' d='M7.41 1.41L6 0 0 6l6 6 1.41-1.41L2.83 6z'></path>
                        </g>
                    </svg>
                </a>
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

    return (
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
        </div>
    );
};

export default observer(Pagination);
