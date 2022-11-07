import React, { useRef } from 'react';
import FormView from './Form';
import ColumnsView from './Columns';
export default {
  title: 'Example/Form',
  component: FormView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
};

const Template = (args) => {
  const childRef = useRef();
  return (
    <FormView {...args} cRef={childRef} />
  )
}
export const Form = Template.bind({});
Form.args = {
  columns: [
    {
      name: 'userName', label: '用户名',
      type:'popupInput',
      rules: [{ required: false, message: '请输入用户名' }],
      props: {
        title: 'xxx',
        placeholder:'请输入'
      }
    }
  ]
}
const Columns = () => {
  return (<div><ColumnsView/></div>)
}
export const columns = Columns.bind({});

