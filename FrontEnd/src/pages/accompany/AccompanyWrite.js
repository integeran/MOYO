import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {
  TextField,
  Grid,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BaseAppBar from '../../components/common/BaseAppBar';
import MainForm from '../../components/accompany/write/MainForm';
import SubForm from '../../components/accompany/write/SubForm';
import moment from 'moment';
import axios from '../../api/axios';
import {
  getNationList,
  getCityList,
  getGenderList,
  getAgeList,
  getTypeList,
} from '../../api/commonData';

const AccompanyWrite = () => {
  const userData = useSelector(state => state.auth.userData, []);
  const history = useHistory();
  const isModify = history.location.pathname.indexOf('more') > -1;
  const modifyBoard = history.location.state.board;

  const [cityList, setCityList] = useState([]);
  const [nationList, setNationList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [ageList, setAgeList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [nation, setNation] = useState('');
  const [city, setCity] = useState('');
  const [content, setContent] = useState('');

  const [gender, setGender] = useState('N');
  const [age, setAge] = useState('0');
  const [type, setType] = useState('0');
  const [expanded, setExpanded] = React.useState('');

  useEffect(() => {
    const fetchNationList = async () => {
      setNationList(await getNationList());
      setGenderList(await getGenderList(true));
      setAgeList(await getAgeList(true));
      setTypeList(await getTypeList(true));
      if (isModify && modifyBoard) {
        setCityList(await getCityList(modifyBoard.nid));
      }
    };
    fetchNationList();
    if (isModify) {
      setTitle(modifyBoard.title);
      setStartDate(modifyBoard.startDate);
      setEndDate(modifyBoard.endDate);
      setNation(modifyBoard.nid);
      setCity(modifyBoard.cid);
      setContent(modifyBoard.contents);
      setGender(modifyBoard.wantGender.toUpperCase());
      setAge(modifyBoard.wantAge);
      setType(String(modifyBoard.ttypeId));
    }
  }, []);

  const postAccompanyBoard = async boardData => {
    try {
      return await axios.post(`accompanyBoard/create`, boardData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const putAccompanyBoard = async boardData => {
    try {
      return await axios.put(`accompanyBoard/update`, boardData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const handleSubmitClick = () => {
    const fetchBoard = async () => {
      const boardData = {
        acBoardId: modifyBoard.acBoardId || 0,
        nid: nation,
        cid: city,
        contents: content,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        title: title,
        ttypeId: type,
        uid: userData.uid,
        wantAge: age.toLowerCase(),
        wantGender: gender,
      };
      isModify
        ? await putAccompanyBoard(boardData)
        : await postAccompanyBoard(boardData);
    };
    fetchBoard();
    history.goBack();
  };

  // main form event
  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleStartDate = date => {
    setStartDate(date);
  };
  const handleEndDate = date => {
    setEndDate(date);
  };
  const handleNationChange = async e => {
    setNation(e.target.value);
    const res = await getCityList(e.target.value);
    setCityList(res);
  };
  const handleCityChange = e => {
    setCity(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleGenderChange = e => {
    setGender(e.target.value);
  };

  const handleAgeChecked = value => age.indexOf(String(value)) > -1;

  const handleAgeChange = e => {
    const value = String(e.target.value);
    if (value === '0') {
      setAge('0');
    } else {
      if (age === '0') {
        setAge(value);
      } else {
        let ageArr = age.split('|');
        ageArr.indexOf(value) > -1
          ? setAge(ageArr.filter(item => item !== value).join('|'))
          : setAge(age + '|' + value);
      }
    }
  };

  const handleTypeChange = e => {
    setType(e.target.value);
  };

  const handleExpandChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <BaseAppBar
        text="글 작성하기"
        align="left"
        leftIcon={<ArrowBackIosIcon />}
        leftType="icon"
        rightText="완료"
        leftClick={handleBackClick}
        rightClick={handleSubmitClick}
      />
      <form autoComplete="off">
        <Grid container direction="column">
          <MainForm
            title={title}
            startDate={startDate}
            endDate={endDate}
            nationList={nationList}
            cityList={cityList}
            nation={nation}
            city={city}
            onTitleChange={handleTitleChange}
            onStartDateChange={handleStartDate}
            onEndDateChange={handleEndDate}
            onNationChange={handleNationChange}
            onCityChange={handleCityChange}
          />
          <Divider />
          <ExpansionPanel
            square
            expanded={expanded === 'panel1'}
            onChange={handleExpandChange('panel1')}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              상세 설정
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SubForm
                genderList={genderList}
                typeList={typeList}
                ageList={ageList}
                gender={gender}
                type={type}
                age={age}
                onGenderChange={handleGenderChange}
                onAgeChecked={handleAgeChecked}
                onAgeChange={handleAgeChange}
                onTypeChange={handleTypeChange}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Divider />
          <Grid item style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <TextField
              id="outlined-multiline-static"
              label="내용"
              multiline
              fullWidth
              rows="10"
              value={content}
              onChange={handleContentChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AccompanyWrite;
