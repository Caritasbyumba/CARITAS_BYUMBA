import React from 'react';
import Slider from 'react-slick';
import { useFetchActivePartnersQuery } from '../../../features/API/user-api-slice';
import { CardTitle, PageTitle } from '../../text';
import Spinner from '../../UI/spinner';

const Partners = () => {
  const { data = [], isFetching } = useFetchActivePartnersQuery();
  var settings = {
    arrows: false,
    dots: false,
    centerMode: true,
    lazyLoad: true,
    swipeToSlide: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return isFetching ? (
    <Spinner />
  ) : (
    <>
      <PageTitle
        name="Our Partners"
        color="red"
        alignment="center"
        mobileAlignment="center"
      />
      <Slider {...settings}>
        {data.results.map((slide, index) => (
          <div key={index} className="py-5">
            <img
              className="h-40 object-fit object-center m-auto"
              src={`${process.env.REACT_APP_BACKEND_URL}/images/${slide.image}`}
              alt=""
            />
            <CardTitle name={slide.name} alignment="center" additional="py-5" />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Partners;
