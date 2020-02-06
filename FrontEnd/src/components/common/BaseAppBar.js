import React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';

const StyledAppBar = styled(({ ...other }) => <AppBar {...other} />)`
  flex-grow: 1;
  & .MuiTypography-h6 {
    flex-grow: 1;
    text-align: center;
  }
`;

const ItemContainer = ({ type, icon, text, onClick }) => {
  return (
    <>
      {icon && type === 'icon' && (
        <IconButton color="inherit" onClick={onClick}>
          {icon}
        </IconButton>
      )}
      {!icon && (text || type === 'text') && (
        <Button color="inherit">
          <Typography variant="subtitle1">{text}</Typography>
        </Button>
      )}
    </>
  );
};

const BaseAppBar = ({
  text,
  align = 'center',
  leftIcon,
  leftText,
  leftType = 'text',
  leftClick,
  rightIcon,
  rightText,
  rightType = 'text',
  rightClick,
}) => {
  return (
    <StyledAppBar color="inherit" elevation={0} position="sticky">
      <Toolbar disableGutters={true}>
        <Grid item xs={2}>
          <ItemContainer
            type={leftType}
            icon={leftIcon}
            text={leftText}
            onClick={leftClick}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" align={align}>
            {text}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <ItemContainer
            type={rightType}
            icon={rightIcon}
            text={rightText}
            onClick={rightClick}
          />
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default BaseAppBar;
