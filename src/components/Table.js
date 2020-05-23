import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../utils/useStore';
import styles from './Table.module.scss';

const Table = () => {
    const { tableStore } = useStore();
    const { moviesList } = tableStore;

    const renderMovieList = () => moviesList.map((movie) =>
        <tr>
            <td>{movie.title}</td>
            <td>{movie.release_date}</td>
            <td>{movie.imdb_rating}</td>
            <td>{movie.imdb_votes}</td>
        </tr>
    );

    useEffect(() => {
        tableStore.getPaginatedMovieList();
    }, [tableStore]);

    return (
        <table className={styles.table}>
            <tr>
                <th>Title</th>
                <th>Release date</th>
                <th>IMDB rating</th>
                <th>IMDB votes</th>
            </tr>
            {renderMovieList()}
        </table>
    );
};

export default observer(Table);
