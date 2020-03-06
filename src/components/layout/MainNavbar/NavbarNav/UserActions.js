import React from "react";
import { Link } from "react-router-dom";
import {logout} from "../../../../services/Auth"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import api from "../../../../services/api";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      userName: ''
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  async componentDidMount(){
    try{
      const userData = await api.get('/getuserinfo');

      this.setState({userName: userData.data.nome})
    }catch(error){
      console.log(error)
    }
  }

  getLogout = ()=>{
    logout();
    window.location.reload();
  };


  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{this.state.userName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="edit-perfil">
            <i className="material-icons">&#xE8B8;</i> Editar Perfil
          </DropdownItem>

          <DropdownItem divider />

          <DropdownItem onClick={ () => { this.getLogout() } } className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
