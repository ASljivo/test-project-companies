import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

import { CompanyService } from "../services/CompanyService";
import { CompaniesResponse, SearchParams } from "../models/Companies.model";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../constants/constants";
import useApi from "../utils/api-client/useApi";
import { BGBox } from "../styles";
import {
  COMPANY_CREATE,
  COMPANY_DEYAILS,
  COMPANY_UPDATE,
} from "../routes/routePaths";
import DeleteCompany from "../components/DeleteCompany";

const CompanyList: FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<CompaniesResponse>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { fetch: fetchCompanies } = useApi(CompanyService.companies);
  const { fetch: deleteCompany } = useApi(CompanyService.delete);

  const getData = async () => {
    const { data } = await fetchCompanies(getQueryParams());
    setCompanies(data);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams({ PageIndex: value as any });
  };

  const handleChangeSearch = (event: any) => {
    setSearchTerm(event.target.value);

    setSearchParams({ Search: event.target.value });
  };

  const getQueryParams = (): SearchParams => {
    return {
      Search: searchParams.get("Search"),
      PageIndex: searchParams.get("PageIndex") || 1,
      PageSize: PAGE_SIZE,
    };
  };

  const handleOpenDeleteDialog = (companyId: string) => {
    setSelectedId(companyId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const confimDelete = async () => {
    await deleteCompany(selectedId);
    getData();
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Container maxWidth="lg">
      <Box sx={BGBox}>
        <Grid item xs={12}>
          <Typography
            sx={{ mt: 4, mb: 2, pt: 2, pl: 2 }}
            variant="h6"
            component="div"
          >
            Companies
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="end"
            alignItems="start"
          >
            <Button
              variant="contained"
              sx={{ mr: 2, p: 2 }}
              onClick={() =>
                navigate(
                  `${COMPANY_CREATE}?PageIndex=${getQueryParams().PageIndex}`
                )
              }
            >
              Create
            </Button>
            <TextField
              id="search"
              type="search"
              label="Search"
              value={searchTerm}
              onChange={handleChangeSearch}
              sx={{ width: 250 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <List>
            {companies?.items.map(({ companyId, companyName }) => (
              <>
                <ListItem
                  key={companyId + companyId}
                  secondaryAction={
                    <>
                      <IconButton
                        key={companyId + "edit"}
                        edge="end"
                        aria-label="edit"
                        sx={{ mr: 2 }}
                        onClick={() =>
                          navigate(
                            `${COMPANY_UPDATE}${companyId}?PageIndex=${
                              getQueryParams().PageIndex
                            }`
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        key={companyId + "delete"}
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleOpenDeleteDialog(companyId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={companyName}
                    onClick={() =>
                      navigate(
                        `${COMPANY_DEYAILS}${companyId}?PageIndex=${
                          getQueryParams().PageIndex
                        }`
                      )
                    }
                  />
                </ListItem>
                <Divider key={companyName + companyId} />
              </>
            ))}
          </List>

          {companies?.items && !companies?.items?.length && (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Typography variant="h5" sx={{ mt: 4 }}>
                  No results
                </Typography>
              </Box>
            </Grid>
          )}

          {companies?.pageCount && companies?.pageCount > 1 ? (
            <Grid
              direction="row"
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Pagination
                count={companies?.pageCount}
                variant="outlined"
                onChange={handleChangePage}
                color="primary"
              />
            </Grid>
          ) : (
            ""
          )}
        </Grid>

        <DeleteCompany
          openDeleteDialog={openDeleteDialog}
          handleCloseDeleteDialog={handleCloseDeleteDialog}
          confimDelete={confimDelete}
        />
      </Box>
    </Container>
  );
};

export default CompanyList;
