import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  root: {
    minHeight: '100vh',

    '& .info_title': {

    },

    '& .info_item': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      '& .first_column': {
        maxWidth: '520px',
        width: '100%',
      },
      '& .second_column': {
        maxWidth: '520px',
        width: '100%',
      }
    }
  }
});

export default useStyles;
