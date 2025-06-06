document.addEventListener("DOMContentLoaded", function() {
    const includeElements = document.querySelectorAll("[data-include]");
  
    includeElements.forEach(async (el) => {
      const file = el.getAttribute("data-include");
      const res = await fetch(file);
      const content = await res.text();
      el.innerHTML = content;
    });
  });