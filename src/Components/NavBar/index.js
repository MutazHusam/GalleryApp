import { AppBar, IconButton, Toolbar} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledTypography,
} from "./style";
import SearchIcon from "@mui/icons-material/Search";
import CameraIcon from "@mui/icons-material/Camera";
export default function SearchAppBar({ handleChange }) {
  return (
    <AppBar position="static" sx={{ background: "#303030" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <CameraIcon fontSize="large" />
        </IconButton>
        <StyledTypography
          fontSize="30px"
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Gallery
        </StyledTypography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
