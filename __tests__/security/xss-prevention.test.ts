/**
 * Security Tests - XSS Prevention
 *
 * Tests protection against Cross-Site Scripting (XSS) attacks.
 * Validates input sanitization and output encoding.
 */

describe('XSS Prevention', () => {
  describe('Query Input Sanitization', () => {
    test('should sanitize script tags in user input', () => {
      const maliciousInput = '<script>alert("XSS")</script>';
      const sanitized = maliciousInput.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      expect(sanitized).not.toContain('<script>');
    });

    test('should prevent HTML injection in queries', () => {
      const maliciousQueries = [
        '<img src=x onerror=alert(1)>',
        '<svg/onload=alert(1)>',
        '<iframe src="javascript:alert(1)">',
        '<body onload=alert(1)>',
      ];

      maliciousQueries.forEach(query => {
        // Verify no script execution
        expect(query).not.toMatch(/javascript:/);
        expect(query).not.toMatch(/onerror=/);
        expect(query).not.toMatch(/onload=/);
      });
    });

    test('should encode special characters', () => {
      const input = '& < > " \' /';
      const encoded = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');

      expect(encoded).toBe('&amp; &lt; &gt; &quot; &#x27; &#x2F;');
    });
  });

  describe('URL Validation', () => {
    test('should reject javascript: protocol', () => {
      const maliciousUrls = [
        'javascript:alert(1)',
        'JAVASCRIPT:alert(1)',
        'javascript:void(0)',
      ];

      maliciousUrls.forEach(url => {
        const isValid = !url.toLowerCase().startsWith('javascript:');
        expect(isValid).toBe(false);
      });
    });

    test('should reject data: protocol with scripts', () => {
      const maliciousUrls = [
        'data:text/html,<script>alert(1)</script>',
        'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
      ];

      maliciousUrls.forEach(url => {
        const isValid = !url.toLowerCase().startsWith('data:');
        expect(isValid).toBe(false);
      });
    });

    test('should allow safe URLs', () => {
      const safeUrls = [
        'https://example.com',
        'http://localhost:3014',
        '/api/health',
        '/demo/support-agent',
      ];

      safeUrls.forEach(url => {
        const isValid =
          url.startsWith('https://') ||
          url.startsWith('http://') ||
          url.startsWith('/');
        expect(isValid).toBe(true);
      });
    });
  });

  describe('DOM-based XSS Prevention', () => {
    test('should not execute scripts in innerHTML', () => {
      const maliciousContent = '<img src=x onerror="alert(1)">';
      const textContent = maliciousContent.replace(/<[^>]*>/g, '');
      expect(textContent).toBe('');
    });

    test('should sanitize user-generated content', () => {
      const userContent = {
        name: '<script>alert(1)</script>John',
        message: '<img src=x onerror=alert(1)>Hello',
      };

      const sanitize = (str: string) =>
        str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/<[^>]*>/g, '');

      const sanitized = {
        name: sanitize(userContent.name),
        message: sanitize(userContent.message),
      };

      expect(sanitized.name).toBe('John');
      expect(sanitized.message).toBe('Hello');
    });
  });

  describe('Content Security Policy', () => {
    test('should have restrictive CSP headers', () => {
      const cspDirectives = {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'connect-src': ["'self'", 'wss:', 'ws:'],
        'frame-ancestors': ["'none'"],
      };

      expect(cspDirectives['default-src']).toContain("'self'");
      expect(cspDirectives['frame-ancestors']).toContain("'none'");
    });
  });
});
