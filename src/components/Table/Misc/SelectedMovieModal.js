import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './SelectedMovieModal.module.scss';

const SelectedMovieModal = ({ title, releaseData, imdbRating, imdbVotes, onModalClose }) => (
    <div id='myModal' className={styles.modal}>
        <div className={styles.modalContent}>
            <span className={styles.close} onClick={onModalClose}>
                &times;
            </span>
            <div className={styles.movieInfoContainer}>
                <div>
                    <span>Title: </span>
                    <span>{title ? title : '-'}</span>
                </div>
                <div>
                    <span>Rottent Tomatoes rating: </span>
                    <span>{releaseData ? releaseData : '-'}</span>
                </div>
                <div>
                    <span>IMDB rating: </span>
                    <span>{imdbRating ? imdbRating : '-'}</span>
                </div>
                <div>
                    <span>IMDB votes: </span>
                    <span>{imdbVotes ? imdbVotes : '-'}</span>
                </div>
            </div>
        </div>
    </div>
);

SelectedMovieModal.propTypes = {
    title: PropTypes.string.isRequired,
    releaseData: PropTypes.string.isRequired,
    imdbRating: PropTypes.string.isRequired,
    imdbVotes: PropTypes.number.isRequired,
    onModalClose: PropTypes.func.isRequired,
};

export default observer(SelectedMovieModal);
