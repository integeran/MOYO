import React from 'react';
import { useHistory } from 'react-router-dom';
import AccompanyListPaper from './AccompanyListPaper';
import styled from 'styled-components';

const ListComponent = styled.div`
  width: 90%;
  min-height: 0;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 6rem;
`;

const AccompanyListSet = ({ boardData }) => {
  const history = useHistory();
  const handleBoardClick = board => {
    history.push({
      pathname: '/acc/accList/' + board.acBoardId,
      state: {
        prevpath: history.location.pathname,
        board: board,
      },
    });
  };
  return (
    <ListComponent>
      {boardData.map(board => (
        <AccompanyListPaper
          key={board.acBoardId}
          boardInfo={board}
          onClick={() => handleBoardClick(board)}
        />
      ))}
    </ListComponent>
  );
};

export default AccompanyListSet;
