import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ChatIcon from '@material-ui/icons/Chat';
import RoomIcon from '@material-ui/icons/Room';
import ForumIcon from '@material-ui/icons/Forum';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const BottomNavigationStyled = styled(BottomNavigation)`
  border-top: 1px solid gray;
`;

const BottomNavigationActionStyled = styled(BottomNavigationAction)`
  & + & {
    border-left: 1px solid gray;
  }
`;

const CategoryNav = () => {
  const [value, setValue] = useState('accompany');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();
  const handleMoreClick = () => {
    history.push('/more');
  };

  return (
    <BottomNavigationStyled value={value} onChange={handleChange}>
      <BottomNavigationActionStyled
        label="동행"
        value="accompany"
        icon={<CardTravelIcon />}
      />
      <BottomNavigationActionStyled
        label="포스트맵"
        value="postmap"
        icon={<RoomIcon />}
      />
      <BottomNavigationActionStyled
        label="채팅"
        value="dm"
        icon={<ChatIcon />}
      />
      <BottomNavigationActionStyled
        label="커뮤니티"
        value="community"
        icon={<ForumIcon />}
      />
      <BottomNavigationActionStyled
        label="더보기"
        value="more"
        icon={<MoreHorizIcon />}
        onClick={handleMoreClick}
      />
    </BottomNavigationStyled>
  );
};

export default CategoryNav;