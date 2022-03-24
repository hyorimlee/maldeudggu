import Head from 'next/head'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>말듣꾸</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
