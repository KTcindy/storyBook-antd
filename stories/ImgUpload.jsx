import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Modal } from 'antd';
import React, { useState } from 'react';
// import { uploadImage } from '@/services/common';
import PropTypes from 'prop-types';

const ImgUpload = (props) => {
  let {data,accept,maxCount,size,urlPromise}=props
  const [loading, setLoading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [imageUrl, setImageUrl] = useState([])
  const handleChange =async info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'error') {
      this.setState({ loading: false });
      message.error('上传失败');
    }

    if (info.file.status === 'removed') {
      setImageUrl([...info.fileList]);
      props.onChange([...info.fileList])
    }
  };
  const beforeUpload = file => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('只能上传图片类型为JPG、PNG!');
    // }
    const isLtM = file.size / 1024 / 1024 < size;
    if (!isLtM) {
      message.error(`图片大小不能大于 ${size}M!`);
    }
    return isLtM;
  };
  
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
    setPreviewTitle(file.uid);
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        请上传
      </div>
    </div>
  );
  const uploadHeadImg = ({ file }) => {
    const formData = new FormData();
    formData.append('image', file, file.name);
    urlPromise(formData).then(res => {
      setLoading(false);
      setImageUrl([...imageUrl, { url: res.uri }]);
      props.onChange([...imageUrl, { url: res.uri }])
    });
  };
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        fileList={imageUrl}
        className="avatar-uploader"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={uploadHeadImg}
        onPreview={handlePreview}
        maxCount={maxCount}
        accept={accept}
        data={{ ...data }}
      >
        {imageUrl.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
      </Modal>
    </>
  );
};
ImgUpload.propTypes = {
    /**
     * 	上传所需额外参数或返回上传额外参数的方法
     */
    data: PropTypes.object,
    /**
     *  接受上传的文件类型 ：‘.jpg,.jpeg,.....’,
     */
    accept: PropTypes.string,
    /**
     * 文件上传的最大数量
     */
    maxCount: PropTypes.number,
    /**
     * 当前上传文件的大小
     */
    size: PropTypes.number,
    /**
     * 文件上传的url 目前支持仅支持 Promise 类型
     */
    urlPromise:PropTypes.object.isRequired
}
ImgUpload.defaultProps = {
    data: {},
    accept: '.jpg,.jpeg',
    maxCount: 1,
    size: 5,
}
export default ImgUpload;
