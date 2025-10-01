import { NextResponse } from 'next/server';
import { sheetsService } from '@/lib/sheets';

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  services: {
    application: {
      status: 'up' | 'down';
      message: string;
    };
    googleSheets: {
      status: 'up' | 'down' | 'error';
      message: string;
      lastChecked?: string;
    };
  };
  uptime: number;
  responseTime?: string;
}

export async function GET() {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  
  const healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp,
    version: process.env.npm_package_version || '1.0.0',
    services: {
      application: {
        status: 'up',
        message: 'Application is running'
      },
      googleSheets: {
        status: 'down',
        message: 'Not checked yet'
      }
    },
    uptime: process.uptime() || 0
  };

  // Test Google Sheets connectivity
  try {
    // Create a simple test to verify sheets service is working
    await sheetsService.testConnection();
    
    healthStatus.services.googleSheets = {
      status: 'up',
      message: 'Google Sheets service is accessible',
      lastChecked: timestamp
    };
  } catch (error) {
    console.error('Health check - Google Sheets error:', error);
    
    healthStatus.services.googleSheets = {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error accessing Google Sheets',
      lastChecked: timestamp
    };
    
    // If Google Sheets is down, mark overall status as degraded
    healthStatus.status = 'degraded';
  }

  // Determine overall status
  if (healthStatus.services.googleSheets.status === 'error') {
    healthStatus.status = 'degraded';
  }

  const responseTime = Date.now() - startTime;
  
  // Add response time to the health status
  healthStatus.responseTime = `${responseTime}ms`;

  // Return appropriate HTTP status codes
  const httpStatus = healthStatus.status === 'healthy' ? 200 : 
                    healthStatus.status === 'degraded' ? 207 : 503;

  return NextResponse.json(healthStatus, { status: httpStatus });
}

// Also support HEAD requests for simple alive checks
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}