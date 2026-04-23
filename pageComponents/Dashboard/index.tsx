import React from "react";
import DashboardMain from "./DashboardMain";
import { useUserStore } from "@/store";
import useGetAllRoles from "@/hooks/role/useGetAllRoles";
import { USER_ROLES } from "@/constants/constants";
import AdminDashboard from "./AdminDashboard";

function DashboardPage() {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: allRoles } = useGetAllRoles();
  const userRole = allRoles?.find((role) => role.id === user.role_id);
  const isAdministrator = userRole?.name === USER_ROLES.ADMINISTRATOR;

  return <>{isAdministrator ? <AdminDashboard /> : <DashboardMain />}</>;
}

export default DashboardPage;
