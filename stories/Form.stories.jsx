import React, { useRef } from 'react';
import FormView from './Form';
export default {
  title: 'Example/Form',
  component: FormView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
};

const Template = (args) => {
  // console.log(args,'columnslist');
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
      rules: [{ required: false, message: '请输入用户名' }]
    }
  ]
}
const Temptab = (columnslist) => {
  console.log(columnslist,'columnslist');
  return <FormView {...columnslist} />
}
export const Columns = Temptab.bind({})
Columns.columnslist = {
  columns: [{
    name: 'userName',
    label: '用户名',
    rules: [{ required: false, message: '请输入用户名' }]
  }]
}