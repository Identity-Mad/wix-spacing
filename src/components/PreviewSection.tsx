import React from "react";
import {
  BreakpointKey,
  SpacingBreakpoint,
  TypographyBreakpoint,
} from "../types";
import { getTypographyStyles, getFontFamily } from "../utils/typography";

interface PreviewSectionProps {
  title: string;
  breakpoint: BreakpointKey;
  icon: React.ReactNode;
  spacing: SpacingBreakpoint;
  typography: TypographyBreakpoint;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  title,
  breakpoint,
  icon,
  spacing: s,
  typography,
}) => {
  // Set width constraints based on breakpoint
  const getWidthStyle = () => {
    switch (breakpoint) {
      case "mobile":
        return { maxWidth: "390px", width: "390px" };
      case "tablet":
        return { maxWidth: "768px", width: "100%" };
      case "desktop":
        return { maxWidth: "1200px", width: "100%" };
      default:
        return {};
    }
  };

  const SectionPadding: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <div
      className="border-2 border-dashed border-blue-300 bg-blue-50/30"
      style={{
        paddingTop: `${s.sectionPaddingTopBottom}px`,
        paddingBottom: `${s.sectionPaddingTopBottom}px`,
        paddingLeft: `${s.sectionPaddingLeftRight}px`,
        paddingRight: `${s.sectionPaddingLeftRight}px`,
      }}
    >
      {/* Section Padding Indicator */}
      <div className="mb-4 p-2 bg-blue-100 rounded border border-blue-300">
        <p className="text-xs text-blue-700 font-medium">
          Section Padding Applied: {s.sectionPaddingTopBottom}px top/bottom,{" "}
          {s.sectionPaddingLeftRight}px left/right
        </p>
      </div>
      {children}
    </div>
  );

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 overflow-hidden mx-auto"
      style={getWidthStyle()}
    >
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        {icon}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Page Variables Display */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-3">
          Page Variables (Not Rendered)
        </h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Page Padding (Top/Bottom):</span>
            <span className="font-mono text-gray-800">
              {s.pagePaddingTopBottom}px
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Page Padding (Left/Right):</span>
            <span className="font-mono text-gray-800">
              {s.pagePaddingLeftRight}px
            </span>
          </div>
        </div>
      </div>

      <div
        className="space-y-0"
        style={{ fontFamily: getFontFamily(typography) }}
      >
        {/* Major Section */}
        <div className="bg-blue-50 rounded border-l-4 border-blue-500">
          <SectionPadding>
            <h1 style={getTypographyStyles(typography, "h1")}>
              H1 Section Title
            </h1>
            <div style={{ marginTop: `${s.h1ToContent}px` }}>
              <p style={getTypographyStyles(typography, "p1")}>
                This content follows the H1 with proper hierarchical spacing to
                establish clear visual relationships.
              </p>
              <div style={{ marginTop: `${s.paragraphSpacing}px` }}>
                <p style={getTypographyStyles(typography, "p1")}>
                  Natural paragraph spacing maintains reading flow while
                  respecting the overall design system.
                </p>
              </div>
            </div>
          </SectionPadding>
        </div>

        <div style={{ marginTop: `${s.majorSections}px` }}>
          <div className="bg-green-50 rounded border-l-4 border-green-500">
            <SectionPadding>
              <div
                style={getTypographyStyles(typography, "p2")}
                className="font-medium text-green-700 mb-0"
              >
                Section Label
              </div>
              <div style={{ marginTop: `${s.subtitleToH2}px` }}>
                <h2 style={getTypographyStyles(typography, "h2")}>
                  H2 Subsection Header
                </h2>
              </div>
              <div style={{ marginTop: `${s.h2ToNext}px` }}>
                <p style={getTypographyStyles(typography, "p1")}>
                  Content that follows an H2 uses transition spacing to create
                  clear separation.
                </p>

                <div style={{ marginTop: `${s.h3ToContent}px` }}>
                  <h3 style={getTypographyStyles(typography, "h3")}>
                    H3 Subsection
                  </h3>
                  <div style={{ marginTop: `${s.h3ToContent}px` }}>
                    <ul
                      className="space-y-0"
                      style={getTypographyStyles(typography, "p1")}
                    >
                      <li>• First bullet point with proper spacing</li>
                      <li style={{ marginTop: `${s.bulletPoints}px` }}>
                        • Second bullet point
                      </li>
                      <li style={{ marginTop: `${s.bulletPoints}px` }}>
                        • Third bullet point
                      </li>
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: `${s.aboveButtons}px` }}>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    style={getTypographyStyles(typography, "p1")}
                  >
                    Action Button
                  </button>
                </div>
              </div>
            </SectionPadding>
          </div>
        </div>

        {/* Content + Image Layout Example */}
        <div style={{ marginTop: `${s.subsections}px` }}>
          <div className="bg-green-50 rounded border-l-4 border-green-500">
            <SectionPadding>
              <h2
                style={getTypographyStyles(typography, "h2")}
                className="mb-4"
              >
                Content + Image Layout
              </h2>

              <div>
                <p
                  style={getTypographyStyles(typography, "p2")}
                  className="text-gray-600 mb-3"
                >
                  Gap: {s.gridGap2ColHorizontal}px × {s.gridGap2ColVertical}px
                </p>
                <div
                  className={
                    breakpoint === "mobile" ? "space-y-4" : "grid grid-cols-2"
                  }
                  style={
                    breakpoint === "mobile"
                      ? {}
                      : {
                          columnGap: `${s.gridGap2ColHorizontal}px`,
                          rowGap: `${s.gridGap2ColVertical}px`,
                        }
                  }
                >
                  <div>
                    <h2
                      style={getTypographyStyles(typography, "h2")}
                      className="mb-3"
                    >
                      About Our Service
                    </h2>
                    <p
                      style={getTypographyStyles(typography, "p1")}
                      className="mb-4"
                    >
                      We provide comprehensive solutions that help businesses
                      grow and succeed in today's competitive market.
                    </p>
                    <div style={{ marginTop: `${s.aboveButtons}px` }}>
                      <button
                        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors"
                        style={getTypographyStyles(typography, "p1")}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div
                    className="bg-gray-200 rounded flex items-center justify-center"
                    style={{ minHeight: "120px" }}
                  >
                    <span
                      style={getTypographyStyles(typography, "p2")}
                      className="text-gray-500"
                    >
                      Image Placeholder
                    </span>
                  </div>
                </div>
              </div>
            </SectionPadding>
          </div>
        </div>

        {/* Text + Text Layout Example */}
        <div style={{ marginTop: `${s.subsections}px` }}>
          <div className="bg-green-50 rounded border-l-4 border-green-500">
            <SectionPadding>
              <h2
                style={getTypographyStyles(typography, "h2")}
                className="mb-4"
              >
                Text + Text Layout
              </h2>

              <div>
                <p
                  style={getTypographyStyles(typography, "p2")}
                  className="text-gray-600 mb-3"
                >
                  Gap: {s.gridGap2ColHorizontal}px × {s.gridGap2ColVertical}px
                </p>
                <div
                  className={
                    breakpoint === "mobile" ? "space-y-4" : "grid grid-cols-2"
                  }
                  style={
                    breakpoint === "mobile"
                      ? {}
                      : {
                          columnGap: `${s.gridGap2ColHorizontal}px`,
                          rowGap: `${s.gridGap2ColVertical}px`,
                        }
                  }
                >
                  <div>
                    <h2
                      style={getTypographyStyles(typography, "h2")}
                      className="mb-3"
                    >
                      Our Mission
                    </h2>
                    <p style={getTypographyStyles(typography, "p1")}>
                      To deliver exceptional value through innovative solutions
                      and outstanding customer service.
                    </p>
                  </div>
                  <div>
                    <h2
                      style={getTypographyStyles(typography, "h2")}
                      className="mb-3"
                    >
                      Our Vision
                    </h2>
                    <p style={getTypographyStyles(typography, "p1")}>
                      To be the leading provider of transformative business
                      solutions that empower organizations worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </SectionPadding>
          </div>
        </div>

        {/* Grid Examples */}
        <div style={{ marginTop: `${s.subsections}px` }}>
          <div className="bg-orange-50 rounded border-l-4 border-orange-500">
            <SectionPadding>
              <h2
                style={getTypographyStyles(typography, "h2")}
                className="mb-4"
              >
                Grid Examples
              </h2>

              {/* 2 Column Grid */}
              <div className="mb-4">
                <h3
                  style={getTypographyStyles(typography, "h3")}
                  className="mb-2"
                >
                  2-Column Grid ({s.gridGap2ColHorizontal}px ×{" "}
                  {s.gridGap2ColVertical}px gap)
                </h3>
                <div
                  className="grid grid-cols-2"
                  style={{
                    columnGap: `${s.gridGap2ColHorizontal}px`,
                    rowGap: `${s.gridGap2ColVertical}px`,
                  }}
                >
                  <div
                    className="bg-gray-200 p-3 rounded text-center"
                    style={getTypographyStyles(typography, "p1")}
                  >
                    Item 1
                  </div>
                  <div
                    className="bg-gray-200 p-3 rounded text-center"
                    style={getTypographyStyles(typography, "p1")}
                  >
                    Item 2
                  </div>
                  <div
                    className="bg-gray-200 p-3 rounded text-center"
                    style={getTypographyStyles(typography, "p1")}
                  >
                    Item 3
                  </div>
                  <div
                    className="bg-gray-200 p-3 rounded text-center"
                    style={getTypographyStyles(typography, "p1")}
                  >
                    Item 4
                  </div>
                </div>
              </div>

              {/* 3 Column Grid */}
              <div className="mb-4">
                <h3
                  style={getTypographyStyles(typography, "h3")}
                  className="mb-2"
                >
                  3-Column Grid ({s.gridGap3ColHorizontal}px ×{" "}
                  {s.gridGap3ColVertical}px gap)
                </h3>
                <div
                  className="grid grid-cols-3"
                  style={{
                    columnGap: `${s.gridGap3ColHorizontal}px`,
                    rowGap: `${s.gridGap3ColVertical}px`,
                  }}
                >
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    Item 1
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    Item 2
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    Item 3
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    Item 4
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    Item 5
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    Item 6
                  </div>
                </div>
              </div>

              {/* 4 Column Grid */}
              <div>
                <h3
                  style={getTypographyStyles(typography, "h3")}
                  className="mb-2"
                >
                  4-Column Grid ({s.gridGap4ColHorizontal}px ×{" "}
                  {s.gridGap4ColVertical}px gap)
                </h3>
                <div
                  className="grid grid-cols-4"
                  style={{
                    columnGap: `${s.gridGap4ColHorizontal}px`,
                    rowGap: `${s.gridGap4ColVertical}px`,
                  }}
                >
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    1
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    2
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    3
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    4
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    5
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    6
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    7
                  </div>
                  <div
                    className="bg-gray-200 p-2 rounded text-center"
                    style={getTypographyStyles(typography, "p2")}
                  >
                    8
                  </div>
                </div>
              </div>
            </SectionPadding>
          </div>
        </div>

        {/* Single Column Content Example */}
        <div style={{ marginTop: `${s.subsections}px` }}>
          <div className="bg-purple-50 rounded border-l-4 border-purple-500">
            <SectionPadding>
              <h2
                style={getTypographyStyles(typography, "h2")}
                className="mb-4"
              >
                Single Column Content
              </h2>

              <div
                className="mx-auto"
                style={{
                  maxWidth:
                    breakpoint === "mobile"
                      ? "100%"
                      : `${s.singleColumnMaxWidth}px`,
                }}
              >
                <div className="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
                  <p
                    style={getTypographyStyles(typography, "p2")}
                    className="text-gray-600 mb-2"
                  >
                    Max width:{" "}
                    {breakpoint === "mobile"
                      ? "100% (no limit)"
                      : `${s.singleColumnMaxWidth}px`}
                  </p>
                  <p
                    style={getTypographyStyles(typography, "p1")}
                    className="mb-4"
                  >
                    This represents single-column content like blog posts,
                    articles, or long-form text. The max-width constraint
                    ensures optimal reading line length for better readability.
                  </p>
                  <p style={getTypographyStyles(typography, "p1")}>
                    On desktop and tablet, content is constrained to prevent
                    overly long lines that become difficult to read. Mobile uses
                    full width to maximize screen real estate.
                  </p>
                </div>
              </div>
            </SectionPadding>
          </div>
        </div>
      </div>
    </div>
  );
};
