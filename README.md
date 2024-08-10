# Welcome to your GPT Engineer project

## Project info

**Project**: repo-star-charts 

**URL**: https://run.gptengineer.app/projects/8773b965-44c7-43ed-9b85-d500bc43510f/improve

**Description**: Create a Node.js web app that has only one page hosted on localhost:3000. The page should have 2 input fields and a place where a chart will be plotted. When the user opens the page, they should paste 2 links to public repositories in each of the input fields. If the repository is not public, show that error message. Then, by clicking on a button, the links should be sent to the backend where the Node.js app should fetch historic Github stars for each of the repos pasted in the input fields. Make sure to use authenticated Github API so that you can get historic data and not only current number of Github stars. Github API token should be stored in .env and loaded on the server. After the star data is fetched, it should be saved into the mongodb database so we don't need to fetch it each time a user enters the same Github repos. When accessing the database use "127.0.0.1" instead of "localhost". Finally, the star data should be sent to the frontend and shown on the chart. Data for both repos should be shown on the same chart so they can be compared one to another. Use line charts and make sure that the chart can be zoomed in and out. Users should be able to register, login and logout to website and they can use website functionality only after they are logged in.
 

## Who is the owner of this repository?
By default, GPT Engineer projects are created with public GitHub repositories.

However, you can easily transfer the repository to your own GitHub account by navigating to your [GPT Engineer project](https://run.gptengineer.app/projects/8773b965-44c7-43ed-9b85-d500bc43510f/improve) and selecting Settings -> GitHub. 

## How can I edit this code?
There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://run.gptengineer.app/projects/8773b965-44c7-43ed-9b85-d500bc43510f/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps: 

```sh
git clone https://github.com/GPT-Engineer-App/repo-star-charts.git
cd repo-star-charts
npm i

# This will run a dev server with auto reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app. 

Simply visit your project at [GPT Engineer](https://run.gptengineer.app/projects/8773b965-44c7-43ed-9b85-d500bc43510f/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain, then we recommend GitHub Pages.

To use GitHub Pages you will need to follow these steps: 
- Deploy your project using GitHub Pages - instructions [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site)
- Configure a custom domain for your GitHub Pages site - instructions [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)