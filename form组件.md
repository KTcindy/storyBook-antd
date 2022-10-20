## 1、介绍

​		在开发实际开发过程中经常遇到form表单组件，特别是做后台类型业务的小伙伴。正常我们是直接拷贝过来修改对应的配置，但这样做有一个代码高耦合的问题，如果十几个或者更少还好，如果有四五十个呢? 还是拷贝？ 这个时候我们可以采用组件归纳的形式提前把组件归类并抛出对应的配置，而我们只需要修改配置就可以省略重复的拷贝问题和后期维护问题，而我们这次是通过react+antd提供的form表单组件进行二次封装form组件。

## 2、快速上手

大概目录在根目录下的`src/components/FormComponent`

```
├── components
│   ├── FormComponent 
│   │   ├── components  //所有组件都应放在此文件内 我这里先称为组件容器层
│   │   │── formStyle  //定制化form的样式
│   │   │── index.js   //form组件的主文件 一般情况下我们不会对此文件做大的改动
```

我们目前只需要关注`FormComponent/components`和`FormComponent/formStyle`

1、`components` 组件容器层

```javascript
import React, { createElement } from 'react'; 
import { Input, Select,popupInput } from 'antd';
import PopupInput from '../PopupInput/index'; // 自定义组件
//   通过createElement创建指定dom元素 
//			第一个参数是dom元素 例如：Input
//			第二个参数是当前这个dom元素的attribute及methods
//			第三个参数一般是一个元素 也可以是一个vnode
const input = ({ props, events }) => createElement(Input, { ...events, ...props });


//例如一个select它下面还有一个名为option的vnode  此处的callback就是一个回调函数 写法如下：
const select = ({ label, list = [], props, callback = () => { } }) =>
createElement(
		Select,
		{ ...props, onChange: v => callback(v) },
    list.map(c => createElement(Option, { key: c.value, value: c.value }, c.label)),
  );
  

//自定义组件跟其他普通组件用法一致
const popupInput = ({ props }) => <PopupInput {...props} />;

//最后通过 export {input,popupInput,select} 导出这些组件

```

2、`formStyle`  定制组件样式层

```css
<--假设这个是 搜索框的样式 已seach为父级classNmae -->
.seach {
  
}

<-- form表单时的样式 -->
.form{
  .ant-form-item{
    // margin: 0;
  }
}
```

3、form表单的主文件

```javascript
import React, { createElement, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import * as cup from './components.jsx';
import { FilterOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import './formStyle.less';
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

  //form表单的回显
  useEffect(() => {
    form.setFieldsValue(data);
  }, []);
  //判断在seach时显示那些dom
  const type = formType === 'seach'; 
  return (
    <>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        className={formType}
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
            <Button icon={<RedoOutlined />} className={style['radius']} onClick={onReset}>
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

```

页面具体用法如下

```javascript
import React, {  useRef } from 'react';
//引入对应路径下的组件
import Form from '@/components/FormComponent'; 
//配置项
const page=()=>{
  //回调事件
  	const handelChange=e={
      //省略。。。。。
    }
  	const config={
        columns: [
          {
            name: 'assign_page_id',
            label: 'Page ID',
            rules: [{ required: true, message: 'Page ID不能为空', whitespace: true }],
            props: {
              placeholder: '请输入Page ID2',
            },
            events: {
              onBlur: e => handelChange(e),
            },
          },
          {
            name: 'apply_page_name',
            label: 'Page名称',
            rules: [{ required: true, message: 'Page 名称不能为空', whitespace: true }],
            props: {
              placeholder: '请输入Page',
            },
          },
          {
            name: 'apply_page_domain',
            label: 'Page域名',
            rules: [
              {
                required: true,
                validator: (_, value) => {
                  const domainReg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
                  if (!value?.trim?.()) {
                    return Promise.reject(new Error('Page域名不能为空'));
                  }
                  if (!domainReg.test(value?.trim?.())) {
                    return Promise.reject(new Error('Page域名格式有误'));
                  }
                  return Promise.resolve();
                },
              },
            ],
            props: {
              placeholder: '请输入Page域名',
            },
          },
          {
            name: 'bind_store_domain',
            label: '绑定店铺名称',
            type: 'select',
            rules: [{ required: true, message: '绑定店铺名称不能为空' }],
            list: [{ value: 0, label: '新增店铺' }],
            props: {
              placeholder: '请选择绑定店铺名称',
            },
          },
        ],
        data: {},
        layout:{
          labelCol: { span: 6 },
          wrapperCol: { span: 16 },
        }
      };
  	//通过useRef绑定的childRef的dom
  	const childRef = useRef();
 	 //提交时调用 子组件给父组件暴露出来给父组件的方法
  	const submit=()=>{
      const form = childRef.current.getForm();
       form.validateFields().then(value => {
         		console.log({xxx:xxx})
       })
    }
 	 	render(
      <div>
  			<Form
          {...config}
          initialValues={{ page_use_for: 1, bind_store_domain: 0 }}
          cRef={childRef}
        />
        <Button icon={<SearchOutlined />} onClick={submit} >提交</Button>
      </div>
  );
}
```

columns 配置文档

|  参数  |                             说明                             |  类型  |
| :----: | :----------------------------------------------------------: | :----: |
|  name  |                          item的key                           | String |
| label  |                         item的label                          | String |
|  type  |           当前item的组件的类型 例如input、select等           | String |
| rules  |                          item的校验                          | Array  |
| props  | item的一些属性例如：disabled、placeholder、clearIcon等，可看antd官网具体的配置项 | Object |
|  list  |   此配置只在有子元素时需要次配置 例如select、checkGroup等    | Array  |
| events |             item的回调事件配置 如onchang、onBlur             | Object |

config 配置文档

|     参数      |                            说明                            |  类型  |                     默认值                      |
| :-----------: | :--------------------------------------------------------: | :----: | :---------------------------------------------: |
|    columns    | 表单的item项  如果不清楚具体配置项作用可看 columns配置文档 | Object |                        -                        |
|     data      |                      表单内容填充回显                      | Object |                        -                        |
|     cRef      |                      父组件传递的ref                       | Object |                        -                        |
| initialValues |                       表单默认回显项                       | Object |                        -                        |
|   formType    |   表单的显示类型  配合父级classNmae样式定制 不同类型样式   | String |                      form                       |
|    layout     |                  form表单的响应式样式布局                  | Object | labelCol: { span: 6 },wrapperCol: { span: 18 }, |
|  tailLayout   |             此配置配合formType为‘seach’时使用              | Object |      wrapperCol: { offset: 0, span: 24 },       |

