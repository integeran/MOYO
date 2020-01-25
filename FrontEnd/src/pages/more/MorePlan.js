import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

const CalendarStyled = styled(Calendar)`
  border: 0;
  margin: 0 auto;
  width: 90%;
  margin-bottom: 2rem;
`;

const MorePlan = () => {
  const [date, setDate] = useState(null);
  const onChange = date => setDate(date);
  return (
    <div>
      <h1>일정 관리 페이지입니다.</h1>
      <CalendarStyled calendarType="US" onChange={onChange} value={date} />
    </div>
  );
};

export default MorePlan;
