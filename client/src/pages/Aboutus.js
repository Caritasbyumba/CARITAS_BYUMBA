import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/containers/Footer';
import Header from '../components/containers/Header';
import { CardBody, CardTitle, PageTitle } from '../components/text';
import Spinner from '../components/UI/spinner';
import {
  useFetchActiveAboutusQuery,
  useFetchActiveQuotesQuery,
} from '../features/API/user-api-slice';

const Aboutus = () => {
  const { data = [], isFetching } = useFetchActiveAboutusQuery();
  const { data: quotesData = [], isFetching: isQuotesFetching } =
    useFetchActiveQuotesQuery();
  const selectedLanguage = useSelector(
    (state) => state.global.selectedLanguage
  );
  const aboutus = data.results;
  const quotes = quotesData.results;

  return (
    <div>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className="w-70% m-auto">
            <PageTitle
              name={aboutus.name[selectedLanguage]}
              color="red"
              alignment="center"
              mobileAlignment="center"
            />
            <CardBody
              name={aboutus.description[selectedLanguage]}
              alignment="center"
            />
          </div>
          <div className="flex justify-between divide-x divide-gray-200 py-5">
            <div className="w-1/3 text-center">
              <CardTitle name="Vision" color="red" alignment="center" />
              <CardBody
                name={aboutus.vision[selectedLanguage]}
                additional="p-5"
              />
            </div>
            <div className="w-1/3 text-center">
              <CardTitle name="Mission" color="red" alignment="center" />
              <CardBody
                name={aboutus.mission[selectedLanguage]}
                additional="p-5"
              />
            </div>
            <div className="w-1/3 text-center">
              <CardTitle name="Objectives" color="red" alignment="center" />
              <CardBody
                name={aboutus.objectives[selectedLanguage]}
                additional="p-5"
              />
            </div>
          </div>
        </>
      )}
      {isQuotesFetching ? (
        <Spinner />
      ) : (
        <div className="w-70% m-auto">
          {quotes.map((quote, index) => (
            <Fragment key={index}>
              <CardTitle
                name={quote.role[selectedLanguage]}
                color="red"
                additional="text-center"
              />
              <div className="flex space-x-10 items-center py-5">
                <div className="w-40 h-40 shrink-0">
                  <img
                    className="w-full h-full object-cover object-center rounded-full"
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${quote.profile}`}
                    alt=""
                  />
                </div>
                <div>
                  <CardTitle name={quote.name} />
                  <CardBody name={`"${quote.quote[selectedLanguage]}"`} />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Aboutus;
