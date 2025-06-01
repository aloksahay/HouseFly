import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
import { useState, useEffect } from 'react'
import { Akave, AkaveConfig } from '@akave/sdk'

export default function PropertyListingApp() {
  const [verified, setVerified] = useState(false)
  const [properties, setProperties] = useState([])
  
  // Initialize Akave client with O3 configuration
  const akaveConfig: AkaveConfig = {
    clientId: process.env.AKAVE_CLIENT_ID,
    endpoint: 'https://o3-rc1.akave.xyz', // Using the official O3 endpoint
    o3: {
      accessKeyId: process.env.AKAVE_O3_ACCESS_KEY_ID,      // AWS CLI compatible
      secretAccessKey: process.env.AKAVE_O3_SECRET_KEY,     // AWS CLI compatible
      region: 'akave-network',                              // Default region as per docs
      bucket: process.env.AKAVE_O3_BUCKET,
      encryption: true
    },
    acl: {
      enabled: process.env.AKAVE_ACL_ENABLED === 'true',
      mfa: process.env.AKAVE_MFA_REQUIRED === 'true'
    }
  }
  
  const akave = new Akave(akaveConfig)

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

    // Store property data in Akave with enhanced configuration
    await akave.store({
      type: 'property',
      data: propertyData,
      metadata: {
        verified: true,
        timestamp: Date.now(),
        version: '1.0'
      },
      options: {
        // Enable data chunking for large property listings (images, etc)
        chunking: true,
        // Enable Merkle tree verification
        merkleVerification: true,
        // Set content type for proper handling
        contentType: 'application/json'
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