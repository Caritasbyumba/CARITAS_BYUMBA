import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Departments from '../components/containers/aboutus/Departments';
import Footer from '../components/containers/Footer';
import Header from '../components/containers/Header';
import { CardBody, CardTitle, Quotes } from '../components/text';
import CustomHelmet from '../components/UI/Helmet';
import Spinner from '../components/UI/spinner';
import { useFetchActiveQuotesQuery } from '../features/API/user-api-slice';
import Moreonus from '../components/containers/home/Moreonus';
import Chart from '../components/containers/aboutus/Chart';

const Aboutus = () => {
  const { data: quotesData = [], isFetching: isQuotesFetching } =
    useFetchActiveQuotesQuery();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const quotes = quotesData.results;

  return (
    <div>
      <CustomHelmet name="WHO WE ARE" />
      <Header />
      <Moreonus />
      {isQuotesFetching ? (
        <Spinner />
      ) : (
        <div className="w-90% lg:w-70% m-auto">
          {quotes.map((quote, index) => (
            <Fragment key={index}>
              <div className="flex flex-col lg:flex-row lg:space-x-10 items-center py-5">
                <div className="w-40 h-40 shrink-0">
                  <img
                    className="w-full h-full object-cover object-center rounded-full"
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${quote.profile}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div>
                  <Quotes>
                    <CardBody
                      name={quote.quote[selectedLanguage]}
                      additional="italic"
                    />
                  </Quotes>
                  <CardTitle name={quote.role[selectedLanguage]} color="red" />
                  <CardTitle
                    name={quote.name}
                    additional="text-center lg:text-left"
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}
      <Chart />
      <Departments />
      <Footer />
    </div>
  );
};

export default Aboutus;
