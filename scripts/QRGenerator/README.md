# QR Generator for Wedding Invitations

This script generates QR codes for wedding invitations based on data from Supabase.

## Features

- Connects to Supabase to fetch all root invitations
- Creates a folder for each invitation with the guest's name
- Generates two QR codes per invitation:
  1. A QR code containing just the UUID of the invitation
  2. A QR code with a URL that includes a base64-encoded version of the UUID
- Cleans the output directory before each run

## Requirements

- Node.js (>= 14)
- npm or yarn

## Setup

1. Make sure you have the correct `.env.local` file at the root of the project with Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

From the project root, run:

```bash
npm run generate:qr
```

The QR codes will be generated in the `scripts/QRGenerator/output` directory, with one subfolder per invitation named after the guest's name.

Each folder will contain:
- `uuid.png`: QR code with just the UUID
- `url.png`: QR code with the URL including the base64-encoded UUID 