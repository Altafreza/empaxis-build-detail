import React, { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";
import ColorizeIcon from "@mui/icons-material/Colorize";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  CssBaseline,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  alpha,
  createTheme,
  styled,
  ThemeProvider,
} from "@mui/material/styles";
import { SketchPicker } from "react-color";
import Table from "../BuildDetailTable/Table";
import { Container } from "@mui/system";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleClick = (type) => {
    setDisplayColorPicker(type);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const [colors, setColors] = useState({
    primaryColor: "#1976d2",
    secondaryColor: "#dc004e",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: colors.primaryColor,
      },
      secondary: {
        main: colors.secondaryColor,
      },
    },
  });
  const handleModeChange = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleColorChange = (color) => {
    setColors({ ...colors, [displayColorPicker]: color.hex });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                A-Test
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box textAlign="end">
                {/* m="45px 0px"  */}
                <ButtonGroup size="small" aria-label="small button group">
                  <Tooltip placement="top" title="Primary Color" arrow>
                    <Button
                      endIcon={
                        <ColorizeIcon
                          sx={{
                            m: displayColorPicker
                              ? "inherit"
                              : "0px 8px 0px 0px",
                          }}
                        />
                      }
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => handleClick("primaryColor")}
                      style={{
                        borderRadius: displayColorPicker ? "" : "50%",
                        height: displayColorPicker ? "40px" : "40px",
                        width: displayColorPicker ? "" : "40px",
                      }}
                    >
                      {displayColorPicker ? "P" : ""}
                    </Button>
                  </Tooltip>

                  <Tooltip
                    placement="top"
                    title={`${theme.palette.mode} mode`}
                    arrow
                  >
                    <IconButton aria-label="delete" onClick={handleModeChange}>
                      {theme.palette.mode === "dark" ? (
                        <Brightness7Icon color="inherit" />
                      ) : (
                        <Brightness4Icon color="inherit" />
                      )}
                    </IconButton>
                  </Tooltip>

                  <Tooltip placement="top" title="Secondary Color" arrow>
                    <Button
                      endIcon={
                        <ColorizeIcon
                          sx={{
                            m: displayColorPicker
                              ? "inherit"
                              : "0px 8px 0px 0px",
                          }}
                        />
                      }
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => handleClick("secondaryColor")}
                      style={{
                        borderRadius: displayColorPicker ? "" : "50%",
                        height: displayColorPicker ? "40px" : "40px",
                        width: displayColorPicker ? "" : "40px",
                      }}
                    >
                      {displayColorPicker ? "S" : ""}
                    </Button>
                  </Tooltip>
                </ButtonGroup>
                {displayColorPicker && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: "20px",
                      zIndex: "2",
                      cursor: "pointer",
                    }}
                  >
                    <Tooltip
                      onClick={handleClose}
                      title="Close"
                      placement="top"
                      arrow
                    >
                      <IconButton
                        style={{
                          margin: theme.spacing(4, 0, 1, 0),
                          backgroundColor: "#d0d0d0b0",
                        }}
                      >
                        <CloseIcon color="inherit" />
                      </IconButton>
                    </Tooltip>
                    <SketchPicker
                      color={colors[displayColorPicker]}
                      onChange={handleColorChange}
                    />
                  </Box>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Box style={{ marginTop: "5rem" }}>
        <Table />
      </Box>
    </ThemeProvider>
  );
}
