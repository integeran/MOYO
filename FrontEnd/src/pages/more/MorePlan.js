import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Planner from '../../components/more/Planner';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './styles.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../modules/planDate';
import { storeSchedule } from '../../modules/morePlanTravel';

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

  const axios = require('axios');

  const userData = useSelector(state => state.auth.userData);

  const planTravelList = useSelector(
    state => state.morePlanTravel.planTravelList,
  );

  const getSchedule = async () => {
    try {
      return await axios.get(
        `http://70.12.246.66:8080/scheduleList/selectAllByUser/${userData.uid}`,
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getData() {
      const resData = await getSchedule();
      console.log(resData.data.data);
      dispatch(storeSchedule(resData.data.data));
      stateEvents(resData.data.data);
    }
    getData();
  }, []);

  const [events, setEvents] = useState([
    {
      // title: 'The Title',
      // start: '2020-01-01',
      // end: '2020-01-03',
      // allDay: 'false',
    },
  ]);

  const stateEvents = p => {
    setEvents(
      p.map(item => {
        return {
          title: item.city,
          start: item.startDate.split(' ')[0],
          end: item.endDate,
        };
      }),
    );
  };

  useEffect(() => {
    if (planTravelList !== []) {
      stateEvents(planTravelList);
    }
  }, [planTravelList]);

  return (
    <div>
      <h1>일정 관리</h1>
      <Divider />
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={date => handleChangeSelectedDate(date)}
        events={events}
        displayEventTime={false}
      />
      {selectedDate && <Planner />}
    </div>
  );
};

export default MorePlan;
