window.addEventListener("DOMContentLoaded", () => {
    loadPosts();
});

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => {
        const imageHTML = post.image ? `<img src="${post.image}" style="max-width:100%; border-radius:6px; margin-top:10px;" />` : "";
        const postElement = document.createElement("article");
        postElement.className = "blog-post";
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p class="date">${post.date}</p>
            <p>${post.content}</p>
            ${imageHTML}
        `;
        document.getElementById("posts").appendChild(postElement);
    });
}