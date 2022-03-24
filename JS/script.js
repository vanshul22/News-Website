/*
Website Name - News Website
Name : Vanshul Kesharwani
Date : 24/03/2022
Version : 2.1.0
Email : vkvanshulkesharwani54@gmail.com
Description : This is a Web app for latest news. Fetching from news API website.
*/

// API key taken from newsapi.org
let apiKey = "0b0027c52e6b48db86c5d26446c5a6a3";
// taken different sources.
let country = "in";

// Taken Accordian container here by ID.
let newsAccordian = document.getElementById("newsAccordian");

// Creating an AJAX XHR get request.
const xhr = new XMLHttpRequest();
// Requesting from this link a GET request.
xhr.open("GET", `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`, true);


// What to do when responce is ready.
xhr.onload = function() {
    // If all is ok with status 200.
    if (this.status === 200) {
        // Parce the JSON text we will get the 
        let json = JSON.parse(this.responseText);
        // taking only articles from all content.
        let articles = json.articles;

        // taken variable as empty so we can add value here later.
        let newsHtml = "";
        articles.forEach(function(element, index) {
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
                                ${element.description}. ${element.publishedAt} <a href="${element.url}" target="_blank">(Read more)</a>.
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