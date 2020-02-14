import React from 'react';
import MoreAccompanyListPaper from './MoreAccompanyListPaper';
import styled from 'styled-components';

const ListComponent = styled.div`
  width: 85%;
  min-height: 0;
  margin: auto;
  margin-top: 0.5rem;
  margin-bottom: 6rem;
`;

const AccompanyListSet = ({ boardData, handleClick }) => {
  return (
    <ListComponent>
      {boardData.map(board => (
        <MoreAccompanyListPaper
          key={board.acBoardId}
          boardInfo={board}
          onClick={() => handleClick(board)}
        />
      ))}
    </ListComponent>
  );
};

export default AccompanyListSet;
