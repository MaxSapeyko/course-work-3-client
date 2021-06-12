import React from 'react';

import firstImg from '../../assets/img/info_first_item.png';
import secondImg from '../../assets/img/info_second_item.png';
import thirdImg from '../../assets/img/info_third_item.png';

import useStyles from './style';

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <div className='info'>
        <h2 className='info_title'>Інформація для громадян</h2>
        <div className='info_item'>
          <div className='first_column'>
            <h3>Завдання військового комісаріату:</h3>
            <ul>
              <li>проведення призову громадян на військову службу у мирний і воєнний час</li>
              <li>проведення добору кандидатів для прийняття на військову службу за контрактом</li>
              <li>участь у доборі громадян для проходження служби у військовому резерві Збройних Сил</li>
              <li>підготовка та проведення в особливий період мобілізації людських і транспортних ресурсів</li>
            </ul>
          </div>
          <div className='second_column'>
            <img src={firstImg} alt='' />
          </div>
        </div>

        <div className='info_item'>
          <div className='first_column'>
            <img src={secondImg} alt='' />
          </div>
          <div className='second_column'>
            <ul>
              <li>
                забезпечення соціального і правового захисту військовослужбовців, військовозобов’язаних і резервістів, призваних на навчальні (або перевірочні) та спеціальні збори до Збройних Сил, ветеранів війни та військової служби, пенсіонерів з числа військовослужбовців Збройних Сил  та членів їх сімей
                </li>
            </ul>
          </div>
        </div>
        <div className='info_item'>
          <div className='first_column'>
            <ul>
              <li>
                участь у військово-патріотичному вихованні громадян, здійснення заходів з підготовки та ведення територіальної оборони, інших заходів з питань оборони відповідно до законодавства.
              </li>
            </ul>
          </div>
          <div className='second_column'>
            <img src={thirdImg} alt='' />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;
