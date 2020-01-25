import React from 'react';

const MoreMain = ({ history }) => {
  const handlePlanClick = () => {
    history.push('/more/morePlan');
  };
  return (
    <div>
      <h1>일정</h1>
      <button onClick={handlePlanClick}>일정 관리</button>
      <br />
    </div>
  );
};

export default MoreMain;
