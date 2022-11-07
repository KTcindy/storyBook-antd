import React from 'react'
import ImgUpload from './ImgUpload'
export default {
    title: 'Example/ImgUpload',
    component: ImgUpload,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
      backgroundColor: { control: 'color' },
    },
}
const Template=(args)=> {
  return (
      <div><ImgUpload {...args} /></div>
  )
}
export const Upload = Template.bind({});
Upload.ages = {
    urlPromise: Promise.resolve(1)
}
