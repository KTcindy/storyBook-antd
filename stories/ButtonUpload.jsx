import { InboxOutlined } from '@ant-design/icons';
import { Button, Upload,message } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const { Dragger } = Upload;
const ButtonUpload = (props) => {
  let { data,multiple,size,maxCount,accept,onChange}=props
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
         onChange([...getfileList,file])
      }
    }
      
    if (file.status === 'removed') {
        setFileList([...fileList])
        onChange([...fileList])
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
ButtonUpload.propTypes = {
     /**
     * 	上传所需额外参数或返回上传额外参数的方法
     */
    data: PropTypes.object,
    /**
     * 是否支持多选文件
     */
    multiple: PropTypes.bool,
    /**
     * 当前上传文件的大小
     */
    size: PropTypes.number,
    /**
     * 文件上传的最大数量
     */
    maxCount: PropTypes.number,
     /**
     *  接受上传的文件类型 ：‘.jpg,.jpeg,.....’,
     */
    accept: PropTypes.string,
    
    onChange:PropTypes.func
}
ButtonUpload.defaultProps = {
    data: {},
    accept: '.xls,.doc,.xlsx',
    maxCount: 1,
    size: 5,
    multiple: true,
    onChange:undefined
}
export default ButtonUpload;
