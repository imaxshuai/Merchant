import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import { AppNavigator } from './stackNavigator'

const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);