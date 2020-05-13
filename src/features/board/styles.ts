import styled from 'styled-components/native';
import { calculateBordersByIndex } from '../../shared/helpers';

import { BoardBlockProps } from './types';

type DifficultyProps = {
  selected: string;
  name: string;
};

export const BoardContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  margin: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: stretch;
`;

export const BoardText = styled.Text`
  color: #696969;
  font-weight: bold;
  font-size: 56px;
`;

export const BoardBlock = styled.View.attrs((props: BoardBlockProps) =>
  calculateBordersByIndex(props.index + 1)
)`
  width: 33%;
  height: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ScoreContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  margin: 10px;
`;

export const ScoreFrame = styled.View`
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScoreTitle = styled.Text`
  color: white;
  font-size: 30px;
`;

export const ScorePoints = styled.Text`
  color: white;
  font-size: 50px;
  font-weight: bold;
`;

export const WinnerTitle = styled(ScoreTitle)`
  color: yellow;
`;
export const WinnerPoints = styled(ScorePoints)`
  color: yellow;
`;

export const DifficultyContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(226, 192, 87, 0.9);
  border-radius: 6px;
  margin: 10px;
  min-height: 30px;
  padding: 15px;
`;

export const DifficultyLabel = styled.Text`
  color: ${({ name, selected }: DifficultyProps) =>
    name === selected ? 'white' : 'brown'};
  font-size: 20px;
  background-color: ${({ name, selected }: DifficultyProps) =>
    name === selected ? 'brown' : 'transparent'};
  padding: 5px;
`;

export const ResetLabel = styled.Text`
  color: brown;
  font-weight: bold;
  font-size: 22px;
`;
