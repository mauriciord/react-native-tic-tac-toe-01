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

export default calcWinner;
