export interface TypographyBreakpoint {
  fontFamily: "default" | "raleway";
  h1Size: number;
  h2Size: number;
  h3Size: number;
  p1Size: number;
  p2Size: number;
  headingLineHeight: number;
  bodyLineHeight: number;
  headingLetterSpacing: number;
  bodyLetterSpacing: number;
  headingFontWeight: number;
  bodyFontWeight: number;
}

export interface TypographySettings {
  desktop: TypographyBreakpoint;
  tablet: TypographyBreakpoint;
  mobile: TypographyBreakpoint;
}

export interface SpacingValues {
  desktop: SpacingBreakpoint;
  tablet: SpacingBreakpoint;
  mobile: SpacingBreakpoint;
}

export interface SpacingBreakpoint {
  pagePaddingTopBottom: number;
  pagePaddingLeftRight: number;
  sectionPaddingTopBottom: number;
  sectionPaddingLeftRight: number;
  majorSections: number;
  h1ToContent: number;
  subsections: number;
  subtitleToH2: number;
  h2ToNext: number;
  aboveButtons: number;
  h3ToContent: number;
  bulletPoints: number;
  paragraphSpacing: number;
  gridGap2ColHorizontal: number;
  gridGap2ColVertical: number;
  gridGap3ColHorizontal: number;
  gridGap3ColVertical: number;
  gridGap4ColHorizontal: number;
  gridGap4ColVertical: number;
  singleColumnMaxWidth: number;
}

export interface LayoutSettings {
  previewHeight: number | "auto"; // in pixels or "auto" to match control panel
  showDistanceMeasurement: boolean; // toggle for distance measurement overlay
}

export type BreakpointKey = keyof SpacingValues;
export type TypographyBreakpointKey = keyof TypographySettings;
export type TabKey = BreakpointKey | "table";
export type ControlTabKey = "spacing" | "typography" | "settings";
export type TypographyElement = "h1" | "h2" | "h3" | "p1" | "p2";
