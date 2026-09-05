export interface LanguageConfig {
  id: string;
  displayName: string;
  isSupported: boolean;
  defaultStarterCode: string;
}

export const LanguageRegistry: Record<string, LanguageConfig> = {
  javascript: {
    id: 'javascript',
    displayName: 'JavaScript',
    isSupported: true,
    defaultStarterCode: `// Write your JavaScript solution here
function solve() {
  
}
`,
  },
  typescript: {
    id: 'typescript',
    displayName: 'TypeScript',
    isSupported: true,
    defaultStarterCode: `// Write your TypeScript solution here
function solve(): void {
  
}
`,
  },
  python: {
    id: 'python',
    displayName: 'Python 3',
    isSupported: true,
    defaultStarterCode: `# Write your Python solution here
def solve():
    pass
`,
  },
  java: {
    id: 'java',
    displayName: 'Java',
    isSupported: false,
    defaultStarterCode: `// Write your Java solution here
class Solution {
    public void solve() {
        
    }
}
`,
  },
  cpp: {
    id: 'cpp',
    displayName: 'C++',
    isSupported: false,
    defaultStarterCode: `// Write your C++ solution here
#include <iostream>
using namespace std;

void solve() {
    
}
`,
  },
  c: {
    id: 'c',
    displayName: 'C',
    isSupported: false,
    defaultStarterCode: `// Write your C solution here
#include <stdio.h>

void solve() {
    
}
`,
  },
  csharp: {
    id: 'csharp',
    displayName: 'C#',
    isSupported: false,
    defaultStarterCode: `// Write your C# solution here
using System;

public class Solution {
    public void Solve() {
        
    }
}
`,
  },
  go: {
    id: 'go',
    displayName: 'Go',
    isSupported: false,
    defaultStarterCode: `// Write your Go solution here
package main

import "fmt"

func solve() {
    
}
`,
  },
  sql: {
    id: 'sql',
    displayName: 'SQL',
    isSupported: false, // Will have a separate environment
    defaultStarterCode: `-- Write your SQL query here
SELECT * FROM table_name;
`,
  },
};

/**
 * Returns an array of only those language configurations that are currently executable by the backend.
 */
export const getSupportedLanguages = (): LanguageConfig[] => {
  return Object.values(LanguageRegistry).filter((lang) => lang.isSupported);
};

/**
 * Resolves the starter code for a specific language and question,
 * falling back to the registry default if not provided by the question.
 */
export const resolveStarterCode = (
  languageId: string,
  questionStarterCodeMap?: Record<string, string>
): string => {
  if (questionStarterCodeMap && questionStarterCodeMap[languageId]) {
    return questionStarterCodeMap[languageId];
  }
  const langConfig = LanguageRegistry[languageId];
  return langConfig ? langConfig.defaultStarterCode : '// Write your solution here...';
};
