import { Button, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const Header: FC = () => {
  const navigate = useNavigate();

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
      <Flex justifyContent="space-between" w="30%">
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
      <Flex>
        <Button variant="link" textColor="black" fontSize={20}>
          로그인
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
