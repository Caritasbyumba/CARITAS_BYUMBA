import React from 'react';
import { useSelector } from 'react-redux';
import { CardBody, CardTitle } from '../../text';

const DonationArea = (props) => {
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );

  return (
    <div
      className={`block p-6 max-w-sm bg-white rounded-lg ${
        props.isChosen ? 'border-2 border-red' : 'border border-gray-200'
      } shadow-md hover:bg-gray-100 cursor-pointer`}
      onClick={props.onClick}
    >
      <CardTitle name={props.name[selectedLanguage]} />
      <CardBody name={props.description[selectedLanguage]} />
    </div>
  );
};

export default DonationArea;
