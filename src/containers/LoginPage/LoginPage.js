/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/imports-first */
import React from 'react';
import { Form, Input, Button, Icon} from 'antd';
import 'antd/dist/antd.css';
import '../style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
    };
  }
    
    componentDidMount() {
      // To disabled submit button at the beginning.
      const token = new URL(window.location.href).searchParams.get('token');
        if (token) {
            this.props.loginWithFBGG(JSON.parse(token));
      }
      this.props.form.validateFields();
    }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      this.props.login({
          email: values.email,
          password: values.password,
      });

      this.setState({isFirstLoad:false});
    }

    handleLoginFacebook = e => {
      e.preventDefault();
      window.location.replace('https://hw6-caro-api.herokuapp.com/login/facebook');
    }

    handleLoginGoogle = e => {
      e.preventDefault();
      window.location.replace('https://hw6-caro-api.herokuapp.com/login/google');
    }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message} = this.props;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    
    return (
      <div className="body-component">
        <h1>GAME CARO</h1>
        <h2>Đăng Nhập</h2>
          {message && !this.state.isFirstLoad &&
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
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>
            
            <Form.Item wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
              }}>
              <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          </div>
          <p>Bạn có thể đăng nhập với các tài khoản xã hội: </p>
          <div className="login-button-component">
            <Button disabled type="primary" onClick={this.handleLoginFacebook}>
              <Icon type="facebook" theme="filled" />
              Facebook
            </Button>
            <Button disabled type="danger" onClick={this.handleLoginGoogle}>
              <Icon type="google" />
              Google
            </Button>
          </div>
          <p>Bạn chưa có tài khoản?<a href="/register"> Đăng ký ngay!</a></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    message: state.user.message
  };
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(userActions.login(email,password)),
  loginWithFBGG:(token) => dispatch(userActions.loginWithFBGG(token))
});

const LoginPage = (Form.create({ name: 'login' })(LoginForm));

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

