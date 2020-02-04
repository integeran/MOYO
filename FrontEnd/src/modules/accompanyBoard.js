import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const ACC_SEARCH_BOARD = 'accompany/ACC_BOARD';

export const accompanyBoard = createAction(
  ACC_SEARCH_BOARD,
  boardList => boardList,
);

const initialState = {
  boardList: [
    {
      acBoardId: 1,
      title: '프랑스 파리 에펠탑쪽에서 하루종일 같이 노실분!',
      contents:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: '2020-01-23',
      endDate: '2020-01-28',

      uId: 1,
      nickname: '하지수',
      age: 2,
      image: '../../assets/img/iu.jpg',
      gender: 'M',

      nId: 2,
      nation: '프랑스',

      cId: 1,
      city: '파리',

      tTypeId: 1,
      type: '관광',
      wantAge: '1|2|3',
      wantGender: 'N',
    },
    {
      acBoardId: 2,
      title: '1/25일 프랑스 파리 점심 식사 구합니다!',
      contents:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: '2020-01-25',
      endDate: '2020-01-25',

      uId: 2,
      nickname: '장영준',

      nId: 2,
      nation: '프랑스',

      cId: 1,
      city: '파리',

      tTypeId: 2,
      type: '식사',
      wantAge: 0,
      wantGender: 'M',
    },
    {
      acBoardId: 3,
      title: '27-30일 프랑스 니스에서 같이 관광하실분!',
      contents:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: '2020-01-27',
      endDate: '2020-01-30',

      uId: 3,
      nickname: '이인동',

      nId: 2,
      nation: '프랑스',

      cId: 2,
      city: '니스',

      tTypeId: 1,
      type: '관광',
      wantAge: 3,
      wantGender: 'W',
    },
    {
      acBoardId: 4,
      title: '27-30일 프랑스 니스에서 같이 관광하실분!',
      contents:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: '2020-01-27',
      endDate: '2020-01-30',

      uId: 3,
      nickname: '이인동',

      nId: 2,
      nation: '프랑스',

      cId: 2,
      city: '니스',

      tTypeId: 1,
      type: '관광',
      wantAge: 3,
      wantGender: 'W',
    },
    {
      acBoardId: 5,
      title: '27-30일 프랑스 니스에서 같이 관광하실분!',
      contents:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: '2020-01-27',
      endDate: '2020-01-30',

      uId: 3,
      nickname: '이인동',

      nId: 2,
      nation: '프랑스',

      cId: 2,
      city: '니스',

      tTypeId: 1,
      type: '관광',
      wantAge: 3,
      wantGender: 'W',
    },
  ],
};

const board = handleActions(
  {
    [ACC_SEARCH_BOARD]: (state, { payload: boardList }) =>
      produce(state, draft => {
        draft.boardList = boardList;
      }),
  },
  initialState,
);

export default board;
