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
    icon: '+', // Replace with actual icon later
    color: 'bg-green-600',
    url: 'https://chatgpt.com/c/'
  },
  {
    name: 'Gemini',
    pattern: 'https://gemini.google.com/app/.+',
    icon: 'G', // Replace with actual icon later
    color: 'bg-blue-600',
    url: 'https://gemini.google.com/app/'
  },
  {
    name: 'Claude',
    pattern: 'https://claude.ai/chat/.+',
    icon: 'C', // Replace with actual icon later
    color: 'bg-blue-600',
    url: 'https://claude.ai/chat/'
  },
  {
    name: 'Grok',
    pattern: 'https://grok.com/chat/.+',
    icon: 'X', // Replace with actual icon later
    color: 'bg-blue-600',
    url: 'https://grok.com/chat/'
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
      transferConversation(app);
    });
    
    fabContainer.appendChild(fab);
  });
  
  document.body.appendChild(fabContainer);
}

// Extract conversation content and transfer to another AI app
function transferConversation(targetApp) {
  // This is a placeholder function - the actual implementation
  // would scrape the current conversation and format it for the target app
  alert(`Transfer conversation to ${targetApp.name}`);
  
  // TODO: Implement conversation extraction based on the current app's DOM structure
  
  // Placeholder for now - would open a new tab with the target app
  // window.open(targetApp.url + 'new', '_blank');
}

// Run when page is loaded
window.addEventListener('load', () => {
  importTailwind();
  addFloatingActionButtons();
});