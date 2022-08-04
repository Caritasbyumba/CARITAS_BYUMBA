import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFetchActiveMoreOnUsQuery } from '../../../features/API/user-api-slice';
import { CardBody, PageTitle } from '../../text';
import { TextButton } from '../../UI/button';
import Spinner from '../../UI/spinner';

const Moreonus = (props) => {
  const history = useHistory();
  const { data = [], isFetching } = useFetchActiveMoreOnUsQuery();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const moreonus = data.results;
  return isFetching ? (
    <Spinner />
  ) : (
    <div className="bg-gray-100">
      <PageTitle
        name="About us"
        color="red"
        alignment="center"
        mobileAlignment="center"
        additional="py-2"
      />
      <div className="w-70% flex space-x-5 m-auto py-10">
        <div className="w-4 bg-gray-200"></div>
        <div>
          <CardBody
            name={moreonus.description[selectedLanguage]}
            alignment="justify"
          />
          {/* <Button
            name={t('Read More')}
            isSquare
            outline="false"
            color="red"
            clicked={() => {}}
          /> */}
          <TextButton
            name={moreonus.callToActionBtn[selectedLanguage]}
            color="red"
            additional="font-bold"
            onClick={() => {
              history.push(moreonus.callToActionLink);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Moreonus;
