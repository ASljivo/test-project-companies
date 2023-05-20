import React, { FC, useEffect, useState } from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { CompanyService } from "../services/CompanyService";
import useApi from "../utils/api-client/useApi";
import { BGBox } from "../styles";
import { COMPANIES } from "../routes/routePaths";

const CompanyDetails: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [company, setCompany] = useState("");
  const { companyId } = useParams();

  const { fetch: fetchCompany } = useApi(CompanyService.company);

  const getData = async () => {
    const { data } = await fetchCompany(companyId);
    setCompany(data.companyName);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={BGBox}>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() =>
            navigate(`${COMPANIES}?PageIndex=${searchParams.get("PageIndex")}`)
          }
        >
          <ArrowBackIosIcon />
        </IconButton>
        {company && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" sx={{ mt: 4 }}>
                {company}
              </Typography>
            </Box>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default CompanyDetails;
