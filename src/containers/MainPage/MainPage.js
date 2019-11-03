import React from 'react';
import { Form, Input, Select, Button, Typography} from 'antd';
import 'antd/dist/antd.css';
import '../style.css';

const { Option } = Select;
const { Text } = Typography;

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

export default class MainPage extends React.Component {
  render() {
    return(
      <div className="registration-component">
        <h1>GAME CARO</h1>
        <h2>Thông Tin Người Chơi</h2>
        <div className="form-component">
          <Form {...formItemLayout} labelAlign="left">
            <Form.Item label="Tên hiển thị">
              <Text id="displayName" />
            </Form.Item>

            <Form.Item label="Giới tính">
              <Text id="gender"/>
            </Form.Item>
            
            <Form.Item label="E-mail">
              <Text id="email" />
            </Form.Item>
          </Form>
        </div>
        <div className="btn-component">
              <Button type="primary">Chỉnh sửa thông tin</Button>
              <Button type="primary">Chơi với máy</Button>
              <Button type="primary">Tìm người chơi</Button>
        </div>
      </div>
      
    );
  }
}