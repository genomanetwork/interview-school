import React, {useState, useCallback} from 'react';
import {login} from './actions';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const writing = useCallback((e) => {
    switch (e.target.name) {
      case 'email':
        return setEmail(e.target.value);
      case 'password':
        return setPassword(e.target.value);
      default:
        return;
    }
  });


  const submit = useCallback(async () => {
    setLoading(true);
    const {data} =  await login({
      email,
      password
    });

    if (data.auth) {
      setSuccess(true);
      document.location.href = `/dashboard/${data.userId}`;
    } else {
      setError(data);
    }

    setLoading(false);
    return;
  });


  if (success) {
    return (
      <h2 style={{color: 'green'}}>DONE!</h2>
    );
  } else if (error) {
    return (
      <h2 style={{color: 'red'}}>{error}</h2>
    );
  } else {
    try {
      return (
        <div className="login-form">
          <div className="login-form__label">Login</div>
          <input
            name='email'
            className='login-form__field'
            placeholder='Email'
            onChange={writing}
            value={email}
            type="email"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <input
            name='password'
            className='login-form__field'
            placeholder='Password'
            onChange={writing}
            value={password}
            type="password"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <div className="login-form__button-container">
            {loading ?
              <button type="button" className="btn btn--disabled" disabled>Waiting ...</button>
              : <button type="button" className="btn btn--primary" onClick={submit}>Submit</button>
            }
          </div>
        </div>
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};

export default LoginForm;
