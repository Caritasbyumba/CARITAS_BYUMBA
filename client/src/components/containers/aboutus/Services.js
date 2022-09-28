import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchActiveServicesQuery } from '../../../features/API/user-api-slice';
import { CardTitle, PageTitle } from '../../text';
import Spinner from '../../UI/spinner';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

const Services = () => {
  const { data = [], isFetching } = useFetchActiveServicesQuery();
  const { t } = useTranslation();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );

  return isFetching ? (
    <Spinner />
  ) : (
    <>
      <PageTitle
        name={t('Our Services')}
        color="red"
        alignment="center"
        mobileAlignment="center"
        additional="py-5"
      />
      <div className="w-90% md:w-70% m-auto">
        {data.results.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 p-5 m-5 rounded-2xl shadow-md"
          >
            <CardTitle
              name={service.name}
              color="red"
              additional="text-center"
            />
            <div className="mb-3 font-normal text-gray-700 list">
              {parse(service.smallDescription[selectedLanguage])}
            </div>
            {service.challenges[selectedLanguage].replace(
              /(<([^>]+)>)/gi,
              ''
            ) !== '' && <CardTitle name={t('Challenges')} color="red" />}
            <div className="mb-3 font-normal text-gray-700 list">
              {parse(service.challenges[selectedLanguage])}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Services;
