import theme from '@/config/theme'
import { Button } from '@mui/material'
import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
// import 'antd/dist/antd.css'

export const CHeader = ({ children }: any) => {
  return <div style={{
    backgroundColor: theme.palette.primary.main, paddingBottom: 15, paddingTop: 15,
    display: 'flex', justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  }} >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ paddingLeft: 25 }}>
        <Link href="/teams" style={{ textDecoration: 'none', color: 'white' }}>
          <div>Inicio</div>
        </Link>
      </div >
    </div>
    <div style={{ display: 'flex' }}>
      <div>
        <Link href="/create-team">
          <Button variant="contained">Equipo +</Button>
        </Link>
      </div >
      <div style={{ paddingLeft: 30 }}>
        <Link href="/IoT">
          <Button variant="contained">IoT +</Button>
        </Link>
      </div >
      <div style={{ paddingLeft: 30 }}>
        <Link href="/results">
          <Button variant="contained">Resultado</Button>
        </Link>
      </div >
      <div style={{ paddingLeft: 30 }}>
        <Link href="/">
          <Button variant="contained" color="error">Salir</Button>
        </Link>
      </div >
    </div>
  </div >
}

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ maxWidth: 1500, margin: 'auto' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}


