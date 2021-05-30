import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .modal': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      height: '20%',
      backgroundColor: '#90B8CF',
      padding: '30px',

      '& .modal_pass': {
        width: '100%',
      },

      '& .modal_btn-wrapper': {
        paddingTop: '10px',

        '& .modal_btn': {
          padding: '5px 20px',
          borderRadius: '5px',
          color: '#000',
          width: '100%',
          height: '100%',
          textDecoration: 'none',
        }
      }
    }
  }
});

export default useStyles;
