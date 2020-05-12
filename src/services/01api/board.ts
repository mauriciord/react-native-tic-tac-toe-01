import api from './api';

export type SendBoardParams = {
  board: string;
  level: string;
};

export const sendBoardAsString = ({ board, level = 'easy' }: SendBoardParams) =>
  api.post(`/`, {
    board,
    level,
  });
