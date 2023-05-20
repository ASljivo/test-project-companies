import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Company } from "../models/Companies.model";
import { CompanyService } from "../services/CompanyService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UPDATE } from "../constants/constants";
import useApi from "../utils/api-client/useApi";
import { COMPANIES } from "../routes/routePaths";

interface Props {
  mode: string;
  initValue?: Company;
}

const CompanyForm: FC<Props> = ({ mode, initValue }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const { fetch: addCompany } = useApi(CompanyService.addCompany);
  const { fetch: updateCompany } = useApi(CompanyService.updateCompany);

  const createCompany = async (companyName: string) => {
    await addCompany(companyName);
    setLoading(false);
    navigate(`${COMPANIES}?PageIndex=${searchParams.get("PageIndex")}`);
  };

  const updateCompanyName = async (companyId: string, companyName: string) => {
    await updateCompany(companyId, companyName);
    setLoading(false);
    navigate(`${COMPANIES}?PageIndex=${searchParams.get("PageIndex")}`);
  };

  const validateSchema = Yup.object().shape({
    companyName: Yup.string()
      .min(5, "Please enter a name more than 5 characters")
      .required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: initValue?.companyName || "",
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      setLoading(true);
      mode === UPDATE
        ? updateCompanyName(initValue?.companyId || "", values.companyName)
        : createCompany(values.companyName);
    },
  });

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "250px" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          error={Boolean(formik?.errors?.companyName)}
          id="form-field"
          name="companyName"
          label="Company Name"
          onChange={formik.handleChange}
          value={formik.values.companyName}
          helperText={
            formik.errors.companyName ? formik.errors.companyName : ""
          }
        />
        <Button
          disabled={loading}
          color="primary"
          variant="contained"
          type="submit"
          size="medium"
          sx={{ p: 2, mt: 4, width: 250 }}
        >
          {loading ? "Loading..." : "Save"}
        </Button>
      </Grid>
    </Box>
  );
};

export default CompanyForm;
