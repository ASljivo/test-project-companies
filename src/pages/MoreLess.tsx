import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { BGBox } from "../styles";

const MoreLess: FC = () => {
  const [showMore, setShowMore] = useState(false);
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const handleText = (): string => {
    return showMore ? text : `${text.substring(0, 200)}`;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={BGBox}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <Typography variant="h5" sx={{ my: 4 }}>
              More/Less example
            </Typography>
          </div>
          <div>
            <Typography sx={{ px: 8 }}>
              {handleText()}
              <Button variant="text" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show less" : "Show more"}
              </Button>
            </Typography>
          </div>
        </Grid>
      </Box>
    </Container>
  );
};

export default MoreLess;
