import React, { useState } from 'react';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Planner from '../../components/more/Planner';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './styles.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import { useDispatch } from 'react-redux';
import { changeField } from '../../modules/planDate';

const MorePlan = () => {
  const dispatch = useDispatch();
  const pushSelectedDate = d => {
    dispatch(changeField({ key: 'selectedDate', value: d }));
  };

  const [selectedDate, setSelectedDate] = useState('');

  const handleChangeSelectedDate = value => {
    setSelectedDate(value);
    pushSelectedDate(moment(value.date).format());
  };

  return (
    <div>
      <h1>일정 관리</h1>
      <Divider />
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={date => handleChangeSelectedDate(date)}
      />
      {selectedDate && <Planner />}
    </div>
  );
};

export default MorePlan;
