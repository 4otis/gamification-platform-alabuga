import React from "react";
import { AppRouter } from "./router/router";
import { AppProvider } from "./providers/app-providers";

function App() {
    return(
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}

export default App;