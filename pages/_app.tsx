
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SessionProvider, useSession } from 'next-auth/react'
import { socketInitializer } from '@/utils/clientSocket'
import { useEffect } from "react"

import store from '../store/store'
import Layout from '@/components/layouts/Layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps: {session, ...pageProps }}: AppProps) {
  useEffect(() => {
    socketInitializer()
  }, [])
  
  return (
  <Provider store={store}>
        <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  </Provider>
  )
}