import React, { useState, useRef, useEffect } from "react";
import { BiSearch, BiSliderAlt, BiSolidBell, BiMenu, BiSolidUserDetail } from "react-icons/bi";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import {
    Navegacao,
    LogoConecta,
    BarraPesquisa,
    InputPesquisa,
    BotaoBarraPesquisa,
    BotaoIconesNavegacao,
    IconesNavegacao,
    BotaoIconesNavegacaoBell,
    IconesNavegacaoMobile,
    ContainerCentral,
    DropdownMenu,
    DropdownItem
} from "./NavbarStyles";
import ReportProblemModal from "./ReportProblemModal";
import SugestionsModal from './SugestionsModal';
import ConfigurationsModal from './ConfigurationsModal';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSugestionsModal, setShowSugestionsModal] = useState(false);
    const [isReportProblemModalOpen, setIsReportProblemModalOpen] = useState(false);
    const [isConfigurationsModalOpen, setIsConfigurationsModalOpen] = useState(false);
    const [userConfigData, setUserConfigData] = useState(null); // Estado para os dados do usuário
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const { user, signout } = useAuth();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSugestionsModal = () => {
        setShowSugestionsModal(!showSugestionsModal);
        setMenuOpen(false);
    };

    const handleNavigation = async (path) => {
        if (path === "/") {
            await logout();
        } else {
            navigate(path);
        }
        setMenuOpen(false);
    };

    const handleProfileNavigation = async () => {
        if (user && user.userId) {
            console.log(`Navigating to user profile with ID: ${user.userId}`);
            navigate(`/userprofile/${user.userId}`);
        } else {
            console.log("User ID is not available.");
        }
        setMenuOpen(false);
    };

    const handleReportProblem = () => {
        setIsReportProblemModalOpen(true);
        setMenuOpen(false);
    };

    const handleConfigurations = async () => {
        try {
            const response = await axios.get(`${apiUrl}/user/${user.userId}`);
            setUserConfigData(response.data.data);
            setIsConfigurationsModalOpen(true);
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error.message);
        }
        setMenuOpen(false);
    };

    const handleSaveReport = (reportText) => {
        console.log("Problem reported:", reportText);
        setIsReportProblemModalOpen(false);
    };

    const logout = async () => {
        try {
            await signout();
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
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
            menuRef.current.style.left = `${right - width - 190}px`;
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
                    <BotaoIconesNavegacao type="button" onClick={() => navigate("/feedUsuario")}><BiSolidUserDetail /></BotaoIconesNavegacao>
                    {/*<BotaoIconesNavegacaoBell type="button"><BiSolidBell /></BotaoIconesNavegacaoBell>*/}
                    <BotaoIconesNavegacao type="button" onClick={toggleMenu} ref={buttonRef}><BiMenu /></BotaoIconesNavegacao>
                    {menuOpen && (
                        <DropdownMenu ref={menuRef}>
                            <DropdownItem onClick={handleProfileNavigation}>Perfil do usuário</DropdownItem>
                            <DropdownItem onClick={handleReportProblem}>Reportar problema</DropdownItem>
                            <DropdownItem onClick={toggleSugestionsModal}>Sugestões</DropdownItem>
                            <DropdownItem onClick={handleConfigurations}>Configurações</DropdownItem>
                            <DropdownItem onClick={() => handleNavigation("/")}>Sair</DropdownItem>
                        </DropdownMenu>
                    )}
                </IconesNavegacao>
            </ContainerCentral>
            <IconesNavegacaoMobile>
                <BotaoIconesNavegacao type="button" onClick={toggleMenu}><BiMenu /></BotaoIconesNavegacao>
            </IconesNavegacaoMobile>
            {showSugestionsModal && (
                <SugestionsModal
                    isOpen={showSugestionsModal}
                    onRequestClose={toggleSugestionsModal}
                    onSave={(suggestionText) => {
                        console.log('Salvando sugestão:', suggestionText);
                        toggleSugestionsModal();
                    }}
                />
            )}
            <ReportProblemModal
                isOpen={isReportProblemModalOpen}
                onRequestClose={() => setIsReportProblemModalOpen(false)}
                onSave={handleSaveReport}
            />
            <ConfigurationsModal
                show={isConfigurationsModalOpen}
                user={userConfigData}
                onClose={() => setIsConfigurationsModalOpen(false)}
                onSave={(updatedData) => {
                    console.log('Configurações salvas:', updatedData);
                    setIsConfigurationsModalOpen(false);
                }}
            />
        </Navegacao>
    );
};

export default Navbar;
