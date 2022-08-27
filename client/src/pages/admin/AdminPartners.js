import React from 'react';
import {
  useFetchActivePartnersIntroQuery,
  useFetchActivePartnersQuery,
} from '../../features/API/user-api-slice';
import { useSelector } from 'react-redux';
import CustomHelmet from '../../components/UI/Helmet';
import Header from '../../components/containers/Header';
import Spinner from '../../components/UI/spinner';
import Wrapper from '../../components/containers/admin/Wrapper';
import { CardBody, PageTitle } from '../../components/text';
import Partner from '../../components/containers/partners/Partner';
import Footer from '../../components/containers/Footer';

const AdminPartners = (props) => {
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
        <Wrapper {...props} item="partnersintro">
          <div className="bg-gray-200 py-5">
            <div className="w-90% lg:w-70% m-auto">
              <PageTitle
                name={partnersIntro.results.title[selectedLanguage]}
                color="red"
                additional="text-center py-5"
              />
              <CardBody
                name={partnersIntro.results.description[selectedLanguage]}
                additional="text-center"
              />
            </div>
          </div>
        </Wrapper>
      )}
      {isFetchingPartners ? (
        <Spinner />
      ) : (
        <Wrapper {...props} item="partners">
          <div className="w-90% lg:w-70% m-auto py-5 divide-y">
            {partners.results.map((project, index) => (
              <Partner key={index} index={index} {...project} />
            ))}
          </div>
        </Wrapper>
      )}
      <Footer />
    </div>
  );
};

export default AdminPartners;
