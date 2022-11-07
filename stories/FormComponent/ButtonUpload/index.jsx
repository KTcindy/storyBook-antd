import { InboxOutlined } from '@ant-design/icons';
import { Button, Upload,message } from 'antd';
import React, { useState } from 'react';

const { Dragger } = Upload;
const App = (props) => {
  let { multiple,size,maxCount,accept}=props
  const [getfileList, setFileList] = useState([]);
  const beforeUpload = file => {
   return false
  };
  const handleChange = async info => {
    if (getfileList.length >= maxCount) {
      return message.error(`文件最多支持上传 ${maxCount}个!`);
    }

    let { file, fileList } = info
    if (file.status!=='removed') {
      const isLtM = file.size / 1024 / 1024 < size;
      if (!isLtM) {
        message.error(`文件大小不能大于 ${size}M!`);
        return 
      } else {
         setFileList([...getfileList,file])
         props.onChange([...getfileList,file])
      }
    }
      
    if (file.status === 'removed') {
        setFileList([...fileList])
        props.onChange([...fileList])
    }

   
 }
  return (
    <Dragger
      fileList={getfileList}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      multiple={multiple}
      accept={accept}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击选择或拖拽文件到线框中上传</p>
      <p className="ant-upload-hint">仅支持小于{size}M的{accept}格式的excel文件</p>
    </Dragger>
  );
};

export default App;
