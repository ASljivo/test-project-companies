import React, { FC } from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useSearchParams } from "react-router-dom";

import CompanyForm from "../components/CompanyCoreForm";
import { SAVE } from "../constants/constants";
import { BGBox } from "../styles";
import { COMPANIES } from "../routes/routePaths";

const CompanyCreate: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Container maxWidth="lg">
      <Box sx={BGBox}>
        <IconButton
          edge="end"
          aria-label="back"
          onClick={() =>
            navigate(`${COMPANIES}?PageIndex=${searchParams.get("PageIndex")}`)
          }
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" sx={{ my: 4 }}>
              Create new company
            </Typography>
          </Box>
          <CompanyForm mode={SAVE} />
        </Grid>
      </Box>
    </Container>
  );
};

export default CompanyCreate;
