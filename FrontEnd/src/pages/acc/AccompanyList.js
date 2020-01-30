import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AccompanySearchBar from '../../components/accompany/AccompanySearchBar';
import AccompanyListSet from '../../components/accompany/AccompanyListSet';
import FilterListIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab';
import AccompanyFilterDialog from '../../components/accompany/AccompanyFilterDialog';
import {
  accompanyFilterGender,
  accompanyFilterAge,
  accompanyFilterType,
} from '../../modules/accompanyFilter';
import axios from '../../api/axios';
import moment from 'moment';
import qs from 'qs';

const LocationDiv = styled.div`
  position: sticky;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
`;
const DateDiv = styled.div`
  position: sticky;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
`;
const CenterFab = styled(Fab)`
  position: fixed !important;
  right: 8%;
  bottom: 12%;
`;

const AccompanyList = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData, []);
  const [searchText, setSearchText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { accNation, accCity, accDate } = useSelector(
    state => ({
      accNation: state.accompanyCondition.nation,
      accCity: state.accompanyCondition.city,
      accDate: moment(state.accompanyCondition.date).format('YYYY-MM-DD'),
    }),
    [],
  );
  const { filterGender, filterAge, filterType } = useSelector(state => ({
    filterGender: state.accompanyFilter.gender,
    filterAge: state.accompanyFilter.age,
    filterType: state.accompanyFilter.type,
  }));
  const [boardData, setBoardData] = useState([]);
  const convertFilterType = types => {
    const arr = ['식사', '관광', '카페', '투어'];
    const converted = Object.keys(types)
      .filter(item => types[item])
      .map(item => arr.indexOf(item) + 1);
    return converted.length === 0 ? [0] : converted;
  };

  const convertAgeType = ages => {
    const converted = Object.keys(ages)
      .filter(item => ages[item])
      .map(item => Number(item) / 10);
    return converted.length === 0 ? [0] : converted;
  };

  const filterCondition = useCallback(
    {
      searchDate: accDate,
      cId: accCity.code,
      nId: accNation.code,
      searchAge: convertAgeType(filterAge),
      searchGender: filterGender || 'N',
      searchType: convertFilterType(filterType),
      searchCondition: '',
      searchWord: searchText,
      searchSort: '',
    },
    [filterGender, filterAge, filterType, searchText],
  );

  const getAccompanyBoardList = async () => {
    try {
      return await axios.get(
        'accompanyBoard/selectAll',
        {
          params: filterCondition,
          paramsSerializer: params => qs.stringify(params),
        },
        {
          headers: { userToken: userData.userToken },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getBoards = async () => {
      const result = await getAccompanyBoardList();
      const resData = result.data.data.map(item => {
        return {
          ...item,
          startDate: moment(item.startDate).format('YYYY-MM-DD'),
          endDate: moment(item.endDate).format('YYYY-MM-DD'),
        };
      });
      setBoardData(resData);
    };
    getBoards();
  }, [filterCondition]);

  const handleSearchClick = text => {
    setSearchText(text);
  };

  const handleFilterGenderChange = e =>
    dispatch(accompanyFilterGender(e.target.value));
  const handleFilterAgeChange = name => e =>
    dispatch(
      accompanyFilterAge({ ...filterAge, [name.age]: e.target.checked }),
    );
  const handleFilterTypeChange = name => e =>
    dispatch(
      accompanyFilterType({ ...filterType, [name.type]: e.target.checked }),
    );
  const handleFilteringClick = () => {
    setDialogOpen(true);
  };
  const handleSubmit = () => {
    setDialogOpen(false);
  };

  const handleLocationSelect = () => {
    history.push({
      pathname: '/acc/accSetLoc',
      state: { prevpath: history.location.pathnmae },
    });
  };
  const handleDateSelect = () => {
    history.push({
      pathname: '/acc/accSetDate',
      state: { prevpath: history.location.pathnmae },
    });
  };

  return (
    <div>
      <LocationDiv onClick={handleLocationSelect}>
        {accNation.name}/{accCity.name}
      </LocationDiv>
      <DateDiv onClick={handleDateSelect}>{accDate}</DateDiv>
      <AccompanySearchBar onClick={handleSearchClick} />
      <AccompanyListSet boardData={boardData} />
      <CenterFab
        variant="extended"
        aria-label="filter"
        onClick={handleFilteringClick}
      >
        <FilterListIcon />
        필터
      </CenterFab>
      <AccompanyFilterDialog
        filterGender={filterGender}
        filterAge={filterAge}
        filterType={filterType}
        onGenderChange={handleFilterGenderChange}
        onAgeChange={handleFilterAgeChange}
        onTypeChange={handleFilterTypeChange}
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
        }}
        handleSubmit={() => handleSubmit()}
      />
    </div>
  );
};

export default AccompanyList;
