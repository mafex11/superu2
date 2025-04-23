import httpx
from bs4 import BeautifulSoup

async def scrape_website(url: str) -> list[dict]:
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        soup = BeautifulSoup(resp.text, "html.parser")

        # Simple example: get all headings and paragraphs
        sections = []
        for section in soup.find_all(['h1', 'h2', 'p']):
            tag = section.name
            text = section.get_text(strip=True)
            if text:
                sections.append({"type": tag, "content": text})

        return sections
