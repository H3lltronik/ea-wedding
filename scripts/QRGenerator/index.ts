import { createClient } from '@supabase/supabase-js';
import * as QRCode from 'qrcode';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Database } from './types';

// Try to load environment variables from various locations
const envPaths = [
  path.resolve(__dirname, '../../.env.local'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../.env.development'),
  path.resolve(__dirname, '../../.env.production')
];

// Try each path until we find one
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    console.log(`Loading environment from ${envPath}`);
    dotenv.config({ path: envPath });
    break;
  }
}

// Allow manual input if not found in environment
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Flag to indicate if we're using test data
let useTestData = false;

if (!supabaseUrl || !supabaseKey) {
  console.log('Supabase credentials not found in environment variables.');
  console.log('Using test data mode for demonstration.');
  useTestData = true;
  
  // Still set these for TypeScript, but they won't be used
  supabaseUrl = 'https://example.com';
  supabaseKey = 'dummy-key';
}

// Initialize Supabase client (only used if not in test mode)
const supabase = !useTestData 
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;

// Constants
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const BASE_URL = 'https://ea-wedding-production.up.railway.app';

// Types
interface RootInvitation {
  id: string;
  name: string;
}

// Test data to use when Supabase is not available
const TEST_INVITATIONS: RootInvitation[] = [
  { id: 'f9e6dfff-3d34-4a19-b605-7be52064c5ca', name: 'Eduardo y Alejandra' },
  { id: 'a1b2c3d4-e5f6-4a19-b605-7be52064c5ca', name: 'Juan y María' },
  { id: 'abcdef12-3456-4a19-b605-7be52064c5ca', name: 'Carlos y Ana' },
  { id: '12345678-abcd-4a19-b605-7be52064c5ca', name: 'Roberto y Lucía' },
];

/**
 * Clear the output directory
 */
async function clearOutput(): Promise<void> {
  console.log('Clearing output directory...');
  await fs.emptyDir(OUTPUT_DIR);
  console.log('Output directory cleared');
}

/**
 * Fetches all root invitations from Supabase or returns test data
 */
async function fetchRootInvitations(): Promise<RootInvitation[]> {
  console.log('Fetching root invitations...');
  
  // If using test data, return the test invitations
  if (useTestData) {
    console.log(`Using test data: ${TEST_INVITATIONS.length} invitations`);
    return TEST_INVITATIONS;
  }
  
  // Otherwise, fetch from Supabase
  const { data, error } = await supabase!
    .from('root_invitations')
    .select('id, name');
  
  if (error) {
    console.error('Error fetching root invitations:', error.message);
    throw error;
  }
  
  console.log(`Found ${data.length} root invitations`);
  return data;
}

/**
 * Encodes a string to base64
 */
function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

/**
 * Generates QR codes for a root invitation
 */
async function generateQRCodes(invitation: RootInvitation): Promise<void> {
  if (!invitation.name) {
    console.log(`Skipping invitation with ID ${invitation.id} (no name)`);
    return;
  }

  const base64Id = encodeBase64(invitation.id);
  const folderName = invitation.name.replace(/[^a-zA-Z0-9]/g, '_');
  const outputFolder = path.join(OUTPUT_DIR, folderName);
  
  // Create folder
  await fs.ensureDir(outputFolder);
  
  console.log(`Generating QR codes for ${invitation.name}...`);
  
  // Generate UUID QR code
  await QRCode.toFile(
    path.join(outputFolder, 'uuid.png'),
    invitation.id,
    {
      width: 500,
      margin: 1,
      errorCorrectionLevel: 'H',
    }
  );
  
  // Generate URL QR code
  const url = `${BASE_URL}/?code=${base64Id}`;
  await QRCode.toFile(
    path.join(outputFolder, 'url.png'),
    url,
    {
      width: 500,
      margin: 1,
      errorCorrectionLevel: 'H',
    }
  );
  
  console.log(`✅ QR codes generated for ${invitation.name}`);
  console.log(`   UUID QR: ${invitation.id}`);
  console.log(`   URL QR: ${url}`);
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    // Clear output directory
    await clearOutput();
    
    // Fetch all root invitations
    const invitations = await fetchRootInvitations();
    
    // Generate QR codes for each invitation
    for (const invitation of invitations) {
      await generateQRCodes(invitation);
    }
    
    console.log('✅ All QR codes generated successfully!');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('Error generating QR codes:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 