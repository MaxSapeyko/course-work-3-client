import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    backgroundColor: '#007C45',
    display: 'flex',
    justifyContent: 'center',

    "& .container": {
      maxWidth: "1200px",
      width: '100%',
      height: '60px',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FFFFFF',
    }
  }
});

export default useStyles;
