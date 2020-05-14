import { GameBoard } from '../../features/board/types';

const containsEmpty = (list: GameBoard): boolean => list.includes(' ');

export default containsEmpty;
