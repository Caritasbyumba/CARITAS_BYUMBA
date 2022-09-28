import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFetchActiveDepartmentsQuery } from '../../../features/API/user-api-slice';
import { CardTitle, PageTitle } from '../../text';
import Spinner from '../../UI/spinner';
import parse from 'html-react-parser';
import { ButtonWithIcon } from '../../UI/button';
import { MdClose } from 'react-icons/md';

const Department = (props) => {
  const { t } = useTranslation();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  return (
    <div
      className={`${
        props.isSelected ? 'w-70% m-auto' : 'w-1/3'
      }  p-6 relative overflow-auto bg-white rounded-2xl border border-gray-200 shadow-md box-border transition-all`}
    >
      <div className="flex items-center justify-between">
        <CardTitle
          name={props.name[selectedLanguage]}
          color="red"
          additional="mb-2 text-2xl font-bold tracking-tight text-gray-900"
        />
        {props.isSelected && (
          <MdClose
            className="cursor-pointer"
            color="#751E17"
            size="24"
            onClick={() => props.setIsSelected(undefined)}
          />
        )}
      </div>
      <div className="mb-3 font-normal text-gray-700 list">
        {parse(props.description[selectedLanguage])}
      </div>
      {props.isSelected && (
        <>
          {props.objectives[selectedLanguage].replace(/(<([^>]+)>)/gi, '') !==
            '' && <CardTitle name={t('Objectives')} color="red" />}
          <div className="mb-3 font-normal text-gray-700 list">
            {parse(props.objectives[selectedLanguage])}
          </div>
        </>
      )}
      <ButtonWithIcon
        name={t(props.isSelected ? 'Read less' : 'Read more')}
        color="red"
        outline="false"
        isSquare
        additional="absolute right-5 bottom-5 z-10"
        onClick={() =>
          props.isSelected
            ? props.setIsSelected(undefined)
            : props.setIsSelected(props.index)
        }
      >
        <svg
          aria-hidden="true"
          className="ml-2 -mr-1 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </ButtonWithIcon>
    </div>
  );
};

const Departments = () => {
  const { data = [], isFetching } = useFetchActiveDepartmentsQuery();
  const { t } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState(undefined);
  return isFetching ? (
    <Spinner />
  ) : (
    <>
      <PageTitle
        name={t('Our Departments')}
        color="red"
        alignment="center"
        mobileAlignment="center"
        additional="py-5"
      />
      <div className="flex w-full p-5 space-x-2">
        {data.results.map((department, index) =>
          selectedDepartment === undefined ? (
            <Department
              key={index}
              index={index}
              {...department}
              isSelected={index === selectedDepartment}
              clicked={() => setSelectedDepartment(index)}
              setIsSelected={setSelectedDepartment}
            />
          ) : (
            index === selectedDepartment && (
              <Department
                key={index}
                index={index}
                {...department}
                isSelected={index === selectedDepartment}
                clicked={() => setSelectedDepartment(index)}
                setIsSelected={setSelectedDepartment}
              />
            )
          )
        )}
      </div>
    </>
  );
};

export default Departments;
