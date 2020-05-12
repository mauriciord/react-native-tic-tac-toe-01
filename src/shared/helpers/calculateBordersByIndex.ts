const initialBordersState = {
  borderWidth: 3,
  borderColor: 'black',
};

const calculateBordersByIndex = (index: number) => {
  if (!index) {
    return initialBordersState;
  }

  return {
    ...initialBordersState,
    ...(index <= 3 && { borderTopWidth: 0 }),
    ...(index % 3 === 0 && { borderRightWidth: 0 }),
    ...((index <= 9 || index >= 7) && { borderBottomWidth: 0 }),
    ...((index % 3 === 1 || index === 1) && { borderLeftWidth: 0 }),
  };
};
export default calculateBordersByIndex;
