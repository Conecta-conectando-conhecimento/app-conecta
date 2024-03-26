import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: rgba(52, 136, 136, 1);
  font-size: 1rem;
  width: 9.063rem;
  height: 2.813rem;
  border-radius: 1rem;
  background: transparent;
  border: 0.2rem solid rgba(52, 136, 136, 1);
  cursor: pointer;
  text-align: center;
  margin-bottom: 10px;
  transition: background 0.8s;

  &:hover {
    background: linear-gradient(rgba(52, 136, 136, 1), rgba(34, 186, 187, 1));
    color: #fff;
  }
`;

const Botao2reverse = ({ name, ...props }) => {
  return <StyledButton {...props}>{name}</StyledButton>;
};

export default Botao2reverse;
