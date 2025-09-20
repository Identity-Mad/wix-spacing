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

  // Single controls (no pairs)
  const singleControls = [
    "majorSections",
    "h1ToContent",
    "subsections",
    "subtitleToH2",
    "h2ToNext",
    "aboveButtons",
    "h3ToContent",
    "bulletPoints",
    "paragraphSpacing",
    "singleColumnMaxWidth",
  ];

  const renderSpacingPair = (pair: (typeof spacingPairs)[0]) => (
    <div key={pair.title} className="border-b border-gray-100 pb-3">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {pair.title}
      </label>

      {/* Vertical (T/B) */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUpDown size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">Top/Bottom</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <label className="block text-gray-400 mb-1">Desktop</label>
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
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Tablet</label>
            <input
              type="number"
              step="8"
              value={
                spacing.tablet[pair.vertical as keyof typeof spacing.tablet]
              }
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
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Mobile</label>
            <input
              type="number"
              step="8"
              value={
                spacing.mobile[pair.vertical as keyof typeof spacing.mobile]
              }
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

      {/* Horizontal (L/R) */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ArrowLeftRight size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">Left/Right</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <label className="block text-gray-400 mb-1">Desktop</label>
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
                spacing.desktop[
                  pair.horizontal as keyof typeof spacing.desktop
                ] %
                  8 ===
                0
                  ? "border-gray-300 bg-white"
                  : "border-orange-400 bg-orange-50 text-orange-800"
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Tablet</label>
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
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Mobile</label>
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
        </div>
      </div>
    </div>
  );

  const renderGridPair = (pair: (typeof gridPairs)[0]) => (
    <div key={pair.title} className="border-b border-gray-100 pb-3">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {pair.title}
      </label>

      {/* Horizontal Gap */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <ArrowLeftRight size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">Horizontal</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <label className="block text-gray-400 mb-1">Desktop</label>
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
                spacing.desktop[
                  pair.horizontal as keyof typeof spacing.desktop
                ] %
                  8 ===
                0
                  ? "border-gray-300 bg-white"
                  : "border-orange-400 bg-orange-50 text-orange-800"
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Tablet</label>
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
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Mobile</label>
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
        </div>
      </div>

      {/* Vertical Gap */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ArrowUpDown size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">Vertical</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <label className="block text-gray-400 mb-1">Desktop</label>
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
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Tablet</label>
            <input
              type="number"
              step="8"
              value={
                spacing.tablet[pair.vertical as keyof typeof spacing.tablet]
              }
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
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Mobile</label>
            <input
              type="number"
              step="8"
              value={
                spacing.mobile[pair.vertical as keyof typeof spacing.mobile]
              }
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
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Spacing Pairs */}
      {spacingPairs.map(renderSpacingPair)}

      {/* Single Controls */}
      {singleControls.map((key) => (
        <div key={key} className="border-b border-gray-100 pb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {spacingLabels[key as keyof typeof spacingLabels]}
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

      {/* Grid Pairs */}
      {gridPairs.map(renderGridPair)}

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

// Memoized export for performance optimization
export const SpacingControls = memo(
  SpacingControlsComponent,
  (prevProps, nextProps) => {
    return prevProps.spacing === nextProps.spacing;
  }
);
