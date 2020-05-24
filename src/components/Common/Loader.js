import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

const Loader = ({ className }) => <div className={cx(styles.loader, className && className)} />;

Loader.propTypes = {
    className: PropTypes.string,
};

export default Loader;
