import { google, sheets_v4 } from 'googleapis';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  ipAddress: string;
}

class GoogleSheetsService {
  private sheets: sheets_v4.Sheets | null = null;
  private auth: InstanceType<typeof google.auth.GoogleAuth> | null = null;

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    try {
      const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
      if (!credentials) {
        console.warn('GOOGLE_SHEETS_CREDENTIALS not set - Google Sheets integration disabled');
        this.sheets = null;
        this.auth = null;
        return;
      }

      let parsedCredentials;
      try {
        parsedCredentials = JSON.parse(credentials);
      } catch {
        console.warn('Invalid Google Sheets credentials JSON - integration disabled');
        this.sheets = null;
        this.auth = null;
        return;
      }

      // Check if credentials look valid (not dummy)
      if (!parsedCredentials.private_key || 
          parsedCredentials.private_key.includes('...') ||
          parsedCredentials.project_id === 'demo') {
        console.warn('Dummy Google Sheets credentials detected - integration disabled');
        this.sheets = null;
        this.auth = null;
        return;
      }
      
      this.auth = new google.auth.GoogleAuth({
        credentials: parsedCredentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      console.log('Google Sheets service initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize Google Sheets - integration disabled:', error instanceof Error ? error.message : String(error));
      this.sheets = null;
      this.auth = null;
    }
  }

  async appendContactFormData(data: ContactFormData): Promise<void> {
    if (!this.sheets) {
      console.log('Google Sheets not initialized - skipping data save');
      return;
    }

    try {
      const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
      if (!spreadsheetId) {
        throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
      }

      const range = 'FormSends!A:H'; // Assuming columns A-H for the data
      const values = [
        [
          data.timestamp,
          data.name,
          data.email,
          data.phone,
          data.subject,
          data.message,
          data.ipAddress,
          // Add a status column
          'New'
        ]
      ];

      const result = await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values,
        },
      });

      console.log('Successfully added contact form data to Google Sheets:', result.data);
    } catch (error) {
      console.error('Error adding data to Google Sheets:', error);
      throw error;
    }
  }

  async ensureHeaderRow(): Promise<void> {
    if (!this.sheets) {
      console.log('Google Sheets not initialized - skipping header row setup');
      return;
    }

    try {
      const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
      if (!spreadsheetId) {
        throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
      }

      // Check if the first row contains headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'FormSends!A1:H1',
      });

      if (!response.data.values || response.data.values.length === 0) {
        // Add header row if it doesn't exist
        const headers = [
          'Timestamp',
          'Name',
          'Email', 
          'Phone',
          'Subject',
          'Message',
          'IP Address',
          'Status'
        ];

        await this.sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'FormSends!A1:H1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers]
          },
        });

        // Format header row
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                repeatCell: {
                  range: {
                    sheetId: 0,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: 8
                  },
                  cell: {
                    userEnteredFormat: {
                      backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 },
                      textFormat: { 
                        foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                        bold: true 
                      }
                    }
                  },
                  fields: 'userEnteredFormat(backgroundColor,textFormat)'
                }
              }
            ]
          }
        });

        console.log('Header row added and formatted');
      }
    } catch (error) {
      console.error('Error ensuring header row:', error);
      // Don't throw here as this is not critical for the main functionality
    }
  }
}

// Create singleton instance
const sheetsService = new GoogleSheetsService();

export { sheetsService };
export type { ContactFormData };