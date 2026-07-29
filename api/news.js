export default async function handler(req, res) {
  const { category, page, pageSize, ...extraParams } = req.query;

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on the server.' });
  }

  const url = new URL('https://newsapi.org/v2/top-headlines');
  url.searchParams.set('apiKey', apiKey);
  url.searchParams.set('language', 'en');

  if (category) url.searchParams.set('category', category);
  if (page) url.searchParams.set('page', page);
  url.searchParams.set('pageSize', pageSize || '10');

  // Forward any extra query params (e.g. topic, country, etc.)
  Object.entries(extraParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching from NewsAPI:', err);
    res.status(500).json({ error: 'Failed to fetch news from upstream API.' });
  }
}
