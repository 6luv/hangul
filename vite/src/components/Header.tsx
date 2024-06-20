import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { JsonRpcSigner, ethers } from "ethers";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const headerNavLinks = [
  {
    name: "한글",
    path: "/",
  },
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
    name: "창작",
    path: "/create",
  },
  {
    name: "내 자산",
    path: "/my",
  },
];

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const navigate = useNavigate();

  const getSigner = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    setSigner(await provider.getSigner());
  };

  const useMetamaskLogin = async () => {
    try {
      getSigner();
      localStorage.setItem("isLogin", "true");
    } catch (error) {
      console.error(error);
    }
  };

  const onClickMetamaskLogout = () => {
    setSigner(null);
    localStorage.removeItem("isLogin");
  };

  useEffect(() => {
    const localIsLogin = localStorage.getItem("isLogin");
    if (localIsLogin === "true") {
      getSigner();
    }
  }, []);

  return (
    <Flex
      h={20}
      justifyContent="space-between"
      alignItems="center"
      px={8}
      borderColor="teal.800"
      borderBottom="2px"
    >
      <Flex alignItems="center" w="fit-content">
        <Box mr={2} bgColor="red" p="6px" rounded="full" />
        <Box mr={2} bgColor="orange" p="6px" rounded="full" />
        <Box bgColor="green" p="6px" rounded="full" />
      </Flex>
      <Flex
        w={["70%", "50%", "46%"]}
        display={["none", "none", "flex"]}
        gap={[4, 8, 20]}
      >
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
          <Menu>
            <MenuButton
              bgColor="white"
              fontWeight="semibold"
              fontSize={20}
              textColor="blue.500"
              as={Button}
            >
              {signer.address.substring(0, 5)}...
              {signer.address.substring(signer.address.length - 4)}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onClickMetamaskLogout()}>
                로그아웃
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            variant="link"
            textColor="black"
            fontSize={20}
            onClick={() => useMetamaskLogin()}
          >
            로그인
          </Button>
        )}
      </Flex>
      <Flex display={["flex", "flex", "none"]}>
        <Menu>
          <MenuButton
            bgColor="white"
            fontWeight="semibold"
            fontSize={20}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {signer
              ? `${signer.address.substring(0, 5)}...
              ${signer.address.substring(signer.address.length - 4)}`
              : "메뉴"}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={
                signer
                  ? () => onClickMetamaskLogout()
                  : () => useMetamaskLogin()
              }
            >
              {signer ? "로그아웃" : "로그인"}
            </MenuItem>
            {headerNavLinks.map((v, i) => (
              <MenuItem key={i} onClick={() => navigate(v.path)}>
                {v.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
