import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './themes';
import GlobalStyle from './base';

export default (Component: React.ComponentClass<any>): any => {
  return class extends React.Component {
    render() {
      return (
        <ThemeProvider theme={theme}>
          <>
            <Component {...this.props} />
            <GlobalStyle />
          </>
        </ThemeProvider>
      );
    }
  };
};
