import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import { EditOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const BASE_AUTH_URL = "https://socially-backend.onrender.com/auth";

const registerSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValuesRegister = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};
const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picture_path", values.picture.name);

    fetch(`${BASE_AUTH_URL}/register`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setLogin({ user: data.user, token: data.token }));
        console.log(data, "------SignedUp&&LoggedIN-----------");
        console.log(onSubmitProps, "------onSubmitProps---------");
        onSubmitProps.resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })

      .catch((err) => {
        console.log(err, "**************error_registering_fetch_********");
      });
  };

  const login = async (values, onSubmitProps) => {
    console.log(values, "......values.......");
    fetch(`${BASE_AUTH_URL}/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setLogin({ user: data.user, token: data.token }));
        console.log(data, "---loggedIN------");
        console.log(onSubmitProps, "----------onSubmitProps-----------");
        onSubmitProps.resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (isRegister) {
      await register(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      // initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      initialValues={
        pageType === "login" ? initialValuesLogin : initialValuesRegister
      }
      // validationSchema={isLogin ? loginSchema : registerSchema}
      validationSchema={pageType === "login" ? loginSchema : registerSchema}
    >
      {/* <EditOutlinedIcon /> */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr)"
            sx={{
              "& > div": {
                gridColumn: isNonMobileScreen ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  name="first_name"
                  error={
                    Boolean(touched.first_name) && Boolean(errors.first_name)
                  }
                  helperText={touched.first_name && errors.first_name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  name="last_name"
                  error={
                    Boolean(touched.last_name) && Boolean(errors.last_name)
                  }
                  helperText={touched.last_name && errors.last_name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {/* BUTTONS-aka-ACTIONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin ? "Log In" : "Register"}
            </Button>
          </Box>
          <Typography
            onClick={() => {
              resetForm();
              setPageType((prevType) => {
                return prevType === "register" ? "login" : "register";
              });
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {isLogin
              ? "Don't Have an account? Sign-up here..."
              : "Already Hava an account? Log In Here"}
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default Form;
