import { NextResponse } from 'next/server'
import capabilities from '@/data/capabilities.json'

export async function GET() {
  return NextResponse.json(capabilities)
}
