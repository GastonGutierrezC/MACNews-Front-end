// src/app/Viuw/Components/Layout/Layout.tsx
'use client';

import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="mx-[100px]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
