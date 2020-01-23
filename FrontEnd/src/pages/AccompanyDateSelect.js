import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { accompanyDate } from '../modules/accompanyCondition';

const CalendarStyled = styled(Calendar)`
  border: 0;
  margin: 0 auto;
  width: 90%;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 90%;
`;

const AccompanyDateSelect = ({ history }) => {
  const diaspatch = useDispatch();
  const [date, setDate] = useState(null);
  const onChange = date => setDate(date);
  const HandleClick = () => {
    diaspatch(accompanyDate(date));
    history.push('/acc/accList');
  };
  return (
    <div>
      <h3>언제 동행을 구하고 싶나요?</h3>
      <CalendarStyled onChange={onChange} value={date} />
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
    </div>
  );
};

export default AccompanyDateSelect;
