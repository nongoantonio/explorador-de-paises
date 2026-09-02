// Ponto de entrada da aplicação: é aqui que o React "liga" o nosso
// componente <App /> ao elemento <div id="root"> que existe no index.html.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
