import React, { useState } from 'react';
import axios from 'axios';
import styles from './FileUploadButton.module.css';
import { apiUrl }  from '../../../../../controllers/api';


const FileUploadButton = ({ projectId, updatePage }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('name', selectedFile.name);
        formData.append('project_id', projectId);

        try {
            const response = await axios.post(`${apiUrl}/projectfiles/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await updatePage();
            setSelectedFile(null)
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };

    return (
        <div className={styles.fileUpload}>
            {selectedFile ? (
                <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{selectedFile.name}</span>
                    <button className={styles.btnUpload} onClick={handleUpload}>Enviar</button>
                </div>
            ) : (
                <label htmlFor="file" className={styles.uploadButton}>
                    Anexar Arquivo
                    <input
                        type="file"
                        id="file"
                        className={styles.inputfile}
                        onChange={handleFileChange}
                    />
                </label>
            )}
        </div>
    );
};

export default FileUploadButton;
