import { SpacingValues, TypographySettings, LayoutSettings } from "../types";

export const initialTypography: TypographySettings = {
  desktop: {
    fontFamily: "raleway",
    h1Size: 61,
    h2Size: 49,
    h3Size: 25,
    p1Size: 16,
    p2Size: 13,
    headingLineHeight: 1.15,
    bodyLineHeight: 1.6,
    headingLetterSpacing: -0.022,
    bodyLetterSpacing: 0,
    headingFontWeight: 700,
    bodyFontWeight: 400,
  },
  tablet: {
    fontFamily: "raleway",
    h1Size: 61,
    h2Size: 49,
    h3Size: 25,
    p1Size: 16,
    p2Size: 13,
    headingLineHeight: 1.15,
    bodyLineHeight: 1.6,
    headingLetterSpacing: -0.022,
    bodyLetterSpacing: 0,
    headingFontWeight: 700,
    bodyFontWeight: 400,
  },
  mobile: {
    fontFamily: "raleway",
    h1Size: 61,
    h2Size: 49,
    h3Size: 25,
    p1Size: 16,
    p2Size: 13,
    headingLineHeight: 1.15,
    bodyLineHeight: 1.6,
    headingLetterSpacing: -0.022,
    bodyLetterSpacing: 0,
    headingFontWeight: 700,
    bodyFontWeight: 400,
  },
};

export const initialSpacing: SpacingValues = {
  desktop: {
    pagePaddingTopBottom: 0,
    pagePaddingLeftRight: 0,
    sectionPaddingTopBottom: 96,
    sectionPaddingLeftRight: 64,
    majorSections: 48,
    subsections: 24,
    h1ToContent: 32,
    h2ToNext: 32,
    h3ToContent: 24,
    subtitleToH2: 24,
    aboveButtons: 24,
    paragraphSpacing: 26,
    bulletPoints: 16,
    gridGap2ColHorizontal: 40,
    gridGap2ColVertical: 40,
    gridGap3ColHorizontal: 32,
    gridGap3ColVertical: 32,
    gridGap4ColHorizontal: 24,
    gridGap4ColVertical: 24,
    singleColumnMaxWidth: 720,
  },
  tablet: {
    pagePaddingTopBottom: 0,
    pagePaddingLeftRight: 0,
    sectionPaddingTopBottom: 72,
    sectionPaddingLeftRight: 48,
    majorSections: 40,
    subsections: 20,
    h1ToContent: 24,
    h2ToNext: 24,
    h3ToContent: 12,
    subtitleToH2: 20,
    aboveButtons: 20,
    paragraphSpacing: 22,
    bulletPoints: 12,
    gridGap2ColHorizontal: 32,
    gridGap2ColVertical: 32,
    gridGap3ColHorizontal: 24,
    gridGap3ColVertical: 24,
    gridGap4ColHorizontal: 16,
    gridGap4ColVertical: 16,
    singleColumnMaxWidth: 640,
  },
  mobile: {
    pagePaddingTopBottom: 0,
    pagePaddingLeftRight: 0,
    sectionPaddingTopBottom: 56,
    sectionPaddingLeftRight: 24,
    majorSections: 32,
    subsections: 16,
    h1ToContent: 24,
    h2ToNext: 24,
    h3ToContent: 24,
    subtitleToH2: 16,
    aboveButtons: 16,
    paragraphSpacing: 20,
    bulletPoints: 12,
    gridGap2ColHorizontal: 24,
    gridGap2ColVertical: 24,
    gridGap3ColHorizontal: 16,
    gridGap3ColVertical: 16,
    gridGap4ColHorizontal: 12,
    gridGap4ColVertical: 12,
    singleColumnMaxWidth: 0, // 100% width on mobile
  },
};

export const spacingLabels = {
  // Page & Section Layout
  pagePaddingTopBottom: "Page Padding (Vertical)",
  pagePaddingLeftRight: "Page Padding (Horizontal)",
  sectionPaddingTopBottom: "Section Padding (Vertical)",
  sectionPaddingLeftRight: "Section Padding (Horizontal)",
  majorSections: "Between Major Sections",
  subsections: "Between Subsections",

  // Heading Hierarchy
  h1ToContent: "H1 → Next Element",
  h2ToNext: "H2 → Next Element",
  h3ToContent: "H3 → Next Element",
  subtitleToH2: "Section Label → H2",

  // Content Spacing
  paragraphSpacing: "Paragraph Spacing",
  bulletPoints: "Bullet Point Spacing",

  // Interactive Elements
  aboveButtons: "Above Buttons",

  // Grid Layouts
  gridGap2ColHorizontal: "2-Column Gap (Horizontal)",
  gridGap2ColVertical: "2-Column Gap (Vertical)",
  gridGap3ColHorizontal: "3-Column Gap (Horizontal)",
  gridGap3ColVertical: "3-Column Gap (Vertical)",
  gridGap4ColHorizontal: "4-Column Gap (Horizontal)",
  gridGap4ColVertical: "4-Column Gap (Vertical)",

  // Layout Constraints
  singleColumnMaxWidth: "Single Column Max Width",
};

export const initialLayout: LayoutSettings = {
  previewHeight: "auto",
  showDistanceMeasurement: false,
};
