/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/imports-first */
import React from 'react';
import { Form, Input, Button, Avatar} from 'antd';
import 'antd/dist/antd.css';
import '../style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'
import {history} from '../../helpers/helpers';
import { validate } from '@babel/types';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UpdateInfoForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFirstLoad: true,
        haveChange: false,
      };
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      const { form, user} = this.props;

      form.setFieldsValue({displayName: user.displayname});
      form.validateFields();
    }

    handleSubmit = e => {
      const { form, user} = this.props;

      e.preventDefault();
      
      const values = form.getFieldsValue();

      this.props.update({
          _id: user._id,
          displayname: values.displayName
      });
      this.setState({isFirstLoad: false})
    }

    compareToPastName = () => {
    const { form, user } = this.props;
    if (form.getFieldValue('displayName') !== user.displayname) {
      this.setState({haveChange: true});
    } else {
      this.setState({haveChange: false});
    }
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const {errMessage, successMessage} = this.props;

    const displayNameError = isFieldTouched('displayName') && getFieldError('displayName');

    return (
      <div className="body-component">
        <h1>GAME CARO</h1>
        <h2>Cập nhật thông tin</h2>
        <div className="avatar-component">
          <Avatar shape="square" icon="user" size={150}/>
        </div>
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
                }} label="Tên hiển thị" validateStatus={displayNameError ? 'error' : ''} help={displayNameError || ''}>
              {getFieldDecorator('displayName', {
                rules: [
                  {
                    required: true,
                    message: 'Tên hiển thị không được để trống!',
                  },
                  {
                    validator: this.compareToPastName,
                  },
                ],
              })(<Input />)} 
            </Form.Item>
            
            <Form.Item>
                <div className="btn-update-component">
                    <Button.Group>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError()) || !this.state.haveChange}>
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
    errMessage: state.user.errMessage,
    successMessage: state.user.successMessage,
    user: state.user.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  update: ({_id, displayname}) => dispatch(userActions.update({_id, displayname}))
});

const UpdateInfoPage = (Form.create({ name: 'update' })(UpdateInfoForm));

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoPage)