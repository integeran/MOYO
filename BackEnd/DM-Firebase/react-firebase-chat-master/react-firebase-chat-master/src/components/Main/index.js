import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/modules/user';

import Container from './Container';

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,
  user: state.user.data
});

const mapDispatchToProps = (dispatch: any) => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
