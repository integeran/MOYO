import React from 'react';
import Category from '../components/common/Category';
import AccompanyMain from '../components/accompany/AccompanyMain';
import DmRoom from './DmRoom';
import DmRoomList from './DmRoomList';
import Room from '../components/dm/Room';
import ContentsContainer from '../components/ContentsContainer';
import Postmap from '../components/Postmap';
import Test from '../components/Test';

const Main = () => {
  return (
    <>
      <Postmap />
      <Category />
    </>
  );
};

export default Main;
