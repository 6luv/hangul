import { Flex, Grid } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { formatEther } from "ethers";
import SaleNftCard from "../components/SaleNftCard";

const Sale: FC = () => {
  const [saleTokens, setSaleTokens] = useState<ISaleNftMetadata[]>([]);
  const { signer, saleContract } = useOutletContext<OutletContext>();

  const getOnSaleTokens = async () => {
    try {
      const response = await saleContract?.getOnSaleTokens();

      const tempSaleTokens: ISaleNftMetadata[] = response.map((v: any) => ({
        saleId: Number(v[0]),
        tokenId: Number(v[1]),
        price: formatEther(v[2]),
        saller: v[3],
      }));

      setSaleTokens(tempSaleTokens);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!saleContract) return;

    getOnSaleTokens();
  }, [saleContract]);

  useEffect(() => console.log(saleTokens), [saleTokens]);

  return (
    <Flex flexDir="column" w="100%">
      <Flex
        m={12}
        p={4}
        flexGrow={1}
        bgColor="white"
        rounded="lg"
        boxShadow="md"
        alignItems="center"
        flexDir="column"
      >
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          justifyContent="center"
          gap={16}
          maxH={[375, 420, 520]}
          overflowY="auto"
          mt={[2, 2, 0, 0]}
        >
          {saleTokens.map((v, i) => (
            <SaleNftCard
              key={i}
              tokenId={v.tokenId}
              saleId={v.saleId}
              price={v.price}
            />
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Sale;
