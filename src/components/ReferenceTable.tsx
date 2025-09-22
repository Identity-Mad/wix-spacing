import React from "react";
import { Ruler, Type, Printer } from "lucide-react";
import { SpacingValues, TypographySettings } from "../types";
import { spacingLabels } from "../constants";

interface ReferenceTableProps {
  spacing: SpacingValues;
  typography: TypographySettings;
}

export const ReferenceTable: React.FC<ReferenceTableProps> = ({
  spacing,
  typography,
}) => {
  const handlePrint = () => {
    try {
      console.log("Print button clicked"); // Debug log

      // Create a new window for printing
      const printWindow = window.open("", "_blank", "width=800,height=600");
      if (!printWindow) {
        console.error("Could not open print window");
        return;
      }

      // Generate spacing table rows
      const spacingRows = Object.entries(spacingLabels)
        .map(([key, label]) => {
          const desktopValue =
            spacing.desktop[key as keyof typeof spacing.desktop];
          const tabletValue =
            spacing.tablet[key as keyof typeof spacing.tablet];
          const mobileValue =
            spacing.mobile[key as keyof typeof spacing.mobile];
          const usage = getUsageDescription(key);

          return `
            <tr>
              <td>${label}</td>
              <td class="desktop">${desktopValue}px</td>
              <td class="tablet">${tabletValue}px</td>
              <td class="mobile">${mobileValue}px</td>
              <td>${usage}</td>
            </tr>
          `;
        })
        .join("");

      // Generate font settings for each breakpoint
      const generateFontSection = (
        breakpoint: string,
        typoData: any,
        colorClass: string
      ) => {
        return `
          <div class="font-column">
            <h3 class="${colorClass}">${breakpoint}</h3>
            ${Object.entries(typoData)
              .map(([key, value]) => {
                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str: string) => str.toUpperCase());
                let displayValue = value;
                if (typeof value === "string") {
                  displayValue = value;
                } else {
                  if (key.includes("Size")) displayValue = value + "px";
                  else if (key.includes("Spacing")) displayValue = value + "em";
                  else displayValue = value.toString();
                }

                return `
                  <div class="font-item">
                    <span>${label}:</span>
                    <span class="font-value ${colorClass}">${displayValue}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        `;
      };

      const fontSections = `
        ${generateFontSection("Desktop", typography.desktop, "desktop")}
        ${generateFontSection("Tablet", typography.tablet, "tablet")}
        ${generateFontSection("Mobile", typography.mobile, "mobile")}
      `;

      // Complete HTML content
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Wix Spacing Reference Table</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 20px;
                color: #333;
              }
              h1 { 
                color: #1f2937; 
                margin-bottom: 30px;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 10px;
              }
              h2 { 
                color: #374151; 
                margin: 30px 0 15px 0;
                font-size: 1.25rem;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-bottom: 30px;
              }
              th, td { 
                border: 1px solid #d1d5db; 
                padding: 8px 12px; 
                text-align: left;
              }
              th { 
                background-color: #f9fafb; 
                font-weight: 600;
              }
              .desktop { color: #2563eb; }
              .tablet { color: #16a34a; }
              .mobile { color: #9333ea; }
              .font-grid { 
                display: grid; 
                grid-template-columns: repeat(3, 1fr); 
                gap: 20px; 
                margin-top: 20px;
              }
              .font-column { 
                background-color: #f9fafb; 
                padding: 15px; 
                border-radius: 6px;
              }
              .font-column h3 { 
                margin: 0 0 15px 0; 
                text-align: center; 
                font-size: 1.1rem;
              }
              .font-item { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 8px; 
                font-size: 0.9rem;
              }
              .font-value { 
                font-family: 'Courier New', monospace; 
                font-weight: 600;
              }
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <h1>Wix Spacing Reference Table</h1>
            
            <h2>Spacing Values</h2>
            <table>
              <thead>
                <tr>
                  <th>Spacing Type</th>
                  <th class="desktop">Desktop</th>
                  <th class="tablet">Tablet</th>
                  <th class="mobile">Mobile</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                ${spacingRows}
              </tbody>
            </table>
            
            <h2>Font Settings</h2>
            <div class="font-grid">
              ${fontSections}
            </div>
          </body>
        </html>
      `;

      console.log("Writing content to print window"); // Debug log
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Wait for content to load then trigger print
      setTimeout(() => {
        console.log("Triggering print dialog"); // Debug log
        printWindow.print();
        // Don't close immediately, let user see the print dialog
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);
    } catch (error) {
      console.error("Print error:", error);
      alert("Error generating print content. Please try again.");
    }
  };
  const getUsageDescription = (key: string) => {
    switch (key) {
      case "pagePaddingTopBottom":
        return "Global page padding for top and bottom margins";
      case "pagePaddingLeftRight":
        return "Global page padding for left and right margins";
      case "sectionPaddingLeftRight":
        return "Section-level left and right padding";
      case "sectionPaddingTopBottom":
        return "Section-level top and bottom padding";
      case "majorSections":
        return "Separation for distinct content areas";
      case "h1ToContent":
        return "Strong hierarchy for H1 section titles";
      case "subsections":
        return "Section breaks within a section";
      case "subtitleToH2":
        return "Section label to H2 header relationship";
      case "h2ToNext":
        return "H2 to content transition spacing";
      case "aboveButtons":
        return "Breathing room before CTAs";
      case "h3ToContent":
        return "H3 to content transition spacing";
      case "bulletPoints":
        return "List item separation";
      case "paragraphSpacing":
        return "Natural text flow (breaks 8pt grid intentionally)";
      case "gridGap2ColHorizontal":
        return "Horizontal spacing in 2-column layouts";
      case "gridGap2ColVertical":
        return "Vertical spacing in 2-column layouts";
      case "gridGap3ColHorizontal":
        return "Horizontal spacing in 3-column layouts";
      case "gridGap3ColVertical":
        return "Vertical spacing in 3-column layouts";
      case "gridGap4ColHorizontal":
        return "Horizontal spacing in 4-column layouts";
      case "gridGap4ColVertical":
        return "Vertical spacing in 4-column layouts";
      case "singleColumnMaxWidth":
        return "Max width for single-column content";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Ruler size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Spacing Reference Table
          </h2>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
          title="Print Reference Table"
        >
          <Printer size={14} />
          Print
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-semibold">Spacing Type</th>
              <th className="text-center p-3 font-semibold text-blue-600">
                Desktop
              </th>
              <th className="text-center p-3 font-semibold text-green-600">
                Tablet
              </th>
              <th className="text-center p-3 font-semibold text-purple-600">
                Mobile
              </th>
              <th className="text-left p-3 font-semibold">Usage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(spacingLabels).map(([key, label]) => (
              <tr key={key} className="border-b border-gray-100">
                <td className="p-3 font-medium">{label}</td>
                <td className="p-3 text-center text-blue-600 font-mono">
                  <span
                    className={
                      spacing.desktop[key as keyof typeof spacing.desktop] %
                        8 ===
                      0
                        ? ""
                        : "text-orange-600"
                    }
                  >
                    {spacing.desktop[key as keyof typeof spacing.desktop]}px
                  </span>
                </td>
                <td className="p-3 text-center text-green-600 font-mono">
                  <span
                    className={
                      spacing.tablet[key as keyof typeof spacing.tablet] % 8 ===
                      0
                        ? ""
                        : "text-orange-600"
                    }
                  >
                    {spacing.tablet[key as keyof typeof spacing.tablet]}px
                  </span>
                </td>
                <td className="p-3 text-center text-purple-600 font-mono">
                  <span
                    className={
                      spacing.mobile[key as keyof typeof spacing.mobile] % 8 ===
                      0
                        ? ""
                        : "text-orange-600"
                    }
                  >
                    {spacing.mobile[key as keyof typeof spacing.mobile]}px
                  </span>
                </td>
                <td className="p-3 text-gray-600 text-xs">
                  {getUsageDescription(key)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Font Settings Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
          <Type size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Font Settings Reference
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Desktop Font Settings */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-3 text-center">
              Desktop
            </h4>
            <div className="space-y-2 text-sm">
              {/* Font Family */}
              <div className="flex justify-between">
                <span className="text-gray-600">Font Family:</span>
                <span className="font-mono">
                  {typography.desktop.fontFamily}
                </span>
              </div>
              
              {/* Sizes */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">SIZES</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H1 Size:</span>
                  <span className="font-mono text-blue-600">
                    {typography.desktop.h1Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H2 Size:</span>
                  <span className="font-mono text-blue-600">
                    {typography.desktop.h2Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H3 Size:</span>
                  <span className="font-mono text-blue-600">
                    {typography.desktop.h3Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P1 Size:</span>
                  <span className="font-mono text-blue-600">
                    {typography.desktop.p1Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P2 Size:</span>
                  <span className="font-mono text-blue-600">
                    {typography.desktop.p2Size}px
                  </span>
                </div>
              </div>

              {/* Heading Settings */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">HEADING SETTINGS</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Line Height:</span>
                  <span className="font-mono">
                    {typography.desktop.headingLineHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Letter Spacing:</span>
                  <span className="font-mono">
                    {typography.desktop.headingLetterSpacing}em
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Weight:</span>
                  <span className="font-mono">
                    {typography.desktop.headingFontWeight}
                  </span>
                </div>
              </div>

              {/* Body Settings */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">BODY SETTINGS</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Line Height:</span>
                  <span className="font-mono">
                    {typography.desktop.bodyLineHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Letter Spacing:</span>
                  <span className="font-mono">
                    {typography.desktop.bodyLetterSpacing}em
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Weight:</span>
                  <span className="font-mono">
                    {typography.desktop.bodyFontWeight}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Font Settings */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-3 text-center">
              Tablet
            </h4>
            <div className="space-y-2 text-sm">
              {/* Font Family */}
              <div className="flex justify-between">
                <span className="text-gray-600">Font Family:</span>
                <span className="font-mono">
                  {typography.tablet.fontFamily}
                </span>
              </div>
              
              {/* Sizes */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">SIZES</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H1 Size:</span>
                  <span className="font-mono text-green-600">
                    {typography.tablet.h1Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H2 Size:</span>
                  <span className="font-mono text-green-600">
                    {typography.tablet.h2Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H3 Size:</span>
                  <span className="font-mono text-green-600">
                    {typography.tablet.h3Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P1 Size:</span>
                  <span className="font-mono text-green-600">
                    {typography.tablet.p1Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P2 Size:</span>
                  <span className="font-mono text-green-600">
                    {typography.tablet.p2Size}px
                  </span>
                </div>
              </div>

              {/* Heading Settings */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">HEADING SETTINGS</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Line Height:</span>
                  <span className="font-mono">
                    {typography.tablet.headingLineHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Letter Spacing:</span>
                  <span className="font-mono">
                    {typography.tablet.headingLetterSpacing}em
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Weight:</span>
                  <span className="font-mono">
                    {typography.tablet.headingFontWeight}
                  </span>
                </div>
              </div>

              {/* Body Settings */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">BODY SETTINGS</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Line Height:</span>
                  <span className="font-mono">
                    {typography.tablet.bodyLineHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Letter Spacing:</span>
                  <span className="font-mono">
                    {typography.tablet.bodyLetterSpacing}em
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Weight:</span>
                  <span className="font-mono">
                    {typography.tablet.bodyFontWeight}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Font Settings */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-3 text-center">
              Mobile
            </h4>
            <div className="space-y-2 text-sm">
              {/* Font Family */}
              <div className="flex justify-between">
                <span className="text-gray-600">Font Family:</span>
                <span className="font-mono">
                  {typography.mobile.fontFamily}
                </span>
              </div>
              
              {/* Sizes */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">SIZES</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H1 Size:</span>
                  <span className="font-mono text-purple-600">
                    {typography.mobile.h1Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H2 Size:</span>
                  <span className="font-mono text-purple-600">
                    {typography.mobile.h2Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H3 Size:</span>
                  <span className="font-mono text-purple-600">
                    {typography.mobile.h3Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P1 Size:</span>
                  <span className="font-mono text-purple-600">
                    {typography.mobile.p1Size}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P2 Size:</span>
                  <span className="font-mono text-purple-600">
                    {typography.mobile.p2Size}px
                  </span>
                </div>
              </div>

              {/* Heading Settings */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">HEADING SETTINGS</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Line Height:</span>
                  <span className="font-mono">
                    {typography.mobile.headingLineHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Letter Spacing:</span>
                  <span className="font-mono">
                    {typography.mobile.headingLetterSpacing}em
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Weight:</span>
                  <span className="font-mono">
                    {typography.mobile.headingFontWeight}
                  </span>
                </div>
              </div>

              {/* Body Settings */}
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">BODY SETTINGS</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Line Height:</span>
                  <span className="font-mono">
                    {typography.mobile.bodyLineHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Letter Spacing:</span>
                  <span className="font-mono">
                    {typography.mobile.bodyLetterSpacing}em
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Font Weight:</span>
                  <span className="font-mono">
                    {typography.mobile.bodyFontWeight}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
