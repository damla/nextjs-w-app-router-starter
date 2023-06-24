import { NextResponse } from 'next/server'

// The response can be viewed in the /api route
export async function GET() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await res.json()

  return NextResponse.json({ data })
}
