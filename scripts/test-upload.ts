import { uploadPropertyListing, listProperties, getPropertyListing } from '../utils/akave';

async function testUpload() {
  // Create a sample property listing
  const sampleListing = {
    id: Date.now().toString(),
    size: '75',
    layout: '2br',
    hasBalcony: true,
    hasTerrace: false,
    views: 'City view',
    neighborhood: 'Downtown',
    budget: '2500',
    deposit: '5000',
    createdAt: new Date().toISOString()
  };

  console.log('\n1. Uploading sample listing:', sampleListing);
  try {
    const uploadResponse = await uploadPropertyListing(sampleListing);
    console.log('\nUpload response:', uploadResponse);

    console.log('\n2. Listing all properties:');
    const allListings = await listProperties();
    console.log('Found', allListings.length, 'properties');
    console.log('Property keys:', allListings.map(obj => obj.Key));

    if (allListings.length > 0 && allListings[0].Key) {
      console.log('\n3. Fetching the latest property:');
      const propertyId = allListings[0].Key.split('/')[1];
      const property = await getPropertyListing(propertyId);
      console.log('Property details:', property);
    }
  } catch (error) {
    console.error('\nError during test:', error);
  }
}

// Run the test
testUpload()
  .then(() => console.log('\nTest completed'))
  .catch(console.error); 