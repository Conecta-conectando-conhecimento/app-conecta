import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BiSearch, BiSliderAlt, BiBell, BiMenu } from "react-icons/bi";
import { RiUserSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router";

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
    height: 3.5rem;
    cursor: pointer;
    margin-right: 1em;

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
    position: relative; /* Added for positioning the dropdown */
`;

const IconesNavegacao = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1em;

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

const DropdownMenu = styled.div`
    position: absolute;
    top: 3.5rem; /* Adjusted to position below the menu icon */
    right: 15rem; /* Adjusted to align with the right edge of the icon */
    background-color: white;
    box-shadow: 0px 5px 9px rgba(0, 0, 0, 0.2); /* Added shadow */
    border-radius: 5px;
    overflow: hidden;
    z-index: 10;
    width: 250px;
`;

const DropdownItem = styled.button`
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

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

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
                    <BotaoIconesNavegacao type="button"><RiUserSearchLine /></BotaoIconesNavegacao>
                    <BotaoIconesNavegacao type="button"><BiBell /></BotaoIconesNavegacao>
                    <BotaoIconesNavegacao type="button" onClick={toggleMenu} ref={menuRef}><BiMenu /></BotaoIconesNavegacao>
                    {menuOpen && (
                        <DropdownMenu>
                            <DropdownItem onClick={() => handleNavigation("/userprofile")}>Perfil do usuário</DropdownItem>
                            <DropdownItem onClick={() => handleNavigation("/meus-projetos")}>Meus projetos</DropdownItem>
                            <DropdownItem onClick={() => handleNavigation("/meus-salvos")}>Meus salvos</DropdownItem>
                            <DropdownItem onClick={() => handleNavigation("/reportar-problema")}>Reportar problema</DropdownItem>
                            <DropdownItem onClick={() => handleNavigation("/sugestoes")}>Sugestões</DropdownItem>
                            <DropdownItem onClick={() => handleNavigation("/configuracoes")}>Configurações</DropdownItem>
                            <DropdownItem onClick={() => handleNavigation("/")}>Sair</DropdownItem>
                        </DropdownMenu>
                    )}
                </IconesNavegacao>
            </ContainerCentral>
            <IconesNavegacaoMobile>
                <BotaoIconesNavegacao type="button" onClick={toggleMenu}><BiMenu /></BotaoIconesNavegacao>
            </IconesNavegacaoMobile>
        </Navegacao>
    );
};

export default Navbar;
