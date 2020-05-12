import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { Container, ContainerWrapper } from './src/shared/common/styles';
import {
  ScoreContainer,
  ScoreFrame,
  ScoreTitle,
  ScorePoints,
  BoardBlock,
  BoardText,
  BoardContainer,
  WinnerTitle,
  WinnerPoints,
} from './src/features/board/styles';
import apiZeroOne from './src/services/01api';
import {
  convertArrayToString,
  convertStringToArray,
} from './src/shared/helpers';

const calcWinner = (blocks: string[]) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    if (
      blocks[a] !== ' ' &&
      blocks[a] === blocks[b] &&
      blocks[b] === blocks[c]
    ) {
      return blocks[a];
    }
  }

  return null;
};

export default function App() {
  const [boardValues, setBoardValues] = useState(Array(9).fill(' '));
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const winner = calcWinner(boardValues);

  const sendCurrentBoardAsync = async ({
    boardAsArray,
    level,
  }: {
    boardAsArray: string[];
    level: string;
  }) => {
    try {
      const convertedBoard = convertArrayToString(boardAsArray);
      const { data: response } = await apiZeroOne.board.sendBoardAsString({
        board: convertedBoard,
        level,
      });

      if (response) {
        const convertedResponse = convertStringToArray(response.board);

        setBoardValues(convertedResponse);
        setOScore(oScore + 10);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handlePress = (index: number) => {
    const blocks = [...boardValues];

    if (blocks[index] !== ' ' || winner) {
      return;
    }

    blocks[index] = 'X';
    setBoardValues(blocks);

    if (!calcWinner(blocks) && blocks.includes(' ')) {
      setXScore(xScore + 10);
      sendCurrentBoardAsync({ boardAsArray: blocks, level: 'hard' });
    }
  };

  return (
    <Container>
      <ContainerWrapper>
        <ScoreContainer>
          {winner && (
            <ScoreFrame>
              <WinnerTitle>Winner</WinnerTitle>
              <WinnerPoints>{winner}</WinnerPoints>
            </ScoreFrame>
          )}
          <ScoreFrame>
            <ScoreTitle>You - X</ScoreTitle>
            <ScorePoints>{winner === 'X' ? xScore + 15 : xScore}</ScorePoints>
          </ScoreFrame>
          <ScoreFrame>
            <ScoreTitle>CPU - O</ScoreTitle>
            <ScorePoints>{winner === 'O' ? oScore + 15 : oScore}</ScorePoints>
          </ScoreFrame>
        </ScoreContainer>
        <BoardContainer>
          {boardValues.map((value: string, index: number) => {
            return (
              <TouchableWithoutFeedback
                key={index.toString()}
                onPress={() => handlePress(index)}
              >
                <BoardBlock index={index}>
                  <BoardText>{value}</BoardText>
                </BoardBlock>
              </TouchableWithoutFeedback>
            );
          })}
        </BoardContainer>
      </ContainerWrapper>
    </Container>
  );
}
