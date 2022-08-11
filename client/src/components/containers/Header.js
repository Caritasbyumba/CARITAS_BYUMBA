import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomLink } from '../links';
import { NormalText } from '../text';
import i18n from '../../utils/i18n';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { languageChanged } from '../../features/global/global-slice';

const Header = (props) => {
  const { t } = useTranslation();
  const languages = [
    { language: 'ENG', abbreviation: 'en' },
    { language: 'FR', abbreviation: 'fr' },
    { language: 'KINY', abbreviation: 'rw' },
  ];
  const dispatch = useDispatch();

  const selectLng = useSelector((state) => state.global.selectedLanguage);
  const handleLang = (value) => {
    i18n.changeLanguage(value);
    dispatch(languageChanged(value));
  };

  const [showMobileNavBar, setShowMobileNavBar] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800  shadow sticky top-0 z-50 font-poppins ">
      <div className="max-w-8xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          <div className="w-full justify-between flex items-center">
            <Link className="flex-shrink-0" to="/">
              <img
                className="h-20 w-auto"
                src="/images/logo.png"
                alt="O'Genius Panda"
              />
            </Link>
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-2">
                <CustomLink
                  page="/aboutus"
                  indicator={props.pageLink}
                  name={t('Who we are')}
                />
                <CustomLink page="/donate" name={t('Donation')} />
                <CustomLink page="/projects" name={t('Projects')} />
                <CustomLink page="/partners" name={t('Partners')} />
                <CustomLink page="/publications" name={t('Publications')} />
                <CustomLink page="/contactus" name={t('Contact Us')} />
              </div>
              <div className="ml-10 flex space-x-2">
                {languages.map((lang, index) => (
                  <NormalText
                    key={index}
                    name={lang.language}
                    color="red"
                    additional={
                      lang.abbreviation === selectLng
                        ? 'font-bold cursor-pointer'
                        : 'cursor-pointer'
                    }
                    onClick={() => handleLang(lang.abbreviation)}
                  />
                ))}
              </div>
              <div className="ml-5 flex space-x-2">
                <Link
                  to={{ pathname: 'https://twitter.com/CByumba' }}
                  target="_blank"
                  className="p-1 border border-black rounded-full"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to={{ pathname: 'https://www.instagram.com/caritas_byumba/' }}
                  target="_blank"
                  className="p-1 border border-black rounded-full"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to={{
                    pathname:
                      'https://www.youtube.com/watch?v=fBKN6ZuzCN4https://www.youtube.com/watch?v=fBKN6ZuzCN4',
                  }}
                  target="_blank"
                  className="p-1 border border-black rounded-full"
                >
                  <FaYoutube />
                </Link>
                <Link
                  to={{
                    pathname:
                      'https://www.facebook.com/profile.php?id=100081838735786&_rdc=2&_rdr',
                  }}
                  target="_blank"
                  className="p-1 border border-black rounded-full"
                >
                  <FaFacebookF />
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              className="text-gray-800 hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              onClick={() => setShowMobileNavBar((prevState) => !prevState)}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="h-8 w-8"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${showMobileNavBar ? 'lg:hidden' : 'hidden'}`}>
        <div className="flex flex-col mx-auto space-y-2 py-3">
          <CustomLink
            page="/aboutus"
            indicator={props.pageLink}
            name={t('Who we are')}
          />
          <CustomLink page="/donate" name={t('Donation')} />
          <CustomLink page="/projects" name={t('Projects')} />
          <CustomLink page="/partners" name={t('Partners')} />
          <CustomLink page="/publications" name={t('Publications')} />
          <CustomLink page="/contactus" name={t('Contact Us')} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
