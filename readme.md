# Prerequest

1. Install nvm:
https://github.com/nvm-sh/nvm

2. Install node 18 by:
```bash
nvm install 18
```

3. Install yarn by:
```bash
npm i -g yarn
```

4. Create an AWS account

5. Create a .env.local file at project's root folder like this:
```env
AWS_ACCESS_KEY_ID=your access key id
AWS_SECRET_ACCESS_KEY=your secret access key
# Region ap-northeast-1 is at tokyo
AWS_REGION=ap-northeast-1
NODE_ENV=development
```

# Start

1. Open JavaScript Debug Terminal and enter:
```bash
yarn dev
```

2. Open another terminal and enter:
```bash
yarn dev:web
```