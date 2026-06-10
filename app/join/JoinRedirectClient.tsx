'use client'

import { useEffect } from 'react'

export default function JoinRedirectClient() {
  useEffect(() => {
    window.location.replace('/get-involved')
  }, [])

  return <meta httpEquiv="refresh" content="0; url=/get-involved" />
}
