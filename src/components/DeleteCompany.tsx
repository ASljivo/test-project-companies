import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  openDeleteDialog: boolean;
  handleCloseDeleteDialog: any;
  confimDelete: any;
}

const DeleteCompany = ({
  openDeleteDialog,
  handleCloseDeleteDialog,
  confimDelete,
}: Props) => {
  return (
    <div>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle textAlign="center">Are you sure?</DialogTitle>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Button variant="outlined" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={confimDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCompany;
