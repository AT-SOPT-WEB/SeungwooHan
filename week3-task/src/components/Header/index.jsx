import { Container, ButtonContainer, Btn } from "./style.js";

const Header = () => {
  return (
    <Container>
      <div>⚾ 숫자 야구 || 깃허브 검색 ⚾</div>
      <ButtonContainer>
        <Btn>깃허브 검색</Btn>
        <Btn>숫자야구</Btn>
      </ButtonContainer>
    </Container>
  );
};

export default Header;
