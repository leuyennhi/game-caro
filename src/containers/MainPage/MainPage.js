import React from 'react';
import 'antd/dist/antd.css';
import { Button} from 'antd';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions';
import '../style.css';
import {history} from '../../helpers/helpers';


// eslint-disable-next-line react/prefer-stateless-function
class MainPage extends React.Component {
  render() {
    const {user, logout} = this.props;

    return (
      <div className="body-component">
        <h1>GAME CARO</h1>

        <h2>{user.displayname}</h2>
        <div className="btns-component">
          <Button.Group size='default'>
              <Button type="primary" onClick={() => history.push("/update")}>Chỉnh sửa thông tin</Button>
              <Button type="primary" onClick={() => history.push("/game")}>Chơi với máy</Button>
              <Button type="primary" disabled>Tìm người chơi</Button>
              <Button type="primary" onClick={() => logout()}>Đăng xuất</Button>
          </Button.Group>
        </div>
        
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)