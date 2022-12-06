import React, { useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import * as com from './FormComponent/components.jsx';
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
          try { 
            const { type = 'input' } = n,
            C = com[type]
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
          } catch(error) {
            throw new Error(error);
          }
         
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
  /**
   * 表单的item项  具体配置具体查看 Columns 配置
   */
  columns: PropTypes.array,
  /**
   * 表单内容填充回显
   */
  data: PropTypes.object,
  /**
   * 父组件传递的ref
   */
  cRef: PropTypes.object,
  /**
   * 表单默认回显项
   */
  initialValues: PropTypes.object,
  /**
   * 表单的显示类型 配合父级classNmae样式定制 不同类型样式 
   * */ 
   formType: PropTypes.oneOf(['form','seach']),
  /**
   * form表单的响应式样式布局
   */
  layout: PropTypes.object,
  /**
   * 此配置配合formType为‘seach’时使用
   */
  tailLayout: PropTypes.object,
   

};
FormComponent.defaultProps = {
  columns: [{}],
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
