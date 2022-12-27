import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { set } from "firebase/database";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import firebase from "../../server/firebase";

const Register = () => {
  let user = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  let errors = [];

  let usercollection = firebase.ref(firebase.database, "users");

  const naviagate = useHistory();
  const [userDetails, setUserDetails] = useState(user);
  const [errorState, setErrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      console.log(isFormEmpty());
      console.log("something");
      setErrorState((error) =>
        error.concat({ message: "Please fill in all details." })
      );
      return false;
    } else if (!checkPassword()) {
      return false;
    }

    return true;
  };
  const isFormEmpty = () => {
    return (
      !userDetails.userName.length ||
      !userDetails.password.length ||
      !userDetails.confirmPassword.length ||
      !userDetails.email.length
    );
  };

  const checkPassword = () => {
    if (userDetails.password.length < 8) {
      setErrorState((error) =>
        error.concat({
          message: "Password must be atleast 8 characters long",
        })
      );
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      setErrorState((error) =>
        error.concat({
          message: "Password and confirm password not matched",
        })
      );
      return false;
    }

    return true;
  };
  const onSUbmitHandler = (event) => {
    setErrorState(() => []);
    setIsSuccess(false);
    if (isFormValid()) {
      setIsLoading(true);
      createUserWithEmailAndPassword(
        firebase.auth,
        userDetails.email,
        userDetails.password
      )
        .then((createdUser) => {
          //  console.log(createdUser);
          setIsLoading(false);
          updateUserDetails(createdUser);
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorState((error) =>
            error.concat({ message: "The email address already exists" })
          );
        });
    } else {
    }
  };

  const errorHandler = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  const updateUserDetails = (createdUser) => {
    if (createdUser) {
      setIsLoading(true);
      updateProfile(firebase.auth.currentUser, {
        displayName: userDetails.userName,
        photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
      })
        .then(() => {
          saveUserInDatabase(createdUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          setErrorState((err) => err.concat(serverError));
        });
    }
    setIsLoading(false);
  };

  const saveUserInDatabase = (createdUser) => {
    setIsLoading(true);
    set(usercollection, {
      displayName: createdUser.user.displayName,
      photoURL: createdUser.user.photoURL,
    })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((serverError) => {
        setIsLoading(false);
        setErrorState((err) => err.concat(serverError));
      });
  };
  return (
    <Grid
      verticalAlign="middle"
      textAlign="center"
      style={{ padding: "1rem", height: "100vh", background: "#eee" }}
    >
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h2" color="orange">
          <Icon name="puzzle piece" />
          Register
        </Header>
        <Form onSubmit={onSUbmitHandler}>
          <Segment stacked>
            <Form.Input
              name="userName"
              value={userDetails.userName}
              icon="user"
              onChange={handleInput}
              type="text"
              placeholder="Username"
            />

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
            <Form.Input
              name="confirmPassword"
              value={userDetails.confirmPassword}
              icon="lock"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
            />
            <Button
              disabled={isLoading}
              color="orange"
              style={{ width: "450px", fontSize: "18px" }}
            >
              Register
            </Button>
          </Segment>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {errorHandler()}
          </Message>
        )}
        {isSuccess && (
          <Message success>
            <h3>Successfully Registered</h3>
          </Message>
        )}
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
