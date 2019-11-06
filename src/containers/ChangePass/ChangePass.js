/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/imports-first */
import React from 'react';
import { Form, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import '../style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'
import {history} from '../../helpers/helpers';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ChangePassForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFirstLoad: true,
      };
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      const { form} = this.props;
      form.validateFields();
    }

    handleSubmit = e => {
      const { form, user} = this.props;

      e.preventDefault();
      
      const values = form.getFieldsValue();

      this.props.changepass({
          _id: user._id,
          passpresent: values.passpresent,
          password: values.password
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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const {errMessage, successMessage} = this.props;

    const passpresentError = isFieldTouched('passpresent' && getFieldError('passpresent'));
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');

    return (
      <div className="body-component">
        <h1>GAME CARO</h1>
        <h2>Đổi mật khẩu</h2>
        { errMessage && !this.state.isFirstLoad &&
            <div className="err-message">{errMessage}</div>
        }
        { successMessage && !this.state.isFirstLoad &&
            <div className="success-message">{successMessage}</div>
        }
        <div className="form-component">
          <Form onSubmit={this.handleSubmit}>
          <Form.Item labelCol = {{
                  xs: { span: 24},
                  sm: { span: 5 },
                }}
                wrapperCol = {{
                  xs: { span: 24 },
                  sm: { span: 12 },
                }}
                label="Mật khẩu hiện tại" hasFeedback validateStatus={passpresentError ? 'error' : ''} help={passpresentError || ''}>
              {getFieldDecorator('passpresent', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu hiện tại!',
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>

          <Form.Item labelCol = {{
                  xs: { span: 24},
                  sm: { span: 5 },
                }}
                wrapperCol = {{
                  xs: { span: 24 },
                  sm: { span: 12 },
                }}
                label="Mật khẩu mới" hasFeedback validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu mới!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>

            <Form.Item labelCol = {{
                  xs: { span: 24},
                  sm: { span: 5 },
                }}
                wrapperCol = {{
                  xs: { span: 24 },
                  sm: { span: 12 },
                }}
                label="Nhập lại mật khẩu" hasFeedback validateStatus={confirmError ? 'error' : ''} help={confirmError || ''}>
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

            <Form.Item>
                <div className="btn-changepass-component">
                    <Button.Group>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Đổi mật khẩu
                    </Button>
                    <Button type="primary" onClick={() => history.push("/home")}>
                        Trở về
                    </Button>
                    </Button.Group>
                </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    errMessage: state.user.errMessage,
    successMessage: state.user.successMessage,
    user: state.user.user
  };
}

const mapDispatchToProps = (dispatch) => ({
  changepass: ({_id, passpresent, password}) => dispatch(userActions.changepass({_id, passpresent, password}))
});

const ChangePassPage = (Form.create({ name: 'changepass' })(ChangePassForm));

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassPage)