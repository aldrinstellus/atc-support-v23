/**
 * Readability Analysis Utilities
 * PRD 1.3.6: Quality Indicators - Readability Score
 *
 * Implements multiple readability formulas:
 * - Flesch Reading Ease
 * - Flesch-Kincaid Grade Level
 * - Automated Readability Index (ARI)
 * - SMOG Index
 * - Coleman-Liau Index
 */

export interface ReadabilityResult {
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  automatedReadabilityIndex: number;
  smogIndex: number;
  colemanLiauIndex: number;
  averageGradeLevel: number;
  readabilityLabel: 'Very Easy' | 'Easy' | 'Standard' | 'Difficult' | 'Very Difficult';
  audienceLevel: 'General Public' | 'High School' | 'College' | 'Graduate' | 'Expert';
  color: string;
  suggestions: string[];
  stats: {
    sentences: number;
    words: number;
    syllables: number;
    characters: number;
    avgWordsPerSentence: number;
    avgSyllablesPerWord: number;
    avgCharactersPerWord: number;
    complexWords: number;
    complexWordPercent: number;
  };
}

/**
 * Count syllables in a word
 * Using a simplified algorithm based on vowel patterns
 */
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length === 0) return 0;
  if (word.length <= 3) return 1;

  // Count vowel groups
  const vowels = 'aeiouy';
  let count = 0;
  let prevIsVowel = false;

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    if (isVowel && !prevIsVowel) {
      count++;
    }
    prevIsVowel = isVowel;
  }

  // Handle silent e
  if (word.endsWith('e') && count > 1) {
    count--;
  }

  // Handle endings
  if (word.endsWith('le') && word.length > 2 && !vowels.includes(word[word.length - 3])) {
    count++;
  }

  // Special endings that add syllables
  if (word.endsWith('ed') && count > 0) {
    const beforeEd = word.slice(0, -2);
    if (!beforeEd.endsWith('t') && !beforeEd.endsWith('d')) {
      // 'ed' is usually silent unless preceded by t or d
    }
  }

  return Math.max(1, count);
}

/**
 * Split text into sentences
 */
function splitSentences(text: string): string[] {
  // Split on sentence-ending punctuation
  const sentences = text
    .replace(/([.!?])\s+/g, '$1|')
    .split('|')
    .filter((s) => s.trim().length > 0);

  return sentences.length > 0 ? sentences : [text];
}

/**
 * Split text into words
 */
function splitWords(text: string): string[] {
  return text
    .replace(/[^a-zA-Z\s'-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

/**
 * Check if a word is complex (3+ syllables)
 */
function isComplexWord(word: string): boolean {
  return countSyllables(word) >= 3;
}

/**
 * Calculate Flesch Reading Ease Score
 * 206.835 - 1.015(words/sentences) - 84.6(syllables/words)
 * Higher scores = easier to read (0-100 scale)
 */
function fleschReadingEase(words: number, sentences: number, syllables: number): number {
  if (words === 0 || sentences === 0) return 0;
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate Flesch-Kincaid Grade Level
 * 0.39(words/sentences) + 11.8(syllables/words) - 15.59
 * Returns US grade level (e.g., 8 = 8th grade)
 */
function fleschKincaidGrade(words: number, sentences: number, syllables: number): number {
  if (words === 0 || sentences === 0) return 0;
  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  return Math.max(0, Math.min(20, grade));
}

/**
 * Calculate Automated Readability Index
 * 4.71(characters/words) + 0.5(words/sentences) - 21.43
 */
function automatedReadabilityIndex(characters: number, words: number, sentences: number): number {
  if (words === 0 || sentences === 0) return 0;
  const ari = 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
  return Math.max(0, Math.min(20, ari));
}

/**
 * Calculate SMOG Index
 * 1.0430 * sqrt(complexWords * (30/sentences)) + 3.1291
 */
function smogIndex(complexWords: number, sentences: number): number {
  if (sentences === 0) return 0;
  const smog = 1.0430 * Math.sqrt(complexWords * (30 / sentences)) + 3.1291;
  return Math.max(0, Math.min(20, smog));
}

/**
 * Calculate Coleman-Liau Index
 * 0.0588 * L - 0.296 * S - 15.8
 * L = avg letters per 100 words, S = avg sentences per 100 words
 */
function colemanLiauIndex(characters: number, words: number, sentences: number): number {
  if (words === 0) return 0;
  const L = (characters / words) * 100;
  const S = (sentences / words) * 100;
  const cli = 0.0588 * L - 0.296 * S - 15.8;
  return Math.max(0, Math.min(20, cli));
}

/**
 * Get readability label from Flesch Reading Ease score
 */
function getReadabilityLabel(fleschScore: number): ReadabilityResult['readabilityLabel'] {
  if (fleschScore >= 90) return 'Very Easy';
  if (fleschScore >= 70) return 'Easy';
  if (fleschScore >= 50) return 'Standard';
  if (fleschScore >= 30) return 'Difficult';
  return 'Very Difficult';
}

/**
 * Get audience level from average grade level
 */
function getAudienceLevel(avgGrade: number): ReadabilityResult['audienceLevel'] {
  if (avgGrade <= 6) return 'General Public';
  if (avgGrade <= 10) return 'High School';
  if (avgGrade <= 14) return 'College';
  if (avgGrade <= 18) return 'Graduate';
  return 'Expert';
}

/**
 * Get color based on readability for support responses
 * Target: Standard (Flesch 50-70) for support communications
 */
function getReadabilityColor(fleschScore: number): string {
  if (fleschScore >= 60 && fleschScore <= 80) return 'text-success'; // Ideal range
  if (fleschScore >= 50 && fleschScore <= 90) return 'text-chart-3'; // Good
  if (fleschScore >= 30) return 'text-chart-4'; // Too difficult
  return 'text-destructive'; // Too easy or too hard
}

/**
 * Generate improvement suggestions based on analysis
 */
function generateSuggestions(stats: ReadabilityResult['stats'], fleschScore: number): string[] {
  const suggestions: string[] = [];

  // Sentence length suggestions
  if (stats.avgWordsPerSentence > 25) {
    suggestions.push('Consider breaking up long sentences (avg: ' + stats.avgWordsPerSentence.toFixed(1) + ' words/sentence)');
  }

  // Word complexity suggestions
  if (stats.complexWordPercent > 20) {
    suggestions.push('Simplify vocabulary - ' + stats.complexWordPercent.toFixed(0) + '% complex words');
  }

  // Overall readability suggestions
  if (fleschScore < 50) {
    suggestions.push('Content may be too complex for general audience');
  } else if (fleschScore > 80) {
    suggestions.push('Content is very simple - ensure it provides enough detail');
  }

  // Syllable complexity
  if (stats.avgSyllablesPerWord > 1.7) {
    suggestions.push('Use simpler words where possible (avg: ' + stats.avgSyllablesPerWord.toFixed(2) + ' syllables/word)');
  }

  // Short text warning
  if (stats.sentences < 3) {
    suggestions.push('Short text may produce less accurate readability scores');
  }

  if (suggestions.length === 0) {
    suggestions.push('Readability is good for support communications');
  }

  return suggestions;
}

/**
 * Main function to analyze text readability
 */
export function analyzeReadability(text: string): ReadabilityResult {
  // Clean and parse text
  const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const sentences = splitSentences(cleanText);
  const words = splitWords(cleanText);

  // Calculate basic stats
  const sentenceCount = sentences.length;
  const wordCount = words.length;
  const characterCount = words.join('').length;

  let syllableCount = 0;
  let complexWordCount = 0;

  for (const word of words) {
    const syllables = countSyllables(word);
    syllableCount += syllables;
    if (syllables >= 3) {
      complexWordCount++;
    }
  }

  // Calculate readability scores
  const flesch = fleschReadingEase(wordCount, sentenceCount, syllableCount);
  const fkGrade = fleschKincaidGrade(wordCount, sentenceCount, syllableCount);
  const ari = automatedReadabilityIndex(characterCount, wordCount, sentenceCount);
  const smog = smogIndex(complexWordCount, sentenceCount);
  const cli = colemanLiauIndex(characterCount, wordCount, sentenceCount);

  // Average grade level (excluding Flesch Reading Ease which uses different scale)
  const avgGrade = (fkGrade + ari + smog + cli) / 4;

  const stats = {
    sentences: sentenceCount,
    words: wordCount,
    syllables: syllableCount,
    characters: characterCount,
    avgWordsPerSentence: wordCount / Math.max(1, sentenceCount),
    avgSyllablesPerWord: syllableCount / Math.max(1, wordCount),
    avgCharactersPerWord: characterCount / Math.max(1, wordCount),
    complexWords: complexWordCount,
    complexWordPercent: (complexWordCount / Math.max(1, wordCount)) * 100,
  };

  return {
    fleschReadingEase: Math.round(flesch * 10) / 10,
    fleschKincaidGrade: Math.round(fkGrade * 10) / 10,
    automatedReadabilityIndex: Math.round(ari * 10) / 10,
    smogIndex: Math.round(smog * 10) / 10,
    colemanLiauIndex: Math.round(cli * 10) / 10,
    averageGradeLevel: Math.round(avgGrade * 10) / 10,
    readabilityLabel: getReadabilityLabel(flesch),
    audienceLevel: getAudienceLevel(avgGrade),
    color: getReadabilityColor(flesch),
    suggestions: generateSuggestions(stats, flesch),
    stats,
  };
}

/**
 * Quick readability check - returns just the score and label
 */
export function quickReadabilityScore(text: string): {
  score: number;
  label: string;
  color: string;
} {
  const result = analyzeReadability(text);
  return {
    score: result.fleschReadingEase,
    label: result.readabilityLabel,
    color: result.color,
  };
}
