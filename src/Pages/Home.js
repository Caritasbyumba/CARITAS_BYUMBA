import React from 'react';
import Footer from '../components/containers/Footer';
import Header from '../components/containers/Header';
import Carousel from '../components/containers/home/Carousel';
import MainProjects from '../components/containers/home/MainProjects';
import Moreonus from '../components/containers/home/Moreonus';
import Partners from '../components/containers/home/Partners';
import { Helmet } from 'react-helmet';

const Home = (props) => {
  return (
    <div>
      <Helmet>
        <title>CARITAS BYUMBA</title>
      </Helmet>
      <Header />
      <Carousel />
      <Moreonus />
      <MainProjects />
      <Partners />
      <Footer />
    </div>
  );
};

export default Home;