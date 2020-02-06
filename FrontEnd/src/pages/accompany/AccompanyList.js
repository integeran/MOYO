import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AccompanySearchBar from '../../components/accompany/List/AccompanySearchBar';
import AccompanyListSet from '../../components/accompany/List/AccompanyListSet';
import { Grid, IconButton, Fab } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccompanyFilterDialog from '../../components/accompany/List/AccompanyFilterDialog';
import {
  accompanyFilterGender,
  accompanyFilterAge,
  accompanyFilterType,
} from '../../modules/accompanyFilter';
import { accompanyDate } from '../../modules/accompanyCondition';
import axios from '../../api/axios';
import moment from 'moment';
import qs from 'qs';
import { Typography } from '@material-ui/core';

const MainGrid = styled(Grid)`
  height: inherit;
`;

const StyledDiv = styled.div`
  text-align: center;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  margin: 0 auto;
`;

const CenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollGrid = styled(Grid)`
  flex: 1;
  position: relative;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CenterFab = styled(Fab)`
  position: fixed !important;
  right: 8%;
  bottom: 12%;
`;

const UnderlineTypo = styled(Typography)`
  text-transform: uppercase;
  text-decoration: none;
  &:before,
  &:after {
    content: '';
    position: absolute;
    bottom: 1rem;
    left: 2rem;
    right: 2rem;
    height: 2px;
    background-color: #f37272;
  }
  &:before {
    opacity: 0;
    transform: translateY(-8px);
    transition: transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0s;
  }
  &:after {
    opacity: 0;
    transform: translateY(8px/2);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      opacity 0.2s;
  }
  &:hover,
  &:focus {
    &:before,
    &:after {
      opacity: 1;
      transform: translateY(0);
    }
    &:before {
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
        opacity 0.2s;
    }
    &:after {
      transition: transform 0s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
        opacity 0s 0.2s;
    }
  }
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
      accDate: state.accompanyCondition.date,
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

  const convertDate = date => moment(date).format('YYYY-MM-DD');

  const filterCondition = useCallback(
    {
      searchDate: convertDate(accDate),
      cId: accCity.code,
      nId: accNation.code,
      searchAge: convertAgeType(filterAge),
      searchGender: filterGender || 'N',
      searchType: convertFilterType(filterType),
      searchCondition: '',
      searchWord: searchText,
      searchSort: '',
    },
    [filterGender, filterAge, filterType, searchText, accDate],
  );

  const getAccompanyBoardList = async () => {
    try {
      return await axios.get('accompanyBoard/selectAll', {
        params: filterCondition,
        paramsSerializer: params => qs.stringify(params),
        headers: { userToken: userData.userToken },
      });
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
  }, [filterCondition, accDate]);

  // ----------------------event-----------------------
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
      pathname: '/accompany/accSetLoc',
      state: { prevpath: history.location.pathnmae },
    });
  };
  const handleDateSelect = () => {
    history.push({
      pathname: '/accompany/accSetDate',
      state: { prevpath: history.location.pathnmae },
    });
  };
  const handleBackClick = () => {
    history.push({
      pathname: '/accompany',
    });
  };
  const handlePreDayClick = () => {
    let preDate = new Date(accDate);
    const nowDate = new Date();
    preDate.setDate(preDate.getDate() - 1);
    if (
      moment(nowDate).format('YYYY-MM-DD') <=
      moment(preDate).format('YYYY-MM-DD')
    ) {
      dispatch(accompanyDate(preDate));
    }
  };
  const handleNextDayClick = () => {
    let nextDate = new Date(accDate);
    nextDate.setDate(nextDate.getDate() + 1);
    dispatch(accompanyDate(nextDate));
  };

  return (
    <>
      <MainGrid container direction="column">
        <Grid
          item
          container
          spacing={2}
          style={{ paddingTop: '1rem', flex: '0 1 auto' }}
        >
          <CenterGrid item xs={2}>
            <IconButton color="inherit" onClick={handleBackClick}>
              <ArrowBackIosIcon />
            </IconButton>
          </CenterGrid>
          <CenterGrid item xs={8} style={{ position: 'relative' }}>
            <StyledDiv onClick={handleLocationSelect}>
              <UnderlineTypo variant="h5" align="center">
                {accNation.name}/{accCity.name}
              </UnderlineTypo>
            </StyledDiv>
          </CenterGrid>
          <Grid item xs={2}></Grid>
        </Grid>

        <Grid item container spacing={2} style={{ flex: '0 1 auto' }}>
          <Grid item xs={1}></Grid>
          <CenterGrid item xs={2}>
            <IconButton color="inherit" onClick={handlePreDayClick}>
              <ArrowBackIosIcon fontSize="small" color="disabled" />
            </IconButton>
          </CenterGrid>
          <CenterGrid item xs={6} style={{ position: 'relative' }}>
            <StyledDiv onClick={handleDateSelect}>
              <UnderlineTypo variant="subtitle1" align="center">
                {convertDate(accDate)}
              </UnderlineTypo>
            </StyledDiv>
          </CenterGrid>
          <Grid item xs={2}>
            <IconButton color="inherit" onClick={handleNextDayClick}>
              <ArrowForwardIosIcon fontSize="small" color="disabled" />
            </IconButton>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Grid item style={{ flex: '0 1 auto', marginBottom: '1rem' }}>
          <AccompanySearchBar onClick={handleSearchClick} />
        </Grid>
        <ScrollGrid item>
          <AccompanyListSet boardData={boardData} />
        </ScrollGrid>
      </MainGrid>
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
    </>
  );
};

export default AccompanyList;
