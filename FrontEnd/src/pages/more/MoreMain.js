import React from 'react';
import Divider from '@material-ui/core/Divider';

const MoreMain = ({ history }) => {
  const handlePlanClick = () => {
    history.push('/more/morePlan');
  };
  return (
    <div>
      <h1>일정</h1>
      <Divider />
      <h2 onClick={handlePlanClick}>일정 관리</h2>
    </div>
  );
};

export default MoreMain;
