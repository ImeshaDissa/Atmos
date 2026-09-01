import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard";
import LoginButton from "./components/LoginButton";
import { ThemeProvider } from "./context/ThemeContext";
import logImg from "./assets/logImg.jpg";
import atmosLogo from "./assets/atmos.svg";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return;
    <div className="flex h-screen items-center justify-center text-slate-400">
      Loading...
    </div>;
  }
  return (
    <ThemeProvider>
      {" "}
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <div
          className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-950 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.72)), url(${logImg})`,
          }}
        >
          <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-8 text-center shadow-2xl backdrop-blur-sm">
            <img src={atmosLogo} alt="Atmos logo" className="mx-auto mb-4 h-16 w-16" />
            <h1 className="text-3xl font-bold text-white">Atmos - The Comfort Index</h1>
            <p className="mt-3 text-slate-200">Please log in to view the dashboard.</p>
            <div className="mt-6 flex justify-center">
              <LoginButton />
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
export default App;
