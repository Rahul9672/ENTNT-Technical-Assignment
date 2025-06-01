import KPICards from "../components/Dashboard/KPICards";
import HighlightText from "../components/core/HighlightText";
import Charts from "../components/Dashboard/Charts";

const DashboardPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        <HighlightText text="Dashboard" />
      </h1>
      <KPICards />
      <div className="mt-6">
        <Charts />
      </div>
    </div>
  );
};

export default DashboardPage;
