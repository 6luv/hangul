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
