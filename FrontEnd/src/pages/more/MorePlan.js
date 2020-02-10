import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Planner from '../../components/more/Planner';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './styles.scss';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import { changeField } from '../../modules/planDate';
import { storeSchedule } from '../../modules/morePlanTravel';
import { storeCompanion } from '../../modules/morePlanCompanion';
import { storeMemo } from '../../modules/morePlanMemo';
import Typography from '@material-ui/core/Typography';
import axios from '../../api/axios';
import BaseAppBar from '../../components/common/BaseAppBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ChatIcon from '@material-ui/icons/Chat';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Grid from '@material-ui/core/Grid';

const MorePlan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const pushSelectedDate = d => {
    dispatch(changeField({ key: 'selectedDate', value: d }));
  };

  const [selectedDate, setSelectedDate] = useState('');

  const handleChangeSelectedDate = value => {
    // console.log(props);
    setSelectedDate(value);
    pushSelectedDate(moment(value.date).format());
    // console.log(props.eventBackgroundColor);

    // document.getElementsByClassName()
    // console.log(value.jsEvent.target);
    // console.log(value.dayEl.style.backgroundColor);
    // // value.dayEl.style = { color: 'red' };
    // value.jsEvent.target.className = 'fc-state-highlight';
    // // t.addClass);
    // // (jsEvent.target).addClass("fc-state-highlight")
    // console.log(value);
    // value.dayEl.classList.push('fc-state-highlight');
    // value.dayEl.className += ' fc-state-highlight';
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
          title: `${item.nation} / ${item.city}`,
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
          '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 32 32" aria-hidden="true" role="presentation"><circle cx="12" cy="4" r="2"></circle><path d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-2.54C8.24 6.99 6 4.75 6 2H4c0 3.16 2.11 5.84 5 6.71V22h2v-6h2v6h2V10.05L18.95 14l1.41-1.41-4.47-4.48z"></path></svg>';
      }
    });
  };

  const handleBackIcon = () => {
    history.push('/more');
  };

  return (
    <div>
      <BaseAppBar
        text="일정 관리"
        leftType="icon"
        leftIcon={<ArrowBackIosIcon onClick={handleBackIcon} />}
      />
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: 'inherit', height: 'inherit', margin: '0px' }}
      >
        <Grid item>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            header={{
              left: 'prev, customPrevButton',
              center: 'title',
              right: 'next',
            }}
            titleFormat={{
              month: 'short',
              year: 'numeric',
            }}
            fixedWeekCount={false}
            contentHeight={'auto'}
            dateClick={date => handleChangeSelectedDate(date)}
            events={events}
            displayEventTime={false}
            dayRender={data => dayRenderFunction(data)}
          />
        </Grid>
        <Grid item>{selectedDate && <Planner />}</Grid>
      </Grid>
    </div>
  );
};

export default MorePlan;
