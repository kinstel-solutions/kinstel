import Link from 'next/link';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Kinstel</h1>
        <nav>
          <Link href="#services" style={{ margin: '0 1rem' }}>Services</Link>
          <Link href="#portfolio" style={{ margin: '0 1rem' }}>Portfolio</Link>
          <Link href="/contact" style={{ margin: '0 1rem' }}>Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Modern Web Design for a Digital Edge</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>We build beautiful, functional, and user-centric websites that drive results.</p>
        <Link href="/contact" style={{ backgroundColor: '#0070f3', color: 'white', padding: '1rem 2rem', borderRadius: '5px', textDecoration: 'none' }}>
          Get a Free Consultation
        </Link>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '5rem 2rem' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>Our Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Web Design</h4>
            <p>We create stunning and intuitive web designs that captivate your audience and reflect your brand's identity.</p>
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Web Development</h4>
            <p>Our expert developers build robust and scalable websites using the latest technologies for optimal performance.</p>
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>UI/UX Optimization</h4>
            <p>We optimize user interfaces and experiences to ensure your website is easy to navigate and converts visitors into customers.</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" style={{ padding: '5rem 2rem' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>Our Work</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Project One</h4>
            <p>A sleek and modern website for a law firm.</p>
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Project Two</h4>
            <p>An e-commerce platform for a local business.</p>
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Project Three</h4>
            <p>A portfolio website for a creative professional.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: '#0070f3' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ready to elevate your online presence?</h3>
        <Link href="/contact" style={{ backgroundColor: 'white', color: '#1a1a1a', padding: '1rem 2rem', borderRadius: '5px', textDecoration: 'none' }}>
          Let's Work Together
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Kinstel Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
