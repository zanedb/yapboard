import { NextRequest, NextResponse } from 'next/server'
import { isEmpty, isURL } from 'validator'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const Link = body.link
  if (isEmpty(Link) || !isURL(Link))
    return NextResponse.json({ error: 'invalid link' }, { status: 400 })

  const send = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Sounds`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Link,
            },
          },
        ],
      }),
    }
  )

  if (send.status === 200) {
    return NextResponse.json({ success: 'submitted' }, { status: 200 })
  } else {
    const error = await send.json()
    console.log(error)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
