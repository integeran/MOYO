import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AccompanySearchBar from '../../components/accompany/AccompanySearchBar';
import AccompanyListSet from '../../components/accompany/AccompanyListSet';

const LocationDiv = styled.div`
  width: 90%;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
`;
const DateDiv = styled.div`
  width: 90%;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
`;

const AccompanyList = () => {
  const { accNation, accCity, accDate } = useSelector(
    state => ({
      accNation: state.accompanyCondition.nation,
      accCity: state.accompanyCondition.city,
      accDate: String(state.accompanyCondition.date),
    }),
    [],
  );

  return (
    <div>
      <LocationDiv>
        {accNation.name}/{accCity.name}
      </LocationDiv>
      <DateDiv>{accDate}</DateDiv>
      <AccompanySearchBar />
      <AccompanyListSet />
    </div>
  );
};

export default AccompanyList;
