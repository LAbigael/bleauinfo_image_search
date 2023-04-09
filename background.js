chrome.action.onClicked.addListener(function(tab) {
  console.log("background.js 1");
  if (tab.url.startsWith("https://bleau.info")) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: function() {
          // Get all the links on the page
          let links = document.getElementsByClassName("vsr");
          console.log(links);
          links = [...links].reduce((acc, el) => {
            const a = el.querySelector("a");
            if (a) {
              acc.push(a);
            }
            return acc;
          }, []);

          // Loop through each link and extract the image URLs
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
                const img = tempDiv.querySelector(".boulder_photo img");
                if (img) {
                  const img_elem = document.createElement("img");
                  img_elem.src = img.src;

                  // Insert the image before the link element
                  link.parentNode.insertBefore(img_elem, link);
                }
              })
              .catch((error) => {
                console.error("Error fetching URL:", link.href, error);
              });
          }
        },
      },
      function() {
        // Handle any error
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
      }
    );
  }
});
