# 📖 CMS_API <a name="about-project"></a>

**CMS_API** is a solution to the take home assignment given and a solution to the problem was done using popular design pattern in the industry such as MVC and the well known Repository design pattern.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Server</summary>
  <ul>
    <li>Node Js</li>
    <li>Express</li>
    <li>Socket.io</li>
    <li>JWT</li>
    <li>Google OAuth</li>
    <li>etc..</li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li>Mongo DB</li>
    <li>Mongoose ODM</li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- **Authentication strategy using JWT and Google OAuth**
- **Real-time activities feed on the admin route**
- **CRUD operation on the post route**
- **CRUD operations on the category route**
- **CRUD operations on the user**
- **Database relationship**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API-Documentation <a name="api-documentation"></a>

- [Link To Documentation](https://web.postman.co/documentation/24263371-68bba15a-6cfe-4c3c-aafd-ab022af77273/publish?workspaceId=58fa59bb-c1cc-4840-8d7c-0fdaf11e4202)


## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- [Node.js](https://nodejs.dev/en/) installed
- VsCode or any other code editor installed
- Postman or any other API testing tool installed

### Setup

Clone this repository to your desired folder:

```sh
  cd my-folder
  git clone https://github.com/DuaneDave/CMS_API.git
```

### Install

Install this project with:

```sh
  cd CMS_API

  npm install
```

### Usage

To run the project, execute the following command:

```sh
  npm run dev to run the project in development mode
  npm run prod to run the project in production mode
```


## ❓ FAQ (OPTIONAL) <a name="faq"></a>

- **Why did you use repository design pattern?**

  <p> Repository Pattern introduces an additional layer of abstraction, the benefits it provides in terms of maintainability, testability, and adaptability often outweigh the overhead. It's especially beneficial in larger applications where clear separation of concerns becomes crucial for long-term maintainability.
  Reasons includes:
  </p>

  <ul>
      <li>Separation of Concerns: 
      - Following design patterns like the Repository Pattern aligns with best practices for structuring maintainable and scalable software. It makes your codebase more readable and easier for other developers to understand.
    </li>
      <li>Testability: 
      - The Repository Pattern makes it easier to mock dependencies for testing. This is especially useful in unit testing, where you want to isolate the system under test from its dependencies.
    </li>
      <li>Adaptability: 
      - The Repository Pattern makes it easier to swap out data sources. For example, you can easily replace a repository that fetches data from a remote server with one that uses a local database instead. This is especially useful when you want to write tests that don't touch the network or a database.
    </li>
      <li>Maintainability: 
      - The Repository Pattern makes it easier to maintain your codebase. For example, if you want to change the way you fetch data from a remote server, you only need to change the implementation of the repository. The rest of your codebase can remain the same.
    </li>
  </ul>
