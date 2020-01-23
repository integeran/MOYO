import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ChatIcon from '@material-ui/icons/Chat';
import RoomIcon from '@material-ui/icons/Room';
import ForumIcon from '@material-ui/icons/Forum';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import styled from 'styled-components';

const BottomNavigationStyled = styled(BottomNavigation)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 2px solid gray;
`;

const BottomNavigationActionStyled = styled(BottomNavigationAction)`
  & + & {
    border-left: 1px solid gray;
  }
`;

const Category = () => {
  const [value, setValue] = useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        value="chat"
        icon={<ChatIcon />}
      />
      <BottomNavigationActionStyled
        label="커뮤니티"
        value="community"
        icon={<ForumIcon />}
      />
      <BottomNavigationActionStyled
        label="더보기"
        value="moer"
        icon={<MoreHorizIcon />}
      />
    </BottomNavigationStyled>
  );
};

export default Category;
