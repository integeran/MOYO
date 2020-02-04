import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Paper,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    background: '#EEEEEE',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const AccompanySearchBar = ({ searchTextCondition, onClick, onChange }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const handleTextChange = e => {
    setText(e.target.value);
  };
  const handleSearchClick = e => {
    onClick(text);
  };

  return (
    <>
      <Paper elevation={0} className={classes.root}>
        <InputBase
          className={classes.input}
          value={text}
          onChange={handleTextChange}
          placeholder="검색어를 입력해주세요!"
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          onClick={handleSearchClick}
          aria-label="search"
          className={classes.iconButton}
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <FormControl>
          <Select value={searchTextCondition} onChange={onChange}>
            <MenuItem value={'title'}>제목</MenuItem>
            <MenuItem value={'contents'}>내용</MenuItem>
            <MenuItem value={'all'}>전체</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </>
  );
};

export default AccompanySearchBar;
