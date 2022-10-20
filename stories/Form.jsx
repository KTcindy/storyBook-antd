import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
export default function FormView () {
    const onFinish = () => {
        
    }
    const onFinishFailed = () => {
        
    }
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}
