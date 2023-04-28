# Dream Diffusion

I used this repo for a temporary production branch (since I could not get a last minute approve for installation of Vercel on github in our organization). The content is the exact same as the one assigned to us. 

## Overview

Dream Diffusion is the dream journal supported by generative AI. Based on Stable Diffusion, Dream Diffusion will generate vivid depictions of dream scenes based on the descriptions or keywords users provide. Users can furthermore select from the generated pictures and compose them into a journal with date, title, and some more comments. Users can also share journals to others. 


## Data Model

The application will store Users, Images and Journals.

An Example User:

```javascript
{
  firstName:  
  lastName:
  email:
  password: // password hash
}
```

An Example Journal:

```javascript
{
  user: // reference to a User object
  image: // reference to an Image Object
  title: // title
  cotentts: // some content
}
```

An Example Image:
```javascript
{
  user: // reference to a User object
  image: // image content in b64 format
  prompt: // the prompt for generating the picture
}
```


## [Link to Commented First Draft Schema](schemas/db.mjs) 


## Wireframes

/ - main page; the page for entering prompt and generating dream scenes.

![main](siteImages/Main.jpeg)

/posts/post - page for creating a Dream Journal

![create](siteImages/Create.jpeg)

/login - page for user to sign-up for login

![login](siteImages/Login.jpeg)

/history - page for showing all historic genrated images after user signed in

![history](siteImages/History.jpeg)

/posts - page for showing all previous journals

![document](siteImages/Document.jpeg)

## Site map

![Site map example](siteImages/sitemap.png)

## User Stories or Use Cases

As a user, I want to create an account and log in so that I can have a personalized experience and save my dream journals.

As a user, I want to input a description of my dream so that the website can generate a visual representation of the dream scene using text-to-image generation.

As a user, I want to view the generated image of my dream scene so that I can visualize my dream more vividly.

As a user, I want to write a dream journal entry based on the generated image so that I can record my thoughts and feelings about the dream.

As a user, I want to view a gallery of the generated dream images so that I can explore and remember the visual aspects of my dreams.

As a user, I want to have a private and secure space for my dream journals so that I can trust that my personal information is protected.

## Research Topics

* (6 points) Next.js
  * Next.js is a powerfull full-stack React framework
  * I want to use it to make my webpage more integrated, dynamic, and good-looking
  * I want to use it to integrate my front-end and back-end application into the same port.
  * It is also a challenging library, and I believe I can learn a lot from attempting to use it in the project.
* (1 points) NextUI
  * Incorporate nicely formatted UI component made for Next.js
* (2 points) jwt authentication
  * setting up user authentication with `express-jwt`
  * protect routes of my application
* (2 points) `Redis` Session Store with `next-sesion`
  * setting up session management in `Next.js` with `next-session` library on `Redis` client
* (If container fails) (1 points) External API
  * Using DALL E api as the backend model.
  * Calls api every time we need to sample from the model.

## [Link to Initial Main Project File](./pages/_app.js) 

## Annotations / References Used

1. [tutorial on Next.js](https://nextjs.org/)
2. [tutorial on NextUI](https://nextui.org/docs/guide/getting-started)
3. [documentation on Next-session](https://www.npmjs.com/package/next-session)
4. [documentation on express-jwt](https://www.npmjs.com/package/express-jwt)
5. [documentation of DALL-E api](https://platform.openai.com/docs/api-reference/images)
