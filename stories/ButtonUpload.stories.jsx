import React from 'react'
import ButtonUpload from './ButtonUpload'
export default {
    title: 'Example/ButtonUpload',
    component: ButtonUpload,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
      // backgroundColor: { control: 'color' },
    },
};
const Template=(args)=> {
    return (
        <div><ButtonUpload {...args} /></div>
    )
}
export const  Upload= Template.bind({});

  