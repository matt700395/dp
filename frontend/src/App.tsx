import React, { FC, useEffect ,useState } from "react";
import { Button } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "/home/matt7003/codestates/dp/frontend/src/routes/main";

import { mintAnimalTokenContract } from "/home/matt7003/codestates/dp/frontend/src/contracts/index";

const App: FC = () => {
//메타 마스크 연결하기
  const [account, setAccount] = useState<string>("");

  const getAccount = async ()=>{
    try {
      if(window.ethereum){ // 메타마스크가 설치되어있으면 로그인 실행
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      }else{
        alert("please install Metamask!")
      }
    }catch (error){

    }
  }

  useEffect(() =>{
    getAccount();
  }, [account]);


  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main account={account} />} />
    </Routes>
  </BrowserRouter>
};

export default App;
