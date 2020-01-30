import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { AppBar, Toolbar, IconButton } from '@material-ui/core';

const StyledAppBar = styled(({ ...other }) => <AppBar {...other} />)`
  & .MuiTypography-h6 {
    flex-grow: 1;
    text-align: center;
  }
`;

const IconButtonContainer = ({ pos, label, handleClick, IconDesign }) => {
  return (
    <IconButton
      edge={pos}
      aria-label={label}
      color="inherit"
      onClick={handleClick}
    >
      {IconDesign}
    </IconButton>
  );
};

const BaseAppBar = ({ title, Icon1, handleClick1, Icon2, handleClick2 }) => {
  return (
    <StyledAppBar color="inherit" elevation={0} position="sticky">
      <Toolbar>
        {Icon1 && (
          <IconButtonContainer
            pos="start"
            label="back"
            IconDesign={Icon1}
            handleClick={handleClick1}
          />
        )}
        <Typography variant="h6">{title}</Typography>
        {Icon2 && (
          <IconButtonContainer
            pos="end"
            label="back"
            IconDesign={Icon2}
            handleClick={handleClick2}
          />
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default BaseAppBar;
