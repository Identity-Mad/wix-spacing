import React, { memo } from "react";
import { SpacingValues, BreakpointKey } from "../types";
import { spacingLabels } from "../constants";
import { ArrowUpDown, ArrowLeftRight } from "lucide-react";

interface SpacingControlsProps {
  spacing: SpacingValues;
  updateSpacing: (
    breakpoint: BreakpointKey,
    key: string,
    value: number
  ) => void;
}

const SpacingControlsComponent: React.FC<SpacingControlsProps> = ({
  spacing,
  updateSpacing,
}) => {
  // Define spacing pairs for grouped controls
  const spacingPairs = [
    {
      title: "Page Padding",
      vertical: "pagePaddingTopBottom",
      horizontal: "pagePaddingLeftRight",
    },
    {
      title: "Section Padding",
      vertical: "sectionPaddingTopBottom",
      horizontal: "sectionPaddingLeftRight",
    },
  ];

  // Define grid gap pairs
  const gridPairs = [
    {
      title: "2-Column Gap",
      horizontal: "gridGap2ColHorizontal",
      vertical: "gridGap2ColVertical",
    },
    {
      title: "3-Column Gap",
      horizontal: "gridGap3ColHorizontal",
      vertical: "gridGap3ColVertical",
    },
    {
      title: "4-Column Gap",
      horizontal: "gridGap4ColHorizontal",
      vertical: "gridGap4ColVertical",
    },
  ];

  // Single controls (no pairs) - arranged in the specified order
  const singleControls = [
    "majorSections",
    "subsections",
    "h1ToContent",
    "h2ToNext",
    "h3ToContent",
    "subtitleToH2",
    "aboveButtons",
    "bulletPoints",
    "singleColumnMaxWidth",
  ];

  const renderSpacingPair = (pair: (typeof spacingPairs)[0]) => (
    <div key={pair.title} className="border-b border-gray-100 pb-3">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {pair.title}
      </label>

      {/* Compact table layout with narrow icon column */}
      <div className="text-xs">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 mb-2">
          <div></div>
          <div className="text-center text-gray-500 font-medium">Desktop</div>
          <div className="text-center text-gray-500 font-medium">Tablet</div>
          <div className="text-center text-gray-500 font-medium">Mobile</div>
        </div>

        {/* Left/Right row */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 mb-2">
          <div className="flex items-center justify-center w-6">
            <ArrowLeftRight size={14} className="text-gray-500" />
          </div>
          <input
            type="number"
            step="8"
            value={
              spacing.desktop[pair.horizontal as keyof typeof spacing.desktop]
            }
            onChange={(e) =>
              updateSpacing(
                "desktop",
                pair.horizontal,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.desktop[pair.horizontal as keyof typeof spacing.desktop] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
          <input
            type="number"
            step="8"
            value={
              spacing.tablet[pair.horizontal as keyof typeof spacing.tablet]
            }
            onChange={(e) =>
              updateSpacing(
                "tablet",
                pair.horizontal,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.tablet[pair.horizontal as keyof typeof spacing.tablet] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
          <input
            type="number"
            step="8"
            value={
              spacing.mobile[pair.horizontal as keyof typeof spacing.mobile]
            }
            onChange={(e) =>
              updateSpacing(
                "mobile",
                pair.horizontal,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.mobile[pair.horizontal as keyof typeof spacing.mobile] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
        </div>

        {/* Top/Bottom row */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2">
          <div className="flex items-center justify-center w-6">
            <ArrowUpDown size={14} className="text-gray-500" />
          </div>
          <input
            type="number"
            step="8"
            value={
              spacing.desktop[pair.vertical as keyof typeof spacing.desktop]
            }
            onChange={(e) =>
              updateSpacing(
                "desktop",
                pair.vertical,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.desktop[pair.vertical as keyof typeof spacing.desktop] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
          <input
            type="number"
            step="8"
            value={spacing.tablet[pair.vertical as keyof typeof spacing.tablet]}
            onChange={(e) =>
              updateSpacing(
                "tablet",
                pair.vertical,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.tablet[pair.vertical as keyof typeof spacing.tablet] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
          <input
            type="number"
            step="8"
            value={spacing.mobile[pair.vertical as keyof typeof spacing.mobile]}
            onChange={(e) =>
              updateSpacing(
                "mobile",
                pair.vertical,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.mobile[pair.vertical as keyof typeof spacing.mobile] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
        </div>
      </div>
    </div>
  );

  const renderGridPair = (pair: (typeof gridPairs)[0]) => (
    <div key={pair.title} className="border-b border-gray-100 pb-3">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {pair.title}
      </label>

      {/* Compact table layout with narrow icon column */}
      <div className="text-xs">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 mb-2">
          <div></div>
          <div className="text-center text-gray-500 font-medium">Desktop</div>
          <div className="text-center text-gray-500 font-medium">Tablet</div>
          <div className="text-center text-gray-500 font-medium">Mobile</div>
        </div>

        {/* Horizontal row */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 mb-2">
          <div className="flex items-center justify-center w-6">
            <ArrowLeftRight size={14} className="text-gray-500" />
          </div>
          <input
            type="number"
            step="8"
            value={
              spacing.desktop[pair.horizontal as keyof typeof spacing.desktop]
            }
            onChange={(e) =>
              updateSpacing(
                "desktop",
                pair.horizontal,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.desktop[pair.horizontal as keyof typeof spacing.desktop] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
          <input
            type="number"
            step="8"
            value={
              spacing.tablet[pair.horizontal as keyof typeof spacing.tablet]
            }
            onChange={(e) =>
              updateSpacing(
                "tablet",
                pair.horizontal,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.tablet[pair.horizontal as keyof typeof spacing.tablet] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
          <input
            type="number"
            step="8"
            value={
              spacing.mobile[pair.horizontal as keyof typeof spacing.mobile]
            }
            onChange={(e) =>
              updateSpacing(
                "mobile",
                pair.horizontal,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.mobile[pair.horizontal as keyof typeof spacing.mobile] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
        </div>

        {/* Vertical row */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2">
          <div className="flex items-center justify-center w-6">
            <ArrowUpDown size={14} className="text-gray-500" />
          </div>
          <input
            type="number"
            step="8"
            value={
              spacing.desktop[pair.vertical as keyof typeof spacing.desktop]
            }
            onChange={(e) =>
              updateSpacing(
                "desktop",
                pair.vertical,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.desktop[pair.vertical as keyof typeof spacing.desktop] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
          <input
            type="number"
            step="8"
            value={spacing.tablet[pair.vertical as keyof typeof spacing.tablet]}
            onChange={(e) =>
              updateSpacing(
                "tablet",
                pair.vertical,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.tablet[pair.vertical as keyof typeof spacing.tablet] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
          <input
            type="number"
            step="8"
            value={spacing.mobile[pair.vertical as keyof typeof spacing.mobile]}
            onChange={(e) =>
              updateSpacing(
                "mobile",
                pair.vertical,
                parseInt(e.target.value) || 0
              )
            }
            className={`w-full px-2 py-1 border rounded text-center ${
              spacing.mobile[pair.vertical as keyof typeof spacing.mobile] %
                8 ===
              0
                ? "border-gray-300 bg-white"
                : "border-orange-400 bg-orange-50 text-orange-800"
            }`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Page Padding */}
      {spacingPairs.slice(0, 1).map(renderSpacingPair)}

      {/* Section Padding */}
      {spacingPairs.slice(1, 2).map(renderSpacingPair)}

      {/* Single Controls */}
      {singleControls.map((key) => (
        <div key={key} className="border-b border-gray-100 pb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {spacingLabels[key as keyof typeof spacingLabels]}
          </label>
          <div
            className={`grid gap-2 text-xs ${
              key === "singleColumnMaxWidth" ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            <div>
              <label className="block text-gray-500 mb-1">Desktop</label>
              <input
                type="number"
                step={key === "singleColumnMaxWidth" ? "10" : "8"}
                value={spacing.desktop[key as keyof typeof spacing.desktop]}
                onChange={(e) =>
                  updateSpacing("desktop", key, parseInt(e.target.value) || 0)
                }
                className={`w-full px-2 py-1 border rounded text-center ${
                  key === "singleColumnMaxWidth"
                    ? spacing.desktop[key as keyof typeof spacing.desktop] %
                        10 ===
                      0
                      ? "border-gray-300 bg-white"
                      : "border-orange-400 bg-orange-50 text-orange-800"
                    : spacing.desktop[key as keyof typeof spacing.desktop] %
                        8 ===
                      0
                    ? "border-gray-300 bg-white"
                    : "border-orange-400 bg-orange-50 text-orange-800"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Tablet</label>
              <input
                type="number"
                step={key === "singleColumnMaxWidth" ? "10" : "8"}
                value={spacing.tablet[key as keyof typeof spacing.tablet]}
                onChange={(e) =>
                  updateSpacing("tablet", key, parseInt(e.target.value) || 0)
                }
                className={`w-full px-2 py-1 border rounded text-center ${
                  key === "singleColumnMaxWidth"
                    ? spacing.tablet[key as keyof typeof spacing.tablet] %
                        10 ===
                      0
                      ? "border-gray-300 bg-white"
                      : "border-orange-400 bg-orange-50 text-orange-800"
                    : spacing.tablet[key as keyof typeof spacing.tablet] % 8 ===
                      0
                    ? "border-gray-300 bg-white"
                    : "border-orange-400 bg-orange-50 text-orange-800"
                }`}
              />
            </div>
            {key !== "singleColumnMaxWidth" && (
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
                />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Grid Pairs - all gaps */}
      {gridPairs.map(renderGridPair)}

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">Grid System</h3>
        <p className="text-sm text-blue-700 mb-3">
          Most spacing values are based on 8-pixel increments for consistent
          visual rhythm and alignment. Single column max width uses 10-pixel
          increments.
        </p>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-600">
            <span className="inline-block w-3 h-3 bg-orange-50 border border-orange-400 rounded mr-1"></span>
            Orange highlight = breaks grid system (8pt or 10pt)
          </p>
        </div>
      </div>
    </div>
  );
};

// Memoized export for performance optimization
export const SpacingControls = memo(
  SpacingControlsComponent,
  (prevProps, nextProps) => {
    return prevProps.spacing === nextProps.spacing;
  }
);
