import React, { FC, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { mintAnimalTokenContract } from "/home/matt7003/codestates/dp/frontend/src/contracts/index";

//인터페이스는 ts에서 사용되는 문법임
// 클래스에서 init부분이 따로 빠져나오는거라고 생각하면 좋다
//어떤 객체가 이러이러한 프로퍼티 혹은 메소드를 가진다고 선언하는 부분임
interface MainProps {
    account: string;
}

//Main: FC 이런식으로 쓰는걸 react의 함수형 컴포넌트라고 함
const Main: FC<MainProps> = ({account}) => {

    const [newAnimalCard, setNewAnimalCard] = useState<string>(); //newAnimalCard 상태변수선언

    const onClickMint = async () => {
        try {
            if(!account) return; // Metamask 로그인 안되어있으면 그냥 리턴

            const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({ from: account});

            console.log(response);

        } catch(error){
            console.log(error);
        }
    };

    return<Flex w="full" h = "100vh" justifyContent="conter" alignItems = "center" direction="column">
        <Box>
            {newAnimalCard ? (
                <div>AnimalCard</div>
            ) : (
                <Text>Let's mint Animal Card!!</Text>
            )}
        </Box>

        <Button onClick={onClickMint}>Mint</Button>
    </Flex>
    

};

export default Main;