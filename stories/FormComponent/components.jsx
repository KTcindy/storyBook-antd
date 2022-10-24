import React, { createElement } from 'react';
import { Input, Select, DatePicker, Button, Checkbox, Radio, TreeSelect } from 'antd';
import PopupInput from './PopupInput/index';
// import TinyMce from './TinyMce';
// import ImgUpload from './ImgUpload/index';
// import ButtonUpload from './ButtonUpload';
const { Password } = Input;
const { Option } = Select;
const { Group } = Radio;
const { TreeNode } = TreeSelect;
// 处理树形组件
const childrens = list =>
  list?.map(c => {
    return createElement(
      TreeNode,
      {
        title: c.label,
        value: c.value,
        key:c.value,
        childrens: c?.childrens ?? [],
      },
      c.childrens && c.childrens.length && childrens(c.childrens),
    );
  });

const select = ({ list = [], props, callback = () => {} }) =>
  createElement(
    Select,
    { ...props, onChange: v => callback(v) },
    list.map(c => createElement(Option, { key: c.value, value: c.value }, c.label)),
  );
const checkBoxGroup = ({ props, list = [], callback = () => {} }) =>
  createElement(Checkbox.Group, { ...props, options: list, onChange: v => callback(v) });
const radioGroup = ({ props, list = [] }, callback = () => {}) =>
  createElement(
    Group,
    { ...props, onChange: v => callback(v) },
    list.map(c => createElement(Radio, { key: c.value, value: c.value }, c.label)),
  );
const treeSelect = ({ props, list = [], callback = () => {} }) =>
  createElement(
    TreeSelect,
    { ...props, value: props.name, onChange: v => callback(v) },
    childrens(list),
  );

const input = ({ props, events }) => createElement(Input, { ...events, ...props });
const password = ({ props }) => createElement(Password, { ...props });
const datePicker = ({ props }) => <DatePicker {...props} format="YYYY-MM-DD" />;
const popupInput = ({ props }) => <PopupInput {...props} />;
// const editor = ({ props }) => <TinyMce {...props} />;
// const imgUpload = ({ props }) => <ImgUpload {...props} />;
// const buttonUpload = ({ props }) => <ButtonUpload {...props} />;

export {
  select,
  input,
  password,
  datePicker,
  popupInput,
  // editor,
  // imgUpload,
  // buttonUpload,
  checkBoxGroup,
  radioGroup,
  treeSelect,
};
