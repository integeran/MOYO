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
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import axios from '../../api/axios';

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

  const userData = useSelector(state => state.auth.userData);

  const planTravelList = useSelector(
    state => state.morePlanTravel.planTravelList,
  );

  const planCompanionList = useSelector(
    state => state.morePlanCompanion.planCompanionList,
  );

  const getSchedule = async () => {
    try {
      return await axios.get(`scheduleList/selectAllByUser/${userData.uid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCompanion = async () => {
    try {
      return await axios.get(`dailyAccompany/selectAllByUser/${userData.uid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getMemo = async () => {
    try {
      return await axios.get(`dailyMemo/selectAllByUser/${userData.uid}`, {
        headers: { userToken: userData.userToken },
      });
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

  const dayRenderFunction = data => {
    const renderDate = moment(data.date).format('YYYY-MM-DD');
    planCompanionList.forEach(element => {
      if (renderDate === moment(element.day).format('YYYY-MM-DD')) {
        data.el.innerHTML =
          '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>';
      }
    });
  };

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
        dayRender={data => dayRenderFunction(data)}
      />
      {selectedDate && <Planner />}
    </div>
  );
};

export default MorePlan;
