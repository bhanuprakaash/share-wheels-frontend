import Providers from "./Providers.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import '../shared/styles/App.css'

function App() {

    return (
        <Providers>
            <AppRoutes/>
        </Providers>
    )
}

export default App
