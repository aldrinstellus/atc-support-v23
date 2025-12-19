/**
 * Unit Tests for Widget Skeleton Component
 *
 * Tests loading state skeleton UI for widgets.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WidgetSkeleton from '@/components/widgets/WidgetSkeleton';

describe('WidgetSkeleton Component', () => {
  test('should render without crashing', () => {
    render(<WidgetSkeleton />);
    const skeleton = screen.getByTestId('widget-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  test('should have proper accessibility attributes', () => {
    render(<WidgetSkeleton />);
    const skeleton = screen.getByTestId('widget-skeleton');
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
  });

  test('should display loading text', () => {
    render(<WidgetSkeleton />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('should have animated elements', () => {
    const { container } = render(<WidgetSkeleton />);
    const animatedElements = container.querySelectorAll('.animate-pulse');
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  test('should match snapshot', () => {
    const { container } = render(<WidgetSkeleton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
