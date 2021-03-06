/*
Website Name - News Website
Name : Vanshul Kesharwani
Date : 25/03/2022
Version : 3.1.1
Email : vkvanshulkesharwani54@gmail.com
Description : This is a Web app for latest news. Fetching from news API website.
*/

// Define Country variable.
let country;
// API key taken from newsapi.org
let apiKey = "0b0027c52e6b48db86c5d26446c5a6a3";

// Taking all radio buttons ID's.
let li1 = document.getElementById("li-1");
let li2 = document.getElementById("li-2");
let li3 = document.getElementById("li-3");
let li4 = document.getElementById("li-4");
let li5 = document.getElementById("li-5");
let li6 = document.getElementById("li-6");

// Taken Accordian container here by ID.
let newsAccordian = document.getElementById("newsAccordian");

// Taking button of dropdown.
let dropDownLists = document.getElementById("dropDownLists");

// Taken different sources. Add event listener while we change radio button. and it will run below function.
dropDownLists.addEventListener("change", function() {

    // Checking for selected radio button.
    if (li1.checked) {
        country = li1.value;
    } else if (li2.checked) {
        country = li2.value;
    } else if (li3.checked) {
        country = li3.value;
    } else if (li4.checked) {
        country = li4.value;
    } else if (li5.checked) {
        country = li5.value;
    } else if (li6.checked) {
        country = li6.value;
    };

    // Creating an AJAX XHR get request.
    const xhr = new XMLHttpRequest();
    // Requesting from this link a GET request. From news API website.
    xhr.open("GET", `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`, true);


    // What to do when responce is ready.
    xhr.onload = function() {
        // If all is ok with status 200.
        if (this.status == 200) {
            // Parce the JSON text we will get the 
            let json = JSON.parse(this.responseText);
            // taking only articles from all content.
            let articles = json.articles;

            // taken variable as empty so we can add value here later.
            let newsHtml = "";
            articles.forEach(function(element, index) {

                // Fix date and time of news properly.
                let str = element.publishedAt;

                // Inner HTML adding from here of newsAccordian.
                let newsTemplate = `
                        <div class="accordion-item mb-2 border rounded-3 shadow-lg mb-2 bg-body">
                        <h2 class="accordion-header " id="heading${index}">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                ${index+1}. ${element.title}
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordian">
                            <div class="accordion-body">
                                <!-- Fixed timing here with this replace("T", " ").replace("Z", "")-->
                                ${element.description}. &emsp; At ${element.publishedAt.replace("T", " ").replace("Z", "")} <a href="${element.url}" target="_blank">(Read more)</a>.
                            </div>
                        </div>
                        </div>`
                    // Added newsTemplate for all news to the variable.
                newsHtml += newsTemplate;
            });
            // Adding newsHtml to the Accordian container.
            newsAccordian.innerHTML = newsHtml
        } else {
            // If any error occured this will show error.
            console.log("Some error occured.")
        };
    };
    // Sending XHR request.
    xhr.send();
});