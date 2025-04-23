'use client';

import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Section = {
    type: string;
    content: string;
  };
export default function WorkspacePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);

  const handleScrape = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/workspace/scrape', {
        url,
        user_email: 'user@example.com', // replace with real session value
      });
      setSections(res.data.sections);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Enter a website to scrape</h1>
      <div className="flex gap-2">
        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
        <Button onClick={handleScrape} disabled={loading}>
          {loading ? 'Scraping...' : 'Scrape'}
        </Button>
      </div>

      {sections.length > 0 && (
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">Scraped Content</h2>
          <div className="border p-4 rounded space-y-2 bg-gray-50">
            {sections.map((sec, i) => (
              <div key={i}>
                <strong>{sec.type.toUpperCase()}:</strong> {sec.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
