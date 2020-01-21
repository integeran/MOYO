import React, { useState } from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
let cityData = [];

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

const AccompanyList = () => {
  const [nation, setNation] = useState(0);
  const [city, setCity] = useState(0);

  const onNationClick = nation => {
    console.log(nation);
    setNation(2);
    cityData = [
      { cid: 1, nid: 2, name: '파리' },
      { cid: 2, nid: 2, name: '니스' },
      { cid: 3, nid: 3, name: '바르셀로나' },
      { cid: 4, nid: 3, name: '마드리드' },
      { cid: 5, nid: 4, name: '피렌체' },
      { cid: 6, nid: 4, name: '로마' },
    ];
  };

  const onCityClick = () => {
    setCity(2);
  };

  return (
    <div>
      <Title>어디로 가실건가요?</Title>
      <ListContainer>
        <NationList component="nav">
          {nationData.map(nation => (
            <ListItem
              alignItems="center"
              button
              key={nation.nid}
              onClick={() => onNationClick(nation)}
            >
              <ListItemText primary={nation.name} />
            </ListItem>
          ))}
        </NationList>
        <CityList component="nav">
          {nation !== 0 &&
            cityData.map(city => (
              <ListItem button key={city.cid}>
                <ListItemText primary={city.name} />
              </ListItem>
            ))}
        </CityList>
      </ListContainer>
    </div>
  );
};

export default AccompanyList;
