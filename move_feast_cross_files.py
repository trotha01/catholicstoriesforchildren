#!/usr/bin/env python3
"""
Script to move feasts between different month files.
"""

import re

def read_file(filepath):
    """Read file content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write content to file."""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_feast_from_date(content, feast_name, date):
    """Extract a specific feast from a date entry, leaving other feasts."""
    # Find the date entry
    date_pattern = rf'(\s*,\s*\{{\s*date\s*=\s*"{date}"\s*\n\s*,\s*feasts\s*=\s*\n\s*\[)(.*?)(\n\s*\]\s*\n\s*\}})'
    date_match = re.search(date_pattern, content, re.DOTALL)
    
    if not date_match:
        print(f"Date {date} not found")
        return None, content
    
    feasts_content = date_match.group(2)
    
    # Find the specific feast
    feast_pattern = rf'(\s*\{{\s*feast\s*=\s*"{re.escape(feast_name)}".*?\n\s*\}}\s*(?:,\s*)?)'
    feast_match = re.search(feast_pattern, feasts_content, re.DOTALL)
    
    if not feast_match:
        print(f"Feast {feast_name} not found on date {date}")
        return None, content
    
    feast_entry = feast_match.group(1).rstrip(' ,')
    
    # Remove the feast from the original content
    remaining_feasts = re.sub(feast_pattern, '', feasts_content, flags=re.DOTALL)
    remaining_feasts = re.sub(r',\s*,', ',', remaining_feasts)  # Clean up double commas
    remaining_feasts = remaining_feasts.strip(' ,\n')
    
    if remaining_feasts:
        # Update the date entry with remaining feasts
        new_date_entry = f"{date_match.group(1)}\n                {remaining_feasts}{date_match.group(3)}"
        new_content = content[:date_match.start()] + new_date_entry + content[date_match.end():]
    else:
        # Remove the entire date entry if no feasts remain
        new_content = content[:date_match.start()] + content[date_match.end():]
    
    return feast_entry, new_content

def add_date_entry_to_file(content, date, feast_entry):
    """Add a new date entry with a feast to the file."""
    # Find the right insertion point (after the previous date)
    prev_date = str(int(date) - 1).zfill(2)
    
    # Look for the previous date
    prev_pattern = rf'(\s*,\s*\{{\s*date\s*=\s*"{prev_date}".*?\n\s*\}}\s*)'
    prev_match = re.search(prev_pattern, content, re.DOTALL)
    
    if prev_match:
        insertion_point = prev_match.end()
    else:
        # If no previous date found, try to find a good insertion point
        # Look for the last date entry before our target date
        all_dates = re.findall(r'date\s*=\s*"(\d+)"', content)
        all_dates = [int(d) for d in all_dates if int(d) < int(date)]
        
        if all_dates:
            last_date = str(max(all_dates)).zfill(2)
            last_pattern = rf'(\s*,\s*\{{\s*date\s*=\s*"{last_date}".*?\n\s*\}}\s*)'
            last_match = re.search(last_pattern, content, re.DOTALL)
            if last_match:
                insertion_point = last_match.end()
            else:
                insertion_point = len(content) - 100  # Near the end
        else:
            insertion_point = len(content) - 100  # Near the end
    
    # Create the new date entry
    new_date_entry = f'''        , {{ date = "{date}"
          , feasts =
                [ {feast_entry.strip()}
                ]
          }}
'''
    
    # Insert the new date entry
    new_content = content[:insertion_point] + new_date_entry + content[insertion_point:]
    
    return new_content

def move_feast_cross_files(source_file, target_file, feast_name, source_date, target_date):
    """Move a feast from one file to another."""
    print(f"Moving {feast_name} from {source_file}:{source_date} to {target_file}:{target_date}")
    
    # Extract feast from source file
    source_content = read_file(source_file)
    feast_entry, new_source_content = extract_feast_from_date(source_content, feast_name, source_date)
    
    if feast_entry is None:
        return False
    
    # Add feast to target file
    target_content = read_file(target_file)
    new_target_content = add_date_entry_to_file(target_content, target_date, feast_entry)
    
    # Write both files
    write_file(source_file, new_source_content)
    write_file(target_file, new_target_content)
    
    print(f"Successfully moved {feast_name}")
    return True

if __name__ == "__main__":
    # Move Palm Sunday from April 13 to March 29
    success = move_feast_cross_files(
        "src/Page/FeastDayActivities/FeastDays/M04Apr.elm",
        "src/Page/FeastDayActivities/FeastDays/M03Mar.elm",
        "Palm Sunday of the Lord's Passion",
        "13",
        "29"
    )
    
    if success:
        print("Palm Sunday move completed successfully")
    else:
        print("Failed to move Palm Sunday")

