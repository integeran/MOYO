import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

const date = {
  acBoardId: 1,
  title: '프랑스 파리 에펠탑쪽에서 하루종일 같이 노실분!',
  contents:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  startDate: '2020-01-23',
  endDate: '2020-01-28',

  uId: 1,
  nickname: '하지수',

  nId: 2,
  nation: '프랑스',

  cId: 1,
  city: '파리',

  tTypeId: 1,
  type: '관광',
  wantAge: 2,
  wantGender: 'N',
};

const ContainerStyled = styled(Container)`
  height: inherit;
  background: #eeeeee;
`;

const AccompanyListDetail = () => {
  return (
    <>
      <ContainerStyled maxWidth="sm"></ContainerStyled>
    </>
  );
};

export default AccompanyListDetail;
