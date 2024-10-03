import Dashboard from "@/features/admin/dashboard/Dashboard";
import LayoutAdmin from "@/layouts/LayoutAdmin";

export default function Admin() {
  return (
    <LayoutAdmin pageTitle="Dashboard">
      <h1>Dashboard</h1>
      <Dashboard />
    </LayoutAdmin>
  );
}
