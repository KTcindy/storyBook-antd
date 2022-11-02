columns 配置文档

|  参数  |                             说明                             |  类型  |
| :----: | :----------------------------------------------------------: | :----: |
|  name  |                          item的key                           | String |
| label  |                         item的label                          | String |
|  type  |           当前item的组件的类型 例如input、select等           | String |
| rules  |                          item的校验                          | Array  |
| props  | item的一些属性例如：disabled、placeholder、clearIcon等，可看antd官网具体的配置项 | Object |
|  list  |   此配置只在有子元素时需要次配置 [{value:1,lable:'xxx'}] 例如select、checkGroup等    | Array  |
| events |             item的回调事件配置 如onchang、onBlur             | Object |
