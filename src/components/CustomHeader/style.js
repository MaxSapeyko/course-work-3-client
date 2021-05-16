import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    backgroundColor: "#007C45",
    border: "none",

    "& .header_inner": {
      maxWidth: '1200px',
      padding: '0 20px',
      width: "100%",
      margin: '0 auto',
      display: 'flex',
      height: '60px',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    "& .ant-menu": {
      margin: '0',
      padding: '0',
      width: '100%',
      position: 'relative',
      backgroundColor: "#007C45",
      border: 'none',
      lineHeight: '0px',

      "& .logo_link": {
        width: '40px',
        height: '40px',
        margin: '6px auto 0',
        display: 'inline-block',
      },

      "& .ant-menu-item": {
        display: "inline",
        color: "#ffffff",
        marginRight: "20px",
        lineHeight: '0px',
      },

      "& .menu_link": {
        display: 'inline-block',
        lineHeight: '50px',
        color: '#ffffff',
        fontSize: '16px',
        textDecoration: "none",
      },

      "& .menu_item_right": {
        marginRight: "0",
        marginLeft: "40px",
        position: 'absolute',
        right: '0px',
      },

      "& .menu_item_cart": {
        right: '105px',
      },

      "& .menu_item_contact": {
        right: '215px',
      },

      "& .ant-menu-item-selected": {
        backgroundColor: 'transparent',

        "& .menu_link": {
          position: 'relative',
        },
        "& .menu_link:after": {
          content: '""',
          width: '100%',
          height: '2px',
          bottom: "11px",
          left: "0",
          backgroundColor: '#ffffff',
          position: 'absolute',
        },
      },

      "& .ant-menu-item-active": {
        backgroundColor: 'transparent',

        "& .menu_link": {
          position: 'relative',
        },
        "& .menu_link:after": {
          content: '""',
          width: '100%',
          height: '2px',
          bottom: "11px",
          left: "0",
          backgroundColor: '#ffffff',
          position: 'absolute',
        },
      },
    },
  },
});

export default useStyles;
