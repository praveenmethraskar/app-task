import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";

interface DashboardProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const countries = [
  { name: "India", code: "IN" },
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "Pakistan", code: "PK" },
  { name: "Afganistan", code: "AF" },
  { name: "Australia", code: "AU"}
];

const Dashboard: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>("IN");
  const [states, setStates] = useState<string[]>([]); // ✅ Update to string[]

  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://rawcdn.githack.com/kamikazechaser/administrative-divisions-db/master/api/${selectedCountry}.json`
      )
        .then((res) => res.json())
        .then((data) => {
          // ✅ Check and handle both formats: array or object
          console.log(data)
          if (Array.isArray(data)) {
            setStates(data);
          } else if (Array.isArray(data.states)) {
            setStates(data.states);
          } else if (typeof data.states === "object") {
            setStates(Object.values(data.states));
          } else {
            setStates([]);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch states:", err);
          setStates([]);
        });
    }
  }, [selectedCountry]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 text-white bg-gray-900">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <img
              src="https://tailwindflex.com/images/logo.svg"
              alt="Logo"
              className="w-auto h-8"
            />
            <span className="text-xl font-bold">Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 mt-5">
          <div className="space-y-4">
            <SidebarLink label="Dashboard" active iconPath="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
           {/* <SidebarLink label="List Franchise" iconPath="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            <SidebarLink label="List Member" iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          */}</div>
        </nav>

        {/* Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-6 py-3 font-bold text-white bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <div className="p-6 mt-4 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Welcome</h2>

          {/* Country Dropdown */}
          <div className="mb-4">
            <label className="block mb-2 text-lg font-semibold">
              Select Country
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Display States */}

 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
  {states.map((stateName) => (
    <div
      key={stateName}
      className="max-w-sm p-6 transition duration-300 transform bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-105 hover:shadow-xl hover:-translate-y-1"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {stateName}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        This is a state in {selectedCountry}.
      </p>
    </div>
  ))}
</div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
