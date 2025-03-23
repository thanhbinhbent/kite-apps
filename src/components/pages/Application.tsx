import { useEffect, useState } from "react";
import { getMicroAppMetaData } from "../../../module-app.config";
import { Link } from "react-router";

type MicroAppMetaData = Awaited<ReturnType<typeof getMicroAppMetaData>>[0];

type CategorizedApps = Record<string, MicroAppMetaData[]>;

function Application() {
  const [categorizedApps, setCategorizedApps] = useState<CategorizedApps>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        const apps = await getMicroAppMetaData();
        console.log("Fetched micro apps:", apps); // Kiểm tra dữ liệu

        if (!Array.isArray(apps)) {
          throw new Error("Dữ liệu nhận được không phải là mảng");
        }

        const categorized: Record<string, MicroAppMetaData[]> = {};
        apps.forEach((app) => {
          if (!categorizedApps[app.category]) {
            categorizedApps[app.category] = [];
          }
          categorizedApps[app.category].push(app);
        });

        setCategorizedApps(categorized);
      } catch (err) {
        setError("Không thể tải danh sách ứng dụng.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {Object.entries(categorizedApps).map(([section, items]) => (
        <div key={section} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 pb-2 mb-2">
            {section}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((app) => (
              <Link to={app.id} key={app.id}>
                <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center shadow-sm bg-white hover:shadow-md transition">
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="w-16 h-16 mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-900">
                    {app.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Application;
