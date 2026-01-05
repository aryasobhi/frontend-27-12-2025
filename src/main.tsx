
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import { BrowserRouter } from 'react-router-dom';
  import "./index.css";
  import { Toaster } from 'sonner';
  import { AuthProvider } from './context/AuthContext';
  import LoadingBar from './components/LoadingBar';

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <AuthProvider>
        <LoadingBar />
        <App />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
  
