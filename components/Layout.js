import React from 'react';
import { Container } from 'react-bootstrap';
import MainNav from './MainNav'
import Footer from './Footer';
const Layout = (props) => {
  return (
    <>
       <MainNav/>
      <Container>{props.children}</Container>
      <Footer/>
    </>
  );
};

export default Layout;