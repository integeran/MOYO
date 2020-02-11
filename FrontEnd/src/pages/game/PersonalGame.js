import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Personal from '../../components/game/Personal';
import PersonalModal from '../../components/game/PersonalModal';

import Typography from '@material-ui/core/Typography';

const PersonalGame = () => {
  var startRound = 16;

  const [round, setRound] = useState(startRound);
  const [subRound, setSubRound] = useState(0);
  const [tempRound, setTempRound] = useState(0);
  const [randomList, setRandomList] = useState([]);
  const [message, setMessage] = useState('');

  const names = [
    '가',
    '나',
    '다',
    '라',
    '마',
    '바',
    '사',
    '아',
    '자',
    '차',
    '타',
    '카',
    '파',
    '하',
    '꺅',
    '웩',
  ];

  const history = useHistory();

  useEffect(() => {
    setRandom();
  }, []);

  const setRandom = () => {
    let tempList = [];

    firstloop: for (let i = 0; i < startRound; i++) {
      let val = Math.floor(Math.random() * startRound);

      for (let j = 0; j < tempList.length; j++) {
        if (tempList[j] === val) {
          i--;
          continue firstloop;
        }
      }

      tempList.push(val);
    }

    setRandomList(tempList);
  };

  const onClickImage = index => {
    setRandomList(prevState => [...prevState, index]);
    setSubRound(subRound + 1);
    setTempRound(tempRound + 1);

    if (round / 2 === tempRound + 1) {
      if (round / 2 < 4) {
        setMessage(
          '당신의 성향은 ' +
            names[randomList[(subRound + 1) * 2]] +
            ' + ' +
            names[index] +
            ' 입니다.',
        );
      }

      if (round / 2 >= 4) {
        alert(round + '강을 종료합니다. ' + round / 2 + '강을 시작합니다.');
      }

      setRound(tempRound + 1);
      setTempRound(0);
    }
  };

  const closeModal = () => {
    setMessage('');

    history.push({
      pathname: '/dmroomlist',
    });
  };

  return (
    <div>
      <Personal
        round={round}
        topindex={randomList[subRound * 2]}
        bottomindex={randomList[subRound * 2 + 1]}
        onClickImage={onClickImage}
      />
      <PersonalModal close={closeModal} message={message} />
    </div>
  );
};

export default PersonalGame;
