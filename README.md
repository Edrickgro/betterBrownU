#betterBrownU

https://cs32termproject.web.app/

Languages/Style: Typescript, React.js, HTML & CSS

Database: Google Firebase and Authentication

Testing: Selenium UI Testing

ABOUT ~

Inspired by Brown University's Mobile App, Brown U, this group project focuses on adding key functionality that is otherwise lacking in the original application. The app wasn't developed with full functionality but was built to be scalable and generic for future development. It features two main components:

a public calendar meant to showcase key school events where people can edit, add, and remove events to a database (although not implemented, the calendar is assumed to be monitored)

a geolocator that tracks how busy certain buildings including libraries and cafeterias are on campus and a map of the user's current location.

~

IMPLEMENTATION ~

The calendar was implemented using typescript. Apart from Google Firebase, no external libaries were used for its implementation

The geolocator uses the Mozilla GPS Api (https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) which first prompts the user to share location and then calculates the coordinates of the user.

~
