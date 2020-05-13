import React, { useCallback, useState } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Container, ContainerWrapper } from './src/shared/common/styles';
import {
  BoardBlock,
  BoardContainer,
  BoardText,
  DifficultyContainer,
  DifficultyLabel,
  ResetLabel,
  ScoreContainer,
  ScoreFrame,
  ScorePoints,
  ScoreTitle,
  WinnerPoints,
  WinnerTitle,
} from './src/features/board/styles';
import apiZeroOne from './src/services/01api';
import {
  convertArrayToString,
  convertStringToArray,
  calcWinner,
} from './src/shared/helpers';

export default function App() {
  const [boardValues, setBoardValues] = useState(Array(9).fill(' '));
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
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

  const handlePress = useCallback(
    (index: number) => {
      const blocks = [...boardValues];

      if (blocks[index] !== ' ' || winner) {
        return;
      }

      blocks[index] = 'X';
      setBoardValues(blocks);

      if (!calcWinner(blocks) && blocks.includes(' ')) {
        setXScore(xScore + 10);
        sendCurrentBoardAsync({ boardAsArray: blocks, level: difficulty });
      }
    },
    [difficulty, sendCurrentBoardAsync, setXScore, setBoardValues, calcWinner]
  );

  const handleSetDifficulty = useCallback(
    (level: string) => () => {
      if (!winner) {
        setDifficulty(level);
      }
    },
    [setDifficulty, winner]
  );

  const handleResetPress = useCallback(() => {
    setBoardValues(Array(9).fill(' '));
    setOScore(0);
    setXScore(0);
  }, [setBoardValues, setOScore, setXScore]);

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
        <DifficultyContainer>
          <TouchableOpacity onPress={handleSetDifficulty('easy')}>
            <DifficultyLabel name="easy" selected={difficulty}>
              Easy
            </DifficultyLabel>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSetDifficulty('medium')}>
            <DifficultyLabel name="medium" selected={difficulty}>
              Medium
            </DifficultyLabel>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSetDifficulty('hard')}>
            <DifficultyLabel name="hard" selected={difficulty}>
              Hard
            </DifficultyLabel>
          </TouchableOpacity>
        </DifficultyContainer>
        {winner && (
          <TouchableOpacity onPress={handleResetPress}>
            <ResetLabel>Reset Game</ResetLabel>
          </TouchableOpacity>
        )}
      </ContainerWrapper>
    </Container>
  );
}
