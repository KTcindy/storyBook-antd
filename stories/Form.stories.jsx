import React from 'react';
import  Form  from './Form';
export default {
    title: 'Example/Form',
    component: Form,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
      backgroundColor: { control: 'color' },
    },
};
const Template = (args) => <Form  />;
export const Primary = Template.bind({});