import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
import { useState, useEffect } from 'react'
import { Akave } from '@akave/sdk'

export default function PropertyListingApp() {
  const [verified, setVerified] = useState(false)
  const [properties, setProperties] = useState([])
  
  // Initialize Akave client
  const akave = new Akave({
    clientId: process.env.AKAVE_CLIENT_ID,
    endpoint: process.env.AKAVE_ENDPOINT
  })

  async function handleVerify(proof) {
    // Verify the World ID proof
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proof)
    })
    
    if (response.ok) {
      setVerified(true)
    }
  }

  async function handlePropertySubmit(propertyData) {
    if (!verified) {
      alert('Please verify with World ID first')
      return
    }

    // Store property data in Akave
    await akave.store({
      type: 'property',
      data: propertyData,
      metadata: {
        verified: true,
        timestamp: Date.now()
      }
    })

    setProperties([...properties, propertyData])
  }

  return (
    <div>
      <h1>Property Listing Platform</h1>
      
      {!verified ? (
        <div>
          <h2>Verify as Landlord</h2>
          <IDKitWidget
            app_id={process.env.NEXT_PUBLIC_WLD_APP_ID}
            action="verify_landlord"
            onSuccess={handleVerify}
            verification_level={VerificationLevel.Device}
          />
        </div>
      ) : (
        <div>
          <h2>List a Property</h2>
          <PropertyForm onSubmit={handlePropertySubmit} />
        </div>
      )}

      <h2>Available Properties</h2>
      <PropertyList properties={properties} />
    </div>
  )
} 