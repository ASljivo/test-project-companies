import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_FAIL } from "../constants/constants";
import { useGoogleAuth } from "../context/GoogleAuthProvider";
import AuthHelper from "../helpers/AuthHelper";
import {
  COMPANIES_PARAMS,
  DRAG_DROP,
  HOME,
  MORE_LESS,
} from "../routes/routePaths";

const MenuAppBar: FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const { signOut } = useGoogleAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch({
      type: LOGIN_FAIL,
    });
    signOut();
    AuthHelper.removeAuth();
    navigate(HOME);
  };

  return (
    <Box sx={{ flexGrow: 1, px: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
            {!isLoggedIn ? (
              <Button
                key="home"
                href={HOME}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
            ) : (
              <>
                <Button
                  key="companies"
                  href={COMPANIES_PARAMS}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Companies
                </Button>

                <Button
                  key="dragdrop"
                  href={DRAG_DROP}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Drag&Drop
                </Button>

                <Button
                  key="moreless"
                  href={MORE_LESS}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  More/Less
                </Button>
              </>
            )}
          </Box>

          {isLoggedIn && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuAppBar;
