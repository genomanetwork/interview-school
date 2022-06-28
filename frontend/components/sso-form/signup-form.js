import React, {useState, useCallback} from 'react';
import {signup} from './actions';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const writing = useCallback((e) => {
    switch (e.target.name) {
      case 'name':
        return setName(e.target.value);
      case 'lastname':
        return setLastname(e.target.value);
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
    const response =  await signup({
      name,
      lastname,
      email,
      password
    });

    if (response.data === 'success') {
      setSuccess(true);
    } else {
      setError(response.data);
    }

    setLoading(false);
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
        <div className="signup-form">
          <div className="signup-form__label">Signup</div>
          <input
            name='name'
            className='signup-form__field'
            placeholder='Name'
            onChange={writing}
            value={name}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <input
            name='lastname'
            className='signup-form__field'
            placeholder='Lastname'
            onChange={writing}
            value={lastname}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <input
            name='email'
            className='signup-form__field'
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
            className='signup-form__field'
            placeholder='Password'
            onChange={writing}
            value={password}
            type="password"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <div className="signup-form__button-container">
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

export default SignupForm;
