import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ handleMovieSelection, title, rotten_tomatoes_rating, imdb_rating, imdb_votes }) => (
    <tr onClick={handleMovieSelection}>
        <td>{title ? title : '-'}</td>
        <td>{rotten_tomatoes_rating ? rotten_tomatoes_rating : '-'}</td>
        <td>{imdb_rating ? imdb_rating : '-'}</td>
        <td>{imdb_votes ? imdb_votes : '-'}</td>
    </tr>
);

Row.propTypes = {
    handleMovieSelection: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    rotten_tomatoes_rating: PropTypes.string.isRequired,
    imdb_rating: PropTypes.string.isRequired,
    imdb_votes: PropTypes.string.isRequired,
};

export default Row;
