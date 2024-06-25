import React from "react";
import Modal from 'react-modal';
import CardNotifications from './CardNotifications';
import styles from './ModalStyles.module.css';

const NotificationsModal = ({ isOpen, onRequestClose, notifications }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName={styles.modalOverlay}
            className={styles.modalContentNotifications}
            contentLabel="Modal de Notificações"
            ariaHideApp={false}
        >
            <button className={styles.closeButton} onClick={onRequestClose}>&times;</button>
            <h2 className={styles.modalTitle}>Notificações</h2>
            <div className={styles.notificationsContainer}>
                {notifications.map((notification, index) => (
                    <CardNotifications
                        key={index}
                        title={notification.title}
                        about={notification.about}
                    />
                ))}
            </div>
        </Modal>
    );
};

export default NotificationsModal;
