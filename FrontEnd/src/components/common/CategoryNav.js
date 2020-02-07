import React, { useState, createRef, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ChatIcon from '@material-ui/icons/Chat';
import RoomIcon from '@material-ui/icons/Room';
import ForumIcon from '@material-ui/icons/Forum';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom';

const CategoryNav = () => {
  const history = useHistory();

  const [refAccompany, setRefAccompany] = useState(() => createRef());
  const [refDM, setRefDM] = useState(() => createRef());

  const [value, setValue] = useState('accompany');
  const select = useSelector(state => state.navigation.select);

  const triggerNavigationClick = condition => {
    console.log('nav Select event', select);
    refDM.current.click();
  };

  useEffect(() => {
    triggerNavigationClick(false);
  }, [select]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMoreClick = condition => {
    if (!condition) {
      history.push('/more');
    }
  };
  const handlePostMapClick = () => {
    history.push('/postmap');
  };
  const handleDMClick = () => {
    history.push('/dmroomlist');
  };

  const handleAccompanyClick = () => {
    history.push('/accompany');
  };

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction
        ref={refAccompany}
        label="동행"
        value="accompany"
        icon={<CardTravelIcon />}
        onClick={handleAccompanyClick}
      />
      <BottomNavigationAction
        label="포스트맵"
        value="postmap"
        icon={<RoomIcon />}
        onClick={handlePostMapClick}
      />
      <BottomNavigationAction
        ref={refDM}
        label="채팅"
        value="dm"
        icon={<ChatIcon />}
        onClick={handleDMClick}
      />
      <BottomNavigationAction
        label="커뮤니티"
        value="community"
        icon={<ForumIcon />}
        onClick={() => {}}
      />
      <BottomNavigationAction
        label="더보기"
        value="more"
        icon={<MoreHorizIcon />}
        onClick={handleMoreClick}
      />
    </BottomNavigation>
  );
};

export default CategoryNav;
