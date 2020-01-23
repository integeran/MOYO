import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { changeField } from '../modules/auth';
import loading from '../modules/loading';

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
    value: 'w',
    label: '여자',
  },
];

const Signup = props => {
  // const auth = useSelector(state => state.auth);
  // const { userNickname, userAge, userGender, userImage } = useSelector(
  //   ({ auth }) => ({
  //     userNickname: auth.userData.nickname,
  //     userAge: auth.userData.age,
  //     userGender: auth.userData.gender,
  //     userImage: auth.userData.image,
  //   }),
  // );

  // const checkToken = async () => {
  //   const jwtToken = await jwtDecode(localStorage.token);
  //   pushUserData('nickname', jwtToken.user.nickname);
  //   pushUserData('age', jwtToken.user.age);
  //   pushUserData('gender', jwtToken.user.gender);
  //   pushUserData('image', jwtToken.user.image);
  // };

  // useEffect(() => {
  //   if (localStorage.token) {
  //     console.log('check');
  //     checkToken();
  //   }
  // });

  const userSocialId = props.location.state.userSocialId;
  let userImage = props.location.state.userProfileImage;
  let userNickname = props.location.state.userNickname;
  let userAge = props.location.state.userAgeRange;
  let userAgeRangeFirst = '';
  if (userAge !== undefined) {
    userAgeRangeFirst = userAge.charAt(0);
  }
  let userGender = props.location.state.userGender;
  let userGenderFirst = '';
  if (userGender !== undefined) {
    userGenderFirst = userGender.charAt(0);
  }

  const handleChangeNickname = event => {
    userNickname = event.target.value;
  };

  const [age, setAge] = React.useState('' || userAgeRangeFirst);

  const handleChangeAge = event => {
    setAge(event.target.value);
  };

  const [gender, setGender] = React.useState('' || userGenderFirst);

  const handleChangeGender = event => {
    setGender(event.target.value);
  };

  const axios = require('axios');
  const jwtDecode = require('jwt-decode');
  const dispatch = useDispatch();
  const history = useHistory();

  const pushUserData = (k, v) => {
    dispatch(changeField({ form: 'userData', key: k, value: v }));
  };

  const getResponse = async () => {
    try {
      return await axios.post('http://70.12.246.66:8080/user/register', {
        provider: 0,
        socialId: userSocialId,
        nickname: userNickname,
        age: age,
        gender: gender,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    const resData = await getResponse();

    if (resData.data.status) {
      const jwtData = jwtDecode(resData.data.data);
      pushUserData('userToken', resData.data.data);
      pushUserData('nickname', jwtData.user.nickname);
      pushUserData('age', jwtData.user.age);
      pushUserData('gender', jwtData.user.gender);
      pushUserData('image', jwtData.user.image);
      localStorage.setItem('token', resData.data.data);
      history.push({
        pathname: '/main',
      });
    } else {
      console.log('error');
    }
  };

  const requestRegister = () => {
    if (userNickname && age && gender) {
      getData();
    } else {
      console.log('error');
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

  return (
    <div className={classes.root}>
      <div className={classes.rootAvatar}>
        <Avatar alt="Jeesoo Haa" src={userImage} className={classes.large} />
      </div>
      <div className={classes.rootTextfield}>
        <TextField
          id="standard-full-width"
          label="Nickname"
          placeholder="닉네임을 입력해주세요!"
          defaultValue={userNickname}
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
      <button onClick={requestRegister}>가입하기</button>
    </div>
  );
};

export default Signup;
