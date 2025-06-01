import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { parseUrl } from '@aws-sdk/url-parser';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXml = promisify(parseString);

const AKAVE_CREDENTIALS = {
  accessKeyId: 'O3_SXZR8N0M7B76S6L92',
  secretAccessKey: 'LUwNl2j6ahiXAwYiGCMnGhNITWgH7s4HzzulEfN'
};

const AKAVE_ENDPOINT = 'https://o3-rc1.akave.xyz';
export const BUCKET_NAME = 'property-listings-demo';

interface PropertyListing {
  id: string;
  size: string;
  layout: string;
  hasBalcony: boolean;
  hasTerrace: boolean;
  views: string;
  neighborhood: string;
  budget: string;
  deposit: string;
  createdAt: string;
}

interface S3ListItem {
  Key: string;
  LastModified: string;
  Size: string;
}

interface S3ListResult {
  ListBucketResult: {
    Contents: Array<{
      Key: [string];
      LastModified: [string];
      Size: [string];
    }>;
  };
}

// Initialize the AWS signature helper
const signer = new SignatureV4({
  credentials: AKAVE_CREDENTIALS,
  region: 'akave-network',
  service: 's3',
  sha256: Sha256
});

// Upload a property listing
export async function uploadPropertyListing(propertyData: PropertyListing) {
  const key = `properties/${Date.now()}-${propertyData.id}.json`;
  console.log('Uploading property listing:', { bucket: BUCKET_NAME, key, data: propertyData });
  
  try {
    const url = `${AKAVE_ENDPOINT}/${BUCKET_NAME}/${key}`;
    const parsedUrl = parseUrl(url);
    const body = JSON.stringify(propertyData);
    
    const request = new HttpRequest({
      ...parsedUrl,
      method: 'PUT',
      headers: {
        'host': parsedUrl.hostname,
        'content-type': 'application/json',
        'content-length': Buffer.from(body).length.toString()
      },
      body
    });

    const signedRequest = await signer.sign(request);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: signedRequest.headers,
      body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = {
      key,
      response: {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      }
    };

    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Error uploading property:', error);
    throw error;
  }
}

// Get a property listing
export async function getPropertyListing(propertyId: string): Promise<PropertyListing | null> {
  console.log('Fetching property:', propertyId);
  
  try {
    const url = `${AKAVE_ENDPOINT}/${BUCKET_NAME}/properties/${propertyId}`;
    const parsedUrl = parseUrl(url);
    
    const request = new HttpRequest({
      ...parsedUrl,
      method: 'GET',
      headers: {
        'host': parsedUrl.hostname
      }
    });

    const signedRequest = await signer.sign(request);
    
    const response = await fetch(url, {
      headers: signedRequest.headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log('Property data fetched:', data);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting property:', error);
    throw error;
  }
}

// List all properties
export async function listProperties(): Promise<S3ListItem[]> {
  console.log('Listing all properties from bucket:', BUCKET_NAME);
  
  try {
    const url = `${AKAVE_ENDPOINT}/${BUCKET_NAME}`;
    const parsedUrl = parseUrl(url);
    
    const request = new HttpRequest({
      ...parsedUrl,
      method: 'GET',
      headers: {
        'host': parsedUrl.hostname,
        'accept': 'application/xml'
      },
      query: {
        'list-type': '2',
        'prefix': 'properties/'
      }
    });

    const signedRequest = await signer.sign(request);
    
    const queryString = new URLSearchParams({
      'list-type': '2',
      'prefix': 'properties/'
    }).toString();
    
    const response = await fetch(`${url}?${queryString}`, {
      headers: signedRequest.headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log('Raw XML response:', data); // Debug log
    const result = await parseXml(data) as S3ListResult;
    console.log('Parsed XML result:', JSON.stringify(result, null, 2)); // Debug log
    
    const contents = result.ListBucketResult?.Contents || [];
    const formattedContents = contents.map((content) => ({
      Key: content.Key[0],
      LastModified: content.LastModified[0],
      Size: content.Size[0]
    }));

    console.log('Found properties:', formattedContents.length);
    console.log('Property keys:', formattedContents.map((obj: S3ListItem) => obj.Key));
    return formattedContents;
  } catch (error) {
    console.error('Error listing properties:', error);
    throw error;
  }
} 