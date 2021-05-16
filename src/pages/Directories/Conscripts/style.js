import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    margin: '40px auto',
    minHeight: '77vh',

    '& table': {
      borderCollapse: 'collapse',
      width: '100%',

      '& td, th': {
        border: '1px solid #000',
        padding: '5px 10px',
        textAlign: 'center',

        '& img': {
          maxWidth: '150px',
        }
      }
    }
  }
})

export default useStyles;
