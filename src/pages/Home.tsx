import { useEffect, useState } from 'react';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: '🔐',
      title: 'Unified & Secure Health Identity',
      description: 'Consolidate all medical records, prescriptions, and diagnostic reports in one secure place with blockchain-based authentication and tamper-proof verification.'
    },
    {
      icon: '🤖',
      title: 'AI Health Bot for Patients',
      description: 'Get personalized health insights, detect anomalies, optimize healthcare costs, and receive lifestyle recommendations tailored to your medical history.'
    },
    {
      icon: '👨‍⚕️',
      title: 'Doctor Assistance AI',
      description: 'Empower healthcare providers with AI-powered patient summaries, clinical decision support, risk prediction, and comprehensive data visualization.'
    },
    {
      icon: '📱',
      title: 'Smart Patient Guidance',
      description: 'Never miss important health checkups with intelligent reminders, preventive screening notifications, and proactive health monitoring.'
    }
  ];

  const audiences = [
    {
      icon: '👥',
      title: 'Patients',
      benefits: [
        'Unified medical history access',
        'Preventive care recommendations',
        'Personalized lifestyle guidance',
        'Healthcare cost transparency',
        'Secure data ownership'
      ]
    },
    {
      icon: '⚕️',
      title: 'Doctors',
      benefits: [
        'Instant patient history summaries',
        'AI-powered clinical support',
        'Risk prediction algorithms',
        'Drug interaction alerts',
        'Advanced data visualization'
      ]
    },
    {
      icon: '🏥',
      title: 'Hospitals & Clinics',
      benefits: [
        'Secure record management',
        'Efficient patient handling',
        'Trusted healthcare delivery',
        'Reduced administrative overhead',
        'Improved patient outcomes'
      ]
    }
  ];

  const problems = [
    'Fragmented medical records across multiple providers',
    'Repeated diagnostic tests causing unnecessary expenses',
    'Limited transparency in treatment decisions',
    'High healthcare costs due to inefficiencies',
    'Lack of personalized health guidance'
  ];

  const solutions = [
    'Unified digital identity with blockchain security',
    'AI-powered anomaly detection and cost optimization',
    'Complete treatment transparency and insights',
    'Efficient healthcare delivery reducing costs',
    'Personalized AI health recommendations'
  ];

  // Styles
  const styles = {
    container: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      lineHeight: '1.6',
      color: '#333',
      //   0,
      padding: 0
    },
    header: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'all 0.3s ease'
    },
    nav: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#667eea'
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      //   0,
      padding: 0
    },
    navLink: {
      color: '#333',
      fontWeight: '500',
      cursor: 'pointer',
      textDecoration: 'none',
      border: 'none',
      background: 'none',
      fontSize: '1rem',
      transition: 'color 0.3s ease'
    },
    ctaBtn: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    hero: {
      paddingTop: '120px',
      paddingBottom: '80px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 2
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      marginBottom: '1.5rem',
      fontWeight: '800',
      lineHeight: '1.2'
    },
    heroSubtitle: {
      fontSize: '1.3rem',
      marginBottom: '2rem',
      opacity: '0.9',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    btnPrimary: {
      background: 'white',
      color: '#667eea',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
    },
    btnSecondary: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '1rem 2rem',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    section: {
      padding: '100px 0'
    },
    container: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '0 1rem'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '80px'
    },
    sectionTitle: {
      fontSize: '3rem',
      marginBottom: '1rem',
      color: '#333',
      fontWeight: '700'
    },
    sectionSubtitle: {
      fontSize: '1.2rem',
      color: '#666',
      maxWidth: '600px',
      margin: "0 auto"
      //   '0 auto'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem'
    },
    featureCard: {
      background: 'white',
      padding: '3rem 2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      textAlign: 'center',
      position: 'relative',
      borderTop: '4px solid #667eea'
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '1.5rem',
      display: 'block'
    },
    featureTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#333',
      fontWeight: '600'
    },
    featureDescription: {
      color: '#666',
      lineHeight: '1.8'
    },
    audienceCard: {
      background: 'linear-gradient(135deg, #f8faff, #e8f2ff)',
      padding: '2.5rem 2rem',
      borderRadius: '20px',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(102, 126, 234, 0.1)'
    },
    audienceIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      display: 'block'
    },
    audienceTitle: {
      fontSize: '1.4rem',
      marginBottom: '1rem',
      color: '#333',
      fontWeight: '600'
    },
    benefitsList: {
      listStyle: 'none',
      textAlign: 'left',
      padding: 0,
      //   0
    },
    benefitItem: {
      padding: '0.5rem 0',
      color: '#666',
      position: 'relative',
      paddingLeft: '1.5rem'
    },
    checkIcon: {
      color: '#667eea',
      fontWeight: 'bold',
      position: 'absolute',
      left: 0
    },
    problemSolutionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '4rem',
      marginTop: '60px'
    },
    problemSolutionBox: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '2.5rem',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    problemSolutionTitle: {
      fontSize: '1.5rem',
      marginBottom: '1.5rem',
      fontWeight: '600'
    },
    problemSolutionList: {
      listStyle: 'none',
      padding: 0,
      //   0
    },
    problemSolutionItem: {
      padding: '0.75rem 0',
      position: 'relative',
      paddingLeft: '2rem'
    },
    ctaSection: {
      padding: '100px 0',
      background: '#f8faff',
      textAlign: 'center'
    },
    ctaContent: {
      background: 'white',
      padding: '4rem 3rem',
      borderRadius: '30px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
      maxWidth: '800px',
      margin: "0 auto"
      //   '0 auto'
    },
    ctaTitle: {
      fontSize: '2.5rem',
      marginBottom: '1.5rem',
      color: '#333',
      fontWeight: '700'
    },
    ctaDescription: {
      fontSize: '1.2rem',
      color: '#666',
      marginBottom: '2rem'
    },
    footer: {
      background: '#1a1a1a',
      color: 'white',
      padding: '3rem 0 1rem',
      textAlign: 'center'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem',
      textAlign: 'left'
    },
    footerTitle: {
      marginBottom: '1rem',
      color: '#667eea',
      fontSize: '1.2rem',
      fontWeight: '600'
    },
    footerLink: {
      color: '#ccc',
      textDecoration: 'none',
      display: 'block',
      padding: '0.25rem 0',
      transition: 'color 0.3s ease',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    footerBottom: {
      borderTop: '1px solid #333',
      paddingTop: '1rem',
      color: '#999'
    }
  };

  return (
    <>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>
            <span style={{ fontSize: '1.8rem' }}>🏥</span>
            Smart Health Card
          </div>
          <ul style={styles.navLinks}>
            <li>
              <button
                onClick={() => scrollToSection('features')}
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#333'}
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('audience')}
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#333'}
              >
                Who Uses It
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('solution')}
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#333'}
              >
                Solution
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#333'}
              >
                Contact
              </button>
            </li>
          </ul>
          <button
            onClick={() => scrollToSection('demo')}
            style={styles.ctaBtn}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Get Started
          </button>
        </nav>
      </header>
      <div style={styles.container}>
        {/* Header */}

        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Revolutionary AI-Powered<br />
              Healthcare Identity
            </h1>
            <p style={styles.heroSubtitle}>
              Transform your healthcare experience with a unified, secure, and intelligent health management system powered by blockchain and AI.
            </p>
            <div style={styles.heroButtons}>
              <button
                onClick={() => scrollToSection('demo')}
                style={styles.btnPrimary}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                Experience the Future
              </button>
              <button
                onClick={() => scrollToSection('features')}
                style={styles.btnSecondary}
                onMouseOver={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#667eea';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ ...styles.section, background: '#f8faff' }}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Powerful Features</h2>
              <p style={styles.sectionSubtitle}>
                Discover how our Smart Health Card revolutionizes healthcare with cutting-edge AI and blockchain technology
              </p>
            </div>

            <div style={styles.grid}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  style={styles.featureCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <span style={styles.featureIcon}>{feature.icon}</span>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section id="audience" style={{ ...styles.section, background: 'white' }}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Who Benefits</h2>
              <p style={styles.sectionSubtitle}>
                Our Smart Health Card serves the entire healthcare ecosystem with tailored solutions
              </p>
            </div>

            <div style={styles.grid}>
              {audiences.map((audience, index) => (
                <div
                  key={index}
                  style={styles.audienceCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={styles.audienceIcon}>{audience.icon}</span>
                  <h3 style={styles.audienceTitle}>{audience.title}</h3>
                  <ul style={styles.benefitsList}>
                    {audience.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} style={styles.benefitItem}>
                        <span style={styles.checkIcon}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Solution Section */}
        <section id="solution" style={{ ...styles.section, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={{ ...styles.sectionTitle, color: 'white' }}>The Healthcare Revolution</h2>
              <p style={{ ...styles.sectionSubtitle, color: 'rgba(255, 255, 255, 0.9)' }}>
                Addressing critical challenges in India's digital healthcare transformation
              </p>
            </div>

            <div style={styles.problemSolutionGrid}>
              <div style={styles.problemSolutionBox}>
                <h3 style={styles.problemSolutionTitle}>Current Healthcare Challenges</h3>
                <ul style={styles.problemSolutionList}>
                  {problems.map((problem, index) => (
                    <li key={index} style={styles.problemSolutionItem}>
                      <span style={{ position: 'absolute', left: 0, fontSize: '1.2rem' }}>⚠️</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.problemSolutionBox}>
                <h3 style={styles.problemSolutionTitle}>Smart Health Card Solutions</h3>
                <ul style={styles.problemSolutionList}>
                  {solutions.map((solution, index) => (
                    <li key={index} style={styles.problemSolutionItem}>
                      <span style={{ position: 'absolute', left: 0, fontSize: '1.2rem' }}>✨</span>
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="demo" style={styles.ctaSection}>
          <div style={styles.container}>
            <div style={styles.ctaContent}>
              <h2 style={styles.ctaTitle}>Ready to Transform Your Healthcare?</h2>
              <p style={styles.ctaDescription}>
                Join the revolution in digital healthcare management with our AI-powered Smart Health Card solution.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                style={{
                  ...styles.ctaBtn,
                  fontSize: '1.1rem',
                  padding: '1rem 2.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Start Your Health Journey
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
      </div>
      <footer id="contact" style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <h3 style={styles.footerTitle}>Smart Health Card</h3>
              <p style={{ color: '#ccc', marginTop: '1rem' }}>
                Revolutionizing healthcare with AI and blockchain technology for a healthier tomorrow.
              </p>
            </div>

            <div>
              <h3 style={styles.footerTitle}>Quick Links</h3>
              <button
                onClick={() => scrollToSection('features')}
                style={styles.footerLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#ccc'}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('audience')}
                style={styles.footerLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#ccc'}
              >
                Who Uses It
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                style={styles.footerLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#ccc'}
              >
                Solution
              </button>
              <button
                onClick={() => scrollToSection('demo')}
                style={styles.footerLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#ccc'}
              >
                Demo
              </button>
            </div>

            <div>
              <h3 style={styles.footerTitle}>Contact</h3>
              <p style={{ color: '#ccc', marginBottom: '1rem' }}>
                Get in touch to learn more about our innovative healthcare solution.
              </p>
              <a
                href="mailto:info@smarthealthcard.com"
                style={styles.footerLink}
                onMouseOver={(e) => e.target.style.color = '#667eea'}
                onMouseOut={(e) => e.target.style.color = '#ccc'}
              >
                info@smarthealthcard.com
              </a>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <p>&copy; 2025 Smart Health Card. All rights reserved. | Building the future of healthcare.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;