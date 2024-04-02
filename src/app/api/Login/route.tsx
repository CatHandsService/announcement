import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { id, password } = await req.json()

  const adminId = process.env.NEXT_PUBLIC_USER_ID
  const adminPassword = process.env.NEXT_PUBLIC_USER_PASSWORD

  if (id === adminId && password === adminPassword) {
    return NextResponse.json({ authenticated: true }, { status: 200 })
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}