import tinymce from 'tinymce/tinymce';

import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/table';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/print';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/code';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/advlist';

import React from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { message } from 'antd';
import { uploadImage } from '@/services/common';
import { getFileType } from '@/utils/utils';
import './components/zh-Hans';

const TinyMce = ({ onChange, edit, value, styles,placeholder }) => {
  const handleUploadImage = async (blobInfo, successFun) => {
    const file = blobInfo.blob();
    const typeArr = ['jpg', 'gif', 'bmp', 'png', 'jpeg', 'svg', 'webp'];
    const type = getFileType(file.name);
    if (typeArr.indexOf(type) === -1) {
      message.error('您上传的图片格式不规范');
      return;
    }
    const isLt10M = file.size / 1024 / 1024 > 10;
    if (isLt10M) {
      message.error('上传的图片不能大于10M');
      return;
    }
    const formData = new FormData();
    formData.append('image', file, file.name);
    const res = await uploadImage(formData);
    if (res && res.uri) {
      successFun(res.uri);
    }
  };

  return (
    <Editor
      value={edit || value}
      onEditorChange={content => onChange(content)}
      init={{
        language: 'zh-Hans',
        height: 500,
        min_height: 400,
        menubar: false,
        statusbar: true, // 保留状态栏
        branding: false, // 去掉广告
        elementpath: false, // 去掉记录标签状态
        ...styles,
        placeholder,
        plugins: [
          'advlist autolink lists link image print preview anchor',
          'code fullscreen',
          'media table paste code ',
        ],
        images_upload_url: '', // 图片上传地址
        images_upload_handler: handleUploadImage,
        forced_root_block: '',
        toolbar:
          'formatselect forecolor backcolor bold italic underline strikethrough image media table alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat hr paste code link undo redo preview fullscreen',
      }}
    />
  );
};

export default TinyMce;
