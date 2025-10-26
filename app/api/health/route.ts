import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'WebCheck API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      analyze: '/api/analyze (POST)',
      health: '/api/health (GET)',
    },
    deployment: {
      method: 'EC2',
      port: 1000,
      host: '0.0.0.0',
      instructions: 'See DEPLOYMENT_GUIDE.md for detailed deployment instructions',
    }
  });
}
