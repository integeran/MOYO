import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import {
  accompanyNation,
  accompanyCity,
} from '../../modules/accompanyCondition';

const HeaderTypo = styled(Typography)`
  position: static;
  padding: 2rem;
  flex: 0 1 auto;
`;
const StyledDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
`;
const ListContainer = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
`;
const NationList = styled(List)`
  flex-grow: 1;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const CityList = styled(List)`
  flex-grow: 3;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AccompanyLocationSelect = () => {
  const history = useHistory();
  const [nationList, setNationList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const userData = useSelector(state => state.auth.userData, []);
  const dispatch = useDispatch();

  const getAccompanyNationList = async () => {
    try {
      return await axios.get('accompanyBoard/selectNation', {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAccompanyCityList = async nid => {
    try {
      return await axios.get(`accompanyBoard/selectCity/${nid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('accloc');
    const fetchNationList = async () => {
      const res = await getAccompanyNationList();
      setNationList(res.data.data);
    };
    fetchNationList();
  }, []);

  const onNationClick = async nationItem => {
    const cityRes = await getAccompanyCityList(nationItem.nid);
    setCityList(cityRes.data.data);
    dispatch(accompanyNation({ code: nationItem.nid, name: nationItem.name }));
  };

  const onCityClick = cityItem => {
    dispatch(accompanyCity({ code: cityItem.cid, name: cityItem.name }));
    const path =
      history.location.state.prevpath === '/acc'
        ? '/acc/accSetDate'
        : '/acc/accList';
    history.push({
      pathname: path,
      state: { prevpath: history.location.pathname },
    });
  };

  return (
    <StyledDiv>
      <HeaderTypo variant="h4">어디로 여행 가실건가요?</HeaderTypo>
      <ListContainer>
        <NationList component="nav">
          {nationList.map(item => (
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
          {cityList.length !== 0 &&
            cityList.map(item => (
              <ListItem button key={item.cid} onClick={() => onCityClick(item)}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
        </CityList>
      </ListContainer>
    </StyledDiv>
  );
};

export default AccompanyLocationSelect;
