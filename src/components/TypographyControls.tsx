import React from "react";
import { TypographySettings, TypographyBreakpointKey } from "../types";
import { getTypographyStyles } from "../utils/typography";

interface TypographyControlsProps {
  typography: TypographySettings;
  updateTypography: (
    breakpoint: TypographyBreakpointKey,
    key: keyof TypographySettings["desktop"],
    value: string | number
  ) => void;
}

export const TypographyControls: React.FC<TypographyControlsProps> = ({
  typography,
  updateTypography,
}) => {
  const globalTypographyFields = [
    {
      key: "fontFamily",
      label: "Font Family",
      type: "select",
      options: ["default", "raleway"],
    },
    {
      key: "headingLineHeight",
      label: "Heading Line Height",
      type: "number",
      step: 0.05,
    },
    {
      key: "bodyLineHeight",
      label: "Body Line Height",
      type: "number",
      step: 0.05,
    },
    {
      key: "headingLetterSpacing",
      label: "Heading Letter Spacing",
      type: "number",
      step: 0.001,
    },
    {
      key: "bodyLetterSpacing",
      label: "Body Letter Spacing",
      type: "number",
      step: 0.001,
    },
  ] as const;

  const breakpointTypographyFields = [
    { key: "h1Size", label: "H1 Size", type: "number" },
    { key: "h2Size", label: "H2 Size", type: "number" },
    { key: "h3Size", label: "H3 Size", type: "number" },
    { key: "p1Size", label: "Body (P1) Size", type: "number" },
    { key: "p2Size", label: "Small (P2) Size", type: "number" },
    {
      key: "headingFontWeight",
      label: "Heading Font Weight",
      type: "number",
      min: 100,
      max: 900,
      step: 100,
    },
    {
      key: "bodyFontWeight",
      label: "Body Font Weight",
      type: "number",
      min: 100,
      max: 900,
      step: 100,
    },
  ] as const;

  const breakpoints = ["desktop", "tablet", "mobile"] as const;

  const updateGlobalTypography = (
    key: keyof TypographySettings["desktop"],
    value: string | number
  ) => {
    // Update all breakpoints with the same value
    breakpoints.forEach((breakpoint) => {
      updateTypography(breakpoint, key, value);
    });
  };

  return (
    <div className="space-y-4">
      {/* Breakpoint-Specific Typography Controls (Font Sizes & Weights) */}
      {breakpointTypographyFields.map((field) => (
        <div key={field.key} className="border-b border-gray-100 pb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {breakpoints.map((breakpoint) => (
              <div key={breakpoint}>
                <label className="block text-gray-500 mb-1">
                  {breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}
                </label>
                <input
                  type="number"
                  value={typography[breakpoint][field.key]}
                  onChange={(e) =>
                    updateTypography(
                      breakpoint,
                      field.key,
                      field.key.includes("Size") || field.key.includes("Weight")
                        ? parseInt(e.target.value) || 0
                        : parseFloat(e.target.value) || 0
                    )
                  }
                  step={field.step}
                  min={field.min}
                  max={field.max}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-center text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Global Typography Controls */}
      {globalTypographyFields.map((field) => (
        <div key={field.key} className="border-b border-gray-100 pb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              value={typography.desktop[field.key]}
              onChange={(e) =>
                updateGlobalTypography(field.key, e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option === "default"
                    ? "Default (System)"
                    : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              value={typography.desktop[field.key]}
              onChange={(e) =>
                updateGlobalTypography(
                  field.key,
                  parseFloat(e.target.value) || 0
                )
              }
              step={field.step}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          )}
        </div>
      ))}

      {/* Font Preview - Show all breakpoints */}
      <div className="p-4 bg-purple-50 rounded">
        <h3 className="font-semibold text-purple-800 mb-3">Font Preview</h3>
        <div className="space-y-4">
          {breakpoints.map((breakpoint) => (
            <div
              key={breakpoint}
              className="border border-purple-200 rounded p-3 bg-white"
            >
              <h4 className="text-sm font-medium text-purple-700 mb-2">
                {breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}{" "}
                Preview
              </h4>
              <div>
                <h1
                  style={getTypographyStyles(typography[breakpoint], "h1")}
                  className="mb-1"
                >
                  H1
                </h1>
                <h2
                  style={getTypographyStyles(typography[breakpoint], "h2")}
                  className="mb-1"
                >
                  H2
                </h2>
                <h3
                  style={getTypographyStyles(typography[breakpoint], "h3")}
                  className="mb-1"
                >
                  H3
                </h3>
                <p
                  style={getTypographyStyles(typography[breakpoint], "p1")}
                  className="mb-1"
                >
                  Paragraph text
                </p>
                <p style={getTypographyStyles(typography[breakpoint], "p2")}>
                  Caption text
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
