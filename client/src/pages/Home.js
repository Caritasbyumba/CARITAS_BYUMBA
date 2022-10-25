import React from 'react';
import Footer from '../components/containers/Footer';
import Header from '../components/containers/Header';
import Carousel from '../components/containers/home/Carousel';
import MainProjects from '../components/containers/home/MainProjects';
import Partners from '../components/containers/home/Partners';
import { Helmet } from 'react-helmet';
import Aboutus from '../components/containers/home/Aboutus';

const Home = (props) => {
  return (
    <div>
      <Helmet>
        <title>CARITAS BYUMBA</title>
      </Helmet>
      <Header />
      <Carousel />
      <Aboutus />
      <MainProjects />
      <Partners />
      <Footer />
    </div>
  );
};

export default Home;
