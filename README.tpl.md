# lib-adloader

Helper library for [GPT (Google Publisher Tags)](https://developers.google.com/doubleclick-gpt/reference) used to configure and load ads from [DFP (Doubleclick For Publishers)](https://support.google.com/dfp_premium).

It can be used to configure ad with a single command, but is also designed to be modular. Components and functions can be imported individually to help with various aspects of ad configuration and loading.

## Installation

```bash
npm install @startsiden/lib-adloader
```

or

```bash
yarn add @startsiden/lib-adloader
```

## Usage

```javascript
import { adloader } from 'adloader';

const config = {
  adUnit: '/36021320/abcnyheter.no',
  lazyload: true,
  lazyloadOffset: 100,
  targeting: {
    page: 'front',
    test: true
  },
  ads: [
    {
      id: 'ad_banner_top',
      sizes: [
        [1000, 300],
        [980, 300],
        [980, 200],
        [980, 150],
        [980, 120],
        [970, 250],
        [970, 90],
        [2, 3]
      ],
      targeting: {
        position: 'banner_top'
      }
    }
  ]
};

adloader.init(config);
```

## Development

Clone the repository and install the packages.

To start the dev server in watch mode on port 3000 run

```bash
npm run watch
```

You can now access the dev server on http://localhost:3000 with live reloading and automatic updates.

The docs are available on http://localhost:3000/docs and are also automatically updated
