import React from 'react';
import Category from '../components/common/Category';
import AccompanyMain from '../components/accompany/AccompanyMain';
import DmRoom from './DmRoom';
import DmRoomList from './DmRoomList';
import Room from '../components/dm/Room';

const Main = () => {
  return (
    <>
      <DmRoom />
      <Category />
    </>
  );
};

export default Main;
