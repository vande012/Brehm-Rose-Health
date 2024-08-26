import 'server-only'

import { experimental_taintUniqueValue } from 'react'

export const token = process.env.SANITY_API_READ_TOKEN
export const writeToken = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN')
}

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}

if (writeToken !== undefined) {
experimental_taintUniqueValue(
  'Do not pass the sanity API write token to the client.',
  process,
  writeToken,
)}

if (token !== undefined) {
experimental_taintUniqueValue(
  'Do not pass the sanity API read token to the client.',
  process,
  token,
)}
