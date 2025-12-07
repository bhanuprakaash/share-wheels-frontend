import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {store} from "./store.ts";
import { Toaster } from 'react-hot-toast';


import queryClient from "../shared/api/tanstackQueryClient.ts";
import AuthWrapper from "../shared/components/AuthWrapper.tsx";

interface ProviderProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({children}) => {
    return (
        <Router>
            <ReduxProvider store={store}>
                <QueryClientProvider client={queryClient}>
                    <AuthWrapper>
                        {children}
                    </AuthWrapper>
                    <Toaster position="bottom-right" />
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </ReduxProvider>
        </Router>
    )
};

export default Providers;