import { NextResponse } from 'next/server'

const endpoint = `https://developer.worldcoin.org/api/v1/verify/app_${process.env.NEXT_PUBLIC_WLD_APP_ID}`

export async function POST(req: Request) {
  const body = await req.json()
  
  const reqBody = {
    merkle_root: body.merkle_root,
    nullifier_hash: body.nullifier_hash,
    proof: body.proof,
    verification_level: body.verification_level,
    action: "verify_landlord"
  }

  try {
    const verifyRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody)
    })

    if (verifyRes.ok) {
      return NextResponse.json({ 
        success: true,
        message: "Successfully verified with World ID"
      })
    } else {
      return NextResponse.json({ 
        success: false,
        message: "Failed to verify with World ID"
      })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      message: "Error verifying with World ID",
      error
    })
  }
} 