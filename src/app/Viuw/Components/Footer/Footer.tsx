import React from 'react';
import FooterLogo from './FooterLogo';
import FooterMeaning from './FooterMeaning';
import FooterAboutUs from './FooterAboutUs';
import FooterContact from './FooterContact';

const Footer = () => {
  return (
    <footer className="bg-[#063346] text-white px-6 sm:px-[170px] py-10">
      <div className="flex flex-col sm:flex-row justify-between gap-5 flex-wrap">
        <FooterLogo />
        <FooterMeaning />
        <FooterAboutUs />
        <FooterContact />
      </div>
    </footer>
  );
};

export default Footer;
