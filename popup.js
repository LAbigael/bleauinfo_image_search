console.log("popup.js");

chrome.storage.local.get(['images'], function(result) {
  const images = result.images || [];

  // Loop through each link on the page and insert the corresponding image before it
  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const imageUrl = images[i];

    // Create an image element and set its source to the URL
    const img = document.createElement('img');
    img.src = imageUrl;

    // Insert the image before the link element
    link.parentNode.insertBefore(img, link);
  }
});
