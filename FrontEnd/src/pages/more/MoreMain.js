import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import MoreTitleContents from '../../components/more/main/MoreTitleContents';
import MoreButtonContents from '../../components/more/main/MoreButtonContents';
import CalenderIcon from '../../../src/assets/icon/icon_calender.svg';
import AccompanyIcon from '../../../src/assets/icon/icon_accompany.svg';
import CommunityIcon from '../../../src/assets/icon/icon_community.svg';
import styled from 'styled-components';

const InnerGrid = styled(Grid)`
  width: 85%;
  margin: 0 auto !important;
  margin-top: 1rem !important;
`;

const MoreMain = () => {
  const history = useHistory();

  const handlePlanClick = () => {
    history.push('/more/morePlan');
  };
  const handleAccompanyManageClick = () => {
    history.push('/more/accompanyManage');
  };

  const handleCommunityClick = () => {
    history.push('/more/moreCommunity');
  };

  return (
    <>
      <Grid container direction="column">
        <MoreTitleContents />
        <InnerGrid item>
          <MoreButtonContents
            icon={CalenderIcon}
            onClick={handlePlanClick}
            menuName="여행 일정 관리"
          />
        </InnerGrid>
        <InnerGrid item>
          <MoreButtonContents
            icon={AccompanyIcon}
            onClick={handleAccompanyManageClick}
            menuName="내 동행 글"
          />
        </InnerGrid>
        <InnerGrid item>
          <MoreButtonContents
            icon={CommunityIcon}
            onClick={handleCommunityClick}
            menuName="내 커뮤니티 글"
          />
        </InnerGrid>
      </Grid>
    </>
  );
};

export default MoreMain;
