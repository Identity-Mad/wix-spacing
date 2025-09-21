import React, { useRef } from "react";
import { Download, Upload, Monitor, Maximize2 } from "lucide-react";
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
              max="800"
              step="10"
              value={layout.previewHeight}
              onChange={(e) =>
                setLayout((prev) => ({
                  ...prev,
                  previewHeight: parseInt(e.target.value),
                }))
              }
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-12 text-center">
              {layout.previewHeight}px
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Adjust preview area height for better viewing
          </p>
        </div>
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
