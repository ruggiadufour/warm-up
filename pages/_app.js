import "../styles/globals.css";
import Layout from "../Components/Layout";
import { ProviderState } from "../Context/GlobalState";
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  return (
    <ProviderState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProviderState>
  );
}

export default MyApp;
