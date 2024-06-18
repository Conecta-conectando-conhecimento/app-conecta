import Navbar from '../../navbar/Navbar';
import { useState, useEffect } from "react";
import {
  Container,
  ContainerInputs,
  Titulo,
  InputBox,
  InputBoxLabel,
  InputBoxInput,
  ContainerCampus,
  SelecaoCampus,
  ContainerInputsAll,
  InputTextArea,
  StyledButton,
} from "./EditProfileStyles";
import { BsFillMortarboardFill } from "react-icons/bs";
import axios from "axios";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    userName: "",
    campus: "Asa Norte", // Valor padrão ou escolha um valor padrão apropriado
    sobre: "",
    linkedin: "",
    instagram: "",
    email: "",
  });

  const emailteste = "thallyston@hotmail.com";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/edit?email=${emailteste}`);
        console.log("passou bitch");

        if (response.data) {
          const user = response.data.userData;
          setUserData({
            email: user.email,
            userName: user.nome_usuario,
            campus: user.campus,
            sobre: user.sobre,
            linkedin: user.linkedin,
            instagram: user.instagram,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8800/${emailteste}`, {
        nome_usuario: userData.userName,
        campus: userData.campus,
        sobre: userData.sobre,
        linkedin: userData.linkedin,
        instagram: userData.instagram,
        email: userData.email,
      });

      console.log("Dados salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Titulo>Edição de perfil</Titulo>
        <ContainerInputsAll>
          <ContainerInputs>
            <InputBox>
              <InputBoxLabel id="nameUserLabel" htmlFor="nameUser">
                Nome de usuário
              </InputBoxLabel>
              <InputBoxInput
                type="text"
                id="nameUser"
                name="nameUser"
                defaultValue={userData.userName}
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
              />
            </InputBox>
            <InputBox>
              <InputBoxLabel htmlFor="campus">Campus</InputBoxLabel>
              <ContainerCampus>
                <BsFillMortarboardFill style={{ fontSize: "2rem" }} />
                <SelecaoCampus
                  value={userData.campus}
                  onChange={(e) =>
                    setUserData({ ...userData, campus: e.target.value })
                  }
                >
                  <option value=""></option>
                  <option value="Asa Norte">Asa Norte</option>
                  <option value="Taguatinga">Taguatinga</option>
                  <option value="Ambos">Ambos</option>
                </SelecaoCampus>
              </ContainerCampus>
            </InputBox>
          </ContainerInputs>
          <ContainerInputs>
            <InputBox>
              <InputBoxLabel id="nameUserLabel" htmlFor="">
                Fale sobre você
              </InputBoxLabel>
              <InputTextArea
                rows="10"
                defaultValue={userData.sobre}
                onChange={(e) =>
                  setUserData({ ...userData, sobre: e.target.value })
                }
              />
            </InputBox>
          </ContainerInputs>
          <ContainerInputs>
            <InputBox>
              <InputBoxLabel htmlFor="linkedinLink">Linkedin</InputBoxLabel>
              <InputBoxInput
                type="text"
                id="linkedinLink"
                name="linkedinLink"
                defaultValue={userData.linkedin}
                onChange={(e) =>
                  setUserData({ ...userData, linkedin: e.target.value })
                }
              />
            </InputBox>
            <InputBox>
              <InputBoxLabel htmlFor="instagramLink">Instagram</InputBoxLabel>
              <InputBoxInput
                type="text"
                id="instagramLink"
                name="instagramLink"
                defaultValue={userData.instagram}
                onChange={(e) =>
                  setUserData({ ...userData, instagram: e.target.value })
                }
              />
            </InputBox>
          </ContainerInputs>
        </ContainerInputsAll>
        <StyledButton onClick={(e) => handleSave()}>
          Salvar alterações
        </StyledButton>
      </Container>
    </>
  );
};

export default EditProfile;
