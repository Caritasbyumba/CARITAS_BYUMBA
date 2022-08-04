import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/containers/Footer';
import Header from '../components/containers/Header';
import Partner from '../components/containers/partners/Partner';
import { CardBody, PageTitle } from '../components/text';
import CustomHelmet from '../components/UI/Helmet';
import Spinner from '../components/UI/spinner';
import {
  useFetchActivePartnersIntroQuery,
  useFetchActivePartnersQuery,
} from '../features/API/user-api-slice';

const Partners = () => {
  const { data: partnersIntro = [], isFetching: isFetchingPartnersIntro } =
    useFetchActivePartnersIntroQuery();
  const { data: partners = [], isFetching: isFetchingPartners } =
    useFetchActivePartnersQuery();

  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );

  return (
    <div>
      <CustomHelmet name="PARTNERS" />
      <Header />
      {isFetchingPartnersIntro ? (
        <Spinner />
      ) : (
        <div className="bg-gray-200 py-5">
          <div className="w-70% m-auto">
            <PageTitle
              name={partnersIntro.results.title[selectedLanguage]}
              color="red"
              additional="text-center"
            />
            <CardBody
              name={partnersIntro.results.description[selectedLanguage]}
            />
          </div>
        </div>
      )}
      {isFetchingPartners ? (
        <Spinner />
      ) : (
        <div className="w-70% m-auto py-5 divide-y">
          {partners.results.map((project, index) => (
            <Partner key={index} index={index} {...project} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Partners;
