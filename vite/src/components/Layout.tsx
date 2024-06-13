import { Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { JsonRpcSigner } from "ethers";

export interface OutletContext {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

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
        <Outlet context={{ signer }} />
      </Flex>
    </Flex>
  );
};

export default Layout;
