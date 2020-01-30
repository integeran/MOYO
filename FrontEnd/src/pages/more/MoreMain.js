import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const MoreMain = ({ history }) => {
  const useStyles = makeStyles(theme => ({
    rootTextfield: {
      marginTop: '2rem',
    },
    rootAvatar: {
      marginBottom: '2rem',
    },
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  }));

  const classes = useStyles();

  const userData = useSelector(state => state.auth.userData);

  const handlePlanClick = () => {
    history.push('/more/morePlan');
  };
  return (
    <div>
      <div className={classes.rootAvatar}>
        <Avatar
          alt="Jeesoo Haa"
          src={userData.image}
          className={classes.large}
        />
      </div>
      <Divider />
      <h1>일정</h1>
      <Divider />
      <h2 onClick={handlePlanClick}>일정 관리</h2>
      <Divider />
      <h1>관리</h1>
      <Divider />
      <h2 onClick={handlePlanClick}>내 동행 관리하기</h2>
      <h2 onClick={handlePlanClick}>내 커뮤니티 관리하기</h2>
      <Divider />
      <h1>공통</h1>
      <Divider />
      <h2 onClick={handlePlanClick}>공지사항</h2>
      <h2 onClick={handlePlanClick}>앱 설정</h2>
    </div>
  );
};

export default MoreMain;
