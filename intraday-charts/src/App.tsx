import React from 'react';
import {AppProvider} from "./shared/context/AppContext";
import {ChartsPage} from "./pages/ChartsPage";
import {ThemeProvider} from "@mui/material";
import {DarkTheme} from "./shared/themes";

const App:React.FC = () => {
    return (
            <ThemeProvider theme={DarkTheme}>
                <AppProvider>
                    <ChartsPage/>
                </AppProvider>
            </ThemeProvider>
    );
}
export default App;
