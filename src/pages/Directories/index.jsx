import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from './style';

const Directories = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="dir_item">
        <Link to='/conscripts' className='dir_item_link'>
          Переглянути список призовників
        </Link>
      </div>

      <div className="dir_item">
        <Link to='/commissariat' className='dir_item_link'>
          Переглянути список комісаріатів
        </Link>
      </div>
    </div>
  );
};

export default Directories;
