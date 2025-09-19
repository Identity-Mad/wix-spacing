import React from "react";
import { Monitor, Tablet, Smartphone, Ruler } from "lucide-react";
import { TabKey } from "../types";

interface TabNavigationProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      <button
        onClick={() => setActiveTab("desktop")}
        className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
          activeTab === "desktop"
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        <Monitor size={16} />
        Desktop
      </button>
      <button
        onClick={() => setActiveTab("tablet")}
        className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
          activeTab === "tablet"
            ? "border-green-600 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        <Tablet size={16} />
        Tablet
      </button>
      <button
        onClick={() => setActiveTab("mobile")}
        className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
          activeTab === "mobile"
            ? "border-purple-600 text-purple-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        <Smartphone size={16} />
        Mobile
      </button>
      <button
        onClick={() => setActiveTab("table")}
        className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
          activeTab === "table"
            ? "border-gray-600 text-gray-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        <Ruler size={16} />
        Reference Table
      </button>
    </div>
  );
};
