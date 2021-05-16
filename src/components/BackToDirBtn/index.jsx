import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from './style';

const BackBtn = () => {
  const classes = useStyles();
  return (
    <Link to='/directories' className={classes.root}>
      Назад в довідник
    </Link>
  );
}

export default BackBtn;
