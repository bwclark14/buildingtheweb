// Initialize CodeMirror editors
const htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
    mode: "htmlmixed",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true
});
const cssEditor = CodeMirror.fromTextArea(document.getElementById("css-editor"), {
    mode: "css",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true
});
const jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true
});

// Set initial content for editors
htmlEditor.setValue(`
<body>
  <div class="container">  
    <h1 id="fact-title">This is a website</h1>
    <p> By Me</p>  
    <p id="fact-text"></p>
    <img id="fact-image" src="https://tinyurl.com/csfact101"> 
    <div id="button-container">
      <button id="fact-button">Fact</button>
      <button id="reset-button">Reset</button>
    </div>  
    <p>something can go here</p>
  </div>
</body>
`);
cssEditor.setValue(`
body {
  background-color: purple;
}
.container {
  text-align: center;
  margin: 30px;
  background-color: white;
  border-radius: 0px;
  border: dotted;
  border-color: purple;
  border-width: 3px;
}
`);
jsEditor.setValue(`
const factButton = document.getElementById("fact-button");
const resetButton = document.getElementById("reset-button");
// More JavaScript code here
`);

// Update the preview frame
function updatePreview() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = `<script>${jsEditor.getValue()}</script>`;
    const fullContent = htmlContent + cssContent + jsContent;

    const previewFrame = document.getElementById('preview');
    previewFrame.srcdoc = fullContent; // Inject code into iframe
}

// Listen for changes in editors to update preview
htmlEditor.on("change", updatePreview);
cssEditor.on("change", updatePreview);
jsEditor.on("change", updatePreview);

// Save editor content to localStorage
function saveContentToLocalStorage() {
    localStorage.setItem("htmlContent", htmlEditor.getValue());
    localStorage.setItem("cssContent", cssEditor.getValue());
    localStorage.setItem("jsContent", jsEditor.getValue());
}

// Load content from localStorage if available
function loadContentFromLocalStorage() {
    const savedHtml = localStorage.getItem("htmlContent");
    const savedCss = localStorage.getItem("cssContent");
    const savedJs = localStorage.getItem("jsContent");

    if (savedHtml) htmlEditor.setValue(savedHtml);
    if (savedCss) cssEditor.setValue(savedCss);
    if (savedJs) jsEditor.setValue(savedJs);
}

// Initialize content from localStorage
window.addEventListener("load", loadContentFromLocalStorage);

// Popout preview functionality
document.getElementById("popoutBtn").addEventListener("click", () => {
    const htmlContent = htmlEditor.getValue();
    const cssContent = `<style>${cssEditor.getValue()}</style>`;
    const jsContent = `<script>${jsEditor.getValue()}</script>`;
    const fullContent = `
        <html>
        <head><meta charset="UTF-8"><title>Live Preview</title></head>
        <body>${htmlContent}${cssContent}${jsContent}</body>
        </html>
    `;

    const previewBlob = new Blob([fullContent], { type: 'text/html' });
    const previewUrl = URL.createObjectURL(previewBlob);
    const popoutWindow = window.open(previewUrl, '_blank');
    if (!popoutWindow) alert("Please allow pop-ups to open the preview.");
});

// Select all tab buttons and code editor containers
const tabButtons = document.querySelectorAll('.tab-button');
const codeEditors = document.querySelectorAll('.CodeMirror');

// Function to handle tab switching
function switchTab(event) {
    // Remove active class from all buttons and hide all editors
    tabButtons.forEach(button => button.classList.remove('active'));
    codeEditors.forEach(editor => editor.getWrapperElement().style.display = 'none');

    // Add active class to the clicked tab button
    event.currentTarget.classList.add('active');

    // Get the data-tab attribute value to find the corresponding editor
    const selectedTab = event.currentTarget.getAttribute('data-tab');
    
    // Display the corresponding editor based on data-tab value
    document.getElementById(`${selectedTab}-editor`).CodeMirror.getWrapperElement().style.display = 'block';
}

// Add click event listeners to all tab buttons
tabButtons.forEach(button => {
    button.addEventListener('click', switchTab);
});

