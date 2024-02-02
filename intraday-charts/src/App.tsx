import React from 'react';
import './App.css';
import {AppProvider} from "./AppContext";
import AppHeaderContainer from "./header/AppHeaderContainer";

const App:React.FC = () => {
    return (
        <div className="App">
            <header>
                <AppProvider>
                    <AppHeaderContainer/>
                </AppProvider>
            </header>
            <main>
                <h1>AppMain</h1>
            </main>
        </div>
    );
}

export default App;
