import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
// eslint-disable-next-line
import Footer from '../components/Footer';
import containerStyle from './containerStyle';

const Container = ({ children }) => (
  <div style={containerStyle} id="outer-container">
    <Header />
    {children}
    <Footer />
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
