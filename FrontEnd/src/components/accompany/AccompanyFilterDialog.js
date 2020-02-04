import React, { useState, useEffect } from 'react';
import { getAgeList, getGenderList, getTypeList } from '../../api/commonData';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
} from '@material-ui/core';

const AccompanyFilterDialog = ({
  filterCondition,
  open,
  handleClose,
  handleSubmit,
}) => {
  const [genderList, setGenderList] = useState([]);
  const [ageList, setAgeList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const sortList = [
    { value: 'start', name: '여행시작일순' },
    { value: 'end', name: '여행종료일순' },
    { value: 'update', name: '등록일순' },
  ];

  const [gender, setGender] = useState(filterCondition.gender);
  const [age, setAge] = useState(filterCondition.age);
  const [type, setType] = useState(filterCondition.type);
  const [sort, setSort] = useState(filterCondition.sort);

  // lifecycle
  useEffect(() => {
    const setLists = async () => {
      setGenderList(await getGenderList(true));
      setAgeList(await getAgeList());
      setTypeList(await getTypeList());
    };
    setLists();
  }, []);

  // functions
  const handleChange = (e, name) => {
    const baseArr = name === 'age' ? age : type;
    const changeValue = Number(e.target.value);
    let replaceArr;
    if (baseArr.indexOf(changeValue) >= 0) {
      replaceArr = baseArr.filter(item => item !== changeValue);
      replaceArr =
        replaceArr.length === 0 ? replaceArr.concat([0]) : replaceArr;
    } else {
      replaceArr = baseArr.filter(item => item !== 0).concat([changeValue]);
    }
    name === 'age' ? setAge(replaceArr) : setType(replaceArr);
  };

  const handleCheck = (value, name) => {
    const baseArr = name === 'age' ? age : type;
    return baseArr.indexOf(Number(value)) >= 0;
  };

  const handleFilterSubmit = () => {
    const wrapped = {
      gender,
      age,
      type,
      sort,
    };
    handleSubmit(wrapped);
  };

  const handleFilterClose = () => {
    setGender(filterCondition.gender);
    setAge(filterCondition.age);
    setType(filterCondition.type);
    setSort(filterCondition.sort);
    handleClose();
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
      <DialogTitle>필터링</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <FormLabel>성별</FormLabel>
          <RadioGroup
            name="gender"
            value={gender}
            onChange={e => {
              setGender(e.target.value);
            }}
            row
          >
            {genderList.map(gender => (
              <FormControlLabel
                key={gender.value}
                value={gender.value}
                control={<Radio />}
                label={gender.name}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>나이</FormLabel>
          <FormGroup row>
            {ageList.map(item => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={
                  <Checkbox
                    checked={handleCheck(item.value, 'age')}
                    onChange={e => handleChange(e, 'age')}
                    value={item.value}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>여행타입</FormLabel>
          <FormGroup row>
            {typeList.map(item => (
              <FormControlLabel
                key={item.ttypeId}
                value={item.ttypeId}
                control={
                  <Checkbox
                    checked={handleCheck(item.ttypeId, 'type')}
                    onChange={e => handleChange(e, 'type')}
                    value={item.value}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>정렬순</FormLabel>
          <RadioGroup
            name="sort"
            value={sort}
            onChange={e => {
              setSort(e.target.value);
            }}
            row
          >
            {sortList.map(sort => (
              <FormControlLabel
                key={sort.value}
                value={sort.value}
                control={<Radio />}
                label={sort.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFilterClose} color="primary">
          취소
        </Button>
        <Button onClick={handleFilterSubmit} color="primary">
          적용
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccompanyFilterDialog;
