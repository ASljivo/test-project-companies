import React, { FC } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import AuthHelper from "../helpers/AuthHelper";
import { UserService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { LOGIN_SUCCESS } from "../constants/constants";

import { useGoogleAuth } from "../context/GoogleAuthProvider";
import { BGBox } from "../styles";
import { COMPANIES_PARAMS } from "../routes/routePaths";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signIn } = useGoogleAuth();

  const handleSignIn = async () => {
    const googleUser: any = await signIn();
    AuthHelper.setAuth(JSON.stringify(googleUser));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: googleUser },
    });

    await UserService.user();
    navigate(COMPANIES_PARAMS);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          ...BGBox,
          display: "flex",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" sx={{ mb: 4 }}>
              This is an application for a management company, please log in via
              google
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" size="medium" onClick={handleSignIn}>
              Login in with Google
            </Button>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
