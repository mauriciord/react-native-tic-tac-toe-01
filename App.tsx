import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: #9cd600;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const BoardContainer = styled.View`
  background-color: #fff;
  border-radius: 6px;
  align-self: stretch;
  margin: 10px;
  padding: 10px;
  min-height: 400px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: #000;
`;

export default function App() {
  return (
    <Container>
      <BoardContainer>
        <Text>01 Card</Text>
      </BoardContainer>
    </Container>
  );
}
