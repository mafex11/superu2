import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  withCredentials: true,
})

export const registerUser = async (email: string, password: string) => {
  const response = await api.post('/auth/signup', { email, password })
  return response.data
}

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const scrapeWebsite = async (url: string, userEmail: string) => {
  const response = await api.post('/workspace/scrape', { url, user_email: userEmail })
  return response.data
}