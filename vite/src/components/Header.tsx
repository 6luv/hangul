import { Button, Flex } from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import { Dispatch, FC, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMetamaskLogin } from "../lib";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const headerNavLinks = [
  {
    name: "문제",
    path: "/quiz",
  },
  {
    name: "발행",
    path: "/mint",
  },
  {
    name: "가게",
    path: "/sale",
  },
  {
    name: "내 페이지",
    path: "/my",
  },
];

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const navigate = useNavigate();

  const onClickmetamaskLogout = () => {
    setSigner(null);
  };

  return (
    <Flex
      h={20}
      justifyContent="space-between"
      alignItems="center"
      px={8}
      borderColor="teal.800"
      borderBottom="2px"
    >
      <Link to="/">
        <Flex fontSize={28} fontWeight="bold">
          훈민정음
        </Flex>
      </Link>
      <Flex w="30%" display={["none", "none", "flex"]} gap={20}>
        {headerNavLinks.map((v, i) => (
          <Button
            key={i}
            variant="link"
            textColor="black"
            fontSize={20}
            onClick={() => navigate(v.path)}
          >
            {v.name}
          </Button>
        ))}
      </Flex>
      <Flex
        display={["none", "none", "flex"]}
        alignItems="center"
        w={40}
        justifyContent="end"
      >
        {signer ? (
          <Button
            bgColor="white"
            textColor="blue.500"
            fontSize={20}
            onClick={onClickmetamaskLogout}
          >
            {signer.address.substring(0, 5)}...
            {signer.address.substring(signer.address.length - 4)}
          </Button>
        ) : (
          <Button
            variant="link"
            textColor="black"
            fontSize={20}
            onClick={() => useMetamaskLogin(setSigner)}
          >
            로그인
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
