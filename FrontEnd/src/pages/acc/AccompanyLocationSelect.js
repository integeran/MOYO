import React, { useState } from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  accompanyNation,
  accompanyCity,
} from '../../modules/accompanyCondition';

const nationData = [
  { nid: 2, name: '프랑스' },
  { nid: 3, name: '스페인' },
  { nid: 4, name: '이탈리아' },
  { nid: 5, name: '스위스' },
  { nid: 6, name: '영국' },
  { nid: 7, name: '독일' },
  { nid: 8, name: '포르투갈' },
  { nid: 9, name: '크로아티아' },
];
const cityData = [
  { cid: 1, nid: 2, name: '파리' },
  { cid: 2, nid: 2, name: '니스' },
  { cid: 3, nid: 3, name: '바르셀로나' },
  { cid: 4, nid: 3, name: '마드리드' },
  { cid: 5, nid: 4, name: '피렌체' },
  { cid: 6, nid: 4, name: '로마' },
];

const Title = styled.h2`
  margin: 0;
  padding: 1rem 1rem 2rem 1rem;
`;

const ListContainer = styled.div`
  display: flexbox;
`;

const NationList = styled(List)`
  flex-grow: 1;
`;

const CityList = styled(List)`
  flex-grow: 3;
`;

const AccompanyLocationSelect = () => {
  const history = useHistory();
  const [cityList, setCityList] = useState([]);
  const reduxDate = useSelector(state => state.accompanyCondition.date);
  const dispatch = useDispatch();

  const onNationClick = nationItem => {
    setCityList(cityData.filter(item => item.nid === nationItem.nid));
    dispatch(accompanyNation({ code: nationItem.nid, name: nationItem.name }));
  };

  const onCityClick = cityItem => {
    dispatch(accompanyCity({ code: cityItem.cid, name: cityItem.name }));
    const path =
      history.location.state.prevpath === '/acc' || !reduxDate
        ? '/acc/accSetDate'
        : '/acc/accList';
    history.push({
      pathname: path,
      state: { prevpath: history.location.pathname },
    });
  };

  return (
    <div>
      <Title>어디로 가실건가요?</Title>
      <ListContainer>
        <NationList component="nav">
          {nationData.map(item => (
            <ListItem
              alignItems="center"
              button
              key={item.nid}
              onClick={() => onNationClick(item)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </NationList>
        <CityList component="nav">
          {cityList.size !== 0 &&
            cityList.map(item => (
              <ListItem button key={item.cid} onClick={() => onCityClick(item)}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
        </CityList>
      </ListContainer>
    </div>
  );
};

export default AccompanyLocationSelect;
