import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeField, changeBool } from '../modules/auth';
import axios from '../api/axios';
import BaseAppBar from '../components/common/BaseAppBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ageRange = [
  {
    value: '1',
    label: '10대',
  },
  {
    value: '2',
    label: '20대',
  },
  {
    value: '3',
    label: '30대',
  },
  {
    value: '4',
    label: '40대',
  },
];

const genders = [
  {
    value: 'm',
    label: '남자',
  },
  {
    value: 'f',
    label: '여자',
  },
];

const Profile = props => {
  const jwtDecode = require('jwt-decode');
  const dispatch = useDispatch();
  const history = useHistory();

  const userData = useSelector(state => state.auth.userData);
  const prevPath = props.location.state.prevPath;
  const userSocialId = props.location.state.userSocialId;
  let userImage = props.location.state.userProfileImage;
  let userNickname = props.location.state.userNickname;
  const [userNicknameOut, setUserNicknameOut] = useState(userNickname);
  let userAge = props.location.state.userAgeRange;
  let userAgeRangeFirst = '';
  if (userAge !== undefined && typeof userAge === 'string') {
    userAgeRangeFirst = userAge.charAt(0);
  } else if (typeof userAge === 'number') {
    userAgeRangeFirst = String(userAge);
  }
  const [age, setAge] = useState('' || userAgeRangeFirst);
  let userGender = props.location.state.userGender;
  let userGenderFirst = '';
  if (userGender !== undefined) {
    userGenderFirst = userGender.charAt(0);
  }
  const [gender, setGender] = useState('' || userGenderFirst);
  const [nickNameError, setNickNameError] = useState(false);
  const [nickNamePlaceHolder, setNickNamePlaceHolder] = useState(
    '닉네임을 입력해주세요!',
  );
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const handleChangeNickname = event => {
    setUserNicknameOut(event.target.value);
    setNickNameError(false);
  };

  const handleChangeAge = event => {
    setAge(event.target.value);
  };

  const handleChangeGender = event => {
    setGender(event.target.value);
  };

  const pushUserData = (k, v) => {
    dispatch(changeField({ form: 'userData', key: k, value: v }));
  };

  const postRequest = async () => {
    try {
      return await axios.post('user/register', {
        provider: 0,
        socialId: userSocialId,
        nickname: userNicknameOut,
        age: age,
        gender: gender,
        image: userImage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const putRequest = async () => {
    try {
      return await axios.put(
        'user/update',
        { nickname: userNicknameOut, age: age, gender: gender },
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const postData = async () => {
    const resData = await postRequest();
    if (resData.data.status) {
      const jwtData = jwtDecode(resData.data.data);
      pushUserData('userToken', resData.data.data);
      pushUserData('uid', jwtData.user.uid);
      pushUserData('nickname', jwtData.user.nickname);
      pushUserData('age', jwtData.user.age);
      pushUserData('gender', jwtData.user.gender);
      pushUserData('image', jwtData.user.image);
      localStorage.setItem('token', resData.data.data);
      dispatch(changeBool({ key: 'isLoggedIn', value: true }));
      history.push({
        pathname: '/acc',
      });
    } else {
      setUserNicknameOut('');
      setNickNameError(true);
      setNickNamePlaceHolder('닉네임이 중복됩니다!');
    }
  };

  const putData = async () => {
    const resPutData = await putRequest();
    if (resPutData.data.status) {
      const jwtData = jwtDecode(resPutData.data.data);
      pushUserData('userToken', resPutData.data.data);
      pushUserData('uid', jwtData.user.uid);
      pushUserData('nickname', jwtData.user.nickname);
      pushUserData('age', jwtData.user.age);
      pushUserData('gender', jwtData.user.gender);
      pushUserData('image', jwtData.user.image);
      localStorage.setItem('token', resPutData.data.data);
      history.push('/more');
    } else {
      setUserNicknameOut('');
      setNickNameError(true);
      setNickNamePlaceHolder('닉네임이 중복됩니다!');
    }
  };

  const requestRegister = () => {
    if (userNicknameOut.trim() && age && gender) {
      postData();
    } else {
      if (!userNicknameOut.trim()) {
        setUserNicknameOut('');
        setNickNameError(true);
        setNickNamePlaceHolder('닉네임은 꼭 넣으세요!');
      }
      if (!age) {
        setAgeError(true);
      }
      if (!gender) {
        setGenderError(true);
      }
    }
  };

  const requestUpdate = () => {
    if (userNicknameOut.trim() && age && gender) {
      putData();
    } else {
      setUserNicknameOut('');
      setNickNameError(true);
      setNickNamePlaceHolder('닉네임은 꼭 넣으세요!');
    }
  };

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    rootTextfield: {
      marginTop: '2rem',
    },
    rootAvatar: {
      marginBottom: '2rem',
    },
    multilineColor: {
      color: 'black',
    },
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  }));

  const classes = useStyles();

  const handleBackIcon = () => {
    history.push('/more');
  };

  return (
    <div>
      {prevPath === '/more' && (
        <BaseAppBar
          title={'내 정보 관리'}
          Icon1={<ArrowBackIosIcon onClick={handleBackIcon} />}
          // Icon2={<ChatIcon />}
          // handleClick1={handleMoveBack}
        />
      )}
      <div className={classes.root}>
        <div className={classes.rootAvatar}>
          <Avatar alt="Jeesoo Haa" src={userImage} className={classes.large} />
        </div>
        <div className={classes.rootTextfield}>
          <TextField
            error={nickNameError}
            placeholder={nickNamePlaceHolder}
            id="standard-full-width"
            label="Nickname"
            defaultValue={userNicknameOut}
            value={userNicknameOut}
            onChange={handleChangeNickname}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              className: classes.multilineColor,
            }}
          />
          <div className={classes.rootTextfield}>
            <TextField
              error={ageError}
              id="standard-select-currency"
              select
              fullWidth
              label="AgeRange"
              value={age}
              onChange={handleChangeAge}
            >
              {ageRange.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.rootTextfield}>
            <TextField
              error={genderError}
              id="standard-select-currency"
              select
              fullWidth
              label="Gender"
              value={gender}
              onChange={handleChangeGender}
            >
              {genders.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        {prevPath === '/' ? (
          <button onClick={requestRegister}>가입하기</button>
        ) : (
          <button onClick={requestUpdate}>수정하기</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
