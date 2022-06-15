
import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/main";



const App: FC = () => {
  const [account, setAccount] = useState<string>(""); //account를 받을 빈 변수 선언


  //메타마스크를 통해서 계정을 가져옴
  const getAccount = async () =>{
    try{
      //메타마스크가 설치되어있으면 이게 실행됨
      if(window.ethereum){
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts", //account 정보달라고 요청
        })

        setAccount(accounts[0]);
      } else {
        alert("install Metamask!");
      }
    } catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    getAccount();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
