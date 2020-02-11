import React from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const PersonalGame = ({ round, topindex, bottomindex, onClickImage }) => {
  const srcs = [
    'https://t1.daumcdn.net/liveboard/Magazine543/0dc193d1d71e437b8a5d3b5afbcc8b3c.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSO0xqCHpi4uqEMVqJCwGqHcszYh1sFeTKM5555v2uPSN9fdJtC',
    'https://lh3.googleusercontent.com/proxy/Us_jzcrKnJb0Fo1LX9TvwWAjnyvtcREf2P8olQgF0SouIcNqc5m-yZJIFXlg50oKTPQrgfp9hYo_YXfUObsPdaYUt-CcTQIaeHaxJLbrmfWwyHU7UssokndJR6c7vghwCsI2_XPY__56Xw',
    'https://lh3.googleusercontent.com/proxy/7epqJidxwOVnTzC4RyAGI7lkatpxetcYZOnPG8aP66J3vcp7nokoN8PEOpe6ZScSnavMVy74SEobUrvGfPh5YwAoGfAF43C7IDCMVJj6nloUR6xZgxLo7v0',
    'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F22423B425305A9871D',
    'https://lh3.googleusercontent.com/proxy/8T856-iS3xXSfuUuI7YyIuajfglpYWUdgrIfiwy2sJVWqJ7pbd2NvNotB6rP5l-9398mvImQWeOj5KyC_KbNVMN8MMq2Rz7_E9oUPwGJmCF92zB2_VrmX6JE7Cz7AiGtVrocAqZ6mGLyykkQ3lVAmz8KfwBbW1CYtsKctOFcQCMYvKPYACaypFtjDYUlEfpqzxELcENGVafT9QwMopSvaimeTtWxCc8zXslKPmZNe-iC7duVPLrP7vIUK-vZrQb3Y5AGUSChtgV3OZ-xOPJ2g_FdyEHfymqDLMw4JgbrIObEa0shTCXWiPg4D-hxqLCYRj3-BunGQG_706VNiHQ',
    'https://pbs.twimg.com/profile_images/983752433879859200/IJeihBHo_400x400.jpg',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEUAAP+KeNJXAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC',
    'https://previews.123rf.com/images/lineartestpilot/lineartestpilot1210/lineartestpilot121023677/16122906-%EB%A7%8C%ED%99%94-%EC%88%AB%EC%9E%90-1.jpg',
    'https://previews.123rf.com/images/kostiuchenko/kostiuchenko1701/kostiuchenko170100408/70027137-%EC%88%AB%EC%9E%90-2-%EB%91%90-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-3d-%EB%A0%8C%EB%8D%94%EB%A7%81.jpg',
    'data:image/png;base64,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',
    'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F254B1048583FC2CE1B',
    'https://thumbnail.10x10.co.kr/webimage/image/basic600/129/B001292660-1.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false',
    'https://comps.canstockphoto.co.kr/%EB%8F%8C-%EC%88%AB%EC%9E%90-6-%EB%A7%A4%EC%9A%B0%EC%9D%98-%EB%B9%A8%EA%B0%95-%ED%81%B4%EB%A6%BD%EC%95%84%ED%8A%B8_csp26755627.jpg',
    'https://mblogthumb-phinf.pstatic.net/20141205_182/dibrary1004_1417756403013ufaB8_JPEG/2014b_ma000001_i14.jpg?type=w2',
    'https://previews.123rf.com/images/boygointer/boygointer1403/boygointer140300090/26925745-%EC%88%AB%EC%9E%90-8-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
  ];

  return (
    <div>
      <div
        id="showRound"
        style={{ textAlign: 'center', marginBottom: '5%', marginTop: '5%' }}
      >
        <Typography variant="h4">{round}강</Typography>
      </div>
      <div id="showImage">
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ padding: '5%', height: '100%' }}
        >
          <Grid item xs={6}>
            <div
              onClick={() => {
                onClickImage(topindex);
              }}
            >
              <Avatar
                alt="위 이미지"
                src={srcs[topindex]}
                style={{ width: '200px', height: '200px', borderRadius: '50%' }}
              />
            </div>
          </Grid>

          <div
            style={{
              textAlign: 'center',
              marginTop: '10%',
              marginBottom: '10%',
            }}
          >
            <Typography variant="h5">
              자신의 <span style={{ color: 'red' }}>성향</span>을 선택해주세요
            </Typography>
          </div>

          <Grid item xs={6}>
            <div
              onClick={() => {
                onClickImage(bottomindex);
              }}
            >
              <Avatar
                alt="아래 이미지"
                src={srcs[bottomindex]}
                style={{ width: '200px', height: '200px', borderRadius: '50%' }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PersonalGame;
