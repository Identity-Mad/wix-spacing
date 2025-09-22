import React, { memo } from "react";
import {
  BreakpointKey,
  SpacingBreakpoint,
  TypographyBreakpoint,
  LayoutSettings,
} from "../types";
import { getTypographyStyles, getFontFamily } from "../utils/typography";
import { DistanceMeasurement } from "./DistanceMeasurement";

interface PreviewSectionProps {
  title: string;
  breakpoint: BreakpointKey;
  icon: React.ReactNode;
  spacing: SpacingBreakpoint;
  typography: TypographyBreakpoint;
  layout: LayoutSettings;
}

const PreviewSectionComponent: React.FC<PreviewSectionProps> = ({
  title,
  breakpoint,
  icon,
  spacing: s,
  typography,
  layout,
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
      className="border-2 border-dashed border-gray-400 bg-gray-100/50"
      style={{
        paddingTop: `${s.sectionPaddingTopBottom}px`,
        paddingBottom: `${s.sectionPaddingTopBottom}px`,
        paddingLeft: `${s.sectionPaddingLeftRight}px`,
        paddingRight: `${s.sectionPaddingLeftRight}px`,
      }}
    >
      {/* Section Padding Indicator */}
      <div className="mb-4 p-2 bg-gray-200 rounded border border-gray-400">
        <p className="text-xs text-gray-700 font-medium">
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

      <DistanceMeasurement isEnabled={layout.showDistanceMeasurement}>
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
                  This content follows the H1 with proper hierarchical spacing
                  to establish clear visual relationships.
                </p>
                <div
                  style={{
                    marginTop: `${(
                      typography.p1Size * typography.bodyLineHeight
                    ).toFixed(1)}px`,
                  }}
                >
                  <p style={getTypographyStyles(typography, "p1")}>
                    Natural paragraph spacing maintains reading flow while
                    respecting the overall design system.
                  </p>
                </div>
                {/* Paragraph spacing: {typography.p1Size}px × {typography.bodyLineHeight} = {(typography.p1Size * typography.bodyLineHeight).toFixed(1)}px */}
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

                  <div style={{ marginTop: `${s.subsections}px` }}>
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

                  {/* Second H3 subsection to demonstrate subsection spacing */}
                  <div style={{ marginTop: `${s.subsections}px` }}>
                    <h3 style={getTypographyStyles(typography, "h3")}>
                      Second H3 Subsection
                    </h3>
                    <div style={{ marginTop: `${s.h3ToContent}px` }}>
                      <ul
                        className="space-y-0"
                        style={getTypographyStyles(typography, "p1")}
                      >
                        <li>• Another bullet point demonstrating spacing</li>
                        <li style={{ marginTop: `${s.bulletPoints}px` }}>
                          • Second bullet in this subsection
                        </li>
                        <li style={{ marginTop: `${s.bulletPoints}px` }}>
                          • Final bullet point
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
                <h2 style={getTypographyStyles(typography, "h2")}>
                  Content + Image Layout
                </h2>

                <div style={{ marginTop: `${s.h2ToNext}px` }}>
                  <div>
                    <p
                      style={getTypographyStyles(typography, "p2")}
                      className="text-gray-600 mb-3"
                    >
                      Gap: {s.gridGap2ColHorizontal}px × {s.gridGap2ColVertical}
                      px
                    </p>
                    <div
                      className={
                        breakpoint === "mobile"
                          ? "space-y-4"
                          : "grid grid-cols-2"
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
                        <h2 style={getTypographyStyles(typography, "h2")}>
                          About Our Service
                        </h2>
                        <div style={{ marginTop: `${s.h2ToNext}px` }}>
                          <p
                            style={getTypographyStyles(typography, "p1")}
                            className="mb-4"
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.
                          </p>
                        </div>
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
                </div>
              </SectionPadding>
            </div>
          </div>

          {/* Text + Text Layout Example */}
          <div style={{ marginTop: `${s.subsections}px` }}>
            <div className="bg-green-50 rounded border-l-4 border-green-500">
              <SectionPadding>
                <h2 style={getTypographyStyles(typography, "h2")}>
                  Text + Text Layout
                </h2>

                <div style={{ marginTop: `${s.h2ToNext}px` }}>
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
                      <h2 style={getTypographyStyles(typography, "h2")}>
                        Our Mission
                      </h2>
                      <p style={getTypographyStyles(typography, "p1")}>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium. Totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </div>
                    <div>
                      <h2 style={getTypographyStyles(typography, "h2")}>
                        Our Vision
                      </h2>
                      <p style={getTypographyStyles(typography, "p1")}>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                        aut odit aut fugit, sed quia consequuntur magni dolores
                        eos qui ratione voluptatem sequi nesciunt. Neque porro
                        quisquam est, qui dolorem ipsum quia dolor sit amet,
                        consectetur, adipisci velit, sed quia non numquam eius
                        modi tempora incidunt ut labore et dolore magnam aliquam
                        quaerat voluptatem.
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
                <h2 style={getTypographyStyles(typography, "h2")}>
                  Grid Examples
                </h2>

                <div style={{ marginTop: `${s.h2ToNext}px` }}>
                  {/* 2 Column Grid */}
                  <div
                    style={{
                      marginTop: `${s.gridGap2ColVertical}px`,
                      marginBottom: `${s.gridGap2ColVertical}px`,
                    }}
                  >
                    <h3 style={getTypographyStyles(typography, "h3")}>
                      2-Column Grid ({s.gridGap2ColHorizontal}px ×{" "}
                      {s.gridGap2ColVertical}px gap)
                    </h3>
                    <div style={{ marginTop: `${s.gridGap2ColVertical}px` }}>
                      <div
                        className="grid grid-cols-2"
                        style={{
                          columnGap: `${s.gridGap2ColHorizontal}px`,
                          rowGap: `${s.gridGap2ColVertical}px`,
                        }}
                      >
                        <div
                          className="bg-gray-200 p-3 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p1")}
                        >
                          Item 1
                        </div>
                        <div
                          className="bg-gray-200 p-3 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p1")}
                        >
                          Item 2
                        </div>
                        <div
                          className="bg-gray-200 p-3 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p1")}
                        >
                          Item 3
                        </div>
                        <div
                          className="bg-gray-200 p-3 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p1")}
                        >
                          Item 4
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Column Grid */}
                  <div
                    style={{
                      marginTop: `${s.gridGap3ColVertical}px`,
                      marginBottom: `${s.gridGap3ColVertical}px`,
                    }}
                  >
                    <h3 style={getTypographyStyles(typography, "h3")}>
                      3-Column Grid ({s.gridGap3ColHorizontal}px ×{" "}
                      {s.gridGap3ColVertical}px gap)
                    </h3>
                    <div style={{ marginTop: `${s.gridGap3ColVertical}px` }}>
                      <div
                        className="grid grid-cols-3"
                        style={{
                          columnGap: `${s.gridGap3ColHorizontal}px`,
                          rowGap: `${s.gridGap3ColVertical}px`,
                        }}
                      >
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          Item 1
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          Item 2
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          Item 3
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          Item 4
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          Item 5
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          Item 6
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Column Grid */}
                  <div
                    style={{
                      marginTop: `${s.gridGap4ColVertical}px`,
                      marginBottom: `${s.gridGap4ColVertical}px`,
                    }}
                  >
                    <h3 style={getTypographyStyles(typography, "h3")}>
                      4-Column Grid ({s.gridGap4ColHorizontal}px ×{" "}
                      {s.gridGap4ColVertical}px gap)
                    </h3>
                    <div style={{ marginTop: `${s.gridGap4ColVertical}px` }}>
                      <div
                        className="grid grid-cols-4"
                        style={{
                          columnGap: `${s.gridGap4ColHorizontal}px`,
                          rowGap: `${s.gridGap4ColVertical}px`,
                        }}
                      >
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          1
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          2
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          3
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          4
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          5
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          6
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          7
                        </div>
                        <div
                          className="bg-gray-200 p-2 rounded text-center aspect-square flex items-center justify-center"
                          style={getTypographyStyles(typography, "p2")}
                        >
                          8
                        </div>
                      </div>
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
                <h2 style={getTypographyStyles(typography, "h2")}>
                  Single Column Content
                </h2>

                <div style={{ marginTop: `${s.h2ToNext}px` }}>
                  <div
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
                      <p style={getTypographyStyles(typography, "p1")}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                      <p
                        style={{
                          ...getTypographyStyles(typography, "p1"),
                          marginTop: `${(
                            typography.p1Size * typography.bodyLineHeight
                          ).toFixed(1)}px`,
                        }}
                      >
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. At vero eos et
                        accusamus et iusto odio dignissimos ducimus qui
                        blanditiis praesentium voluptatum deleniti atque
                        corrupti quos dolores et quas molestias excepturi sint
                        occaecati cupiditate non provident.
                      </p>
                    </div>
                  </div>
                </div>
              </SectionPadding>
            </div>
          </div>
        </div>
      </DistanceMeasurement>
    </div>
  );
};

// Memoized export for performance optimization
export const PreviewSection = memo(
  PreviewSectionComponent,
  (prevProps, nextProps) => {
    // Only re-render if spacing, typography, or layout actually changed
    return (
      prevProps.spacing === nextProps.spacing &&
      prevProps.typography === nextProps.typography &&
      prevProps.breakpoint === nextProps.breakpoint &&
      prevProps.layout === nextProps.layout
    );
  }
);
