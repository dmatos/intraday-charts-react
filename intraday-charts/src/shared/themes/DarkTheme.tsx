import {createTheme} from "@mui/material";
import {yellow} from "@mui/material/colors";

export const DarkTheme = createTheme(
    {
        palette: {
            mode: 'dark',
            primary: {
                main: yellow[700],
                dark: yellow[800],
                light: yellow[500],
                contrastText: "#ffffff",
            },
            secondary: {
                main: yellow[500],
                dark: yellow[400],
                light: yellow[300],
                contrastText: "#ffffff",
            },
            background: {
                default: "rgb(31,31,31)",
                paper: "rgb(51,51,51)",
            }
        },
        typography: {
            allVariants: {
                color: "white",
                fontFamily: "Lato",
                fontSize: "10px"
            },
        },
    },

);
