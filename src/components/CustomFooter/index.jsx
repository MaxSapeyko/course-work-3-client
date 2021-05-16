import { Layout } from "antd";

import useStyles from './style';

const { Footer } = Layout;

const CustomFooter = () => {
  const classes = useStyles();

  return (
    <Footer className={classes.root}>
      <div className='container'>
        ©2021 Created by Max Sapeiko
      </div>
    </Footer>
  );
};

export default CustomFooter;
