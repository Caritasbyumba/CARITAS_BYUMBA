import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchActiveMainProjectsQuery } from '../../../features/API/user-api-slice';
import { NormalText } from '../../text';
import { useSelector } from 'react-redux';
import { Button } from '../../UI/button';
import Spinner from '../../UI/spinner';

const MainProjects = () => {
  const { data = [], isFetching } = useFetchActiveMainProjectsQuery();
  const { t } = useTranslation();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  console.log(data);
  return isFetching ? (
    <Spinner />
  ) : (
    <div className="flex">
      {data.results.map((project, index) => (
        <div key={index} className="w-50% h-50vh relative">
          <img
            className="w-full h-full object-cover"
            src={`${process.env.REACT_APP_BACKEND_URL}/images/${project.gallery[0]}`}
            alt={project.name}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-50 grid place-items-center">
            <div className="w-70% text-center">
              <NormalText
                name={project.name}
                color="white"
                additional="text-4xl font-bold capitalize"
              />
              <NormalText
                name={project.smallDescription[selectedLanguage]}
                color="white"
              />
            </div>
            <Button
              name={t('Read More')}
              isSquare
              outline="false"
              color="red"
              clicked={() => {}}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainProjects;
