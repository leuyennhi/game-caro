import React from 'react';
import { Form, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import '../style.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 24},
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export default class Login extends React.Component {
  render() {
    return(
      <div className="login-component">
        <h1>GAME CARO</h1>
        <h2>Đăng Nhập</h2>
        <div className="form-component">
          <Form {...formItemLayout} labelAlign="left">
            
            <Form.Item label="E-mail" required="true">
              <Input type="email" placeholder="123abc@gmail.com" id="email" />
            </Form.Item>

            <Form.Item label="Mật khẩu" required="true">
              <Input.Password id="password" />
            </Form.Item>

            <Form.Item wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
              <Button type="primary" htmlType="submit">Đăng nhập</Button>
            </Form.Item>

          </Form>
        </div>
        
      </div>
      
    );
  }
}