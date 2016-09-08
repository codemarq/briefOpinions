# Brief Opinions
Brief Opinions is an app that searches court cases and returns a summarized opinion via the courtlistener API and the textuality API.

# Screenshots



## Technologies Used
-JavaScript
-HTML
-CSS
-jQuery
-Ajax
-Firebase
-Court Listener REST API (https://www.courtlistener.com/api/rest-info/)
-Textuality API (https://market.mashape.com/djinn/textuality)
-twitter Bootstrap (http://getbootstrap.com/)


## Overall Concept
Brief Opinions utilizes the Textuality API, which summarizes text, along with the Court Listener API, which is a searchable database of court opinions. 
This application first uses the CourtListener API to return an object based on the users search term.  That object contains the URL of the site displaying the searched for opinion.  Brief Opinions does not however, direct the user off our site and onto that URL, but rather employs Textuality to return a second object with the summary of the URL’s content (the actual court opinion).  The application then writes the content of that object (the summarized opinion) into the html of our page. 


## Target User
Law Students, Lawyers, and anyone interested in gleaning a quick understanding of a Supreme Court Opinion through a summarized version of its original language.  

## Problem Solved
Brief Opinions saves time by bestowing upon its users the ability to glean key information from a Supreme Court Decision in less time than it would take to read the entire opinion.

## Built With
-Sublime
-Google Firebase

## Authors
John-Mike Marquardt @codemarq, Eric Sievers @goodtuesday, and Jay M. Frimmel @JayMFrimmel

## Acknowledgements