import { detailedDescriptions } from './detailedDescriptions';
import { detailedDescriptions2 } from './detailedDescriptions2';
import { detailedDescriptions3 } from './detailedDescriptions3';
import { detailedDescriptions4 } from './detailedDescriptions4';
import { detailedDescriptions5 } from './detailedDescriptions5';
import { idMappings } from './idMappings';
import { codeExamplesMap } from './codeExamples';

export const allDetailedDescriptions = [
  ...detailedDescriptions,
  ...detailedDescriptions2,
  ...detailedDescriptions3,
  ...detailedDescriptions4,
  ...detailedDescriptions5
];

// A map for easier lookup by toolkit item id
export const detailedDescriptionsMap = allDetailedDescriptions.reduce((acc, description) => {
  const toolkitItemId = idMappings[description.id] || description.id;
  acc[toolkitItemId] = description;
  return acc;
}, {} as Record<string, typeof allDetailedDescriptions[0]>);

export type { ContentBlock, DetailedDescription } from './detailedDescriptions';
export { codeExamplesMap }; 