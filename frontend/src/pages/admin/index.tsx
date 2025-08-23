import { ChartAreaInteractive } from "@/features/admin/components/chart-area-interactive";
import { DataTable } from "@/features/admin/components/data-table";
import { SectionCards } from "@/features/admin/components/section-cards";
import data from "@/data/data.json";

const AdminDashboard = () => {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
};

export default AdminDashboard;
