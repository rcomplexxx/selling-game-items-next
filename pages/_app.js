export default function App({ Component, pageProps }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const hasVerticalScrollbar = window.innerWidth > document.documentElement.clientWidth;
    setHasScrollbar(hasVerticalScrollbar);
  }, []);

  return (
    <>
      <div
        id="hronika"
        style={{
          width: hasScrollbar ? 'calc(100% - 10px)' : '100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'black',
          color: 'white',
          minHeight: '100vh',
          minWidth: 'calc(100vw - 10px)',
          alignItems: 'center',
          overflowY: 'auto'
        }}
      >
        <Navbar
          totalItems={cartProducts.length}
          handleDrawerToggle={handleDrawerToggle}
        />

        <AppContext.Provider value={{ cartProducts, setCartProducts }}>
          <Component {...pageProps} />
        </AppContext.Provider>

        <Footer />
      </div>
    </>
  );
}