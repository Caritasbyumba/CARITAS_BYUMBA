import React from 'react';
import Footer from '../components/containers/Footer';
import Header from '../components/containers/Header';
import Carousel from '../components/containers/home/Carousel';
import MainProjects from '../components/containers/home/MainProjects';
import Moreonus from '../components/containers/home/Moreonus';

const Home = (props) => {
  return (
    <div>
      <Header />
      <Carousel />
      <Moreonus />
      <MainProjects />
      <Footer />
    </div>
  );
};

export default Home;
