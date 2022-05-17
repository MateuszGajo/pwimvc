import React from "react";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from "@material-ui/core";
import { useAuthenticationStore } from "../../Provider/Provider";
import { observer } from "mobx-react-lite";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

//Data
const initialValues = {
  username: "",
  password: "",
};

//validation schema
let validationSchema = Yup.object().shape({
  username: Yup.string().required("To pole jest wymagane!"),
  password: Yup.string().required("To pole jest wymagane!"),
});

const RegisterForm = () => {
  const { signUp, isAuthenticated } = useAuthenticationStore();
  const classes = useStyle();

  const onSubmit = (values) => {
    console.log(values);
    signUp(values);
  };
  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <Grid container justify="center" spacing={1} style={{ marginTop: "1rem" }}>
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="ZAREJSTRUJ SIĘ"></CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Username"
                          variant="outlined"
                          fullWidth
                          name="username"
                          value={values.username}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Hasło"
                          variant="outlined"
                          fullWidth
                          name="password"
                          value={values.password}
                          type="password"
                          component={TextField}
                        />
                      </Grid>
                    </Grid>
                    <Typography style={{ marginTop: "0.2rem" }}>
                      Masz konto? <Link to="/login">Zaloguj</Link>
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}
                    >
                      Zarejstruj
                    </Button>
                  </CardActions>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};

export default observer(RegisterForm);
