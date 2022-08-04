import React from 'react';
import Footer from '../../components/containers/Footer';
import Header from '../../components/containers/Header';
import CustomHelmet from '../../components/UI/Helmet';

const Donation = () => {
  return (
    <div>
      <CustomHelmet name="DONATE" />
      <Header />
      <Footer />
    </div>
  );
};

export default Donation;
