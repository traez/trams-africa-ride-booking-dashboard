# Zeeofor Technologies Portfolio Website

My goal for creating a web developer portfolio website is to showcase my skills and projects in a visually appealing way. It serves as my personal branding platform, demonstrating my technical abilities and enhancing my online visibility. By reflecting my creativity and style, my portfolio helps me stand out in the competitive tech industry while facilitating networking through links to my social media profiles.

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

- Visitors want to see my name and a brief introduction immediately on the homepage, read a short biography in the About Me section to understand my background, and view a grid of my projects with images and descriptions. They also want to click on a project for more in-depth information, see a clear list of my technical skills and proficiencies, and read testimonials to gauge my professionalism and reliability. Additionally, visitors want a simple contact form to reach out for inquiries or collaborations, receive a confirmation message after submitting the form, and enjoy a responsive design that looks good on both desktop and mobile devices. Lastly, they want links to my professional social media profiles for further connection and the option to switch between light and dark modes for personalization.   

### Screenshot

![](/public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/zeeofortech](https://github.com/traez/zeeofortech)
- Live Site URL: [https://zeeofortech.vercel.app/](https://zeeofortech.vercel.app/)

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

### What I learned
   
- **Understanding -mx-4 in Tailwind CSS**  
The class `-mx-4` in Tailwind CSS applies the following styles:  
<blockquote>.-mx-4 {
    margin-left: -1rem; /* -16px */
    margin-right: -1rem; /* -16px */
}</blockquote>  
Instead of creating space between the container and the parent container, it allows the container to extend beyond the parent. This is a clever way to make the container width equal to that of the parent container.    

- **Dynamic Copyright Year**  
Using this ensures that the copyright year updates automatically each year: `© {new Date().getFullYear()}`  

- **Efficient Dropdown Interaction with Tailwind CSS**  
By leveraging Tailwind's utility classes, I created an efficient and visually appealing dropdown interaction. Here’s how to implement it:
1) Use the group class on the parent element to enable hover effects on child elements.  
2) Apply these classes to the dropdown container:  
    * `invisible`: Hides the dropdown by default.  
    * `group-hover:visible`: Shows the dropdown when the parent is hovered.  
    * `opacity-0`: Makes the dropdown fully transparent initially.  
    * `group-hover:opacity-100`: Makes the dropdown fully opaque on hover.  
    * `transition-all duration-300`: Adds a smooth transition effect. 
    
The combination of visibility and opacity changes creates a fade-in effect when hovering. This technique provides a clean, CSS-only solution for dropdown menus without requiring JavaScript. 

- **Markdown preview**  
Using `Ctrl + Shift + V` in Visual Studio Code (VSCode) opens the Markdown preview for the currently active Markdown file, displaying its rendered content in a separate pane. This feature is built into VSCode by default, allowing for real-time updates as you edit the Markdown file, which means you can see how your formatting appears without needing to refresh manually.  
You may also right click and select `"open preview"` option.  

- **Implementing External Link Indicators**  
I implemented external link indicators `(e.g., ↗️)` for links that navigate outside the site or open in a new tab. This is a common web convention that improves user experience by clearly signaling when users are leaving the current site. It enhances usability and accessibility, helping users make informed decisions about navigating external resources. This was an important design consideration to ensure transparency and a smoother browsing experience for users.

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
