import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class LayoutRoute extends Component {
  static propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    layout: PropTypes.func.isRequired,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
      .isRequired,
  };

  render() {
    const { component, layout: CustomizedLayout, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={matchProps => {
          return (
            <CustomizedLayout matchProps={matchProps} component={component} />
          );
        }}
      />
    );
  }
}

export default LayoutRoute;
