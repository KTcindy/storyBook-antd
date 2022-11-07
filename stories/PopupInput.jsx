import React, { useState } from 'react';
import { Row, Modal, Tooltip, Button, Input, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import TextArea from 'antd/lib/input/TextArea';
const Option = Select.Option;
const Popup = (props) => {
  const [getPayloadFilter, setPayloadFilter] = useState('');
  const [getShowMutiple, setShowMutiple] = useState(false);
  const handleDoubleClick = (value, type) => {
    setShowMutiple(value);
  };
  const { title, placeholder, width, disabled = false } = props;
    const handleChangeFilter = value => {
      props.onChange(value)
    setPayloadFilter(value);
  };
  const multiSkuContent = (
    <div style={{ width: '100%' }}>
      <Row>
        <TextArea
          autoSize={{ minRows: 4 }}
          placeholder={`请输入${title}`}
          value={getPayloadFilter?.join?.('\n') ?? getPayloadFilter}
          onChange={e => handleChangeFilter(e.target.value)}
          allowClear
        />
      </Row>
    </div>
  );
  const values = [...new Set(getPayloadFilter?.trim?.()?.split('\n') ?? getPayloadFilter)]
    ?.filter(value => value && value.trim())
    ?.map(v => v.replaceAll('\t', ''));

  const modalContent = (
    <Modal
      title={
        <div>
          <span>批量搜索{title}</span>
          <Tooltip title={`多个${title}之间换行输入`}>
            <InfoCircleOutlined style={{ color: 'var(--ant-primary-color)', marginLeft: 2 }} />
          </Tooltip>
        </div>
      }
      open={getShowMutiple}
      closable={false}
      footer={[
        <Button
          onClick={() => {
            setShowMutiple(false);
            handleChangeFilter(values?.map(j => j.trim()));
          }}
          type="primary"
          key="ok"
        >
          确定
        </Button>,
      ]}
      style={{ textAlign: 'center' }}
    >
      {multiSkuContent}
    </Modal>
  );

  const content = (
    <div
      onDoubleClick={() => {
        if (!disabled) {
          handleDoubleClick(true, 'getShowMutiple');
        }
      }}
    >
      {(getShowMutiple || !values?.length || typeof getPayloadFilter === 'string') && (
        <Input
          allowClear
          onDoubleClick={() => handleDoubleClick(true, 'getShowMutiple')}
          placeholder={placeholder || `${title}(双击批量搜索)`}
          style={{ width: width || 250 }}
          disabled={disabled}
          onChange={e => {
            handleChangeFilter(e.target.value);
          }}
          value={
            typeof getPayloadFilter === 'string' ? getPayloadFilter?.trim() : ''
          }
        />
      )}
      {!getShowMutiple && values?.length > 0 && typeof getPayloadFilter !== 'string' && (
        <Select
          mode="multiple"
          showSearch
          style={{ minWidth: '180px' }}
          allowClear
          maxTagPlaceholder={() => (
            <Tooltip
              title={values?.slice?.(2, values?.length)?.map((ele, index) => (
                <span style={{ display: 'inline-block', margin: '5px' }} key={index.toString()}>
                  {ele}
                </span>
              ))}
            >
              ...
            </Tooltip>
          )}
          maxTagCount={2}
          value={values}
          onChange={value => handleChangeFilter(value)}
          open={false}
          disabled={disabled}
        >
          {values?.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </Select>
      )}

      {modalContent}
    </div>
  );
  return content;
}
Popup.PropTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    disabled: PropTypes.bool,
    onChange:PropTypes.func
}
Popup.defaultProps = {
    title: 'SKU',
    placeholder: 'SKU',
    with: 200,
    disabled: false,
    onChange: undefined,
}
export default Popup
