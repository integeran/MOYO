import React, { useState, useCallback } from 'react';
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
  const { accNation, accCity, accDate } = useSelector(
    state => ({
      accNation: state.accompanyCondition.nation,
      accCity: state.accompanyCondition.city,
      accDate: String(state.accompanyCondition.date),
    }),
    [],
  );
  const [open, setOpen] = useState(false);

  const { filterGender, filterAge, filterType } = useSelector(state => ({
    filterGender: state.accompanyFilter.gender,
    filterAge: state.accompanyFilter.age,
    filterType: state.accompanyFilter.type,
  }));

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <AccompanySearchBar />
      <AccompanyListSet />
      <CenterFab
        variant="extended"
        aria-label="filter"
        onClick={handleClickOpen}
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
        open={open}
        handleClose={() => handleClose()}
      />
    </div>
  );
};

export default AccompanyList;
