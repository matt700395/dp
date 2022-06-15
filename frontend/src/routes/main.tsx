import React, { FC, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { mintAnimalTokenContract } from "/home/matt7003/codestates/dp/frontend/src/contracts/index";
import AnimalCard from "../components/AnimalCard";


//인터페이스는 ts에서 사용되는 문법임
// 클래스에서 init부분이 따로 빠져나오는거라고 생각하면 좋다
//어떤 객체가 이러이러한 프로퍼티 혹은 메소드를 가진다고 선언하는 부분임
interface MainProps {
    account: string;
}

//Main: FC 이런식으로 쓰는걸 react의 함수형 컴포넌트라고 함
const Main: FC<MainProps> = ({account}) => {

    //const [newAnimalCard, setNewAnimalCard] = useState<string>(); //newAnimalCard 상태변수선언
    const [newAnimalType, setNewAnimalType] = useState<string>(); //newAnimalType으로 구분해서 사진을 받아올 예정임

    const onClickMint = async () => {
        try {
            if(!account) return; // Metamask 로그인 안되어있으면 그냥 리턴

            const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({ from: account});

            //console.log(response);
            //여기부터 민팅 사진 보일수있게 새롭게 추가한 코드
            if (response.status) {//민팅하면 response가 오고 이 status가 참이면 아래 내용을 변수에 저장함
                console.log("민팅됨!");
                const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();//balanceOf는 현재 민팅된 총 개수를 말해줌
                const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength, 10)-1).call();
                const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

                setNewAnimalType(animalType);
            
            }

        } catch(error){
            console.error(error);
        }
    };

    return<Flex w="full" h = "100vh" justifyContent="conter" alignItems = "center" direction="column">
        <Box>
            {newAnimalType ? (
                <AnimalCard animalType={newAnimalType} />
            ) : (
                <Text>Let's mint Animal Card!!</Text>
            )}
        </Box>

        <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>Mint</Button>
    </Flex>
    

};

export default Main;