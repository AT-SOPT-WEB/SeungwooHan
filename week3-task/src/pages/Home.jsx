import { useState } from "react";
import Header from "../components/Header";
import GithubSearch from "./GithubSearch";
import Baseball from "./Baseball";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("github");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <Header onMenuClick={handleMenuClick} selectedMenu={selectedMenu} />
      <main>
        {selectedMenu === "github" && <GithubSearch />}
        {selectedMenu === "baseball" && <Baseball />}
      </main>
    </>
  );
};

export default Home;
