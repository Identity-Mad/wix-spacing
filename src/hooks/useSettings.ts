import { useState, useEffect } from "react";
import { SpacingValues, TypographySettings } from "../types";
import { initialSpacing, initialTypography } from "../constants";

export const useSettings = () => {
  const loadSettings = () => {
    try {
      const savedSpacing = localStorage.getItem("wix-spacing-settings");
      const savedTypography = localStorage.getItem("wix-typography-settings");

      return {
        spacing: savedSpacing ? JSON.parse(savedSpacing) : initialSpacing,
        typography: savedTypography
          ? JSON.parse(savedTypography)
          : initialTypography,
      };
    } catch (error) {
      console.warn("Failed to load settings from localStorage:", error);
      return {
        spacing: initialSpacing,
        typography: initialTypography,
      };
    }
  };

  const [spacing, setSpacing] = useState<SpacingValues>(loadSettings().spacing);
  const [typography, setTypography] = useState<TypographySettings>(
    loadSettings().typography
  );

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

  const resetToDefaults = () => {
    setSpacing(initialSpacing);
    setTypography(initialTypography);
  };

  const exportSettings = () => {
    const settings = {
      spacing,
      typography,
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
    setSpacing,
    setTypography,
    resetToDefaults,
    exportSettings,
    importSettings,
  };
};
