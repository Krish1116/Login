// import React, { useState, useEffect } from "react";
import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const cllgReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 10,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 10,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

//useReducer is alternativ of usestate

const Login = (props) => {
  // const [enteredCllgName, setEnteredCllgName] = useState("");
  // const [cllgIsValid, setCllgIsValid] = useState();
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchpassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [cllgState, dispatchCllg] = useReducer(cllgReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log("Effect Running");
    return () => {
      console.log("Effect clenup");
    };
  }, []);

  const { isValid: cllgIsValid } = cllgState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking from validity");
      setFormIsValid(emailIsValid && passwordIsValid && cllgIsValid);
    }, 500);

    // cleanup process
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, cllgIsValid]);

  const cllgChangeHandler = (event) => {
    // setEnteredCllgName(event.target.value);
    dispatchCllg({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   // event.target.value.trim().length > 1 && enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //   cllgState.isValid && emailState.isValid && passwordState.isValid
    // );
  };

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   // event.target.value.includes('@') && enteredPassword.trim().length > 6 && enteredCllgName.trim().length > 1
    //   emailState.isValid && passwordState.isValid && cllgState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchpassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   // event.target.value.trim().length > 6 && enteredEmail.includes('@') && enteredCllgName.trim().length > 1
    //   passwordState.isValid && emailState.isValid && cllgState.isValid
    // );
  };

  const validateCllgHandler = () => {
    // setCllgIsValid(enteredCllgName.trim().length > 1);
    dispatchCllg({ type: "INPUT_BLUR" });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchpassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword, enteredCllgName);
    authCtx.onLogin(emailState.value, passwordState.value, cllgState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="cllg name"
          label="College Name"
          type="cllg name"
          isValid={cllgIsValid}
          value={cllgState.value}
          onChange={cllgChangeHandler}
          onBlur={validateCllgHandler}
        />

        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        {/* <div
          className={`${classes.control} ${
            cllgState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegename">College Name</label>
          <input
            type="text"
            id="cllg name"
            value={cllgState.value}
            onChange={cllgChangeHandler}
            onBlur={validateCllgHandler}
          />
        </div> */}
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}

        {/* <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
