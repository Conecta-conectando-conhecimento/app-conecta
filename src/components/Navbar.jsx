import styled from "styled-components";
import { BiSearch, BiSliderAlt, BiBell, BiMenu } from "react-icons/bi";
import { RiUserSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { IoEarthOutline } from "react-icons/io5";

const Navegacao = styled.nav`
    display: flex;
    justify-content: space-between;
    height: 3.5rem;
    background-color: white;
    padding: 0 4em; 
    box-shadow: 0px 1px 5px black;

    @media (max-width: 768px) {
        padding: 0 1em;
}

`;

const LogoConecta = styled.img`
    max-height: 100%;
    cursor: pointer;
    @media (max-width: 768px) {
        display: none;
    }
`;

const BarraPesquisa = styled.div`
    display: flex;
    margin: 5px;
    background-color: #f0f0f0;
    align-items: space-between;
    border-radius: 2px;
    flex: 1.5;

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
    font-size: 2rem; /* Ajuste o tamanho desejado aqui */
    padding:  10px;
    background-color: transparent;
    color: #808080;
    border: none;
    border-radius: 5px;
    cursor: pointer;

`;

const IconesNavegacao = styled.div`
    @media (max-width: 768px){
        display: none;
    }
`;
const IconesNavegacaoMobile = styled.div`
    @media (min-width: 768px){
        display: none;
    }
`
const Container1 = styled.div`
    display: flex;
`




const Navbar = () => {

    const navigate = useNavigate();

    return (
        <Navegacao>
            <Container1>
                <LogoConecta src="/assets/Logo para Navbar.png" alt="Logo" onClick={() => navigate("/")} />
                <BarraPesquisa>
                    <BotaoBarraPesquisa type="button"><BiSearch /></BotaoBarraPesquisa>
                    <InputPesquisa type="text" placeholder="Pesquisar" />
                    <BotaoBarraPesquisa type="button"><BiSliderAlt /></BotaoBarraPesquisa>
                </BarraPesquisa>
                </Container1>
                <IconesNavegacao>
                    <BotaoIconesNavegacao type="button"><IoEarthOutline/></BotaoIconesNavegacao>
                    <BotaoIconesNavegacao type="button"><RiUserSearchLine/></BotaoIconesNavegacao>
                    <BotaoIconesNavegacao type="button"><BiBell/></BotaoIconesNavegacao>
                    <BotaoIconesNavegacao type="button"><BiMenu/></BotaoIconesNavegacao>
                </IconesNavegacao>
                <IconesNavegacaoMobile>
                    <BotaoIconesNavegacao type="button"><BiMenu/></BotaoIconesNavegacao>
                </IconesNavegacaoMobile>
        </Navegacao>
    );
}

export default Navbar;