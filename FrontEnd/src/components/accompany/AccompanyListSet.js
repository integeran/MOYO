import React from 'react';
import { useHistory } from 'react-router-dom';
import AccompanyListPaper from './AccompanyListPaper';
import styled from 'styled-components';

const ListComponent = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 7rem;
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
