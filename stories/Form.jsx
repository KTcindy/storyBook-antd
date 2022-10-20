import React, { createElement, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import * as cup from '../stories/FormComponent';
import { FilterOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
// import './FormComponent/formStyle.less';
const FormItem = Form.Item;
const FormComponent = ({
  columns,
  data,
  cRef,
  formType,
  initialValues,
  layout,
  tailLayout
}) => {
  //通过Form.useForm对表单数据域进行交互。useForm是React Hooks的实现，只能用于函数组件
  const [form] = Form.useForm();
  //cRef就是父组件传过来的ref
  useImperativeHandle(cRef, () => ({
    //getForm就是暴露给父组件的方法
    getForm: () => form,
  }));

  //重置要配合着const [form] = Form.useForm()以及form={form}
  const onReset = () => {
    form.resetFields();
  };
  //若有正则验证，则在所有的正则校验都通过后用来获取输入的数据，若没有正则校验，则直接获取输入的数据
  const onFinish = values => {
    // values.date = timestampToTime(values.date)
  };
  //form表单的回显
  useEffect(() => {
    form.setFieldsValue(data);
  }, []);
  const type = formType === 'seach';
  return (
    <>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        // className={formType}
        onFinish={onFinish}
      >
        {type && (
          <div className="icon">
            <FilterOutlined />
          </div>
        )}
        {columns.map(n => {
          const { type = 'input' } = n,
            C = cup[type];
          return (
            <FormItem
              label={n.label}
              className="ant-form-item"
              name={n.name}
              rules={n.rules}
              key={n.name}
            >
              {C(n)}
            </FormItem>
          );
        })}
        {type && (
          <FormItem className="ant-form-item" {...tailLayout}>
            <Button icon={<SearchOutlined />} htmlType="submit" />
            <Button icon={<RedoOutlined />} className='radius' onClick={onReset}>
              重置
            </Button>
          </FormItem>
        )}
      </Form>
    </>
  );
};

FormComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object,
  cRef: PropTypes.object,
  initialValues: PropTypes.object
};
FormComponent.defaultProps = {
  formType: 'form',
  layout: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  tailLayout: {
    wrapperCol: { offset: 0, span: 24 },
  }
};
export default FormComponent;
