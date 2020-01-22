import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';

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
    value: 'male',
    label: '남자',
  },
  {
    value: 'female',
    label: '여자',
  },
];

const Signup = props => {
  // const auth = useSelector(state => state.auth);
  // console.log(auth);
  const userProfileImage = props.location.state.userProfileImage;
  const userNickname = props.location.state.userNickname;
  const userAgeRange = props.location.state.userAgeRange;
  let userAgeRangeFirst = '';
  if (userAgeRange !== undefined) {
    userAgeRangeFirst = userAgeRange.charAt(0);
  }
  const userGender = props.location.state.userGender;

  const [age, setAge] = React.useState('' || userAgeRangeFirst);

  const handleChangeAge = event => {
    setAge(event.target.value);
    console.log(event.target.value);
  };

  const [gender, setGender] = React.useState('' || userGender);

  const handleChangeGender = event => {
    setGender(event.target.value);
    console.log(event.target.value);
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
        <Avatar
          alt="Jeesoo Haa"
          src={userProfileImage}
          className={classes.large}
        />
      </div>
      <div className={classes.rootTextfield}>
        <TextField
          id="standard-full-width"
          label="Nickname"
          placeholder="닉네임을 입력해주세요!"
          defaultValue={userNickname}
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
    </div>
  );
};

export default Signup;

// 서버랑 확인 후 로그인
// 아이디 확인 후 회원가입
// jwt 발급 타이밍
