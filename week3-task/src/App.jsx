import { Global } from "@emotion/react";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Header />
    </>
  );
}

export default App;
