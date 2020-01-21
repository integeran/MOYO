import React, { useState, useCallback } from 'react';
import ListNation from '../components/accompany/ListNation';
import ListCity from '../components/accompany/ListCity';
import styled from 'styled-components';

const ListContainer = styled.div``;

const AccompanyLonationSelect = () => {
  const [nation, setNation] = useState('');
  const [city, setCity] = useState('');

  const onSelectNation = useCallback(nation => setNation(nation), []);
  const onSelectCity = useCallback(city => setNation(city), []);
  return (
    <>
      <h3>장소를 선택해주세요.</h3>
      <ListContainer>
        <ListNation onSelectNation={onSelectNation} />
        <ListCity nation={nation} onSelectCity={onSelectCity} />
      </ListContainer>
    </>
  );
};

export default AccompanyLonationSelect;
