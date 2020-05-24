import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ handleMovieSelection, title, release_date, imdb_rating, imdb_votes }) => (
    <tr onClick={handleMovieSelection}>
        <td>{title ? title : '-'}</td>
        <td>{release_date ? release_date : '-'}</td>
        <td>{imdb_rating ? imdb_rating : '-'}</td>
        <td>{imdb_votes ? imdb_votes : '-'}</td>
    </tr>
);

Row.propTypes = {
    handleMovieSelection: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    imdb_rating: PropTypes.string.isRequired,
    imdb_votes: PropTypes.string.isRequired,
};

export default Row;
