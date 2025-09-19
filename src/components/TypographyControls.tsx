import React from 'react';
import { TypographySettings } from '../types';
import { getTypographyStyles } from '../utils/typography';

interface TypographyControlsProps {
  typography: TypographySettings;
  updateTypography: (key: keyof TypographySettings, value: string) => void;
  updateTypographyNumber: (key: keyof TypographySettings, value: number) => void;
}

export const TypographyControls: React.FC<TypographyControlsProps> = ({
  typography,
  updateTypography,
  updateTypographyNumber,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-gray-100 pb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <select
          value={typography.fontFamily}
          onChange={(e) => updateTypography('fontFamily', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="default">Default (System)</option>
          <option value="raleway">Raleway</option>
        </select>
      </div>

      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Font Sizes</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">H1</label>
            <input
              type="number"
              value={typography.h1Size}
              onChange={(e) => updateTypographyNumber('h1Size', parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">H2</label>
            <input
              type="number"
              value={typography.h2Size}
              onChange={(e) => updateTypographyNumber('h2Size', parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">H3</label>
            <input
              type="number"
              value={typography.h3Size}
              onChange={(e) => updateTypographyNumber('h3Size', parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Body (P1)</label>
            <input
              type="number"
              value={typography.p1Size}
              onChange={(e) => updateTypographyNumber('p1Size', parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Small (P2)</label>
            <input
              type="number"
              value={typography.p2Size}
              onChange={(e) => updateTypographyNumber('p2Size', parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Line Height</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Headings</label>
            <input
              type="number"
              step="0.05"
              value={typography.headingLineHeight}
              onChange={(e) => updateTypographyNumber('headingLineHeight', parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Body</label>
            <input
              type="number"
              step="0.05"
              value={typography.bodyLineHeight}
              onChange={(e) => updateTypographyNumber('bodyLineHeight', parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Letter Spacing</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Headings (em)</label>
            <input
              type="number"
              step="0.001"
              value={typography.headingLetterSpacing}
              onChange={(e) => updateTypographyNumber('headingLetterSpacing', parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Body (em)</label>
            <input
              type="number"
              step="0.001"
              value={typography.bodyLetterSpacing}
              onChange={(e) => updateTypographyNumber('bodyLetterSpacing', parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Font Weight</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Headings</label>
            <input
              type="number"
              step="100"
              min="100"
              max="900"
              value={typography.headingFontWeight}
              onChange={(e) => updateTypographyNumber('headingFontWeight', parseInt(e.target.value) || 400)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Body</label>
            <input
              type="number"
              step="100"
              min="100"
              max="900"
              value={typography.bodyFontWeight}
              onChange={(e) => updateTypographyNumber('bodyFontWeight', parseInt(e.target.value) || 400)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-xs"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-purple-50 rounded">
        <h3 className="font-semibold text-purple-800 mb-2">Font Preview</h3>
        <div>
          <h1 style={getTypographyStyles(typography, 'h1')} className="mb-2">H1</h1>
          <h2 style={getTypographyStyles(typography, 'h2')} className="mb-2">H2</h2>
          <h3 style={getTypographyStyles(typography, 'h3')} className="mb-2">H3</h3>
          <p style={getTypographyStyles(typography, 'p1')} className="mb-2">Paragraph text</p>
          <p style={getTypographyStyles(typography, 'p2')}>Caption text</p>
        </div>
      </div>
    </div>
  );
};