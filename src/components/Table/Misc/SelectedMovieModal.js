import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './SelectedMovieModal.module.scss';
import OutsideClickHandler from '../../Common/OutsideClickHandler';

const SelectedMovieModal = ({ title, rottenTomatoesRating, imdbRating, imdbVotes, onModalClose, isSelectedMovieModalVisible }) => (
    <div id='myModal' className={styles.modal} >
        <div className={styles.modalContent}>
            <OutsideClickHandler isContainerOpen={isSelectedMovieModalVisible} onOutsideClick={onModalClose}>
                <span className={styles.close} onClick={onModalClose}>
                    &times;
                </span>
                <div className={styles.movieInfoContainer}>
                    <div>
                        <span>Title: </span>
                        <span>{title ? title : '-'}</span>
                    </div>
                    <div>
                        <span>Rotten Tomatoes rating: </span>
                        <span>{rottenTomatoesRating ? rottenTomatoesRating : '-'}</span>
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
            </OutsideClickHandler>
        </div>
    </div>
);

SelectedMovieModal.propTypes = {
    title: PropTypes.string.isRequired,
    rottenTomatoesRating: PropTypes.number,
    imdbRating: PropTypes.number,
    imdbVotes: PropTypes.number,
    onModalClose: PropTypes.func.isRequired,
    isSelectedMovieModalVisible: PropTypes.bool.isRequired,
};

export default observer(SelectedMovieModal);
