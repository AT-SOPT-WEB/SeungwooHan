import { Container, ButtonContainer, Btn } from "./style.js";

const Header = ({ onMenuClick }) => {
  return (
    <Container>
      <div>⚾ 숫자 야구 || 깃허브 검색 ⚾</div>
      <ButtonContainer>
        <Btn onClick={() => onMenuClick("github")}>깃허브 검색</Btn>
        <Btn onClick={() => onMenuClick("baseball")}>숫자야구</Btn>
      </ButtonContainer>
    </Container>
  );
};

export default Header;
