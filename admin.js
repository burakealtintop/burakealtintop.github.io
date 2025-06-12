document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("postForm");
    const previewArea = document.getElementById("preview");
  
    postForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const title = document.getElementById("title").value.trim();
      const content = document.getElementById("content").value.trim();
      const imageInput = document.getElementById("image");
  
      if (!title || !content) {
        alert("Lütfen başlık ve içerik girin.");
        return;
      }
  
      const reader = new FileReader();
  
      const sendPost = (imageData) => {
        // Gönderiyi backend'e POST et
        fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            content: content,
            image: imageData,
            date: new Date().toLocaleDateString("tr-TR"),
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Kaydetme başarısız");
            return res.text();
          })
          .then(() => {
            alert("Gönderi başarıyla kaydedildi!");
            appendPost(title, content, imageData);
            postForm.reset();
          })
          .catch((err) => {
            alert("Hata: " + err.message);
          });
      };
  
      if (imageInput.files.length > 0) {
        reader.onload = function (event) {
          sendPost(event.target.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        sendPost(null);
      }
    });
  
    function appendPost(title, content, imageHTML) {
      const post = document.createElement("article");
      post.className = "blog-post";
      post.innerHTML = `
        <h2>${title}</h2>
        <p class="date">${new Date().toLocaleDateString("tr-TR")}</p>
        <p>${content}</p>
        ${
          imageHTML
            ? `<img src="${imageHTML}" style="max-width:100%; border-radius:6px; margin-top:10px;" />`
            : ""
        }
      `;
      previewArea.innerHTML = "";
      previewArea.appendChild(post);
    }
  });