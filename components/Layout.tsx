import Head from 'next/head';

type LayoutProps = {
  children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Tasks App</title>
        <meta name="description" content="Tasks App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-12 md:pt-0">
        <div className="max-w-7xl mx-auto py-0 sm:px-6 lg:px-8">
          <div className="px-4 py-2 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
