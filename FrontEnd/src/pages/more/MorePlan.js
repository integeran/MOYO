import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Planner from '../../components/more/Planner';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './styles.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import { changeField } from '../../modules/planDate';
import { storeSchedule } from '../../modules/morePlanTravel';
import { storeCompanion } from '../../modules/morePlanCompanion';
import { storeMemo } from '../../modules/morePlanMemo';

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

  const getCompanion = async () => {
    try {
      return await axios.get(
        `http://70.12.246.66:8080/dailyAccompany/selectAllByUser/${userData.uid}`,
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getMemo = async () => {
    try {
      return await axios.get(
        `http://70.12.246.66:8080/dailyMemo/selectAllByUser/${userData.uid}`,
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onEventClick = props => {
    console.log(props);
  };

  useEffect(() => {
    async function getData() {
      const schData = await getSchedule();
      dispatch(storeSchedule(schData.data.data));
      stateEvents(schData.data.data);
      const comData = await getCompanion();
      dispatch(storeCompanion(comData.data.data));
      const memData = await getMemo();
      dispatch(storeMemo(memData.data.data));
    }
    getData();
  }, []);

  const [events, setEvents] = useState([{}]);

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
        eventClick={onEventClick}
      />
      {selectedDate && <Planner />}
    </div>
  );
};

export default MorePlan;
