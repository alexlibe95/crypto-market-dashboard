export function formatSmallNumber(
    value: number
  ): {
    zeroCount: number;
    significant: string;
  } | null {
    if (value === 0 || value >= 0.01) return null;
  
    // Convert to full decimal form (handles scientific notation) | e.g. 3.65758e-7 -> 0.000000365758
    const normalized = value.toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: 20
    });
  
    // Expect something like: 0.000000365758
    const [, decimals = ''] = normalized.split('.');
  
    const match = decimals.match(/^(0+)(\d+)/);
    if (!match) return null;
  
    return {
      zeroCount: match[1].length,
      significant: match[2].slice(0, 3)
    };
  }
  