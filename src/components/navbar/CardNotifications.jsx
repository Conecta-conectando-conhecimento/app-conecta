import React from 'react';
import styles from './CardNotifications.module.css';

const CardNotifications = ({ title, about }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.about}>{about}</p>
        </div>
    );
};

export default CardNotifications;
