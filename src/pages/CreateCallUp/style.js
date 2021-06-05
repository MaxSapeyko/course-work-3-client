import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  root: {
    marginTop: '40px',
  }
});


export const useModalStyles = createUseStyles({
  root: {
    '& td': {
      padding: '10px',
    }
  }
});
