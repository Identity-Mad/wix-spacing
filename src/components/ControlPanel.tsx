import React from "react";
import { Ruler, Type, Settings } from "lucide-react";
import {
  SpacingValues,
  TypographySettings,
  BreakpointKey,
  ControlTabKey,
} from "../types";
import { SpacingControls } from "./SpacingControls";
import { TypographyControls } from "./TypographyControls";
import { SettingsControls } from "./SettingsControls";

interface ControlPanelProps {
  spacing: SpacingValues;
  typography: TypographySettings;
  controlTab: ControlTabKey;
  setControlTab: (tab: ControlTabKey) => void;
  updateSpacing: (
    breakpoint: BreakpointKey,
    key: string,
    value: number
  ) => void;
  updateTypography: (key: keyof TypographySettings, value: string) => void;
  updateTypographyNumber: (
    key: keyof TypographySettings,
    value: number
  ) => void;
  resetToDefaults: () => void;
  exportSettings: () => void;
  importSettings: (file: File) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  spacing,
  typography,
  controlTab,
  setControlTab,
  updateSpacing,
  updateTypography,
  updateTypographyNumber,
  resetToDefaults,
  exportSettings,
  importSettings,
}) => {
  return (
    <div className="xl:col-span-1 bg-white rounded-lg shadow-lg p-6">
      {/* Control Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setControlTab("spacing")}
          className={`flex items-center justify-center px-3 py-2 font-medium text-sm border-b-2 transition-colors ${
            controlTab === "spacing"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          title="Spacing"
        >
          <Ruler size={16} />
        </button>
        <button
          onClick={() => setControlTab("typography")}
          className={`flex items-center justify-center px-3 py-2 font-medium text-sm border-b-2 transition-colors ${
            controlTab === "typography"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          title="Typography"
        >
          <Type size={16} />
        </button>
        <button
          onClick={() => setControlTab("settings")}
          className={`flex items-center justify-center px-3 py-2 font-medium text-sm border-b-2 transition-colors ${
            controlTab === "settings"
              ? "border-gray-600 text-gray-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          title="Settings"
        >
          <Settings size={16} />
        </button>
      </div>

      {/* Tab Content */}
      {controlTab === "spacing" && (
        <SpacingControls spacing={spacing} updateSpacing={updateSpacing} />
      )}

      {controlTab === "typography" && (
        <TypographyControls
          typography={typography}
          updateTypography={updateTypography}
          updateTypographyNumber={updateTypographyNumber}
        />
      )}

      {controlTab === "settings" && (
        <SettingsControls
          resetToDefaults={resetToDefaults}
          exportSettings={exportSettings}
          importSettings={importSettings}
        />
      )}
    </div>
  );
};
