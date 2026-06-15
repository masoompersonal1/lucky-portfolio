import { groq } from 'next-sanity'

export const heroQuery = groq`*[_type == "hero"][0]{
  topSubheading,
  mainTitle,
  signature,
  signatureSubtext,
  "imageUrl": heroImage.asset->url
}`
