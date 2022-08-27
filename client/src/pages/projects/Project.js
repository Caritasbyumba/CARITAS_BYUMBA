import React from 'react';
import Footer from '../../components/containers/Footer';
import Header from '../../components/containers/Header';
import { useFetchSpecificProjectQuery } from '../../features/API/user-api-slice';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/UI/spinner';
import { CardBody, CardSubText, PageTitle } from '../../components/text';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import CustomHelmet from '../../components/UI/Helmet';
import parse from 'html-react-parser';

const Project = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { data = [], isFetching } = useFetchSpecificProjectQuery(projectId);
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const project = data.results;

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <CustomHelmet name={project?.name || 'PROJECT'} />
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className="text-center py-5 bg-gray-200">
            <PageTitle
              name={project.name}
              color="red"
              additional="text-center mx-10"
            />
            <CardSubText
              name={`${t('Started')}: ${new Date(
                project.startDate
              ).toLocaleDateString(selectedLanguage, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} - ${t('Will end')}: ${new Date(
                project.endDate
              ).toLocaleDateString(selectedLanguage, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}`}
              color="red"
              additional="text-center mx-10"
            />
          </div>
          <div className="w-90% lg:w-70% m-auto py-5">
            <CardBody
              name={parse(project.description[selectedLanguage])}
              additional="text-center"
            />
          </div>
          <div className="w-90% lg:w-70% m-auto mb-10">
            <Slider {...settings}>
              {project.gallery.map((image, index) => (
                <div key={index} className="w-full h-30vh md:h-50vh lg:h-70vh">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${image}`}
                    alt={image}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Project;
