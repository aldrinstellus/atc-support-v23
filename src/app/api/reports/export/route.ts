import { NextRequest, NextResponse } from 'next/server';

interface ExportRequest {
  reportId: string;
  format: 'csv' | 'pdf' | 'xlsx';
  data: {
    summary: Record<string, unknown>;
    metrics: Array<{ label: string; value: number; change?: number }>;
    chartData?: unknown;
  };
}

function generateCSV(data: ExportRequest['data']): string {
  const lines: string[] = [];

  // Summary section
  lines.push('REPORT SUMMARY');
  lines.push('Metric,Value');
  Object.entries(data.summary).forEach(([key, value]) => {
    lines.push(`${key.replace(/([A-Z])/g, ' $1').trim()},${value}`);
  });

  lines.push('');
  lines.push('DETAILED METRICS');
  lines.push('Metric,Value,Change (%)');
  data.metrics.forEach(metric => {
    const change = metric.change !== undefined ? metric.change.toFixed(1) : 'N/A';
    lines.push(`${metric.label},${metric.value},${change}`);
  });

  return lines.join('\n');
}

function generatePDFContent(data: ExportRequest['data']): string {
  // In a real implementation, this would use a PDF library
  // For demo, we return a structured text representation
  return JSON.stringify({
    type: 'pdf',
    title: 'Report Export',
    generatedAt: new Date().toISOString(),
    sections: [
      { title: 'Summary', content: data.summary },
      { title: 'Metrics', content: data.metrics },
    ],
  }, null, 2);
}

function generateXLSXContent(data: ExportRequest['data']): string {
  // In a real implementation, this would use xlsx library
  // For demo, we return a structured representation
  return JSON.stringify({
    type: 'xlsx',
    sheets: [
      {
        name: 'Summary',
        data: Object.entries(data.summary).map(([key, value]) => ({
          metric: key,
          value,
        })),
      },
      {
        name: 'Metrics',
        data: data.metrics,
      },
    ],
  }, null, 2);
}

export async function POST(request: NextRequest) {
  try {
    const body: ExportRequest = await request.json();
    const { reportId, format, data } = body;

    if (!reportId || !format || !data) {
      return NextResponse.json(
        { error: 'Report ID, format, and data are required' },
        { status: 400 }
      );
    }

    const validFormats = ['csv', 'pdf', 'xlsx'];
    if (!validFormats.includes(format)) {
      return NextResponse.json(
        { error: `Invalid format. Supported: ${validFormats.join(', ')}` },
        { status: 400 }
      );
    }

    let content: string;
    let contentType: string;
    let filename: string;

    switch (format) {
      case 'csv':
        content = generateCSV(data);
        contentType = 'text/csv';
        filename = `report-${reportId}.csv`;
        break;
      case 'pdf':
        content = generatePDFContent(data);
        contentType = 'application/pdf';
        filename = `report-${reportId}.pdf`;
        break;
      case 'xlsx':
        content = generateXLSXContent(data);
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        filename = `report-${reportId}.xlsx`;
        break;
      default:
        content = JSON.stringify(data);
        contentType = 'application/json';
        filename = `report-${reportId}.json`;
    }

    // For demo purposes, return download info
    // In production, this would return the actual file or a download URL
    return NextResponse.json({
      success: true,
      export: {
        reportId,
        format,
        filename,
        contentType,
        size: `${(content.length / 1024).toFixed(2)} KB`,
        downloadUrl: `/api/reports/download/${reportId}?format=${format}`,
        generatedAt: new Date().toISOString(),
      },
      // Include content for demo
      preview: format === 'csv' ? content.split('\n').slice(0, 10).join('\n') + '\n...' : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to export report' },
      { status: 500 }
    );
  }
}
