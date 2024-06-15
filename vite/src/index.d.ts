interface Window {
  ethereum: any;
}

interface IQuizData {
  quiz: string;
  choices: string[];
  correctAnswer: string;
}

interface INftMetadata {
  name: string;
  image: string;
}

interface IHangulNftMetadata extends INftMetadata {
  tokenId: number;
  amount: number;
}

interface IHangulPriceNftMetadata extends IHangulNftMetadata {
  saleId: number;
  price: bigint;
}

interface ISaleNftMetadata {
  saleId: number;
  tokenId: number;
  price: bigint;
  saller: string;
}
