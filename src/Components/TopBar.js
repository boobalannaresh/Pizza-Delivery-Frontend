import React from "react";
import { Navbar, Container, Nav, Image, NavDropdown, Button, } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import img from "../logo.png";
import { logoutUser } from "../actions/userAction";

function TopBar() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  return (
    <>
      <Navbar variant="dark" expand="lg" sticky="top" style={{ backgroundColor: "rgb(172, 0, 29)" }}>
        <Container>
          <Navbar.Brand>
            <Image src="https://www.pngfind.com/pngs/m/212-2123571_pizza-hut-logo-pizza-hut-logo-png-transparent.png" alt="logo" style={{ height: "50px" }} />
          </Navbar.Brand>
          <Navbar.Brand>
            <h3>Pizza Hut</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {currentUser ? (
                <>
                  <LinkContainer to="/">
                    <NavDropdown
                      title={currentUser.name}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item>
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            dispatch(logoutUser());
                          }}
                        >
                          Logout
                        </Button>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </LinkContainer>
                  {currentUser.isAdmin === false ? (
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        Cart&nbsp;{cartState.cartItems.length}
                      </Nav.Link>
                    </LinkContainer>

                  ) : (
                    <LinkContainer to="/admin">
                      <Nav.Link>Admin panel</Nav.Link>
                    </LinkContainer>
                  )}
                  <LinkContainer to="/orders">
                    <Nav.Link>Orders</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/adminlogin">
                    <Nav.Link>Admin</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;