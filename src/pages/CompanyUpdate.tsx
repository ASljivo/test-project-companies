import React, { FC, useEffect, useState } from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { CompanyService } from "../services/CompanyService";
import CompanyForm from "../components/CompanyCoreForm";
import { UPDATE } from "../constants/constants";
import { Company } from "../models/Companies.model";
import useApi from "../utils/api-client/useApi";
import { BGBox } from "../styles";
import { COMPANIES } from "../routes/routePaths";

const CompanyUpdate: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [company, setCompany] = useState<Company>();
  const { companyId } = useParams();

  const { fetch: fetchCompany } = useApi(CompanyService.company);

  const getData = async () => {
    const { data } = await fetchCompany(companyId);
    setCompany(data);
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
          aria-label="back"
          onClick={() =>
            navigate(`${COMPANIES}?PageIndex=${searchParams.get("PageIndex")}`)
          }
        >
          <ArrowBackIosIcon />
        </IconButton>
        {company && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" sx={{ my: 4 }}>
              Update company name
            </Typography>

            <CompanyForm mode={UPDATE} initValue={company} />
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default CompanyUpdate;
