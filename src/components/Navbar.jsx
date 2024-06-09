import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BiSearch, BiSliderAlt, BiSolidBell, BiMenu, BiSolidUserDetail } from "react-icons/bi";
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
    font-size: 1.3rem;
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
    position: relative;
`;

const IconesNavegacao = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1em;

    @media (max-width: 768px) {
        display: none;
    }
`;

const BotaoIconesNavegacaoBell = styled.button`
    font-size: 1.5rem;
    padding: 10px;
    background-color: transparent;
    color: #808080;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
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
    background-color: white;
    box-shadow: 0px 5px 9px rgba(0, 0, 0, 0.2);
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
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleNavigation = async (path) => {
        if (path === "/") {
            await logout();
        }
        navigate(path);
        setMenuOpen(false);
    };


    //Função para Logout que não está funcionando
    const logout = async () => {
        try {
            // Remover o token de autenticação
            localStorage.removeItem("authToken");

            // Limpar outros dados do usuário
            localStorage.removeItem("userData");

            console.log("Usuário deslogado com sucesso");
        } catch (error) {
            console.error("Erro ao deslogar o usuário", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (menuOpen && buttonRef.current && menuRef.current) {
            const { bottom, right, width } = buttonRef.current.getBoundingClientRect();
            menuRef.current.style.top = `${bottom}px`;
            menuRef.current.style.left = `${right - width - 190}px`; // Adjust for the menu width
        }
    }, [menuOpen]);

    return (
        <Navegacao>
            <ContainerCentral>
                <LogoConecta src="/assets/Logo para Navbar.png" alt="Logo" onClick={() => navigate("/feedProjetos")} />
                <BarraPesquisa>
                    <BotaoBarraPesquisa type="button"><BiSliderAlt /></BotaoBarraPesquisa>
                    <InputPesquisa type="text" placeholder="Pesquisar" />
                    <BotaoBarraPesquisa type="button"><BiSearch /></BotaoBarraPesquisa>
                </BarraPesquisa>
                <IconesNavegacao>
                    <BotaoIconesNavegacao type="button"><BiSolidUserDetail /></BotaoIconesNavegacao>
                    <BotaoIconesNavegacaoBell type="button"><BiSolidBell /></BotaoIconesNavegacaoBell>
                    <BotaoIconesNavegacao type="button" onClick={toggleMenu} ref={buttonRef}><BiMenu /></BotaoIconesNavegacao>
                    {menuOpen && (
                        <DropdownMenu ref={menuRef}>
                            <DropdownItem onClick={() => handleNavigation("/userprofile")}>Perfil do usuário</DropdownItem>
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
