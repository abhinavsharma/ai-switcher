#!/bin/bash
# =============================================================================
# Export Script for AI Switcher Chrome Extension
# This script creates a zip file of the extension with the current date and timestamp
# =============================================================================

# Create releases directory if it doesn't exist
mkdir -p releases

# Get current date and time in format YYYY-MM-DD-HHMMSS
DATE_TIME=$(date +"%Y-%m-%d-%H%M%S")

# Define the output filename
OUTPUT_FILE="releases/ai-switcher-${DATE_TIME}.zip"

# Files to include in the zip
# Add any new files to this array as needed
FILES_TO_INCLUDE=(
  "manifest.json"   # Extension configuration
  "content.js"      # Main JavaScript for the extension
  "style.css"       # CSS styles
  "icon16.png"      # Small icon
  "icon48.png"      # Medium icon
  "icon128.png"     # Large icon
  "pocket-knife.svg" # Original SVG icon
  "README.md"       # Documentation
  "PRIVACY.md"      # Privacy policy
)

# Create the zip file
echo "Creating extension package..."
zip -r "${OUTPUT_FILE}" "${FILES_TO_INCLUDE[@]}"

# Output the result
if [ $? -eq 0 ]; then
  echo "✅ Extension successfully exported to ${OUTPUT_FILE}"
  ls -la "${OUTPUT_FILE}"
  echo ""
  echo "The zip file is ready to be uploaded to the Chrome Web Store."
else
  echo "❌ Error creating zip file"
  exit 1
fi