import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
// eslint-disable-next-line
import Footer from '../components/Footer';
import containerStyle from './containerStyle';

const Container = ({ children, showHeader }) => (
  <div style={containerStyle} id="outer-container">
    {!showHeader ? null : <Header />}
    {children}
    <Footer />
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  showHeader: PropTypes.bool,
};

Container.defaultProps = {
  showHeader: true,
};

export default Container;
