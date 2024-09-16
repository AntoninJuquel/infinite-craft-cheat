import axios from 'axios';
import fs from 'fs';

const baseUrl = 'https://neal.fun/api/infinite-craft/';

const driver = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    Referer: 'https://neal.fun/infinite-craft/',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
    Cookie: `__cf_bm=${process.env.INFINITE_CRAFT_COOKIE}`,
  },
});

driver
  .get('/')
  .then((response) => {
    console.log(`${response.data} from ${baseUrl}`);
  })
  .catch((error) => {
    console.error(`Error getting ${baseUrl}`);
    console.error(error);
    fs.writeFileSync(
      'infinite-craft-error.json',
      JSON.stringify(error, null, 2),
    );
  });

interface PairResponse {
  result: string;
  emoji: string;
  isNew: boolean;
}

function getPair(first: string, second: string) {
  return driver.get<PairResponse>('/pair', {
    params: {
      first,
      second,
    },
  });
}

export { driver as default, getPair };
