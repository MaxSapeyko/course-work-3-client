import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    margin: '40px auto',
    minHeight: '77vh',

    '& table': {
      borderCollapse: 'collapse',
      width: '100%',

      '& th > .th_block': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100px',
        height: '80px',

        '& p': {
          marginBottom: '5px',
        }
      },

      '& .th_block-more, .th_block-sex, .th_block-photo': {
        width: '100%!important',
      },

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
