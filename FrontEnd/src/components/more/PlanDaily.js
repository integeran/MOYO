import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Companion from './Companion';
import Memo from './Memo';

const PlanDaily = () => {
  const selectedDate = useSelector(state => state.planDate.selectedDate);

  return (
    <div>
      <h3>{selectedDate.split('T')[0]}</h3>
      <h3>오늘의 동행</h3>
      <Companion />
      <h3>Memo</h3>
      <Memo />
    </div>
  );
};

export default PlanDaily;
