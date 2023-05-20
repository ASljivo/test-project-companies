import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import MoreLess from "../pages/MoreLess";
import DragDrop from "../pages/DragDrop";
import CompanyList from "../pages/CompanyList";
import CompanyDetails from "../pages/CompanyDeatils";
import CompanyCreate from "../pages/CompanyCreate";
import CompanyUpdate from "../pages/CompanyUpdate";
import Header from "../components/Header";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="companies" element={<CompanyList />} />
        <Route
          path="companies/details/:companyId"
          element={<CompanyDetails />}
        />
        <Route path="companies/update/:companyId" element={<CompanyUpdate />} />
        <Route path="companies/create" element={<CompanyCreate />} />
        <Route path="dragdrop" element={<DragDrop />} />
        <Route path="moreless" element={<MoreLess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
