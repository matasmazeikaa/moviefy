import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ errorMessage }) => <div className={styles.error}>{errorMessage}</div>;

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
