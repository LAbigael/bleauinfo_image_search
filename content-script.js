console.log("content-script.js");
// Get all the links on the page
var links = document
  .getElementsById("the_search_results")
  .getElementsByClassName("vsra");

// Loop through each link and extract the image URLs
const images = [];
for (let i = 0; i < links.length; i++) {
  const link = links[i];

  // Fetch the HTML of the link's URL
  fetch(link.href)
    .then((response) => response.text())
    .then((html) => {
      // Create a temporary div element to parse the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      // Find the first image on the page and add its URL to the images array
      const img = tempDiv.querySelector("img");
      if (img) {
        images.push(img.src);
      }

      // Save the images to local storage when all links have been processed
      if (i === links.length - 1) {
        chrome.storage.local.set({ images: images });
      }
    })
    .catch((error) => {
      console.error("Error fetching URL:", link.href, error);
    });
}
