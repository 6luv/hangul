import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Quiz from "./pages/Quiz";
import Mint from "./pages/Mint";
import My from "./pages/My";
import Sale from "./pages/Sale";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/my" element={<My />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
