import React from 'react';
import { Form, Input, Select, Button, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import '../style.css';

const { Option } = Select;

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

export default class Registration extends React.Component {
  render() {
    return(
      <div className="registration-component">
        <h1>GAME CARO</h1>
        <h2>Đăng Ký</h2>
        <div className="form-component">
          <Form {...formItemLayout} labelAlign="left">
            <Form.Item label="Tên hiển thị" required="true">
              <Input id="displayName" name="displayName" />
            </Form.Item>

            <Form.Item label="Tên hiển thị" required="true">
              <DatePicker id="dob" name="dob"/>
            </Form.Item>

            <Form.Item label="Giới tính" required="true">
              <Select defaultValue="male" id="gender" name="gender">
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>
            
            <Form.Item label="E-mail" required="true">
              <Input type="email" placeholder="123@gmail.com" id="email" name="email"/>
            </Form.Item>

            <Form.Item label="Mật khẩu" required="true">
              <Input.Password id="password" name="password"/>
            </Form.Item>

            <Form.Item label="Nhập lại mật khẩu" required="true">
              <Input.Password id="confirm" name="confirm" />
            </Form.Item>

            <Form.Item wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
              <Button type="primary" htmlType="submit" onClick>Đăng ký</Button>
            </Form.Item>

          </Form>
        </div>
        
      </div>
      
    );
  }
}