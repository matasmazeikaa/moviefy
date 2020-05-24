import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './TableHeader.module.scss';

const TableHeader = ({ tableStore }) => {
    const { filterParams } = tableStore;
    const handleSort = useCallback(
        (sortBy) => () => {
            if (filterParams.sort_by === sortBy) {
                tableStore.changeOrderDirection();

                return;
            }

            tableStore.changeSortBy(sortBy);
        },
        [filterParams.sort_by, tableStore],
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
                    id='release_date'
                    onClick={handleSort('release_date')}
                    className={filterParams.sort_by === 'release_date' && styles[filterParams.order]}
                >
                    Release date
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
};

export default observer(TableHeader);
