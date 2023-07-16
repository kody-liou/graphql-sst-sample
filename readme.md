# Prerequest

1. Install nvm:

Follow the instructions at https://github.com/nvm-sh/nvm to install nvm.

2. Install Node.js 18:
Run the following command to install Node.js 18 using nvm:
```bash
nvm install 18
```

3. Install Yarn:
    Run the following command to install Yarn globally:
```bash
npm i -g yarn
```

4. Create an AWS account

5. Create a .env.local file in the project's root folder with the following content:
```env
AWS_ACCESS_KEY_ID=your access key id
AWS_SECRET_ACCESS_KEY=your secret access key
# Region ap-northeast-1 is at tokyo
AWS_REGION=ap-northeast-1
NODE_ENV=development
```

# Getting Started

1. Open the JavaScript Debug Terminal and execute the following command:
```bash
yarn dev
```

2. Open another terminal and execute the following command:
```bash
yarn dev:web
```

# About Packages

# React tips

Pass all the props from a parent component to a child component:
https://medium.com/coding-at-dawn/how-to-pass-all-props-to-a-child-component-in-react-bded9e38bb62

# Graphql tutorial

https://stackoverflow.com/questions/61526823/what-is-on-doing-in-this-graphql
