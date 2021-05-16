import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    backgroundColor: '#bdbdbd',
    display: 'block',
    maxWidth: '180px',
    width: '100%',
    textAlign: 'center',
    padding: '5px 10px',
    color: '#000',
    margin: '10px 0px',
    transition: 'all 200ms ease-in',

    '&:hover': {
      color: '#fff',
      backgroundColor: '#8a8a8a',
    }
  }
});

export default useStyles;
