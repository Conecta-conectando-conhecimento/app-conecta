import styled from "styled-components";
import { BiSearch, BiSliderAlt, BiBell, BiMenu } from "react-icons/bi";
import { RiUserSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { IoEarthOutline } from "react-icons/io5";

const Navegacao = styled.nav`
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

const LogoConecta = styled.img`
    height: 3.5rem; /* Ajuste a altura conforme necessário */
    cursor: pointer;
    margin-right: 1em;  /* Espaçamento entre a logo e a barra de pesquisa */
    @media (max-width: 768px) {
        display: none;
    }
`;

const BarraPesquisa = styled.div`
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

const InputPesquisa = styled.input`
    flex-grow: 1;
    font-size: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    @media (max-width: 768px) {
        width: 50vw;
    }
`;

const BotaoBarraPesquisa = styled.button`
    font-size: 1.1rem;
    padding: 10px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const BotaoIconesNavegacao = styled.button`
    font-size: 2rem;
    padding: 10px;
    background-color: transparent;
    color: #808080;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const IconesNavegacao = styled.div`
    display: flex;
    align-items: center; /* Garantir que os ícones fiquem centralizados verticalmente */
    margin-left: 1em; /* Espaçamento entre a barra de pesquisa e os ícones de navegação */
    @media (max-width: 768px) {
        display: none;
    }
`;

const IconesNavegacaoMobile = styled.div`
    display: flex;
    @media (min-width: 768px) {
        display: none;
    }
`;

const ContainerCentral = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
`;

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Navegacao>
            <ContainerCentral>
                <LogoConecta src="/assets/Logo para Navbar.png" alt="Logo" onClick={() => navigate("/feedProjetos")} />
                <BarraPesquisa>
                    <BotaoBarraPesquisa type="button"><BiSearch /></BotaoBarraPesquisa>
                    <InputPesquisa type="text" placeholder="Pesquisar" />
                    <BotaoBarraPesquisa type="button"><BiSliderAlt /></BotaoBarraPesquisa>
                </BarraPesquisa>
                <IconesNavegacao>
                    <BotaoIconesNavegacao type="button"><IoEarthOutline /></BotaoIconesNavegacao>
                    <BotaoIconesNavegacao type="button"><RiUserSearchLine /></BotaoIconesNavegacao>
                    <BotaoIconesNavegacao type="button"><BiBell /></BotaoIconesNavegacao>
                    <BotaoIconesNavegacao type="button"><BiMenu /></BotaoIconesNavegacao>
                </IconesNavegacao>
            </ContainerCentral>
            <IconesNavegacaoMobile>
                <BotaoIconesNavegacao type="button"><BiMenu /></BotaoIconesNavegacao>
            </IconesNavegacaoMobile>
        </Navegacao>
    );
};

export default Navbar;
