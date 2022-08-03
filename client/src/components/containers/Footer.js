import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CardBody, CardTitle } from '../text';
import { TextButton } from '../UI/button';
import { MdPlace, MdEmail, MdLocalPhone } from 'react-icons/md';
import { BsMailbox2 } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-200">
      <div className="flex justify-between">
        <div className="w-25% grid place-items-center">
          <Link to="/" className="p-5 grid place-items-center">
            <img
              className="w-1/2 w-full object-cover object-center"
              src="/images/logo.png"
              alt=""
            />
          </Link>
        </div>
        <div className="w-25% flex flex-col p-5">
          <CardTitle name={t('EXPLORE MORE')} color="red" />
          <TextButton
            name={t('Who we are')}
            color="red"
            additional="hover:underline h-fit text-left"
          />
          <TextButton
            name={t('Projects')}
            color="red"
            additional="hover:underline h-fit text-left"
          />
          <TextButton
            name={t('Partners')}
            color="red"
            additional="hover:underline h-fit text-left"
          />
          <TextButton
            name={t('Publications')}
            color="red"
            additional="hover:underline h-fit text-left"
          />
          <TextButton
            name={t('Contact Us')}
            color="red"
            additional="hover:underline h-fit text-left"
          />
        </div>
        <div className="w-25% flex flex-col p-5">
          <CardTitle name={t('BANK ACCOUNT')} />
          <CardBody name="I&M Bank: 0000-0000-00000-0000" />
          <CardBody name="Swift code: IMRWRWRW" />
          <CardTitle name="MOBILE MONEY" />
          <CardBody name="MTN: +25078888888" />
          <CardBody name="Airtel: +25073333333" />
        </div>
        <div className="w-25% flex flex-col p-5">
          <CardTitle name={t('ADDRESS & CONTACTS')} />
          <Link
            to={{ pathname: 'https://goo.gl/maps/LGcs8U8Znr9UG4mr9' }}
            target="_blank"
            className="flex space-x-2 items-center hover:underline"
          >
            <MdPlace />
            <CardBody name="Byumba, Gicumbi; Rwanda" />
          </Link>
          <div className="flex space-x-2 items-center">
            <BsMailbox2 />
            <CardBody name="PO Box: 05 Byumba - Rwanda" />
          </div>
          <Link
            to={{ pathname: 'tel:+250788476714' }}
            target="_blank"
            className="flex space-x-2 items-center hover:underline"
          >
            <MdLocalPhone />
            <CardBody name="Tel: +250788476714" />
          </Link>
          <Link
            to={{ pathname: 'mailto:caritasbyumba81@gmail.com' }}
            target="_blank"
            className="flex space-x-2 items-center hover:underline"
          >
            <MdEmail />
            <CardBody name="caritasbyumba81@gmail.com" />
          </Link>
          <div className="flex space-x-2 mt-3">
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
                  'https://www.youtube.com/channel/UCASA8mGUghcIslIpZJSy4Eg',
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
      <div className="bg-gray-500 h-12 flex justify-center items-center">
        <CardBody
          name={`© Copyright ${new Date().getFullYear()}. `}
          color="red"
          additional="font-bold"
        />
        <CardBody name={t('All rights reserved.')} color="red" />
      </div>
    </div>
  );
};

export default Footer;
