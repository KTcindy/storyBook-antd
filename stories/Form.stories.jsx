import React, { useRef } from 'react';
import FormView from './Form';
export default {
  title: 'Example/Form',
  component: FormView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => {
  const config = {
    columns: [
      {
        name: 'userName', label: '用户名',
        rules: [{ required: false, message: '请输入用户名' }]
      },
      {
        name: 'highHeeled',
        label: '工单编号',
        props: {
          title: '工单编号',
          placeholder: '工单编号(双击批量)',
        },
        type: 'popupInput',
        rules: [{ required: false, message: '请输入' }],
      },
      {
        name: 'gender',
        label: '性别',
        type: 'select',
        rules: [{ required: true, message: '请选择性别' }],
        list: [
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
        ],
        callback: res => onGenderChange(res),
      },
      { name: 'exercise', label: '运动内容', rules: [{ required: false, message: '请输入喜欢的运动' }] },
      {
        name: 'date',
        label: '日期',
        type: 'datePicker',
        rules: [{ required: false, message: '请输入日期' }],
      },
      {
        name: 'text',
        label: '自定义富文本',
        type: 'editor',
        rules: [{ required: true, message: '请输入自定义富文本' }],
        props: {
          placeholder: '自定义富文本',
        }
      },
      {
        name: 'img',
        label: '文件上传',
        type: 'imgUpload',
        rules: [{ required: true, message: '请选择文件' }],
        props: {
          maxCount: 1,
          accept: '.jpg,.png,.jpeg',
          size: 10
        }
      },
      {
        name: 'excl',
        label: 'excl上传',
        type: 'buttonUpload',
        rules: [{ required: true, message: '请选择文件' }],
        props: {
          multiple: true,
          size: 10,
          maxCount: 2,
          accept: '.xlsx,.xls',
        }
      }, {
        name: 'group',
        label: '多选',
        type: 'checkBoxGroup',
        rules: [{ required: true, message: '请选择' }],
        list: [
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
        ],
        callback: res => {
          console.log(res, '---')
        },
      },
      {
        name: 'radio',
        label: '多选',
        type: 'radioGroup',
        rules: [{ required: true, message: '请选择' }],
        list: [
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
        ],
        callback: res => {
          console.log(res, '---')
        },
      },
      {
        name: 'tree',
        label: '多选',
        type: 'treeSelect',
        rules: [{ required: true, message: '请选择' }],
        list: [
          { value: 'male', label: '男' },
          {
            value: 'female', label: '女', childrens: [
              {
                value: 2, label: '小李'
              }
            ]
          },
        ],
        props: {
          showSearch: true,
          placeholder: "Please select",
          allowClear: true,
          multiple: true,
          treeDefaultExpandAll: true
        },
        callback: res => {
          console.log(res, '---')
        },
      },
      // {
      //   name: 'slot', label: '前后放置插槽',
      //   rules: [{ required: false, message: '请输入' }],
      //   beforeSlot: e => <div>我是前置插槽</div>,
      //   afterSlot: e => <div>我是后置插槽</div>
      // }
    ],
    data: {
      userName: '小坏',
      gender: 'female',
    },
  };
  const childRef = useRef();
  return (
    <FormView {...config} cRef={childRef} />
  )
}
export const Primary = Template.bind({});