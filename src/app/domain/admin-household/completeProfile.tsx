import React, { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import DataTable from "../../shared/components/table/DataTable";

const Complete: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="complete-page">
      <h1>Complete Profile</h1>
      <p>This is the complete profile page.</p>
     
      <DataTable />
      <Outlet />
    </div>
  );
};

export default Complete;
