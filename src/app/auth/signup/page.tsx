'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'
import { scrapeWebsite } from '@/lib/api'

export default function WorkspacePage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const handleScrape = async () => {
    if (!url) return
    setLoading(true)
    setError('')
    
    try {
      const response = await scrapeWebsite(url, user?.email || '')
      console.log('Scraped data:', response)
      // Handle successful scrape (redirect to editor or show preview)
    } catch (err) {
      setError('Failed to scrape website')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Workspace</h1>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="flex-1"
        />
        <Button onClick={handleScrape} disabled={loading}>
          {loading ? 'Scraping...' : 'Scrape'}
        </Button>
      </div>
      
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Preview or file tree would go here */}
    </div>
  )
}