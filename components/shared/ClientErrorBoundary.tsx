'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ClientErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="text-lg font-bold mb-2">Oops, there was an error!</h2>
          <p className="mb-4">
            {this.state.error?.message || 'Something went wrong.'}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ClientErrorBoundary