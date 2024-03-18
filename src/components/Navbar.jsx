import styled from "styled-components";
import { BiSearch, BiSliderAlt, BiWorld, BiBell, BiMenu } from "react-icons/bi";
import { RiUserSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router";


const Navegacao = styled.nav`
    display: flex;
    justify-content: space-between;
    height: 4rem;
    background-color: white;
    padding: 0 4em; 

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
    align-items: center;
    border-radius: 5px;
    flex: 1.5;
   
    max-width: 30vw;
    @media (max-width: 768px) {
       width: 60vw;
    }
    
`;

const InputPesquisa = styled.input`
    flex-grow: 1; 
    font-size: 1.2rem;
    padding: 10px;
    border: none;
    outline: none;
    background-color: #f0f0f0;
    @media (max-width: 768px) {
       width: 50vw;
    }
    
`;

const BotaoBarraPesquisa = styled.button`
    font-size: 1.1rem;
    padding: 10px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const BotaoIconesNavegacao = styled.button`
    font-size: 2rem; /* Ajuste o tamanho desejado aqui */
    padding:  10px;
    background-color: white;
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
            <Container1 >
            <LogoConecta src="/assets/Logo para Navbar.png" alt="Logo" onClick={() => navigate("/")} />
            <BarraPesquisa>
                <BotaoBarraPesquisa type="button"><BiSliderAlt /></BotaoBarraPesquisa>
                <InputPesquisa type="text" placeholder="Pesquisar..." />
                <BotaoBarraPesquisa type="button"><BiSearch /></BotaoBarraPesquisa>
            </BarraPesquisa>
            </Container1>
            <Container1>
            <IconesNavegacao>
                <BotaoIconesNavegacao type="button"><BiWorld /></BotaoIconesNavegacao>
                <BotaoIconesNavegacao type="button"><RiUserSearchLine /></BotaoIconesNavegacao>
                <BotaoIconesNavegacao type="button"><BiBell /></BotaoIconesNavegacao>
                <BotaoIconesNavegacao type="button"><BiMenu /></BotaoIconesNavegacao>
            </IconesNavegacao>
            <IconesNavegacaoMobile>
                <BotaoIconesNavegacao type="button"><BiMenu /></BotaoIconesNavegacao>
            </IconesNavegacaoMobile>
            </Container1>
        </Navegacao>
    );
}

export default Navbar;