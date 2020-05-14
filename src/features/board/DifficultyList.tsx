import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { DifficultyContainer, DifficultyLabel } from './styles';

type Props = {
  handleSetDifficulty: (
    level: string
  ) => (event: GestureResponderEvent) => void;
  difficulty: string;
};

const DifficultyList = ({ handleSetDifficulty, difficulty }: Props) => {
  return (
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
  );
};

export default DifficultyList;
