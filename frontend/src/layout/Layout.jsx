import React from "react";
import Header from "../components/Header/Header";
import Routes from "../routes/Routes";
import Footer from "../components/Footer/Footer";
import Admin from "../pages/Admin";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
