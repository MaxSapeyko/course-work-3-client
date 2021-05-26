import React, { useState } from 'react';

import { addNewConscript } from '../../API/conscript';
import { addNewRelative } from '../../API/relative';
import { addNewWorkPlace } from '../../API/work';
import { Form, Modal, Input, Button, Select, DatePicker } from 'antd';

import useStyles from './style';

const { Option } = Select;
const AddCons = () => {
  const classes = useStyles();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "Обов'язкове поле!",
    types: {
      email: '$Некоректний email!',
    },
  };
  const [file, setFile] = useState();
  const [relativeProps, setRelativeProps] = useState({
    show: false,
    id: 0,
    isDone: false,
  });
  const [showStudyModal, setShowStudyModal] = useState(false);
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);

  const upload = (file) => {
    setFile(file);
  };

  const setRelativeData = (data) => {
    addNewRelative(data.relative).then((res) => {
      setRelativeProps({ isDone: true, id: res.data.id, show: false });
    });
  };
  const setWorkData = (data) => { };
  const setStudyData = (data) => { };
  const setMedicalData = (data) => { };

  const submit = (data) => {
    const fd = new FormData();
    fd.append('photo', file, file.name);
    fd.append('lastname', data.conscript.lastname);
    fd.append('name', data.conscript.name);
    fd.append('surname', data.conscript.surname);
    fd.append('birthday', data.conscript.birthday);
    fd.append('placeOfBirth', data.conscript.placeOfBirth);
    fd.append('sex', data.conscript.sex);
    fd.append('homeAddress', data.conscript.homeAddress);
    fd.append('passportCode', data.conscript.passportCode);
    fd.append('registrationNumber', data.conscript.registrationNumber);
    fd.append('phoneNumber', data.conscript.phoneNumber);
    fd.append('callUpId', data.conscript.callUpId);
    fd.append('relativeId', data.conscript.relativeId);
    fd.append('workId', data.conscript.workId);
    fd.append('studyId', data.conscript.studyId);

    addNewConscript(fd)
      .then(() => console.log('Призовника додано'))
      .catch((error) => console.log(`Error ${error}`));
  };

  return (
    <div className={classes.root}>
      <Form
        {...layout}
        name='nest-messages'
        onFinish={submit}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['conscript', 'lastname']}
          label='Прізвище'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'name']}
          label="Ім'я"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'surname']}
          label='По батькові'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'birthday']}
          label='Дата народження'
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={['conscript', 'placeOfBirthday']}
          label='Місце народження'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'sex']}
          label='Стать'
          rules={[{ required: true }]}
        >
          <Select initialValues='чоловік'>
            <Option value='чоловік'>чоловік</Option>
            <Option value='жінка'>жінка</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['conscript', 'homeAddress']}
          label='Домашня адреса'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'photo']}
          label='Фото'
          rules={[{ required: true }]}
        >
          <input type='file' onChange={(e) => upload(e.target.files[0])} />
        </Form.Item>
        <Form.Item
          name={['conscript', 'passportCode']}
          label='Код паспорту'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'registrationNumber']}
          label='Реєстраційний номер'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'phoneNumber']}
          label='Телефон'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type='primary'
            onClick={() =>
              setRelativeProps((prev) => ({ ...prev, show: true }))
            }
          >
            Ввести дані родича
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' onClick={() => setShowWorkModal(true)}>
            Ввести дані про роботу
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' onClick={() => setShowStudyModal(true)}>
            Ввести дані про навчальний заклад
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' onClick={() => setShowMedicalModal(true)}>
            Ввести дані мед огляду
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Додати
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title='Введіть дані родича'
        visible={relativeProps.show}
        footer={null}
        onCancel={() => setRelativeProps((prev) => ({ ...prev, show: false }))}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={setRelativeData}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['relative', 'lastname']}
            label='Прізвище'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['relative', 'name']}
            label="Ім'я"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['relative', 'surname']}
            label='По батькові'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['relative', 'homeAddress']}
            label='Домашня адреса'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['relative', 'phoneNumber']}
            label='Телефон'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Додати
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Введіть дані про роботу'
        visible={showWorkModal}
        footer={null}
        onCancel={() => setShowWorkModal(false)}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={setWorkData}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['work', 'organizationName']}
            label='Назва організації'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['work', 'post']}
            label='Посада'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['work', 'address']}
            label='Адреса'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['work', 'admissionDate']}
            label='Дата прийому'
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={['work', 'releaseDate']}
            label='Дата звільнення'
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Додати
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Введіть дані про навчальний заклад'
        visible={showStudyModal}
        footer={null}
        onCancel={() => setShowStudyModal(false)}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={setStudyData}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['study', 'organizationName']}
            label='Назва закладу'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['study', 'faculty']}
            label='Факультет'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['study', 'course']}
            label='Курс'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['study', 'address']}
            label='Адреса'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['study', 'admissionDate']}
            label='Дата вступу'
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={['study', 'releaseDate']}
            label='Дата випуску'
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Додати
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCons;
