import { useState } from "react";
import { Ruler, Monitor, Tablet, Smartphone } from "lucide-react";
import { BreakpointKey, TabKey, ControlTabKey } from "./types";
import { useSettings } from "./hooks/useSettings";
import { ControlPanel } from "./components/ControlPanel";
import { TabNavigation } from "./components/TabNavigation";
import { PreviewSection } from "./components/PreviewSection";
import { ReferenceTable } from "./components/ReferenceTable";

function App() {
  const {
    spacing,
    typography,
    layout,
    setSpacing,
    setTypography,
    setLayout,
    resetToDefaults,
    exportSettings,
    importSettings,
  } = useSettings();

  const [activeTab, setActiveTab] = useState<TabKey>("desktop");
  const [controlTab, setControlTab] = useState<ControlTabKey>("spacing");

  // Fallback if typography is not properly structured
  if (
    !typography ||
    !typography.desktop ||
    !typography.tablet ||
    !typography.mobile
  ) {
    resetToDefaults();
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">Initializing typography settings...</p>
        </div>
      </div>
    );
  }

  const updateSpacing = (
    breakpoint: BreakpointKey,
    key: string,
    value: number
  ) => {
    setSpacing((prev) => ({
      ...prev,
      [breakpoint]: {
        ...prev[breakpoint],
        [key]: value,
      },
    }));
  };

  const updateTypography = (
    breakpoint: keyof typeof typography,
    key: keyof typeof typography.desktop,
    value: string | number
  ) => {
    setTypography((prev) => ({
      ...prev,
      [breakpoint]: {
        ...prev[breakpoint],
        [key]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Ruler className="text-blue-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">
                Wix Spacing Simulator
              </h1>
            </div>
            <p className="text-gray-600">
              8pt Grid System - Interactive Preview & Control
            </p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <ControlPanel
              spacing={spacing}
              typography={typography}
              layout={layout}
              controlTab={controlTab}
              setControlTab={setControlTab}
              updateSpacing={updateSpacing}
              updateTypography={updateTypography}
              setLayout={setLayout}
              resetToDefaults={resetToDefaults}
              exportSettings={exportSettings}
              importSettings={importSettings}
            />

            {/* Tabbed Preview */}
            {activeTab === "table" ? (
              <div className="xl:col-span-3">
                <TabNavigation
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <ReferenceTable spacing={spacing} typography={typography} />
              </div>
            ) : (
              <div
                className="xl:col-span-3 overflow-hidden"
                style={{
                  height:
                    layout.previewHeight === "auto"
                      ? "calc(100vh - 8rem)"
                      : `${layout.previewHeight}px`,
                }}
              >
                <TabNavigation
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                {/* Tab Content - Lazy Loaded for Performance */}
                <div className="h-full overflow-y-auto">
                  {activeTab === "desktop" && (
                    <PreviewSection
                      title="Desktop Preview (1000px+)"
                      breakpoint="desktop"
                      icon={<Monitor size={20} className="text-blue-600" />}
                      spacing={spacing.desktop}
                      typography={typography.desktop}
                      layout={layout}
                    />
                  )}
                  {activeTab === "tablet" && (
                    <PreviewSection
                      title="Tablet Preview (≤1000px)"
                      breakpoint="tablet"
                      icon={<Tablet size={20} className="text-green-600" />}
                      spacing={spacing.tablet}
                      typography={typography.tablet}
                      layout={layout}
                    />
                  )}
                  {activeTab === "mobile" && (
                    <PreviewSection
                      title="Mobile Preview (≤750px)"
                      breakpoint="mobile"
                      icon={
                        <Smartphone size={20} className="text-purple-600" />
                      }
                      spacing={spacing.mobile}
                      typography={typography.mobile}
                      layout={layout}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
