import Head from "next/head";
import { Navbar, Sidebar } from '../ui/';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  pageDescription: string;
}

const AppLayout = ({ children, title, pageDescription }: Props) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ pageDescription }/>
        <meta name="og:title" content={ title }/>
        <meta name="og:description" content={ pageDescription }/>
      </Head>


      <Sidebar />
      <Navbar />
      <main>
        { children }
      </main>
    </>
  )
}
export default AppLayout