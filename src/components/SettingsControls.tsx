import React, { useRef } from "react";
import { Download, Upload, Monitor, Maximize2, Ruler } from "lucide-react";
import { LayoutSettings } from "../types";

interface SettingsControlsProps {
  layout: LayoutSettings;
  setLayout: (
    layout: LayoutSettings | ((prev: LayoutSettings) => LayoutSettings)
  ) => void;
  resetToDefaults: () => void;
  exportSettings: () => void;
  importSettings: (file: File) => void;
}

export const SettingsControls: React.FC<SettingsControlsProps> = ({
  layout,
  setLayout,
  resetToDefaults,
  exportSettings,
  importSettings,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importSettings(file);
      // Reset the input so the same file can be selected again
      event.target.value = "";
    }
  };
  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-50 rounded border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
          <Monitor size={16} />
          Layout Settings
        </h4>
        <p className="text-sm text-gray-700 mb-3">
          Customize the workspace layout to fit your preferences.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preview Height
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="400"
              max="1200"
              step="10"
              value={
                layout.previewHeight === "auto" ? 1200 : layout.previewHeight
              }
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value === 1200) {
                  setLayout((prev) => ({
                    ...prev,
                    previewHeight: "auto",
                  }));
                } else {
                  setLayout((prev) => ({
                    ...prev,
                    previewHeight: value,
                  }));
                }
              }}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-16 text-center">
              {layout.previewHeight === "auto"
                ? "Auto"
                : `${layout.previewHeight}px`}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Adjust preview area height. Set to max for auto height (matches
            control panel)
          </p>
        </div>
      </div>

      <div className="p-3 bg-orange-50 rounded border border-orange-200">
        <h4 className="font-medium text-orange-800 mb-2 flex items-center gap-2">
          <Ruler size={16} />
          Distance Measurement
        </h4>
        <p className="text-sm text-orange-700 mb-3">
          Toggle distance measurement overlay to see spacing between elements on
          hover.
        </p>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-orange-700">
            Enable Distance Measurement
          </label>
          <button
            onClick={() =>
              setLayout((prev) => ({
                ...prev,
                showDistanceMeasurement: !prev.showDistanceMeasurement,
              }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              layout.showDistanceMeasurement ? "bg-orange-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                layout.showDistanceMeasurement
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-orange-600 mt-1">
          {layout.showDistanceMeasurement
            ? "Distance measurement is active - hover over elements to see measurements"
            : "Click to enable distance measurement overlay"}
        </p>
      </div>

      <div className="p-3 bg-green-50 rounded border border-green-200">
        <h4 className="font-medium text-green-800 mb-2">
          Export Configuration
        </h4>
        <p className="text-sm text-green-700 mb-3">
          Download your current spacing and typography settings as a JSON file.
        </p>
        <button
          onClick={exportSettings}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          <Download size={16} />
          Download Settings
        </button>
      </div>

      <div className="p-3 bg-purple-50 rounded border border-purple-200">
        <h4 className="font-medium text-purple-800 mb-2">
          Import Configuration
        </h4>
        <p className="text-sm text-purple-700 mb-3">
          Upload a previously exported settings file to restore your
          configuration.
        </p>
        <button
          onClick={handleImportClick}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          <Upload size={16} />
          Import Settings
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="p-3 bg-blue-50 rounded border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">Reset Configuration</h4>
        <p className="text-sm text-blue-700 mb-3">
          Restore all spacing and typography settings to their default values.
        </p>
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};
