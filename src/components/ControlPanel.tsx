import React, { memo } from "react";
import { Ruler, Type, Settings } from "lucide-react";
import {
  SpacingValues,
  TypographySettings,
  LayoutSettings,
  BreakpointKey,
  ControlTabKey,
} from "../types";
import { SpacingControls } from "./SpacingControls";
import { TypographyControls } from "./TypographyControls";
import { SettingsControls } from "./SettingsControls";

interface ControlPanelProps {
  spacing: SpacingValues;
  typography: TypographySettings;
  layout: LayoutSettings;
  controlTab: ControlTabKey;
  setControlTab: (tab: ControlTabKey) => void;
  updateSpacing: (
    breakpoint: BreakpointKey,
    key: string,
    value: number
  ) => void;
  updateTypography: (
    breakpoint: keyof TypographySettings,
    key: keyof TypographySettings["desktop"],
    value: string | number
  ) => void;
  setLayout: (
    layout: LayoutSettings | ((prev: LayoutSettings) => LayoutSettings)
  ) => void;
  resetToDefaults: () => void;
  exportSettings: () => void;
  importSettings: (file: File) => void;
}

const ControlPanelComponent: React.FC<ControlPanelProps> = ({
  spacing,
  typography,
  layout,
  controlTab,
  setControlTab,
  updateSpacing,
  updateTypography,
  setLayout,
  resetToDefaults,
  exportSettings,
  importSettings,
}) => {
  return (
    <div className="xl:col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col h-[calc(100vh-8rem)]">
      {/* Control Tabs */}
      <div className="flex border-b border-gray-200 mb-4 flex-shrink-0">
        <button
          onClick={() => setControlTab("spacing")}
          className={`flex items-center justify-center px-3 py-2 font-medium text-sm border-b-2 transition-colors cursor-pointer ${
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
          className={`flex items-center justify-center px-3 py-2 font-medium text-sm border-b-2 transition-colors cursor-pointer ${
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
          className={`flex items-center justify-center px-3 py-2 font-medium text-sm border-b-2 transition-colors cursor-pointer ${
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
      <div className="flex-1 overflow-y-auto">
        {controlTab === "spacing" && (
          <SpacingControls spacing={spacing} updateSpacing={updateSpacing} />
        )}

        {controlTab === "typography" && (
          <TypographyControls
            typography={typography}
            updateTypography={updateTypography}
          />
        )}

        {controlTab === "settings" && (
          <SettingsControls
            layout={layout}
            setLayout={setLayout}
            resetToDefaults={resetToDefaults}
            exportSettings={exportSettings}
            importSettings={importSettings}
          />
        )}
      </div>
    </div>
  );
};

// Memoized export for performance optimization
export const ControlPanel = memo(
  ControlPanelComponent,
  (prevProps, nextProps) => {
    // Only re-render if relevant props actually changed
    return (
      prevProps.controlTab === nextProps.controlTab &&
      prevProps.spacing === nextProps.spacing &&
      prevProps.typography === nextProps.typography &&
      prevProps.layout === nextProps.layout
    );
  }
);
