export default function generateTree(rawText: string): string {
  // Split the input text into lines
  const lines = rawText.split('\n');

  const newLines: string[] = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const depth = line.match(/^=+/)?.[0].length || 0;
    const lineText = line.substring(depth);

    // If depth is 0, it's a root node
    if (depth === 0) {
      newLines.push(lineText);
      continue;
    }

    let prefix = '';
    // Determine the prefix for the current line
    for (let depthIndex = 1; depthIndex < depth; depthIndex++) {
      // Look ahead to see if there are more siblings at this depth
      let hasMoreSiblings = false;
      for (let siblingIndex = lineIndex + 1; siblingIndex < lines.length; siblingIndex++) {
        const siblingDepth = lines[siblingIndex].match(/^=+/)?.[0].length || 0;
        if (siblingDepth < depthIndex) break;
        if (siblingDepth === depthIndex) {
          hasMoreSiblings = true;
          break;
        }
      }
      // Add the appropriate prefix for this level
      prefix += hasMoreSiblings ? '│   ' : '    ';
    }

    // Check for siblings at the current depth
    let hasMoreSiblings = false;
    for (let siblingIndex = lineIndex + 1; siblingIndex < lines.length; siblingIndex++) {
      const siblingDepth = lines[siblingIndex].match(/^=+/)?.[0].length || 0;
      if (siblingDepth < depth) break;
      if (siblingDepth === depth) {
        hasMoreSiblings = true;
        break;
      }
    }

    // Add the appropriate prefix for this level
    prefix += hasMoreSiblings ? '├── ' : '└── ';

    newLines.push(prefix + lineText.trim());
  }

  return newLines.join('\n');
}
