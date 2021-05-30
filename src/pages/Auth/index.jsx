import { Button } from 'antd';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../Context';

import useStyles from './style';

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const [pass, setPass] = useState('');
  const { setAuth } = useContext(AppContext);

  const checkAuth = () => {
    if (pass === '1234') {
      setAuth(true);
      history.push('/directories')
    }
  };

  return (
    <div className={classes.root}>
      <form className='modal'>
        <h3>Введіть пароль адміна</h3>
        <p>Дана опція лише для адміністрації сервісу</p>
        <input
          autoFocus
          autoComplete='on'
          type='password'
          className='modal_pass'
          onChange={(e) => setPass(e.target.value)}
          onKeyPress={(event) => event.key === 'Enter' && checkAuth()}
        />
        <div className='modal_btn-wrapper'>
          <Button
            className='modal_btn'
            onClick={() => checkAuth()}
          >
            Перевірити
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
