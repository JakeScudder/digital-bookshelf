import React, { useState, useEffect } from "react";
import { NavLink, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

//By separating the Modal component, I make sure that only one modal is opened at a time.
const LoginModal = (props) => {

  //Component State
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  //Helper function
  const toggle = () => {
    // Clear errors
    props.clearErrors();
    setModal(!modal);
  }

  useEffect(() => {
    const { error, isAuth} = props;
    if(error) {
      // Check for register error
      if(error.id === "LOGIN_FAIL") {
        setMsg(error.msg.msg)
      } else {
        setMsg( null )
      }
    }
    // If authenticated, close modal
    if(modal) {
      if(isAuth) {
        console.log(isAuth);
        toggle();
      }
    }
  })

  const onSubmit = (e) => {
    e.preventDefault();

    // Create user
    const user = {
      email, password
    }
    // Attempt Login
    props.login(user);
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#" className="register-user-link" color="primary" onClick={toggle}>
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
        {/* Show error if needed */}
        { msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>

              <Label for="email">Email</Label>
              <Input 
                value={email}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={e => setEmail(e.target.value)}
              />

              <Label for="password">Password</Label>
              <Input 
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={e => setPassword(e.target.value)}
              />
              <Button color="primary" >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

//From root reducer
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);