import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SelectedMovieModal from './Table/Misc/SelectedMovieModal';
import TableHeader from './Table/TableHeader';
import Row from './Table/Row';
import Loader from './Common/Loader';
import styles from './Table.module.scss';

const Table = ({ paginationStore, tableStore }) => {
    const { moviesList, isSelectedMovieModalVisible, selectedMovieData, isLoadingTableData, isInfiniteListEnabled } = tableStore;

    const setSelectedMovieModalVisible = useCallback((value) => () => tableStore.setSelectedMovieModalVisible(value), [tableStore]);

    const handleMovieSelection = useCallback(
        (movieData) => () => {
            tableStore.setSelectedMovieData(movieData);
            tableStore.setSelectedMovieModalVisible(true);
        },
        [tableStore],
    );

    const handlePageScroll = useCallback(
        (event) => {
            const {
                target: { scrollingElement },
            } = event;
            const NEAR_BOTTOM_THRESHOLD = 300;
            const isNearBottom = scrollingElement.scrollHeight - NEAR_BOTTOM_THRESHOLD < scrollingElement.scrollTop + window.innerHeight;

            if (isNearBottom && isInfiniteListEnabled) {
                paginationStore.setNextPage();
            }
        },
        [isInfiniteListEnabled, paginationStore],
    );

    const renderRow = (movie, index) => (
        <Row
            key={index}
            imdb_rating={movie.imdb_rating}
            rotten_tomatoes_rating={movie.rotten_tomatoes_rating}
            imdb_votes={movie.imdb_votes}
            handleMovieSelection={handleMovieSelection({
                title: movie.title,
                rottenTomatoesRating: movie.rotten_tomatoes_rating,
                imdbRating: movie.imdb_rating,
                imdbVotes: movie.imdb_votes,
            })}
            title={movie.title}
        />
    );

    const renderPaginatedMovieList = () => tableStore.paginatedMovieList.map((movie, index) => movie && renderRow(movie, index));

    const renderInfiniteMovieList = () => moviesList.map((movie, index) => movie && renderRow(movie, index));

    useEffect(() => {
        if (isInfiniteListEnabled && tableStore.loadedPages.length === 1) {
            paginationStore.setNextPage();
        }

        window.addEventListener('scroll', handlePageScroll);

        return () => window.removeEventListener('scroll', handlePageScroll);
    }, [handlePageScroll, isInfiniteListEnabled, paginationStore, tableStore.loadedPages.length]);

    useEffect(() => {
        tableStore.getPaginatedMovieList();
    }, [tableStore]);

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table} cellSpacing='0' cellPadding='0'>
                    <TableHeader tableStore={tableStore} paginationStore={paginationStore} />
                    <tbody>{!isInfiniteListEnabled ? renderPaginatedMovieList() : renderInfiniteMovieList()}</tbody>
                </table>
                {isLoadingTableData && <Loader />}
            </div>
            {isSelectedMovieModalVisible && (
                <SelectedMovieModal
                    imdbRating={selectedMovieData.imdbRating}
                    imdbVotes={selectedMovieData.imdbVotes}
                    title={selectedMovieData.title}
                    releaseData={selectedMovieData.rottenTomatoesRating}
                    onModalClose={setSelectedMovieModalVisible(false)}
                />
            )}
        </>
    );
};

Table.propTypes = {
    tableStore: PropTypes.object.isRequired,
    paginationStore: PropTypes.object.isRequired,
};

export default observer(Table);
