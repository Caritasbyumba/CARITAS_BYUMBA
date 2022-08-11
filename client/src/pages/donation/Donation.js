import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DonationArea from '../../components/containers/donation/DonationArea';
import Footer from '../../components/containers/Footer';
import Header from '../../components/containers/Header';
import { CardBody, PageTitle, SectionTitle } from '../../components/text';
import CustomHelmet from '../../components/UI/Helmet';
import Spinner from '../../components/UI/spinner';
import {
  useFetchActiveDonateIntroQuery,
  useFetchActiveDonationAreaIntroQuery,
} from '../../features/API/user-api-slice';

const Donation = () => {
  const { t } = useTranslation();
  const { data = [], isFetching } = useFetchActiveDonateIntroQuery();
  const { data: donationAreasData = [], isFetching: isDonationAreasFetching } =
    useFetchActiveDonationAreaIntroQuery();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const [chosenArea, setChosenArea] = useState(0);
  const donateIntro = data.results;
  const donationAreas = donationAreasData.results;
  return (
    <div>
      <CustomHelmet name="DONATE" />
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <div className="bg-gray-200 py-5">
          <div className="w-90% lg:w-70% m-auto">
            <PageTitle
              name={donateIntro.title[selectedLanguage]}
              color="red"
              additional="text-center"
            />
            <CardBody
              name={donateIntro.description[selectedLanguage]}
              additional="text-center"
            />
          </div>
        </div>
      )}
      {isDonationAreasFetching ? (
        <Spinner />
      ) : (
        <>
          <SectionTitle
            name={t('Which project would you like to donate to?')}
            color="red"
            additional="text-center"
          />
          <div className="w-90% lg:w-70% m-auto grid grid-cols-1 md:grid-cols-3 gap-2 py-5">
            {donationAreas.map((area, index) => (
              <DonationArea
                key={index}
                {...area}
                isChosen={chosenArea === index}
                onClick={() => setChosenArea(index)}
              />
            ))}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Donation;
