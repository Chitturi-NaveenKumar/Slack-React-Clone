import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../server/firebase";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
const Login = () => {
  let user = {
    email: "",
    password: "",
  };
  let errors = [];

  const [userDetails, setUserDetails] = useState(user);
  const [errorState, setErrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    let target = e.target;
    setUserDetails((prevDetails) => {
      let details = { ...prevDetails };
      details[target.name] = target.value;
      return details;
    });
  };

  const isFormValid = () => {
    console.log("rendered");
    if (isFormEmpty()) {
      setErrorState((error) =>
        error.concat({ message: "Please fill in all details." })
      );
      return false;
    }

    return true;
  };

  const isFormEmpty = () => {
    return !userDetails.password.length || !userDetails.email.length;
  };

  const onSUbmitHandler = (event) => {
    setErrorState(() => []);

    if (isFormValid()) {
      setIsLoading(true);
      signInWithEmailAndPassword(
        firebase.auth,
        userDetails.email,
        userDetails.password
      )
        .then((createdUser) => {
          //  console.log(createdUser);
          setIsLoading(false);
          console.log(createdUser);
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorState((error) =>
            error.concat({
              message:
                "The email address not registered.Please,create an account.",
            })
          );
        });
    } else {
    }
  };
  const errorHandler = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <Grid
      verticalAlign="middle"
      textAlign="center"
      style={{ padding: "1rem", height: "100vh", background: "#eee" }}
    >
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h2" color="purple">
          <Icon name="slack" />
          Login to ChatApp
        </Header>
        <Form onSubmit={onSUbmitHandler}>
          <Segment stacked>
            <Form.Input
              name="email"
              value={userDetails.email}
              icon="mail"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value={userDetails.password}
              icon="lock"
              onChange={handleInput}
              type="password"
              placeholder="Password"
            />
            <Button
              disabled={isLoading}
              color="purple"
              style={{ width: "450px", fontSize: "18px" }}
            >
              Login
            </Button>
          </Segment>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {errorHandler()}
          </Message>
        )}

        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
