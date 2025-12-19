/**
 * Unit Tests for Utility Functions Module
 *
 * Tests the cn() utility function for className merging.
 */

import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn() - ClassName Merger', () => {
    test('should merge simple class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    test('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
    });

    test('should filter out falsy values', () => {
      const result = cn('class1', false, null, undefined, 'class2');
      expect(result).toBe('class1 class2');
    });

    test('should merge Tailwind conflicting classes correctly', () => {
      const result = cn('px-2 py-1', 'px-4');
      // Should use last value for conflicting utilities
      expect(result).toContain('px-4');
      expect(result).not.toContain('px-2');
      expect(result).toContain('py-1');
    });

    test('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    test('should handle objects with boolean values', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true,
      });
      expect(result).toContain('class1');
      expect(result).not.toContain('class2');
      expect(result).toContain('class3');
    });

    test('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    test('should handle complex nested conditions', () => {
      const isLarge = true;
      const isDark = false;
      const result = cn(
        'base',
        isLarge && 'text-lg',
        isDark && 'dark:bg-gray-900',
        !isDark && 'bg-white'
      );
      expect(result).toContain('base');
      expect(result).toContain('text-lg');
      expect(result).toContain('bg-white');
      expect(result).not.toContain('dark:bg-gray-900');
    });

    test('should deduplicate identical classes', () => {
      const result = cn('class1 class1', 'class1');
      // After merging, should have only one instance
      const classes = result.split(' ');
      expect(classes.filter(c => c === 'class1').length).toBe(1);
    });
  });
});
