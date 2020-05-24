import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './TableHeader.module.scss';

const TableHeader = ({ tableStore, paginationStore }) => {
    const { filterParams } = tableStore;

    const handleSort = useCallback(
        (sortBy) => () => {
            paginationStore.resetPages();

            if (filterParams.sort_by === sortBy) {
                tableStore.changeOrderDirection();

                return;
            }

            tableStore.changeSortBy(sortBy);
        },
        [filterParams.sort_by, paginationStore, tableStore],
    );

    return (
        <thead>
            <tr>
                <th
                    id='title'
                    onClick={handleSort('title')}
                    style={{ width: '50%' }}
                    className={filterParams.sort_by === 'title' && styles[filterParams.order]}
                >
                    Title
                </th>
                <th
                    id='rotten_tomatoes_rating'
                    onClick={handleSort('rotten_tomatoes_rating')}
                    className={filterParams.sort_by === 'rotten_tomatoes_rating' && styles[filterParams.order]}
                >
                    Rottent Tomatoes rating
                </th>
                <th
                    id='imdb_rating'
                    onClick={handleSort('imdb_rating')}
                    className={filterParams.sort_by === 'imdb_rating' && styles[filterParams.order]}
                >
                    IMDB rating
                </th>
                <th
                    id='imdb_votes'
                    onClick={handleSort('imdb_votes')}
                    className={filterParams.sort_by === 'imdb_votes' && styles[filterParams.order]}
                >
                    IMDB votes
                </th>
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    tableStore: PropTypes.object.isRequired,
    paginationStore: PropTypes.object.isRequired,
};

export default observer(TableHeader);
