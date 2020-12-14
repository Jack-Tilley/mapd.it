import axios from "axios";
export async function validateSignup(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Username required";
  }
  await axios
    .get(`http://localhost:8000/api/user_exists/${values.username.trim()}/`)
    .then((res) => {
      // console.log(res.data);
      if (res.data.exists === true) {
        // console.log(res.data);
        errors.username = "This usename is already taken";
        return "This username is already taken";
      }
    })
    .catch((err) => console.log(err));

  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }
  return errors;
}

export async function validateLogin(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Username required";
  }
  await axios
    .get(`http://localhost:8000/api/user_exists/${values.username.trim()}/`)
    .then((res) => {
      // console.log(res.data);
      if (res.data.exists === false) {
        // console.log(res.data);
        errors.username = "No user exists with this username";
        return "No user exists with this username";
      }
    })
    .catch((err) => console.log(err));
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
}
