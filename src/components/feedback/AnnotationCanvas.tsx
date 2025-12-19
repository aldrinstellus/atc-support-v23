'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { useFeedback } from '@/contexts/FeedbackContext';
import type { Annotation, Point } from '@/types/feedback';

interface AnnotationCanvasProps {
  width: number;
  height: number;
  onAnnotationComplete?: (annotation: Annotation) => void;
}

export function AnnotationCanvas({ width, height, onAnnotationComplete }: AnnotationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { selectedTool, toolColor, annotations, addAnnotation } = useFeedback();

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [textInput, setTextInput] = useState<{ show: boolean; x: number; y: number }>({
    show: false,
    x: 0,
    y: 0,
  });

  const getCanvasPoint = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (selectedTool === 'text') {
        const point = getCanvasPoint(e);
        setTextInput({ show: true, x: point.x, y: point.y });
        return;
      }

      setIsDrawing(true);
      const point = getCanvasPoint(e);
      setCurrentPoints([point]);
    },
    [selectedTool, getCanvasPoint]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const point = getCanvasPoint(e);
      setCurrentPoints((prev) => [...prev, point]);
    },
    [isDrawing, getCanvasPoint]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || currentPoints.length < 2) {
      setIsDrawing(false);
      setCurrentPoints([]);
      return;
    }

    const annotation: Annotation = {
      id: crypto.randomUUID(),
      tool: selectedTool,
      points: currentPoints,
      color: toolColor,
      strokeWidth: 3,
      startPoint: currentPoints[0],
      endPoint: currentPoints[currentPoints.length - 1],
    };

    addAnnotation(annotation);
    onAnnotationComplete?.(annotation);
    setIsDrawing(false);
    setCurrentPoints([]);
  }, [isDrawing, currentPoints, selectedTool, toolColor, addAnnotation, onAnnotationComplete]);

  const handleTextSubmit = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setTextInput({ show: false, x: 0, y: 0 });
        return;
      }

      const annotation: Annotation = {
        id: crypto.randomUUID(),
        tool: 'text',
        points: [{ x: textInput.x, y: textInput.y }],
        color: toolColor,
        strokeWidth: 3,
        text: text.trim(),
        startPoint: { x: textInput.x, y: textInput.y },
      };

      addAnnotation(annotation);
      onAnnotationComplete?.(annotation);
      setTextInput({ show: false, x: 0, y: 0 });
    },
    [textInput, toolColor, addAnnotation, onAnnotationComplete]
  );

  // Render annotations
  const renderAnnotations = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allAnnotations = [
      ...annotations,
      ...(currentPoints.length > 0
        ? [
            {
              id: 'current',
              tool: selectedTool,
              points: currentPoints,
              color: toolColor,
              strokeWidth: 3,
            } as Annotation,
          ]
        : []),
    ];

    allAnnotations.forEach((annotation) => {
      ctx.strokeStyle = annotation.color;
      ctx.fillStyle = annotation.color;
      ctx.lineWidth = annotation.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      switch (annotation.tool) {
        case 'freehand':
          drawFreehand(ctx, annotation.points);
          break;
        case 'arrow':
          drawArrow(ctx, annotation.points);
          break;
        case 'rectangle':
          drawRectangle(ctx, annotation.points);
          break;
        case 'highlight':
          drawHighlight(ctx, annotation.points, annotation.color);
          break;
        case 'text':
          if (annotation.text) {
            drawText(ctx, annotation.points[0], annotation.text, annotation.color);
          }
          break;
      }
    });
  }, [annotations, currentPoints, selectedTool, toolColor]);

  useEffect(() => {
    renderAnnotations();
  }, [renderAnnotations]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="absolute top-0 left-0 cursor-crosshair"
        style={{ touchAction: 'none' }}
      />
      {textInput.show && (
        <input
          type="text"
          autoFocus
          className="absolute bg-card border border-border rounded px-2 py-1 text-sm text-foreground"
          style={{ left: textInput.x, top: textInput.y }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTextSubmit(e.currentTarget.value);
            } else if (e.key === 'Escape') {
              setTextInput({ show: false, x: 0, y: 0 });
            }
          }}
          onBlur={(e) => handleTextSubmit(e.target.value)}
        />
      )}
    </div>
  );
}

// Drawing helper functions
function drawFreehand(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.stroke();
}

function drawArrow(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return;
  const start = points[0];
  const end = points[points.length - 1];

  // Line
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  // Arrowhead
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const headLength = 15;

  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle - Math.PI / 6),
    end.y - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle + Math.PI / 6),
    end.y - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

function drawRectangle(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return;
  const start = points[0];
  const end = points[points.length - 1];

  ctx.beginPath();
  ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
}

function drawHighlight(ctx: CanvasRenderingContext2D, points: Point[], color: string) {
  if (points.length < 2) return;
  const start = points[0];
  const end = points[points.length - 1];

  // Parse color and add transparency
  ctx.fillStyle = color + '40'; // 25% opacity
  ctx.fillRect(start.x, start.y, end.x - start.x, end.y - start.y);
}

function drawText(ctx: CanvasRenderingContext2D, point: Point, text: string, color: string) {
  ctx.font = '16px Inter, sans-serif';
  ctx.fillStyle = color;
  ctx.fillText(text, point.x, point.y);
}
