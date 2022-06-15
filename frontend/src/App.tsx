import React, { FC, useEffect ,useState } from "react";
import { Button } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/main";

import { mintAnimalTokenContract } from "../contracts/index";

const App: FC = () => {
  return <BrowserRouter>
  <Routes>
      <Route path="/" element={<Main />} />
    </Routes></BrowserRouter>
};

export default App;
