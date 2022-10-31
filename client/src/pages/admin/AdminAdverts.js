import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/containers/Footer';
import Header from '../../components/containers/Header';
import {
  useFetchActiveAdvertsIntroQuery,
  useFetchActiveAdvertsQuery,
} from '../../features/API/user-api-slice';
import CustomHelmet from '../../components/UI/Helmet';
import Spinner from '../../components/UI/spinner';
import { CardBody, PageTitle } from '../../components/text';
import Advert from '../../components/containers/adverts/Advert';
import Wrapper from '../../components/containers/admin/Wrapper';

const AdminAdverts = (props) => {
  const {
    data: advertsIntro = [],
    isFetching: isFetchingAdvertsIntro,
  } = useFetchActiveAdvertsIntroQuery();
  const { data: advert = [], isFetching: isFetchingAdverts } =
    useFetchActiveAdvertsQuery();

  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );

  return (
    <div>
      <CustomHelmet name="ADVERTS" />
      <Header />
      {isFetchingAdvertsIntro ? (
        <Spinner />
      ) : (
        <Wrapper {...props} item="advertsintro">
          <div className="bg-gray-200 py-5">
            <div className="w-90% lg:w-70% m-auto">
              <PageTitle
                name={advertsIntro.results?.title[selectedLanguage]}
                color="red"
                additional="text-center py-5"
              />
              <CardBody
                name={advertsIntro.results?.description[selectedLanguage]}
                additional="text-center"
              />
            </div>
          </div>
        </Wrapper>
      )}
      {isFetchingAdverts ? (
        <Spinner />
      ) : (
        <Wrapper {...props} item="adverts">
          <div className="w-90% lg:w-70% m-auto py-5 grid grid-col-1 md:grid-col-2 lg:grid-cols-3 gap-5">
            {advert.results?.map((advert, index) => (
              <Advert key={index} {...advert} />
            ))}
          </div>
        </Wrapper>
      )}
      <Footer />
    </div>
  );
};

export default AdminAdverts;
