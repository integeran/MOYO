import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../api/axios';
import { getAgeList, getGenderList } from '../api/commonData';
import { changeField, changeBool } from '../modules/auth';
import BaseAppBar from '../components/common/BaseAppBar';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Avatar,
  Badge,
  Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import styled from 'styled-components';

const Profile = props => {
  const jwtDecode = require('jwt-decode');
  const dispatch = useDispatch();
  const history = useHistory();
  const [ageList, setAgeList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  const prevPath = props.location.state.prevPath;
  const userSocialId = props.location.state.userSocialId;
  let userImage = props.location.state.userProfileImage;
  const [tempUserImage, setTempUserImage] = useState(userImage);
  const [imageFile, setImageFile] = useState('');
  const [tempImageName, setTempImageName] = useState('');
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
    userGenderFirst = userGender.charAt(0).toUpperCase();
  }
  const [gender, setGender] = useState('' || userGenderFirst);
  const [nickNameError, setNickNameError] = useState(false);
  const [nickNamePlaceHolder, setNickNamePlaceHolder] = useState(
    '닉네임을 입력해주세요!',
  );
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const StyledDiv = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
  `;

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

  useEffect(() => {
    setAgeList(getAgeList());
    setGenderList(getGenderList());
  }, []);

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
        image: tempUserImage,
        imageName: tempImageName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postImageRequest = async () => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      return await axios.post('user/postImage', formData, {
        params: { imageName: tempImageName },
        headers: {
          userToken: userData.userToken,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const putRequest = async () => {
    try {
      return await axios.put(
        'user/update',
        {
          nickname: userNicknameOut,
          age: age,
          gender: gender,
          image: tempUserImage,
          imageName: tempImageName,
        },
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const postData = async () => {
    const resData = await postRequest();
    console.log(resData);
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
        pathname: '/accompany',
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

  const postImage = async () => {
    const imgData = await postImageRequest();
    setTempImageName(imgData.data.data.imageName);
    setTempUserImage(imgData.data.data.image);
    setOpenDialog(false);
  };

  const handleBackIcon = () => {
    history.push('/more');
  };

  const handleProfileImage = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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

  const changeImageFile = file => {
    setImageFile(file);
  };

  return (
    <>
      <StyledDiv>
        {prevPath === '/more' && (
          <BaseAppBar
            style={{ flexGrow: '0' }}
            text="프로필 편집"
            leftType="icon"
            leftIcon={<ArrowBackIosIcon onClick={handleBackIcon} />}
          />
        )}
        <Grid
          container
          direction="column"
          justify="center"
          spacing={4}
          style={{
            width: 'inherit',
            margin: '0px',
            flexGrow: '1',
            margin: '0px',
          }}
        >
          <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
            <Badge
              color="primary"
              badgeContent={<AddIcon />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              overlap="circle"
              variant="standard"
            >
              <Avatar
                alt="Jeesoo Haa"
                src={tempUserImage}
                className={classes.large}
                onClick={handleProfileImage}
              />
            </Badge>
          </Grid>
          <Grid item container>
            <Grid item xs={2} />
            <Grid
              item
              container
              direction="column"
              justify="space-between"
              spacing={3}
              xs={8}
              style={{ margin: '0px' }}
            >
              <Grid item>
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
              </Grid>
              <Grid item>
                <TextField
                  error={ageError}
                  id="standard-select-currency"
                  select
                  fullWidth
                  label="AgeRange"
                  value={age}
                  onChange={handleChangeAge}
                >
                  {ageList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  error={genderError}
                  id="standard-select-currency"
                  select
                  fullWidth
                  label="Gender"
                  value={gender}
                  onChange={handleChangeGender}
                  InputProps={{ readOnly: false }}
                >
                  {genderList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                {prevPath === '/' ? (
                  <Button variant="outlined" onClick={requestRegister}>
                    가입하기
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={requestUpdate}>
                    수정하기
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
      </StyledDiv>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">사진을 올려주세요!</DialogTitle>
        <DialogContent>
          <input
            type="file"
            name="file"
            onChange={e => changeImageFile(e.target.files[0])}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={postImage} color="primary">
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
