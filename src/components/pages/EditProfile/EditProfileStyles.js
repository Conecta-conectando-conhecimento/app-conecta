import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: rgba(245, 245, 245, 1);
    
    padding: 1.5rem 2.2rem;
    width: 100vw;
`;

export const ContainerInputs = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    gap: 1rem;
    flex: 1.5;
`;

export const ContainerInputsAll = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2rem;
`;

export const Titulo = styled.h1`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
`;

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

export const InputBoxLabel = styled.label`
    font-size: 1.2rem;
`;

export const InputBoxInput = styled.input`
    border-radius: 1rem;
    font-size: 1rem;
    padding: 8px;
    font-family: 'Inter', sans-serif;
`;

export const ContainerCampus = styled.div`
    display: flex;
    gap: 10px;
    height: 2rem;
`;

export const SelecaoCampus = styled.select`
    width: 100%;
    font-size: 1rem;
    border-radius: 1rem;
    padding-left: 8px;
`;

export const InputTextArea = styled.textarea`
    border-radius: 1rem;
    font-size: 1rem;
    padding: 8px;
    resize: none;
    font-family: 'Inter', sans-serif;
`;

export const StyledButton = styled.button`
    font-family: "Inter", sans-serif;
    font-weight: bold;
    color: rgba(52, 136, 136, 1);
    font-size: 1rem;
    width: 100%;
    max-width: 10rem; /* Defina um tamanho máximo */
    min-height: 2.8rem;
    height: auto;
    border-radius: 1rem;
    background: transparent;
    border: 0.2rem solid rgba(52, 136, 136, 1);
    cursor: pointer;
    text-align: center;
    margin-bottom: 10px;
    transition: background 0.8s;
    align-self: flex-end;
    margin-top: 1rem;

    &:hover {
        background: linear-gradient(rgba(52, 136, 136, 1), rgba(34, 186, 187, 1));
        color: #fff;
    }
`;

