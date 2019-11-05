/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/imports-first */
import React from 'react';
import { Form, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import '../style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFirstLoad: true,
      };
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      this.props.register({
          email: values.email,
          password: values.password,
          displayname: values.displayName
      });
      this.setState({isFirstLoad: false})
    }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message} = this.props;
    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');
    const displayNameError = isFieldTouched('displayName') && getFieldError('displayName');

    return (
      <div className="body-component">
        <h1>GAME CARO</h1>
        <h2>Đăng Ký</h2>
        { message && !this.state.isFirstLoad &&
            <div className="err-message">{message}</div>
        }
        <div className="form-component">
          <Form labelCol = {{
                  xs: { span: 24},
                  sm: { span: 5 },
                }}
                wrapperCol = {{
                  xs: { span: 24 },
                  sm: { span: 12 },
                }}
                onSubmit={this.handleSubmit} > 
            <Form.Item label="Tên hiển thị" validateStatus={displayNameError ? 'error' : ''} help={displayNameError || ''}>
              {getFieldDecorator('displayName', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập tên hiển thị!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
        
            <Form.Item label="Email" validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Mật khẩu" hasFeedback validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>

            <Form.Item label="Nhập lại mật khẩu" hasFeedback validateStatus={confirmError ? 'error' : ''} help={confirmError || ''}>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password/>)}
            </Form.Item>
            
            <Form.Item wrapperCol={{
                xs: { span: 24, offset: 0},
                sm: { span: 16, offset: 8},
              }} >
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                  Đăng ký
                </Button>
            </Form.Item>
          </Form>
          </div>
          <p>Bạn đã có tài khoản?<a href="/login"> Đăng nhập ngay!</a></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    message: state.registration.message
  };
}

const mapDispatchToProps = (dispatch) => ({
  register: (user) => dispatch(userActions.register(user))
});

const RegisterPage = (Form.create({ name: 'register' })(RegistrationForm));

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)