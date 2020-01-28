import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AccompanySearchBar from '../../components/accompany/AccompanySearchBar';
import AccompanyListSet from '../../components/accompany/AccompanyListSet';
import FilterListIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const LocationDiv = styled.div`
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
`;
const DateDiv = styled.div`
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
`;
const CenterFab = styled(Fab)`
  position: absolute !important;
  left: 85%;
  bottom: 5%;
`;

const AccompanyList = () => {
  let history = useHistory();
  const { accNation, accCity, accDate } = useSelector(
    state => ({
      accNation: state.accompanyCondition.nation,
      accCity: state.accompanyCondition.city,
      accDate: String(state.accompanyCondition.date),
    }),
    [],
  );
  const [open, setOpen] = React.useState(false);

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
      <CenterFab aria-label="filter" onClick={handleClickOpen}>
        <FilterListIcon />
      </CenterFab>
      <Dialog open={open} maxWidth="md" fullWidth="true" onClose={handleClose}>
        <DialogTitle>필터링</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleClose} color="primary">
            적용
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccompanyList;
