// React
import Head from 'next/head'
import { useRouter } from 'next/router'
// style
import colors from '@/styles/exporters/_colorExporter.module.sass'

interface SEOProps {
  title: string
  desc: string
}

const SEO = (props: SEOProps) => {
  // Get actual path
  const path = useRouter().asPath
  const url = 'https://www.pluto.xyz'
  // Define SEO info
  const SEOTitle = props.title
  const SEODesc = props.desc
  const SEORoute = url + path
  const SEOThemeColor = colors.primary

  function generateSchemaOrg() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": " ",
        "name": " ",
        "alternateName": "${SEOTitle}",
        "url": "${url},
        "logo": ""
      }`,
    }
  }

  return (
    <Head>
      <title>{SEOTitle}</title>
      <meta name='title' content={SEOTitle} />
      <meta name='description' content={SEODesc} />
      {/* Viewport metatags */}
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />
      <meta httpEquiv='content-type' content='text/html; charset=utf-8' />
      {/* Favicons metatags */}
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/favicon.png' />
      <link rel='mask-icon' color={SEOThemeColor} href='/favicon.png' />
      <meta name='msapplication-TileColor' content={SEOThemeColor} />
      <meta name='theme-color' content={SEOThemeColor} />
      {/* Social metatags */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={SEORoute} />
      <meta property='og:title' content={SEOTitle} />
      <meta property='og:site_name' content={SEOTitle} />
      <meta property='og:description' content={SEODesc} />
      <meta property='og:image' content='/icons/social-card.jpg' />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={SEORoute} />
      <meta property='twitter:title' content={SEOTitle} />
      <meta property='twitter:description' content={SEODesc} />
      <meta property='twitter:image' content='/icons/social-card.jpg' />
      {/* Crawler metatags */}
      <link rel='canonical' href={SEORoute} key='canonical' />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <meta name='robots' content='index,follow' />
      <meta name='google' content='nositelinkssearchbox' />
      <meta name='revisit-after' content='7' />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={generateSchemaOrg()}
      />
    </Head>
  )
}

export default SEO
