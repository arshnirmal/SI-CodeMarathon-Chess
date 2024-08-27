import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/navbar.js";
import AddMatchPage from "../pages/AddMatchPage.js";
import HomePage from "../pages/HomePage.js";
import MostWinsPage from "../pages/MostWinsPage.js";
import SearchPlayersPage from "../pages/SearchPlayersPage.js";
import TopPlayersPage from "../pages/TopPlayersPage.js";

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-match" element={<AddMatchPage />} />
        <Route path="/top-players" element={<TopPlayersPage />} />
        <Route path="/search-players" element={<SearchPlayersPage />} />
        <Route path="/most-wins" element={<MostWinsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;
