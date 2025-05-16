import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "@/components/Layout";
<script src="https://kit.fontawesome.com/7f99a72c13.js" crossorigin="anonymous"></script>

export default function App({ Component, pageProps }) {

  return (
    
    <Layout>
    <Component {...pageProps} />
    </Layout>
  )

}