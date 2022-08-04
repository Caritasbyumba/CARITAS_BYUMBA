import React from 'react';
import { useSelector } from 'react-redux';
import { CardBody, Quotes, SectionTitle } from '../../text';

const Partner = (props) => {
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  return (
    <div
      className={`flex ${
        props.index % 2 === 0
          ? 'flex-row space-x-10'
          : 'flex-row-reverse space-x-reverse space-x-10'
      } justify-between items-center py-5`}
    >
      <div className="w-50%">
        <img
          className="h-60 m-auto"
          src={`${process.env.REACT_APP_BACKEND_URL}/images/${props.image}`}
          alt={props.image}
        />
      </div>
      <div className="w-50%">
        <SectionTitle name={props.name} color="red" />
        <CardBody
          name={props.description[selectedLanguage]}
          additional="py-3"
        />
        <Quotes>
          <CardBody name={props.quote[selectedLanguage]} additional="italic" />
        </Quotes>
      </div>
    </div>
  );
};

export default Partner;
