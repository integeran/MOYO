import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { storeMemo } from '../../modules/morePlanMemo';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Memo = () => {
  const axios = require('axios');
  const dispatch = useDispatch();

  const classes = useStyles();

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
      return await axios.get(
        `http://70.12.246.66:8080/dailyMemo/selectAllByUser/${userData.uid}`,
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const postMemo = async () => {
    try {
      return await axios.post(
        'http://70.12.246.66:8080/dailyMemo/post/',
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
      return await axios.delete(
        `http://70.12.246.66:8080/dailyMemo/delete/${todayMemo[0].dmemoId}`,
        {
          headers: { userToken: userData.userToken },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMemo = async () => {
    if (memoText.trim()) {
      const resData = await postMemo();
      const memData = await getMemo();
      dispatch(storeMemo(memData.data.data));
    } else {
      const resData = await deleteMemo();
      const memData = await getMemo();
      dispatch(storeMemo(memData.data.data));
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows="4"
          value={memoText}
          onChange={handleChangeMemo}
          variant="outlined"
        ></TextField>
        <Button onClick={handleMemo}>저장하기</Button>
      </div>
    </div>
  );
};

export default Memo;
