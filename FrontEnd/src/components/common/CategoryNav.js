import React, {
  useState,
  createRef,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ChatIcon from '@material-ui/icons/Chat';
import RoomIcon from '@material-ui/icons/Room';
import ForumIcon from '@material-ui/icons/Forum';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom';
import { navigationSelect } from '../../modules/baseNavigation';

const CategoryNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const select = useSelector(state => state.baseNavigation.select);
  const [refAccompany, setRefAccompany] = useState(() => createRef());
  const [refDM, setRefDM] = useState(() => createRef());

  const handleNavChange = (event, newValue) => {
    console.log(newValue);
    dispatch(navigationSelect(newValue));
  };

  const handleMoreClick = condition => {
    history.push('/more');
  };
  const handlePostMapClick = condition => {
    history.push('/postmap');
  };
  const handleDMClick = condition => {
    history.push('/dmroomlist');
  };

  const handleAccompanyClick = condition => {
    history.push('/accompany');
  };

  return (
    <BottomNavigation value={select} onChange={handleNavChange}>
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
        value="DM"
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
