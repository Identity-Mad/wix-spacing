import { TypographySettings, TypographyElement } from '../types';

export const getFontFamily = (typography: TypographySettings) => {
  switch (typography.fontFamily) {
    case 'raleway':
      return '"Raleway", sans-serif';
    default:
      return 'system-ui, -apple-system, sans-serif';
  }
};

export const getTypographyStyles = (typography: TypographySettings, element: TypographyElement) => {
  const baseStyles = {
    fontFamily: getFontFamily(typography),
  };

  switch (element) {
    case 'h1':
      return {
        ...baseStyles,
        fontSize: `${typography.h1Size}px`,
        lineHeight: typography.headingLineHeight,
        letterSpacing: `${typography.headingLetterSpacing}em`,
        fontWeight: typography.headingFontWeight,
      };
    case 'h2':
      return {
        ...baseStyles,
        fontSize: `${typography.h2Size}px`,
        lineHeight: typography.headingLineHeight,
        letterSpacing: `${typography.headingLetterSpacing}em`,
        fontWeight: typography.headingFontWeight,
      };
    case 'h3':
      return {
        ...baseStyles,
        fontSize: `${typography.h3Size}px`,
        lineHeight: typography.headingLineHeight,
        letterSpacing: `${typography.headingLetterSpacing}em`,
        fontWeight: typography.headingFontWeight,
      };
    case 'p1':
      return {
        ...baseStyles,
        fontSize: `${typography.p1Size}px`,
        lineHeight: typography.bodyLineHeight,
        letterSpacing: `${typography.bodyLetterSpacing}em`,
        fontWeight: typography.bodyFontWeight,
      };
    case 'p2':
      return {
        ...baseStyles,
        fontSize: `${typography.p2Size}px`,
        lineHeight: typography.bodyLineHeight,
        letterSpacing: `${typography.bodyLetterSpacing}em`,
        fontWeight: typography.bodyFontWeight,
      };
    default:
      return baseStyles;
  }
};