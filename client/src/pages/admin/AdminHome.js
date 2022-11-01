import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Wrapper from '../../components/containers/admin/Wrapper';
import Footer from '../../components/containers/Footer';
import Header from '../../components/containers/Header';
import Carousel from '../../components/containers/home/Carousel';
import MainProjects from '../../components/containers/home/MainProjects';
import Partners from '../../components/containers/home/Partners';
import { CardBody, CardTitle, PageTitle } from '../../components/text';
import Spinner from '../../components/UI/spinner';
import { useFetchActiveAboutusQuery } from '../../features/API/user-api-slice';

const AdminHome = (props) => {
  const { t } = useTranslation();
  const { data = [], isFetching } = useFetchActiveAboutusQuery();
  const aboutus = data.results;
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  return (
    <div>
      <Helmet>
        <title>CARITAS BYUMBA</title>
      </Helmet>
      <Header />
      <Wrapper {...props} item="carousels">
        <Carousel />
      </Wrapper>
      {isFetching ? (
        <Spinner />
      ) : (
        <Wrapper {...props} item="aboutus">
          <div className="w-70% m-auto">
            <PageTitle
              name={aboutus.name[selectedLanguage]}
              color="red"
              alignment="center"
              mobileAlignment="center"
              additional="py-5"
            />
            <CardBody
              name={aboutus.description[selectedLanguage]}
              alignment="center"
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between divide-y divide-x-0 lg:divide-x lg:divide-y-0 divide-gray-200 py-5">
            <div className="lg:w-1/3 text-center">
              <CardTitle name={t('Vision')} color="red" alignment="center" />
              <CardBody
                name={aboutus.vision[selectedLanguage]}
                additional="p-5"
              />
            </div>
            <div className="lg:w-1/3 text-center">
              <CardTitle name={t('Mission')} color="red" alignment="center" />
              <CardBody
                name={aboutus.mission[selectedLanguage]}
                additional="p-5"
              />
            </div>
            <div className="lg:w-1/3 text-center">
              <CardTitle
                name={t('Objectives')}
                color="red"
                alignment="center"
              />
              <CardBody
                name={aboutus.objectives[selectedLanguage]}
                additional="p-5"
              />
            </div>
          </div>
        </Wrapper>
      )}
      <Wrapper {...props} item="projects">
        <MainProjects />
      </Wrapper>
      <Wrapper {...props} item="partners">
        <Partners />
      </Wrapper>
      <Footer />
    </div>
  );
};

export default AdminHome;
