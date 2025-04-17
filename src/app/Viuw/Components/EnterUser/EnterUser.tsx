'use client';

import React, { useState } from 'react';
import RegistrationChange from './RegistrationChange';
import CreateAccount from './CreateAccount';
import LogIn from './LogIn';

const EnterUser = () => {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center   mt-26">
      <RegistrationChange onChangeView={setCurrentView} activeView={currentView} />

      {currentView === 'login' ? <LogIn /> : <CreateAccount />}
    </div>
  );
};

export default EnterUser;

