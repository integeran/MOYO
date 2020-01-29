import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
`;

const Divheader = styled.div`
  display: inline-block;
`;

const Header = ({ leftSet, midTitle, rightSet }) => {
  return (
    <HeaderContainer>
      <Divheader>{leftSet}</Divheader>
      <Divheader>{midTitle}</Divheader>
      <Divheader>{rightSet}</Divheader>
    </HeaderContainer>
  );
};

export default Header;
