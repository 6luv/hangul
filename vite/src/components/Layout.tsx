import { Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import mintContractAbi from "../lib/mintContractAbi.json";
import { mintContractAddress } from "../lib/contractAddress";

export interface OutletContext {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  isPassed: boolean;
  setIsPassed: Dispatch<SetStateAction<boolean>>;
  mintContract: Contract | null;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [mintContract, setMintContract] = useState<Contract | null>();

  useEffect(() => {
    if (!signer) return;
    setMintContract(new Contract(mintContractAddress, mintContractAbi, signer));
  }, [signer]);

  return (
    <Flex
      maxW={1280}
      mx="auto"
      minH="95vh"
      flexDir="column"
      my={4}
      rounded="lg"
      border="2px"
      borderColor="teal.800"
      boxShadow="2xl"
    >
      <Header signer={signer} setSigner={setSigner} />
      <Flex flexGrow={1} bgColor="blue.100" roundedBottom="lg">
        <Outlet context={{ signer, isPassed, setIsPassed, mintContract }} />
      </Flex>
    </Flex>
  );
};

export default Layout;
