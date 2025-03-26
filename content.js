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
    pattern: 'https://chatgpt.com/c/.+',
    icon: '+',
    color: 'bg-green-600',
    url: 'https://chatgpt.com/',
    newChatUrl: 'https://chatgpt.com/',
    firstPromptSelector: '[data-testid="conversation-turn-1"] .whitespace-pre-wrap'
  },
  {
    name: 'Gemini',
    pattern: 'https://gemini.google.com/app/.+',
    icon: 'G',
    color: 'bg-blue-600',
    url: 'https://gemini.google.com/app/',
    newChatUrl: 'https://gemini.google.com/',
    firstPromptSelector: '.first-prompt-selector', // Placeholder for actual selector
  },
  {
    name: 'Claude',
    pattern: 'https://claude.ai/chat/.+',
    icon: 'C',
    color: 'bg-purple-600',
    url: 'https://claude.ai/chat/',
    newChatUrl: 'https://claude.ai/chats',
    firstPromptSelector: '[data-testid="user-message"]', // Placeholder for actual selector
  },
  {
    name: 'Grok',
    pattern: 'https://grok.com/chat/.+',
    icon: 'X',
    color: 'bg-red-600',
    url: 'https://grok.com/chat/',
    newChatUrl: 'https://grok.com/',
    firstPromptSelector: '.message-bubble', // Placeholder for actual selector
  }
];

// Determine current AI app
function getCurrentAIApp() {
  const currentUrl = window.location.href;
  return AI_APPS.find(app => new RegExp(app.pattern).test(currentUrl));
}

// Create and add floating action buttons for other AI apps
function addFloatingActionButtons() {
  const currentApp = getCurrentAIApp();
  if (!currentApp) return; // Not on a supported AI app

  const fabContainer = document.createElement('div');
  fabContainer.className = 'fixed right-5 bottom-10 flex flex-col space-y-3 z-50';
  
  // Create a FAB for each AI app except the current one
  AI_APPS.forEach((app, index) => {
    if (app.name === currentApp.name) return; // Skip current app
    
    const fab = document.createElement('div');
    fab.className = `w-12 h-12 rounded-full ${app.color} text-white flex items-center justify-center text-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-xl`;
    fab.innerHTML = app.icon;
    fab.title = `Open in ${app.name}`;
    
    // Add click event to transfer conversation
    fab.addEventListener('click', () => {
      transferConversation(currentApp, app);
    });
    
    fabContainer.appendChild(fab);
  });
  
  document.body.appendChild(fabContainer);
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
  
  // Open the target app in a new tab
  window.open(targetApp.newChatUrl, '_blank');
}

// Run when page is loaded
window.addEventListener('load', () => {
  importTailwind();
  addFloatingActionButtons();
});