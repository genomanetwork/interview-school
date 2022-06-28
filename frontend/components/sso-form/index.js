import React from 'react';
import SignupForm from './signup-form';
import LoginForm from './login-form';

const SSOForm = () => {
  return (
    <div className="sso-form">
      <div className="sso-form__letfside">
        <LoginForm />
      </div>
      <div className="sso-form__rightside">
        <SignupForm />
      </div>
    </div>
  );
};

export default SSOForm;
