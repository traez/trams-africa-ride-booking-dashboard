# Trams Africa Ride Booking Dashboard

This is my project submission for a front-end developer take home job assessment.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge/User Stories  

**Objective**  
- This project aims to develop a ride-booking dashboard that integrates with a public API to fetch data such as city locations and vehicle details. The application tests frontend development skills, API integration, and UI/UX design.  
**Features**  
- The ride-booking dashboard features a user-friendly booking system with a form that captures pickup location, destination, date, and time. Upon submission, a dynamic booking summary displays the ride details, allowing users to edit or cancel their bookings. Additionally, the project includes stretch goals for integrating with a public API, such as OpenWeatherMap, Google Places, or Uber, to fetch real-time data for vehicle types and price estimates.   
**Technical Requirements**   
- The project is built using React, incorporating React Router for navigation and utilizing either Redux or the Context API for state management. It features a responsive user interface designed with Tailwind CSS or a similar framework, effectively handles API requests for fetching city locations and ride options with appropriate error handling, and implements form validation to ensure the accuracy of locations, dates, and times.    
**Submission Requirements**  
- GitHub Repository: Complete project pushed to a public repository, including a README with setup instructions, API usage, and challenges faced.
- Live Application: Deployed using Vercel, Netlify, or GitHub Pages with a live link provided for testing.  
**Evaluation Criteria**  
- The evaluation criteria for the project include the functionality of the booking form and its ability to dynamically fetch data, successful integration of a public API, and adherence to React best practices in code quality and modularity. Additionally, the application should feature a user-friendly, visually appealing, and responsive design, effectively handle API requests along with form validation and error handling, and provide clear documentation in the README.  

### Screenshot

![](/public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/trams-africa-ride-booking-dashboard](https://github.com/traez/trams-africa-ride-booking-dashboard)
- Live Site URL: [https://trams-africa-ride-booking-dashboard.vercel.app/](https://trams-africa-ride-booking-dashboard.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Tailwind CSS
- Typescript
- Nodejs      
- react-icons      
- Google Places API   
- Mapbox API   
- OpenWeatherMap API     

### What I learned
   
- **Parent Container Height**  
Always ensure the parent container has a defined height (e.g., `h-[value]`, `min-h-screen`, or `h-full` in Tailwind CSS) when using `flex-grow` on its children. This creates a stable height reference, allowing `flex-grow` to distribute remaining space and ensuring that children stretch proportionately within the parent.   
- **Comments in .env Files**  
Comments in `.env` files are added using the `#` symbol at the beginning of a line, allowing developers to include explanations or notes without affecting the functionality of environment variables. Each comment must be placed on its own line, as there is no block comment syntax available; thus, when commenting out multiple lines, each line must start with `#`. This practice helps improve the readability and maintainability of configuration files, enabling users to easily understand the purpose of each variable or temporarily disable specific settings without deleting them.   
- **Using new APIs for the First Time**  
This was my first use of the Google Places API, Mapbox API, and OpenWeatherMap API. I had to use my ATM card to sign up for all three in case I exceeded the free charge limit.   
- **useCallback React Hook and the ESLint Warning**  
The warning is coming from the React Hooks ESLint plugin, which helps ensure that you're using hooks correctly. The solution is to use useCallback to memoize functions. I learned that the useCallback hook in React is used to memoize a function so that it only gets recreated if its dependencies change. Memoizing a function means caching the result of a function call so that if the function is called again with the same inputs, it can return the cached result instead of recomputing everything. In React, memoizing a function (using hooks like useCallback) helps optimize performance by preventing unnecessary re-creations of that function across component re-renders.  
- **Following Project Instructions**  
I followed the instructions closely, except for not using forms and the Context API for state management, as they weren't really needed.  

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Trae Zeeofor](https://github.com/traez)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

-Jehovah that keeps breath in my lungs
