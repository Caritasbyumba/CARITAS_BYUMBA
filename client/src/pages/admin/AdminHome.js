import React from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../components/containers/admin/Wrapper';
import Footer from '../../components/containers/Footer';
import Header from '../../components/containers/Header';
import Carousel from '../../components/containers/home/Carousel';
import MainProjects from '../../components/containers/home/MainProjects';
import Moreonus from '../../components/containers/home/Moreonus';
import Partners from '../../components/containers/home/Partners';

const AdminHome = (props) => {
  return (
    <div>
      <Helmet>
        <title>CARITAS BYUMBA</title>
      </Helmet>
      <Header />
      <Wrapper {...props} item="carousel">
        <Carousel />
      </Wrapper>
      <Wrapper {...props}>
        <Moreonus />
      </Wrapper>
      <Wrapper {...props}>
        <MainProjects />
      </Wrapper>
      <Wrapper {...props}>
        <Partners />
      </Wrapper>
      <Footer />
    </div>
  );
};

export default AdminHome;
