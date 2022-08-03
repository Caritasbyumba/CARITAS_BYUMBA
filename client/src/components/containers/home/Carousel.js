import React, { useState } from 'react';
import { useFetchActiveCarouselQuery } from '../../../features/API/user-api-slice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { CardBody, NormalText } from '../../text';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Spinner from '../../UI/spinner';

const Carousel = () => {
  const { data = [], isFetching } = useFetchActiveCarouselQuery();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(1);
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setCurrentSlide(next);
    },
    customPaging: (i) => (
      <div
        className={`w-6 h-2 hover:bg-red ${
          i === currentSlide ? 'bg-red' : 'bg-gray-200'
        }`}
      ></div>
    ),
  };
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  return isFetching ? (
    <Spinner />
  ) : (
    <Slider {...settings}>
      {data.results.map((slide, index) => (
        <div key={index} className="relative h-70vh">
          <img
            className="w-full h-full object-cover object-center"
            src={`${process.env.REACT_APP_BACKEND_URL}/images/${slide.image}`}
            alt={slide.title[selectedLanguage]}
          />
          <div className="absolute z-10 inset-0 bg-black bg-opacity-40 grid place-items-center">
            <div className="text-center w-70%">
              <NormalText
                name={slide.title[selectedLanguage]}
                color="white"
                alignment="center"
                additional="text-5xl font-semibold uppercase"
              />
              <CardBody
                name={slide.description[selectedLanguage]}
                color="white"
              />
            </div>
            {/* <Button
              name={t('Read More')}
              isSquare
              outline="false"
              color="red"
              clicked={() => {}}
            /> */}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
