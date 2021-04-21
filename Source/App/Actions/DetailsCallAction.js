import * as ActionTypes from './ActionTypes';
import {connect} from 'react-redux';
import axios from 'axios';

import DetailsComponent from '../Components/DetailsComponent';

const mapStateToProps = state => ({
  isLoading: state.detailsReducer.isLoading,
  error: state.detailsReducer.error,
  data: state.detailsReducer.data,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsComponent);
