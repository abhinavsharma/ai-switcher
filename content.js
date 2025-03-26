// Create and add the floating action button
function addFloatingActionButton() {
  // Create button element
  const fab = document.createElement('div');
  fab.id = 'chatgpt-fab';
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
window.addEventListener('load', addFloatingActionButton);