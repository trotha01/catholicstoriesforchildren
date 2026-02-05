#!/usr/bin/env python3
"""
Script to update liturgical feast dates in the FeastDays Elm files.
"""

import re
import sys

def read_file(filepath):
    """Read file content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write content to file."""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_feast_entry(content, feast_name):
    """Extract a complete feast entry from the content."""
    # Find the feast entry
    pattern = rf'(\s*,\s*\{{\s*feast\s*=\s*"{re.escape(feast_name)}".*?\n\s*\}}\s*(?=\n\s*,\s*\{{\s*feast|\n\s*\]\s*\n\s*\}}))'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def remove_feast_entry(content, feast_name):
    """Remove a feast entry from the content."""
    pattern = rf'(\s*,\s*\{{\s*feast\s*=\s*"{re.escape(feast_name)}".*?\n\s*\}}\s*(?=\n\s*,\s*\{{\s*feast|\n\s*\]\s*\n\s*\}}))'
    return re.sub(pattern, '', content, flags=re.DOTALL)

def add_feast_to_date(content, date, feast_entry):
    """Add a feast entry to a specific date."""
    # Find the date entry
    date_pattern = rf'(\s*,\s*\{{\s*date\s*=\s*"{date}"\s*\n\s*,\s*feasts\s*=\s*\n\s*\[\s*)(.*?)(\n\s*\]\s*\n\s*\}})'
    match = re.search(date_pattern, content, re.DOTALL)
    
    if match:
        # Add feast to existing date
        before = match.group(1)
        existing_feasts = match.group(2)
        after = match.group(3)
        
        # Add comma if there are existing feasts
        if existing_feasts.strip():
            new_content = before + existing_feasts + feast_entry + after
        else:
            # Remove leading comma from feast_entry if it's the first feast
            clean_feast = feast_entry.lstrip(' ,')
            new_content = before + clean_feast + after
        
        return re.sub(date_pattern, new_content, content, flags=re.DOTALL)
    else:
        # Create new date entry - this is more complex, would need to find the right insertion point
        print(f"Warning: Date {date} not found, would need to create new date entry")
        return content

def update_feast_date_in_same_file(filepath, feast_name, old_date, new_date):
    """Update a feast date within the same file."""
    content = read_file(filepath)
    
    # Simple approach: just change the date
    pattern = rf'(\s*,\s*\{{\s*date\s*=\s*)"{old_date}"(\s*\n\s*,\s*feasts\s*=\s*\n\s*\[\s*\{{\s*feast\s*=\s*"{re.escape(feast_name)}")'
    replacement = rf'\g<1>"{new_date}"\g<2>'
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    if new_content != content:
        write_file(filepath, new_content)
        print(f"Updated {feast_name} from {old_date} to {new_date} in {filepath}")
        return True
    else:
        print(f"Warning: Could not find {feast_name} on {old_date} in {filepath}")
        return False

# Test with Epiphany first
if __name__ == "__main__":
    # Update Epiphany from Jan 5 to Jan 4
    success = update_feast_date_in_same_file(
        "src/Page/FeastDayActivities/FeastDays/M01Jan.elm",
        "The Epiphany of the Lord",
        "05",
        "04"
    )
    
    if success:
        print("Successfully updated Epiphany date")
    else:
        print("Failed to update Epiphany date")

