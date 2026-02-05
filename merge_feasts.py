#!/usr/bin/env python3
"""
Script to merge duplicate date entries in FeastDays Elm files.
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

def merge_duplicate_dates(content, date):
    """Merge duplicate date entries."""
    # Find all date entries for the specified date
    pattern = rf'(\s*,\s*\{{\s*date\s*=\s*"{date}"\s*\n\s*,\s*feasts\s*=\s*\n\s*\[)(.*?)(\n\s*\]\s*\n\s*\}})'
    
    matches = list(re.finditer(pattern, content, re.DOTALL))
    
    if len(matches) <= 1:
        return content  # No duplicates to merge
    
    print(f"Found {len(matches)} entries for date {date}, merging...")
    
    # Extract all feast entries
    all_feasts = []
    for match in matches:
        feast_content = match.group(2).strip()
        if feast_content:
            all_feasts.append(feast_content)
    
    # Create merged entry
    merged_feasts = '\n            , '.join(all_feasts)
    merged_entry = f'{matches[0].group(1)}\n            {merged_feasts}{matches[0].group(3)}'
    
    # Remove all original entries
    for match in reversed(matches):  # Remove in reverse order to maintain positions
        content = content[:match.start()] + content[match.end():]
    
    # Find insertion point (after the previous date entry)
    prev_date = str(int(date) - 1).zfill(2)
    prev_pattern = rf'(\s*,\s*\{{\s*date\s*=\s*"{prev_date}".*?\n\s*\}}\s*)'
    prev_match = re.search(prev_pattern, content, re.DOTALL)
    
    if prev_match:
        insertion_point = prev_match.end()
        content = content[:insertion_point] + merged_entry + content[insertion_point:]
    else:
        # If no previous date found, try to find a good insertion point
        print(f"Warning: Could not find insertion point for merged date {date}")
        content = content + merged_entry
    
    return content

if __name__ == "__main__":
    filepath = "src/Page/FeastDayActivities/FeastDays/M01Jan.elm"
    content = read_file(filepath)
    
    # Merge duplicate January 4th entries
    new_content = merge_duplicate_dates(content, "04")
    
    if new_content != content:
        write_file(filepath, new_content)
        print("Successfully merged duplicate January 4th entries")
    else:
        print("No changes needed")

