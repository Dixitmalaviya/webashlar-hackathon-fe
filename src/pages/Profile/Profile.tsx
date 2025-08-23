import { useState } from "react";
import Timeline from "../../shared/components/Timeline/Timeline";
import PatientCard from "../../shared/components/PatientCard/PatientCard";
import PatientReport from "../PatientReport";

const logo = "/logo.png";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("reports");

  const timelineData = [
    {
      year: "2025",
      events: [
        {
          title: "Title ",
          date: "05 Feb 2025",
          description: "1st title",
          icon: "📅", // You can use any icon here
          color: "yellow-400",
        },
      ],
    },
    {
      year: "2024",
      events: [
        {
          title: "Title ",
          date: "05 Feb 2025",
          description: "1st title",
          icon: "📅", // You can use any icon here
          color: "yellow-400",
        },
        {
          title: "Title ",
          date: "05 Feb 2025",
          description: "1st title",
          icon: "📅", // You can use any icon here
          color: "yellow-400",
        },
        {
          title: "Title ",
          date: "05 Feb 2025",
          description: "1st title",
          icon: "📅", // You can use any icon here
          color: "yellow-400",
        },
      ],
    },
  ];

  const patientData = {
          name:"John Doe",
          uniqueNumber:"12345",
          address:"123 Main St, Springfield",
          bloodGroup: "O+",
          dob: "01/01/2000"  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6">
      <div className=" mt-10 p-5 bg-white shadow-md rounded-lg">
        <PatientCard
            patientData = {patientData}
          logo={logo}
        />

        {/* Tabs Section */}
        <div className="flex space-x-6 border-b mx-auto justify-center">
          <button
            onClick={() => handleTabClick("reports")}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "reports"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => handleTabClick("timeline")}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "timeline"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Timeline
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-5">
          {activeTab === "reports" && (
            <div>
              {/* <h3 className="text-lg font-medium">Reports Content</h3> */}
              {/* <p className="text-gray-600">Here is the report data.</p> */}
              <PatientReport></PatientReport>
            </div>
          )}
          {activeTab === "timeline" && (
            <div>
              <Timeline timelineData={timelineData}></Timeline>
              {/* <p className="text-gray-600">
              Timeline data can be shown here. 
            </p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
