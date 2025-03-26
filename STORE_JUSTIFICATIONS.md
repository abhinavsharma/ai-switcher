# Chrome Web Store Justifications

## Permission Justifications

### activeTab
The extension needs access to the active tab to detect when the user is on an AI chat platform and to identify appropriate elements for transferring conversations.

### scripting
Scripting permission is required to inject our content script dynamically when needed, enabling the extension to interact with AI chat interfaces only when necessary.

### clipboardWrite
The extension requires clipboard access to copy conversation content when transferring between different AI platforms, eliminating the need for manual copying and pasting.

## Host Permissions

### *://*/*
Our extension needs to work across multiple AI chat services (like ChatGPT, Claude, Google Gemini, etc.). The broad host permission is necessary to function on all these platforms without requiring separate permissions for each service.
- The extension only activates its features on recognized AI chat interfaces
- No user data is collected or transmitted to external servers
- All conversation processing happens locally within the browser

## Data Usage and Privacy
- AI Switcher does not collect, store, or transmit user data to any external servers
- All conversation processing happens locally in the browser
- No analytics or tracking is implemented
- The extension does not use cookies or local storage for persistent data

## Code Security
- All code is open source and available for review
- No external libraries are loaded at runtime
- No network requests are made to external services
- The extension uses only documented Chrome extension APIs