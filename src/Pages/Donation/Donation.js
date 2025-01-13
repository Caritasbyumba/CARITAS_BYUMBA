import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DonationArea from '../../components/containers/donation/DonationArea';
import Footer from '../../components/containers/Footer';
import Header from '../../components/containers/Header';
import { CardBody, PageTitle, SectionTitle } from '../../components/text';
import CustomHelmet from '../../components/UI/Helmet';
import Spinner from '../../components/UI/spinner';
import parse from 'html-react-parser';
import {
  useFetchActiveDonateIntroQuery,
  useFetchActiveDonationAreaIntroQuery,
  useFetchActiveDonationMessagesQuery,
} from '../../features/API/user-api-slice';

const Donation = (props) => {
  const { t } = useTranslation();
  const { data = [], isFetching } = useFetchActiveDonateIntroQuery();
  const { data: donationAreasData = [], isFetching: isDonationAreasFetching } =
    useFetchActiveDonationAreaIntroQuery();
  const {
    data: donationMessageData = [],
    isFetching: isDonationMessageFetching,
  } = useFetchActiveDonationMessagesQuery();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const [chosenArea, setChosenArea] = useState(0);
  const donateIntro = data.results;
  const donationAreas = donationAreasData.results;
  const donationMessage = donationMessageData.results;
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
              additional="text-center py-5"
            />
            <CardBody
              name={parse(donateIntro.description[selectedLanguage])}
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
            additional="text-center py-5"
          />
          <div className="w-90% lg:w-70% m-auto grid grid-cols-1 md:grid-cols-3 gap-2 py-5">
            {donationAreas.map((area, index) => (
              <DonationArea
                key={index}
                {...props}
                {...area}
                isChosen={chosenArea === index}
                onClick={() => setChosenArea(index)}
              />
            ))}
          </div>
        </>
      )}
      {/* <Payment
        {...props}
        chosenArea={donationAreas ? donationAreas[chosenArea]._id : ''}
      /> */}
      {isDonationMessageFetching ? (
        <Spinner />
      ) : (
        <div className="donationMessage">
          <div className="w-90% md:w-70% flex md:space-x-5 m-auto py-10">
            <div className="w-none md:w-1 bg-red"></div>
            <div>
              <CardBody
                name={parse(donationMessage.description[selectedLanguage])}
                additional="text-justify"
              />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Donation;