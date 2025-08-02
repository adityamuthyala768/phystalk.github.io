// Desmos calculator instance
let calculator = null;

// Navigation functionality
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  
  // Show selected page
  document.getElementById(pageId).classList.add('active');
  
  // Update active nav item
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
  
  // Initialize Desmos calculator when Desmos page is shown
  if (pageId === 'desmos' && !calculator) {
    initializeDesmos();
  }
  
  // Hide sidebar on mobile after selection
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('show');
  }
}

// Initialize Desmos Calculator
function initializeDesmos() {
  const elt = document.getElementById('calculator');
  if (elt && typeof Desmos !== 'undefined') {
    try {
      calculator = Desmos.GraphingCalculator(elt, {
        keypad: true,
        expressions: true,
        settingsMenu: true,
        zoomButtons: true,
        expressionsTopbar: true,
        pointsOfInterest: true,
        trace: true,
        border: false,
        lockViewport: false,
        expressionsCollapsed: false
      });
      
      // Add a welcome equation
      calculator.setExpression({
        id: 'welcome',
        latex: 'y = \\sin(x)',
        color: '#3b82f6'
      });
      
      console.log('Desmos calculator initialized successfully');
    } catch (error) {
      console.error('Error initializing Desmos:', error);
      // Fallback: show error message
      elt.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8fafc; color: #64748b; font-size: 1.1em;">Loading Desmos Calculator... Please wait.</div>';
    }
  } else {
    console.error('Desmos API not loaded or calculator element not found');
    // Retry after a short delay
    setTimeout(initializeDesmos, 1000);
  }
}

// Add expression to Desmos
function addExpression(latex) {
  if (calculator) {
    calculator.setExpression({
      id: 'expr_' + Date.now(),
      latex: latex,
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    });
  }
}

// Add custom expression
function addCustomExpression() {
  const input = document.getElementById('customEquation');
  if (input.value.trim() && calculator) {
    calculator.setExpression({
      id: 'custom_' + Date.now(),
      latex: input.value.trim(),
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    });
    input.value = '';
  }
}

// Clear all expressions
function clearGraph() {
  if (calculator) {
    calculator.setBlank();
  }
}

// Toggle sidebar for mobile
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
}

// Calculator functionality
function renderLatex() {
  const input = document.getElementById('latexInput').value;
  const output = document.getElementById('renderedEquation');
  
  if (input.trim()) {
    // Check if input contains display math delimiters
    if (input.includes('$$') || input.includes('\\[')) {
      output.innerHTML = input;
    } else {
      // Wrap in display math delimiters
      output.innerHTML = '$$' + input + '$$';
    }
    
    // Re-render MathJax
    if (window.MathJax) {
      MathJax.typesetPromise([output]);
    }
  }
}

function clearInput() {
  document.getElementById('latexInput').value = '';
  document.getElementById('renderedEquation').innerHTML = 'Enter an equation and click "Render Equation"';
}

function insertTemplate(type) {
  const input = document.getElementById('latexInput');
  const cursorPos = input.selectionStart;
  const currentValue = input.value;
  
  let template = '';
  switch(type) {
    case 'integral':
      template = '\\int_{a}^{b} f(x) dx';
      break;
    case 'derivative':
      template = '\\frac{d}{dx} f(x)';
      break;
    case 'fraction':
      template = '\\frac{numerator}{denominator}';
      break;
    case 'sqrt':
      template = '\\sqrt{x}';
      break;
  }
  
  const newValue = currentValue.substring(0, cursorPos) + template + currentValue.substring(cursorPos);
  input.value = newValue;
  input.focus();
}

function loadTemplate(subject) {
  const input = document.getElementById('latexInput');
  let template = '';
  
  switch(subject) {
    case 'kinematics':
      template = 'v = v_0 + at\n\\\\x = x_0 + v_0 t + \\frac{1}{2}at^2\n\\\\v^2 = v_0^2 + 2a(x - x_0)';
      break;
    case 'thermodynamics':
      template = 'PV = nRT\n\\\\\\Delta U = Q - W\n\\\\S = k \\ln \\Omega';
      break;
    case 'electromagnetism':
      template = '\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})\n\\\\\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\epsilon_0}\n\\\\\\nabla \\times \\vec{B} = \\mu_0 \\vec{J}';
      break;
    case 'quantum':
      template = 'i\\hbar \\frac{\\partial}{\\partial t} \\Psi = \\hat{H} \\Psi\n\\\\[\\hat{x}, \\hat{p}] = i\\hbar\n\\\\E = h\\nu';
      break;
  }
  
  input.value = template;
}

// Handle responsive sidebar
window.addEventListener('resize', function() {
  const sidebar = document.getElementById('sidebar');
  
  if (window.innerWidth > 768) {
    sidebar.classList.remove('show');
    sidebar.classList.remove('hidden');
  }
});

// Handle Enter key in custom equation input
document.addEventListener('DOMContentLoaded', function() {
  const customInput = document.getElementById('customEquation');
  if (customInput) {
    customInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addCustomExpression();
      }
    });
  }
  
  // Add click handlers to nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// Initialize MathJax rendering on page load
window.addEventListener('load', function() {
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
});
