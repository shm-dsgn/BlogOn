<img src='https://drive.google.com/uc?id=10aEwKjOdN8nxq_IRALMt8WQz-qc8OTce' width=108px/>

# BlogOn by shm.

A simple blog app that lets users create blog posts with images, view them, edit them and delete them.

[Live Website Link](https://shm-blog-app.onrender.com)

You can see the backend/server code here: [Server/API repository](https://github.com/shm-dsgn/blog-api)

[![CodeFactor](https://www.codefactor.io/repository/github/shm-dsgn/blogon/badge)](https://www.codefactor.io/repository/github/shm-dsgn/blogon)

## Tech Stack

MERN Stack:

![MongoDB](https://img.shields.io/badge/-MongoDB-22272e?logo=mongodb) ![Express](https://img.shields.io/badge/-Express-22272e?logo=express) ![React](https://img.shields.io/badge/-React-22272e?logo=react) ![Node.js](https://img.shields.io/badge/-Node.js-22272e?logo=node.js)

## Technologies Used

- **TypeScript**
- **TensorFlow JS** (for human identification)
- **Google reCAPTCHA v2** (for detection of bots)
- **Tailwind CSS** (for styling)
- **Axios** (for data fetching)
- **React-Toastify** (for showing Toast notification)
- **React-Router-Dom** (for router functionalities)
- **React-Quill** (for text editor)
- **Date-fns** (for date formatting & manipulation)

## Installation

To run BlogOn project locally, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/shm-dsgn/BlogOn.git
```

2. Navigate to the project directory:

```bash
cd BlogOn
```

3. Create a `.env` file in the project directory.
4. Create the follwing variables in the `.env` file:

```bash
REACT_APP_API_URL = https://shm-blogapp-api.onrender.com
REACT_APP_reCAPTCHA_SITE_KEY= <your Google reCAPTCHA v2 site key>
```

5. In the project directory, you can run `npm install` to install the project dependencies.

```bash
npm install
```

## Usage

To start the development server and view BlogOn website, run the following command:

```bash
npm start
```

This will launch the application on a local development server, typically at [http://localhost:3000](http://localhost:3000).

## Features

1. **Blog Posts** : A user when opens the website can see all the blog posts already present on the website.
2. **Login/Register** : A user can register with their username and password and then login to the website to create their own blog posts.
3. **Create Post** : A user , when signed in, can create a post by clicking on the 'Create Post' button and provide a title, a summary, a cover photo and the content of the blog into a form.
4. **Delete Post** : A user when signed in, can also delete the posts that were created by the same user.
5. **Edit Post** : A user can edit their posts by clicking on the 'Edit' button on the post card and can edit the title, summary, cover photo and the content of the blog.
6. **My Profile** : A user can see their profile by clicking on the 'My Profile' button and can see all the posts created by them.
7. **Human Identification**: Every registration is now checked with TensorFlow JS models if a user is a person or not.
8. **Listen to Blog** : Now a user can listen to the blogs.
9. **Detect Toxicity** : Every post is now checked for toxicity(eg: insult,obscene, sexual_explicit, etc )
