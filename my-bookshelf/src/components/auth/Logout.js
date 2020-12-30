import React, { Fragment } from 'react'

import { NavLink } from "reactstrap";

import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const Logout = (props) => {
    return (
      <Fragment>
        <NavLink onClick={props.logout} id="logout-link">Logout</NavLink>
      </Fragment>
    )
}

export default connect(null, { logout })(Logout);