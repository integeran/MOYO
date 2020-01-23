import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
//pages
import Main from './components/Main';

//hoc
import withAuth from './hoc/Auth';
import withStyles from './hoc/Styles';

class App extends React.Component {

  componentDidMount() {
    moment.locale('ko')
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(withAuth(App));
