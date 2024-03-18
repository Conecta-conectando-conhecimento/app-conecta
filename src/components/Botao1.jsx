import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: "Inter", sans-serif;
  color: #fff;
  font-size: 1rem;
  width: 9.063rem;
  height: 2.813rem;
  border-radius: 1rem;
  background: linear-gradient(rgba(242, 86, 30, 1), rgba(250, 130, 16, 1));
  border: 0.2rem solid rgba(242, 86, 30, 1);
  cursor: pointer;
  text-align: center;
  transition: background 0.8s;

  &:hover {
    background: transparent;
    color: rgba(242, 86, 30, 1);
  }
`;

const Botao1 = ({ name, ...props }) => {
  return <StyledButton {...props}>{name}</StyledButton>;
};

export default Botao1;
