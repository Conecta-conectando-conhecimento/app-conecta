import styled from "styled-components";

export const Navegacao = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    background-color: white;
    padding: 0 4em;
    box-shadow: 0px 1px 5px black;

    @media (max-width: 768px) {
        padding: 0 1em;
    }
`;

export const LogoConecta = styled.img`
    height: 3.5rem;
    cursor: pointer;
    margin-right: 1em;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const BarraPesquisa = styled.div`
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 2px;
    flex: 1;
    max-width: 600px;

    @media (max-width: 768px) {
        width: 80vw;
    }
`;

export const InputPesquisa = styled.input`
    flex-grow: 1;
    font-size: 1rem;
    padding: 10px;
    border: none;
    outline: none;
    background-color: transparent;

    @media (max-width: 768px) {
        width: 50vw;
    }
`;

export const BotaoBarraPesquisa = styled.button`
    font-size: 1.3rem;
    padding: 10px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const BotaoIconesNavegacao = styled.button`
    font-size: 2rem;
    padding: 10px;
    background-color: transparent;
    color: #808080;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
`;

export const IconesNavegacao = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1em;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const BotaoIconesNavegacaoBell = styled.button`
    font-size: 1.5rem;
    padding: 10px;
    background-color: transparent;
    color: #808080;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
`;

export const IconesNavegacaoMobile = styled.div`
    display: flex;

    @media (min-width: 768px) {
        display: none;
    }
`;

export const ContainerCentral = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    background-color: white;
    box-shadow: 0px 5px 9px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    overflow: hidden;
    z-index: 10;
    width: 250px;
`;

export const DropdownItem = styled.button`
    width: 100%;
    padding: 10px;
    text-align: left;
    background-color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #f0f0f0;
    }
`;
