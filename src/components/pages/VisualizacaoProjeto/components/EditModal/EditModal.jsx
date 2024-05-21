import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importando os estilos padrão do React Quill
import styles from './EditModal.module.css';

// Configuração personalizada da barra de ferramentas do Quill
const fullModules = {
    toolbar: {
        container: [
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ 'align': [] }],
            ['clean'] // Botão de limpar formatação
        ]
    }
};

const fullFormats = [
    'list', 'bullet', 'bold', 'italic', 'underline', 'align'
];

const simpleModules = {
    toolbar: false, // Nenhuma barra de ferramentas
    clipboard: {
        matchVisual: false
    }
};

// Mapeamento de campos para títulos amigáveis
const fieldTitles = {
    introduction: 'Introdução',
    about: 'Sobre',
    title: 'Título',
    activities: 'Atividades'
    // Adicione outros mapeamentos conforme necessário
};

const EditModal = ({ field, value, onClose, onSave }) => {
    const [editorValue, setEditorValue] = useState(value);

    // Determina se deve usar o editor simples
    const useSimpleEditor = field === 'introduction' || field === 'title';

    const handleChange = (content) => {
        setEditorValue(content);
    };

    const handleSave = () => {
        onSave(field, editorValue); // Passando o conteúdo do editor para a função onSave
        onClose(); // Fechar o modal após salvar
    };

    useEffect(() => {
        if (!useSimpleEditor) {
            const toolbarButtons = document.querySelectorAll('.ql-toolbar button');
            toolbarButtons.forEach(button => {
                switch (button.classList[0]) {
                    case 'ql-bold':
                        button.title = 'Negrito';
                        break;
                    case 'ql-italic':
                        button.title = 'Itálico';
                        break;
                    case 'ql-underline':
                        button.title = 'Sublinhado';
                        break;
                    case 'ql-list':
                        if (button.value === 'ordered') {
                            button.title = 'Lista Ordenada';
                        } else if (button.value === 'bullet') {
                            button.title = 'Lista com Marcadores';
                        }
                        break;
                    case 'ql-clean':
                        button.title = 'Remover Formatação';
                        break;
                    case 'ql-align':
                        button.title = 'Alinhar';
                        break;
                    default:
                        break;
                }
            });
        }
    }, [useSimpleEditor]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar {fieldTitles[field] || field}</h2>
                <ReactQuill
                    theme="snow"
                    value={editorValue}
                    onChange={handleChange}
                    modules={useSimpleEditor ? simpleModules : fullModules}
                    formats={useSimpleEditor ? [] : fullFormats}
                />
                <div className={styles.buttonGroup}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
