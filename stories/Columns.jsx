import React from 'react'
import PropTypes from 'prop-types';

 const Columns= ({})=> {
  return (
    <div></div>
  )
}
Columns.propTypes = {
    /**
     * item的key
     */
    name: PropTypes.string,
    /**
     * item的label	
     */
    label: PropTypes.string,
    /**
     * 当前item的组件的类型 例如input、select等
     */
    type: PropTypes.string,
     /**
      * item的校验
      */
    rules: PropTypes.array,
    /**
     * item的一些属性例如：disabled、placeholder、clearIcon等，可看antd官网具体的配置项
     */
    props: PropTypes.object,
     /**
      * 此配置只在有子元素时需要次配置 例如select、checkGroup等
      */
    list: PropTypes.array,
    /**
     * item的回调事件配置 如onchang、onBlur
     */
     events:PropTypes.object,
}
Columns.defaultProps = {
    
}
export default Columns