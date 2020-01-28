import React, { useState } from 'react';
import PlanTravel from './PlanTravel';
import PlanDaily from './PlanDaily';

const Planner = () => {
  const [schedule, setSchedule] = useState('none');

  const handleChangeSchedule = value => {
    setSchedule(value);
  };

  let planPage = '';

  if (schedule === 'travel') {
    planPage = <PlanTravel />;
  } else if (schedule === 'daily') {
    planPage = <PlanDaily />;
  }
  return (
    <div>
      <a onClick={() => handleChangeSchedule('travel')}>여행일정</a>
      <a onClick={() => handleChangeSchedule('daily')}>당일일정</a>
      {planPage}
    </div>
  );
};

export default Planner;
