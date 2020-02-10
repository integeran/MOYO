import React from 'react';
import {
  Grid,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from '@material-ui/core';

const SubForm = ({ ...props }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="subtitle1" align="center">
          원하는 성별
        </Typography>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <RadioGroup
            name="gender"
            value={props.gender}
            onChange={props.onGenderChange}
            row
          >
            {props.genderList.map(item => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" align="center">
          원하는 나이대
        </Typography>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <FormGroup row>
            {props.ageList.map(item => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={
                  <Checkbox
                    checked={props.onAgeChecked(item.value)}
                    onChange={props.onAgeChange}
                    value={item.value}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" align="center">
          대표 여행 타입
        </Typography>
      </Grid>
      <FormControl fullWidth>
        <RadioGroup
          name="ttypeId"
          value={props.type}
          onChange={props.onTypeChange}
          row
        >
          {props.typeList.map(item => (
            <FormControlLabel
              key={item.ttypeId}
              value={item.ttypeId}
              control={<Radio />}
              label={item.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default SubForm;
