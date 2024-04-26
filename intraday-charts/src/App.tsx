import React from 'react';
import {AppProvider} from "./shared/context/AppContext";
import {ChartsPage} from "./pages/ChartsPage";
import {ThemeProvider} from "@mui/material";
import {DarkTheme} from "./shared/themes";
import {NotificationProvider} from "./shared/context/NotificationContext";
import {IndicatorProvider} from "./shared/context/IndicatorContext";
import {ConfigProvider} from './shared/context/ConfigContext';

const App:React.FC = () => {
    let children = undefined;
    return (
        <ThemeProvider theme={DarkTheme}>
            <AppProvider>
                <NotificationProvider>
                    <IndicatorProvider>
                        <ConfigProvider>
                                <ChartsPage>
                                    {children}
                                </ChartsPage>
                        </ConfigProvider>
                    </IndicatorProvider>
                </NotificationProvider>
            </AppProvider>
        </ThemeProvider>
    );
}
export default App;
