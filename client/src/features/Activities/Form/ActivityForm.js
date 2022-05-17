import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from "@material-ui/core";
import {
  useActivityStore,
  useAuthenticationStore,
} from "../../../Provider/Provider";
import { observer } from "mobx-react-lite";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Navigate, useParams, useNavigate } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

//Data

//validation schema
let validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required!"),
});

// const intialValue = ()

const ActivityForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthenticationStore();
  const { addActivity, editActivity, loadActivity } = useActivityStore();
  const classes = useStyle();
  const { id } = useParams();

  const [activity, setActivity] = useState({ title: "", description: "" });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity));
  }, [id, loadActivity]);

  const onSubmit = (values) => {
    if (id) {
      editActivity(id, values.titlem, values.description);
    } else addActivity(values.title, values.description);
    navigate("/");
  };
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <Grid container justify="center" spacing={1} style={{ marginTop: "1rem" }}>
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="Dodaj zadanie"></CardHeader>
          <Formik
            initialValues={activity}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12}>
                        <Field
                          label="tytuł"
                          variant="outlined"
                          fullWidth
                          name="title"
                          value={values.title}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          label="Opis"
                          variant="outlined"
                          fullWidth
                          name="description"
                          value={values.description}
                          type="text"
                          component={TextField}
                          multiline
                          rows={3}
                          maxRows={5}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}
                    >
                      {id ? "Edit" : "Stwórz"}
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

export default observer(ActivityForm);
