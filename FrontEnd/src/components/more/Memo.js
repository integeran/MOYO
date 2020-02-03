import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { storeMemo } from '../../modules/morePlanMemo';
import moment from 'moment';
import axios from '../../api/axios';

const Memo = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);
  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const planMemoList = useSelector(state => state.morePlanMemo.planMemoList);
  const todayMemo = planMemoList.filter(
    item => item.day.split(' ')[0] === selectedDate.split('T')[0],
  );

  const [memoText, setMemoText] = React.useState('');

  function setDefaultValue() {
    if (todayMemo[0]) {
      setMemoText(todayMemo[0].contents);
    } else {
      setMemoText('');
    }
  }

  const handleChangeMemo = event => {
    setMemoText(event.target.value);
  };

  useEffect(() => {
    setDefaultValue();
  }, [selectedDate]);

  const getMemo = async () => {
    try {
      return await axios.get(`dailyMemo/selectAllByUser/${userData.uid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postMemo = async () => {
    try {
      return await axios.post(
        'dailyMemo/post/',
        {
          uid: userData.uid,
          day: moment(selectedDate).format('YYYY-MM-DD'),
          contents: memoText,
        },
        {
          headers: { userToken: userData.userToken },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMemo = async () => {
    try {
      return await axios.delete(`dailyMemo/delete/${todayMemo[0].dmemoId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMemo = async () => {
    if (memoText.trim()) {
      await postMemo();
      const memData = await getMemo();
      dispatch(storeMemo(memData.data.data));
    } else {
      await deleteMemo();
      const memData = await getMemo();
      dispatch(storeMemo(memData.data.data));
    }
  };

  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        multiline
        fullWidth
        rows="4"
        value={memoText}
        onChange={handleChangeMemo}
        variant="outlined"
      ></TextField>
      <Button onClick={handleMemo}>저장하기</Button>
    </div>
  );
};

export default Memo;
