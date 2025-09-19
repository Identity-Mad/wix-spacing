import React from 'react';
import { Ruler } from 'lucide-react';
import { SpacingValues } from '../types';
import { spacingLabels } from '../constants';

interface ReferenceTableProps {
  spacing: SpacingValues;
}

export const ReferenceTable: React.FC<ReferenceTableProps> = ({ spacing }) => {
  const getUsageDescription = (key: string) => {
    switch (key) {
      case 'pagePaddingTopBottom':
        return 'Global page padding for top and bottom margins';
      case 'pagePaddingLeftRight':
        return 'Global page padding for left and right margins';
      case 'sectionPaddingLeftRight':
        return 'Section-level left and right padding';
      case 'majorSections':
        return 'Maximum separation for distinct content areas';
      case 'h1ToContent':
        return 'Strong hierarchy for H1 section titles';
      case 'subsections':
        return 'Clear but connected section breaks';
      case 'subtitleToH2':
        return 'Section label to H2 header relationship';
      case 'h2ToNext':
        return 'H2 to next element transition spacing';
      case 'aboveButtons':
        return 'Breathing room before CTAs';
      case 'h3ToContent':
        return 'H3 to content tight ownership spacing';
      case 'bulletPoints':
        return 'List item separation';
      case 'paragraphSpacing':
        return 'Natural text flow (breaks 8pt grid intentionally)';
      case 'gridGap2ColHorizontal':
        return 'Horizontal spacing in 2-column layouts';
      case 'gridGap2ColVertical':
        return 'Vertical spacing in 2-column layouts';
      case 'gridGap3ColHorizontal':
        return 'Horizontal spacing in 3-column layouts';
      case 'gridGap3ColVertical':
        return 'Vertical spacing in 3-column layouts';
      case 'gridGap4ColHorizontal':
        return 'Horizontal spacing in 4-column layouts';
      case 'gridGap4ColVertical':
        return 'Vertical spacing in 4-column layouts';
      case 'singleColumnMaxWidth':
        return 'Max width for single-column content (articles, blog posts)';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <Ruler size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Spacing Reference Table</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-semibold">Spacing Type</th>
              <th className="text-center p-3 font-semibold text-blue-600">Desktop</th>
              <th className="text-center p-3 font-semibold text-green-600">Tablet</th>
              <th className="text-center p-3 font-semibold text-purple-600">Mobile</th>
              <th className="text-left p-3 font-semibold">Usage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(spacingLabels).map(([key, label]) => (
              <tr key={key} className="border-b border-gray-100">
                <td className="p-3 font-medium">{label}</td>
                <td className="p-3 text-center text-blue-600 font-mono">
                  <span className={spacing.desktop[key as keyof typeof spacing.desktop] % 8 === 0 ? '' : 'text-orange-600'}>
                    {spacing.desktop[key as keyof typeof spacing.desktop]}px
                  </span>
                </td>
                <td className="p-3 text-center text-green-600 font-mono">
                  <span className={spacing.tablet[key as keyof typeof spacing.tablet] % 8 === 0 ? '' : 'text-orange-600'}>
                    {spacing.tablet[key as keyof typeof spacing.tablet]}px
                  </span>
                </td>
                <td className="p-3 text-center text-purple-600 font-mono">
                  <span className={spacing.mobile[key as keyof typeof spacing.mobile] % 8 === 0 ? '' : 'text-orange-600'}>
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
    </div>
  );
};