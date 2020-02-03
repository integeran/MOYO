import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { accompanyDate } from '../../modules/accompanyCondition';
import { useHistory } from 'react-router';
import moment from 'moment';

const HeaderTypo = styled(Typography)`
  padding: 2rem;
  flex: 0 1 auto;
`;

const CalendarStyled = styled(Calendar)`
  border: 0;
  margin: 0 auto;
  width: 90%;
  margin-bottom: 2rem;

  & .react-calendar__year-view__months__month {
    padding: 1.2em 0.5em;
  }
  & .react-calendar__decade-view__years__year {
    padding: 1.2em 0.5em;
  }
  & .react-calendar__century-view__decades__decade {
    padding: 1.2em 0.5em;
  }
  .react-calendar__tile:disabled {
    background: inherit;
    color: #eeeeee;
  }
  .react-calendar__navigation button[disabled] {
    background: inherit;
    color: #eeeeee;
  }
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 90%;
`;

const AccompanyDateSelect = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const onChange = date => setDate(date);

  moment.lang('ko', {
    weekdays: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
  });

  const HandleClick = () => {
    dispatch(accompanyDate(date));
    history.push({
      pathname: '/acc/accList',
      state: { prevpath: history.location.pathname },
    });
  };
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      style={{ height: 'inherit' }}
    >
      <Grid item>
        <HeaderTypo variant="h4">언제 동행을 찾고싶나요?</HeaderTypo>
      </Grid>
      <Grid item>
        <CalendarStyled onChange={onChange} value={date} minDate={new Date()} />
      </Grid>
      <Grid item>
        <HeaderTypo variant="h5" align="center">
          {moment(date).format('YYYY-MM-DD (ddd)')}
        </HeaderTypo>
      </Grid>
      <Grid item>
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={date === null}
            onClick={HandleClick}
          >
            동행 찾기
          </Button>
        </ButtonContainer>
      </Grid>
    </Grid>
  );
};

export default AccompanyDateSelect;
