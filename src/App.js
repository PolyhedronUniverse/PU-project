import React from "react";
import "./index.css";
import Home from "./pages/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import LoadingScreen from "./components/loading-screen/loadingScreen";

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Home />
    </>
  );
}
