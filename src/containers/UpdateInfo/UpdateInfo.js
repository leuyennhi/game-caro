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

class UpdateInfoForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFirstLoad: true,
      };
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      const { form, user} = this.props;
      form.setFieldsValue({displayName: user.displayname});
      form.validateFields();

    }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      this.props.update({
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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const {errMessage, successMessage} = this.props;

    const displayNameError = isFieldTouched('displayName') && getFieldError('displayName');

    return (
      <div className="body-component">
        <h1>GAME CARO</h1>
        <h2>Cập nhật thông tin</h2>
        { errMessage && !this.state.isFirstLoad &&
            <div className="err-message">{errMessage}</div>
        }
        { successMessage && !this.state.isFirstLoad &&
            <div className="success-message">{successMessage}</div>
        }
        <div className="form-component">
          <Form
                onSubmit={this.handleSubmit}> 
            <Form.Item labelCol = {{
                  xs: { span: 24},
                  sm: { span: 5 },
                }}
                wrapperCol = {{
                  xs: { span: 24 },
                  sm: { span: 12 },
                }} label="Tên hiển thị" validateStatus={displayNameError ? 'error' : ''} help={displayNameError || ''}>
              {getFieldDecorator('displayName', {
                rules: [
                  {
                    required: true,
                    message: 'Tên hiển thị không được để trống!',
                  },
                ],
              })(<Input />)} 
            </Form.Item>
            
            <Form.Item>
                <div className="btn-update-component">
                    <Button.Group>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Cập nhật
                    </Button>
                    <Button type="primary" onClick={() => history.push("/changepass")}>
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
    user: state.authentication.user,
    errMessage: state.user.errMessage,
    successMessage: state.user.successMessage
  };
}

const mapDispatchToProps = (dispatch) => ({
  update: (displayname) => dispatch(userActions.update(displayname))
});

const UpdateInfoPage = (Form.create({ name: 'update' })(UpdateInfoForm));

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoPage)