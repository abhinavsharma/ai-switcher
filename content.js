// Import Tailwind CSS
function importTailwind() {
  const tailwindLink = document.createElement('link');
  tailwindLink.rel = 'stylesheet';
  tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
  document.head.appendChild(tailwindLink);
}

// AI app configurations
const AI_APPS = [
  {
    name: 'ChatGPT',
    domain: 'chatgpt.com',
    icon: 'Chat',
    color: 'bg-blue-600',
    url: 'https://chatgpt.com/',
    newChatUrl: 'https://chatgpt.com/',
    firstPromptSelector: '[data-testid="conversation-turn-1"] .whitespace-pre-wrap'
  },
  {
    name: 'Gemini',
    domain: 'gemini.google.com',
    icon: 'Gemini',
    color: 'bg-blue-600',
    url: 'https://gemini.google.com/',
    newChatUrl: 'https://gemini.google.com/',
    firstPromptSelector: '.user-query-bubble-with-background'
  },
  {
    name: 'Claude',
    domain: 'claude.ai',
    icon: 'Claude',
    color: 'bg-blue-600',
    url: 'https://claude.ai/',
    newChatUrl: 'https://claude.ai/chats',
    firstPromptSelector: '[data-testid="user-message"]'
  },
  {
    name: 'Grok',
    domain: 'grok.com',
    icon: 'Grok',
    color: 'bg-blue-600',
    url: 'https://grok.com/',
    newChatUrl: 'https://grok.com/',
    firstPromptSelector: '.message-bubble'
  }
];

// Determine current AI app
function getCurrentAIApp() {
  const hostname = window.location.hostname;
  return AI_APPS.find(app => hostname.includes(app.domain));
}

// Detect dark mode
function isDarkMode() {
  // Method 1: Check prefers-color-scheme media query
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  
  // Method 2: Check background color of body or html
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;
  const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
  
  // Convert rgb/rgba to brightness value (0-255)
  const getBrightness = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 255; // Default to light if can't parse
    return (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
  };
  
  const bodyBrightness = getBrightness(bodyBg);
  const htmlBrightness = getBrightness(htmlBg);
  
  // If either body or html has a dark background, consider it dark mode
  return bodyBrightness < 128 || htmlBrightness < 128;
}

// Create and add floating action button with popup menu
function addFloatingActionButtons() {
  const currentApp = getCurrentAIApp();
  if (!currentApp) return; // Not on a supported AI app

  const darkMode = isDarkMode();
  
  // Create main container
  const container = document.createElement('div');
  container.className = 'fixed right-5 bottom-10 flex flex-col items-end z-50';
  
  // Create popup container for the menu items
  const popupContainer = document.createElement('div');
  popupContainer.className = 'hidden mb-3 flex flex-col space-y-3';
  
  // Create main button
  const mainButton = document.createElement('div');
  
  // Set styles based on dark mode
  if (darkMode) {
    mainButton.className = 'py-1 px-4 rounded-full bg-gray-800 border border-gray-600 text-gray-300 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-700 transition-colors duration-200';
  } else {
    mainButton.className = 'py-1 px-4 rounded-full bg-gray-100 border border-gray-300 text-gray-700 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200';
  }
  
  mainButton.innerHTML = 'Copy Prompt <br>& Switch AI';
  mainButton.title = 'Switch to another AI';
  mainButton.style.minWidth = '80px';
  mainButton.style.textAlign = 'center';
  
  // Add hover event to show popup
  container.addEventListener('mouseenter', () => {
    popupContainer.classList.remove('hidden');
  });
  
  // Create a pill button for each AI app except the current one
  AI_APPS.forEach((app, index) => {
    if (app.name === currentApp.name) return; // Skip current app
    
    const pill = document.createElement('div');
    
    // Set styles based on dark mode
    if (darkMode) {
      pill.className = 'py-1 px-4 rounded-full bg-gray-800 border border-gray-600 text-gray-300 flex items-center justify-end text-sm cursor-pointer hover:bg-gray-700 transition-colors duration-200';
    } else {
      pill.className = 'py-1 px-4 rounded-full bg-gray-100 border border-gray-300 text-gray-700 flex items-center justify-end text-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200';
    }
    
    pill.innerHTML = app.name;
    pill.title = `Open in ${app.name}`;
    pill.style.minWidth = '80px'; // Ensure consistent width
    pill.style.textAlign = 'right';
    
    // Add click event to transfer conversation
    pill.addEventListener('click', () => {
      // Hide the popup when an option is clicked
      popupContainer.classList.add('hidden');
      transferConversation(currentApp, app);
    });
    
    popupContainer.appendChild(pill);
  });
  
  // Add click away listener to hide popup when clicking elsewhere
  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) {
      popupContainer.classList.add('hidden');
    }
  });
  
  // Assemble the components
  container.appendChild(popupContainer);
  container.appendChild(mainButton);
  document.body.appendChild(container);
}

// Copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

// Extract first prompt from the current conversation
function extractFirstPrompt(app) {
  const promptElement = document.querySelector(app.firstPromptSelector);
  if (!promptElement) {
    console.warn(`Could not find first prompt using selector: ${app.firstPromptSelector}`);
    return null;
  }
  
  return promptElement.textContent.trim();
}

// Extract conversation content and transfer to another AI app
async function transferConversation(currentApp, targetApp) {
  // Extract the first prompt from the current conversation
  const firstPrompt = extractFirstPrompt(currentApp);
  
  // Try to copy the prompt to clipboard
  if (firstPrompt) {
    const copySuccess = await copyToClipboard(firstPrompt);
    if (copySuccess) {
      console.log('First prompt copied to clipboard');
    } else {
      console.warn('Failed to copy first prompt to clipboard');
    }
  }
  
  // Show feedback to the user
  const feedbackMessage = firstPrompt 
    ? `First prompt copied to clipboard! Opening ${targetApp.name}...` 
    : `Opening ${targetApp.name}...`;
  
  // Create a toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-5 left-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50';
  toast.textContent = feedbackMessage;
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
  
  // Open the target app in a new tab (without paste parameter)
  window.open(targetApp.newChatUrl, '_blank');
}

// Run when page is loaded
window.addEventListener('load', () => {
  importTailwind();
  addFloatingActionButtons();
});