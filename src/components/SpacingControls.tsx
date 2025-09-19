import React from "react";
import { SpacingValues, BreakpointKey } from "../types";
import { spacingLabels } from "../constants";

interface SpacingControlsProps {
  spacing: SpacingValues;
  updateSpacing: (
    breakpoint: BreakpointKey,
    key: string,
    value: number
  ) => void;
}

export const SpacingControls: React.FC<SpacingControlsProps> = ({
  spacing,
  updateSpacing,
}) => {
  return (
    <div className="space-y-4">
      {Object.entries(spacingLabels).map(([key, label]) => (
        <div key={key} className="border-b border-gray-100 pb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <label className="block text-gray-500 mb-1">Desktop</label>
              <input
                type="number"
                step="8"
                value={spacing.desktop[key as keyof typeof spacing.desktop]}
                onChange={(e) =>
                  updateSpacing("desktop", key, parseInt(e.target.value) || 0)
                }
                className={`w-full px-2 py-1 border rounded text-center ${
                  spacing.desktop[key as keyof typeof spacing.desktop] % 8 === 0
                    ? "border-gray-300 bg-white"
                    : "border-orange-400 bg-orange-50 text-orange-800"
                }`}
                disabled={key === "singleColumnMaxWidth"}
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Tablet</label>
              <input
                type="number"
                step="8"
                value={spacing.tablet[key as keyof typeof spacing.tablet]}
                onChange={(e) =>
                  updateSpacing("tablet", key, parseInt(e.target.value) || 0)
                }
                className={`w-full px-2 py-1 border rounded text-center ${
                  spacing.tablet[key as keyof typeof spacing.tablet] % 8 === 0
                    ? "border-gray-300 bg-white"
                    : "border-orange-400 bg-orange-50 text-orange-800"
                }`}
                disabled={key === "singleColumnMaxWidth"}
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Mobile</label>
              <input
                type="number"
                step="8"
                value={spacing.mobile[key as keyof typeof spacing.mobile]}
                onChange={(e) =>
                  updateSpacing("mobile", key, parseInt(e.target.value) || 0)
                }
                className={`w-full px-2 py-1 border rounded text-center ${
                  spacing.mobile[key as keyof typeof spacing.mobile] % 8 === 0
                    ? "border-gray-300 bg-white"
                    : "border-orange-400 bg-orange-50 text-orange-800"
                }`}
                disabled={key === "singleColumnMaxWidth"}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">8pt Grid System</h3>
        <p className="text-sm text-blue-700 mb-3">
          All spacing values are based on 8-pixel increments for consistent
          visual rhythm and alignment.
        </p>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-600">
            <span className="inline-block w-3 h-3 bg-orange-50 border border-orange-400 rounded mr-1"></span>
            Orange highlight = breaks 8pt grid
          </p>
        </div>
      </div>
    </div>
  );
};
