// Import Tailwind CSS
function importTailwind() {
  const tailwindLink = document.createElement('link');
  tailwindLink.rel = 'stylesheet';
  tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
  document.head.appendChild(tailwindLink);
}

// Create and add the floating action button
function addFloatingActionButton() {
  // Create button element
  const fab = document.createElement('div');
  fab.className = 'fixed bottom-5 right-5 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg cursor-pointer z-50 hover:scale-105 transition-transform duration-200 hover:shadow-xl';
  fab.innerText = '+';
  
  // Add click event
  fab.addEventListener('click', () => {
    alert('FAB clicked!');
    // You can add more functionality here
  });
  
  // Add to the page
  document.body.appendChild(fab);
}

// Run when page is loaded
window.addEventListener('load', () => {
  importTailwind();
  addFloatingActionButton();
});