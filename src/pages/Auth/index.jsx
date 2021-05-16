import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Context';

import useStyles from './style';

const Auth = () => {
  const classes = useStyles();

  const [pass, setPass] = useState('');
  const { setAuth } = useContext(AppContext);

  const checkAuth = () => {
    if (pass === '1234') {
      setAuth(true);
    }
  }

  return (
    <div className={classes.root}>
      <form className='modal'>
        <h3>Введіть пароль адміна</h3>
        <input autocomplete="on" type='password' className='modal_pass' onChange={(e) => setPass(e.target.value)} />
        <div className='modal_btn-wrapper'>
          <Link to='/directories' className='modal_link' onClick={() => checkAuth()}>
            Check
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;
