import React, { useEffect } from "react";
import {
  useActivityStore,
  useAuthenticationStore,
} from "../../../Provider/Provider";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const ActivityList = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthenticationStore();
  const { activities, loadActivities, deleteActivity } = useActivityStore();

  useEffect(() => {
    loadActivities();
  }, []);

  const handleDelete = (id) => {
    deleteActivity(id);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: "1rem" }}>
        <Grid container spacing={2}>
          {Array.from(activities.values()).map((item) => (
            <Grid item xs={12} md={8} lg={4} xl={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  title={item.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => handleEdit(item._id)}
                  >
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default observer(ActivityList);
