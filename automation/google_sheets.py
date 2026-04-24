# This script will transfer data from Supabase to Google Sheets.
import os
from supabase import create_client, Client
import gspread
import pandas as pd
from dotenv import load_dotenv

# --- Load Environment Variables ---
load_dotenv()  # Load variables from .env file

# --- Configuration from Environment Variables ---
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_ANON_KEY = os.getenv('SUPABASE_ANON_KEY')
GOOGLE_SHEETS_CREDENTIALS_PATH = os.getenv('GOOGLE_SHEETS_CREDENTIALS_PATH')
GOOGLE_SHEET_NAME = os.getenv('GOOGLE_SHEET_NAME')
GOOGLE_SHEET_WORKSHEET_NAME = os.getenv('GOOGLE_SHEET_WORKSHEET_NAME')

# Validate required environment variables
required_vars = {
    'SUPABASE_URL': SUPABASE_URL,
    'SUPABASE_ANON_KEY': SUPABASE_ANON_KEY,
    'GOOGLE_SHEETS_CREDENTIALS_PATH': GOOGLE_SHEETS_CREDENTIALS_PATH,
    'GOOGLE_SHEET_NAME': GOOGLE_SHEET_NAME,
    'GOOGLE_SHEET_WORKSHEET_NAME': GOOGLE_SHEET_WORKSHEET_NAME
}

missing_vars = [name for name, value in required_vars.items() if not value]
if missing_vars:
    raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

# --- Supabase Client Initialization ---
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# --- Google Sheets Client Initialization ---
gc = gspread.service_account(filename=GOOGLE_SHEETS_CREDENTIALS_PATH)
spreadsheet = gc.open(GOOGLE_SHEET_NAME)
worksheet = spreadsheet.worksheet(GOOGLE_SHEET_WORKSHEET_NAME)


def get_applications_data():
    """
    Fetches data from your 'applications' table.
    Using the service_role key here bypasses RLS for this table as well,
    which is typically desired for backend data transfer scripts.
    """
    try:
        response = supabase.from_("applications").select("*").execute()
        if response.data:
            return pd.DataFrame(response.data)
        else:
            print("No data found in 'applications' table.")
            return pd.DataFrame()
    except Exception as e:
        print(f"Error fetching applications data: {e}")
        return pd.DataFrame()


def get_user_emails_from_auth_users_by_id(user_ids: list):
    """
    Fetches user emails from the 'auth.users' table using supabase.auth.admin.get_user_by_id.
    This method requires the service_role key.
    """
    user_emails_map = {}
    for user_id in user_ids:
        try:
            response = supabase.auth.admin.get_user_by_id(user_id)
            if user := response.user:
                user_emails_map[user_id] = user.email if user.email else "Email Not Found"
            else:
                user_emails_map[user_id] = "User Not Found"

        except Exception as e:
            print(f"Error fetching user {user_id} from auth.users: {e}")
            user_emails_map[user_id] = "Error Fetching Email"

    return user_emails_map


def transfer_data_to_google_sheets():
    """
    Transfers data from Supabase 'applications' table to Google Sheets,
    replacing 'createdBy' with user email fetched from 'auth.users'.
    """
    applications_df = get_applications_data()

    if applications_df.empty:
        print("No applications data to transfer. Exiting.")
        return

    created_by_ids = applications_df["createdBy"].dropna().unique().tolist()
    user_emails_map = get_user_emails_from_auth_users_by_id(created_by_ids)

    # Rename the column createdBy_email to 'email' as requested in the final screenshot
    applications_df["email"] = applications_df["createdBy"].apply(
    	lambda uuid: user_emails_map.get(uuid, "N/A")
    )
    applications_df = applications_df.drop(columns=["createdBy"])

    # Let's define the desired order based on the Google Sheet screenshot and your Supabase schema:
    desired_order = [
      'id', 'email', 'firstName', 'lastName', 'city', 'country', 'phone',
      'ieltsScore', 'satScore', 'schoolName', 'grade', 'gpa', 'parentEmail', 'parentPhone',
      'fieldsOfInterest', 'researchInterest', 'motivation',
      'financialAid', 'noFinancialAidMoney', 'extracurriculars',
      'parentFirstName', 'parentLastName', 'additionalInfo', 'createdAt'
    ]

    # We create a new list of columns that are *both* in desired_order and the DataFrame
    final_columns_filtered = [col for col in desired_order if col in applications_df.columns]

    # Add any columns that exist in the DataFrame but weren't in desired_order
    # This prevents accidental data loss if new columns are added to Supabase.
    existing_cols = applications_df.columns.tolist()
    for col in existing_cols:
      	if col not in final_columns_filtered:
            final_columns_filtered.append(col)

    applications_df = applications_df[final_columns_filtered]

    # Sort by 'id' column
    applications_df = applications_df.sort_values(by='id')

    print(applications_df.head())

    # --- Handle list/dict values and NaN values before writing ---
    for col in applications_df.columns:
        applications_df[col] = applications_df[col].apply(
            lambda x: str(x) if isinstance(x, (list, dict, set, tuple)) else x
        )
        applications_df[col] = applications_df[col].fillna('')

    # Prepare DataFrame for gspread (list of lists, including headers)
    data_to_write = [applications_df.columns.tolist()] + applications_df.values.tolist()

    try:
        gc = gspread.service_account(filename=GOOGLE_SHEETS_CREDENTIALS_PATH)
        spreadsheet = gc.open(GOOGLE_SHEET_NAME)
        worksheet = spreadsheet.worksheet(GOOGLE_SHEET_WORKSHEET_NAME)

        worksheet.clear()
        worksheet.update(data_to_write)
        print(f"Successfully transferred {len(applications_df)} rows to Google Sheet '{GOOGLE_SHEET_NAME}' - '{GOOGLE_SHEET_WORKSHEET_NAME}'.")

    except Exception as e:
        print(f"Error writing data to Google Sheets: {e}")

if __name__ == "__main__":
    transfer_data_to_google_sheets()
