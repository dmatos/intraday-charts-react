import React from 'react';
import {AppProvider} from "./shared/context/AppContext";
import {ChartsPage} from "./pages/ChartsPage";
import {ThemeProvider} from "@mui/material";
import {DarkTheme} from "./shared/themes";

const App:React.FC = () => {
    let children = undefined;
    return (
        <ThemeProvider theme={DarkTheme}>
            <AppProvider>
                <ChartsPage>
                    {children}
                </ChartsPage>
            </AppProvider>
        </ThemeProvider>
    );
}
export default App;
