import { useState, useEffect } from "react";
import { SpacingValues, TypographySettings, LayoutSettings } from "../types";
import { initialSpacing, initialTypography, initialLayout } from "../constants";

export const useSettings = () => {
  const migrateTypography = (oldTypography: any) => {
    // Check if it's the old flat structure
    if (
      oldTypography &&
      !oldTypography.desktop &&
      !oldTypography.tablet &&
      !oldTypography.mobile
    ) {
      // Convert old flat structure to new breakpoint structure
      return {
        desktop: { ...oldTypography },
        tablet: { ...oldTypography },
        mobile: { ...oldTypography },
      };
    }
    return oldTypography;
  };

  const loadSettings = () => {
    try {
      const savedSpacing = localStorage.getItem("wix-spacing-settings");
      const savedTypography = localStorage.getItem("wix-typography-settings");
      const savedLayout = localStorage.getItem("wix-layout-settings");

      let typography = initialTypography;
      if (savedTypography) {
        const parsedTypography = JSON.parse(savedTypography);
        typography = migrateTypography(parsedTypography);
      }

      return {
        spacing: savedSpacing ? JSON.parse(savedSpacing) : initialSpacing,
        typography,
        layout: savedLayout ? JSON.parse(savedLayout) : initialLayout,
      };
    } catch (error) {
      console.warn("Failed to load settings from localStorage:", error);
      return {
        spacing: initialSpacing,
        typography: initialTypography,
        layout: initialLayout,
      };
    }
  };

  const [spacing, setSpacing] = useState<SpacingValues>(loadSettings().spacing);
  const [typography, setTypography] = useState<TypographySettings>(
    loadSettings().typography
  );
  const [layout, setLayout] = useState<LayoutSettings>(loadSettings().layout);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("wix-spacing-settings", JSON.stringify(spacing));
    } catch (error) {
      console.warn("Failed to save spacing settings to localStorage:", error);
    }
  }, [spacing]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "wix-typography-settings",
        JSON.stringify(typography)
      );
    } catch (error) {
      console.warn(
        "Failed to save typography settings to localStorage:",
        error
      );
    }
  }, [typography]);

  useEffect(() => {
    try {
      localStorage.setItem("wix-layout-settings", JSON.stringify(layout));
    } catch (error) {
      console.warn("Failed to save layout settings to localStorage:", error);
    }
  }, [layout]);

  const resetToDefaults = () => {
    setSpacing(initialSpacing);
    setTypography(initialTypography);
    setLayout(initialLayout);
  };

  const exportSettings = () => {
    const settings = {
      spacing,
      typography,
      layout,
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wix-spacing-config-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importSettings = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedSettings = JSON.parse(content);

        // Validate that the file has the expected structure
        if (importedSettings.spacing && importedSettings.typography) {
          setSpacing(importedSettings.spacing);
          setTypography(importedSettings.typography);
          // Import layout if available, otherwise keep current
          if (importedSettings.layout) {
            setLayout(importedSettings.layout);
          }
          alert("Settings imported successfully!");
        } else {
          alert(
            "Invalid settings file. Please select a valid Wix Spacing configuration file."
          );
        }
      } catch (error) {
        console.error("Failed to import settings:", error);
        alert(
          "Failed to import settings. Please check that the file is valid JSON."
        );
      }
    };
    reader.readAsText(file);
  };

  return {
    spacing,
    typography,
    layout,
    setSpacing,
    setTypography,
    setLayout,
    resetToDefaults,
    exportSettings,
    importSettings,
  };
};
