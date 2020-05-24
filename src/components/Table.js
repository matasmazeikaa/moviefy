import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../utils/useStore';
import styles from './Table.module.scss';
import SelectedMovieModal from './Table/Misc/SelectedMovieModal';
import Loader from './Common/Loader';
import TableHeader from './Table/TableHeader';
import Row from './Table/Row';

const Table = () => {
    const { tableStore, paginationStore } = useStore();
    const { moviesList, isSelectedMovieModalVisible, selectedMovieData, isLoadingTableData, isInfiniteListEnabled } = tableStore;

    const setSelectedMovieModalVisible = useCallback((value) => () => tableStore.setSelectedMovieModalVisible(value), [tableStore]);

    const handleMovieSelection = useCallback(
        (movieData) => () => {
            tableStore.setSelectedMovieData(movieData);
            tableStore.setSelectedMovieModalVisible(true);
        },
        [tableStore],
    );

    const handlePageScroll = (event) => {
        const {
            target: { scrollingElement },
        } = event;
        const NEAR_BOTTOM_THRESHOLD = 300;
        const isNearBottom = scrollingElement.scrollHeight - NEAR_BOTTOM_THRESHOLD < scrollingElement.scrollTop + window.innerHeight;

        if (isNearBottom && isInfiniteListEnabled) {
            paginationStore.setNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handlePageScroll);

        return () => window.removeEventListener('scroll', handlePageScroll);
    });

    const renderRow = (movie) => (
        <Row
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

    const renderPaginatedMovieList = () => tableStore.paginatedMovieList.map((movie) => movie && renderRow(movie));

    const renderInfiniteMovieList = () => moviesList.map((movie) => movie && renderRow(movie));

    useEffect(() => {
        tableStore.getPaginatedMovieList();
    }, [tableStore]);

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table} cellSpacing='0' cellPadding='0'>
                    <TableHeader tableStore={tableStore} paginationStore={paginationStore}/>
                    <tbody>{!isInfiniteListEnabled ? renderPaginatedMovieList() : renderInfiniteMovieList()}</tbody>
                </table>
                {isLoadingTableData && <Loader className={styles.spinnerPositionDefault} />}
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

export default observer(Table);
