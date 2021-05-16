import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& .dir_item': {
      width: '50%',
      margin: '20px',

      '& .dir_item_link': {
        display: 'block',
        margin: '0 auto',
        padding: '20px 50px',
        fontSize: '26px',
        textDecoration: 'none',
        color: '#000',
        border: '1px solid #000',
      },
    },
  }
});

export default useStyles;
