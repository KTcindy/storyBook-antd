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

