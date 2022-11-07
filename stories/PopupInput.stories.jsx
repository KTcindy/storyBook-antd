import React from 'react'
import PopupView from './PopupInput'
export default {
    title: 'Example/PopupInput',
    component: PopupView,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  };
    
const Template = (args) => {
  return (
      <div>
          <PopupView {...args} />
    </div>
  )
}
export const PopupComponent = Template.bind({});
PopupComponent.args = {
    title: 'SKU',
    placeholder: 'SKU',
    with: 200,
    disabled: false,
}
