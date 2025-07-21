import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, Award, BookOpen, Send, Menu, X, Sun, Moon, Linkedin, Github, Twitter, Shield, PlusCircle, Edit, Trash2, LogIn, LogOut, Mail } from 'lucide-react';

// --- IMPORTANT ---
// PASTE YOUR DEPLOYED RENDER BACKEND URL HERE
const API_URL = 'https://portfolio-backend-km8w.onrender.com/api'; // Make sure this is YOUR Render URL + /api

// Custom Logo Component
const Logo = ({ className }) => (
  <svg className={className} width="36" height="36" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4l5 8l5 -8" /><path d="M12 12l0 8" />
  </svg>
);

// Static Data
const staticData = {
  personalInfo: {
    name: "Yogesh",
    title: "Full-Stack Developer & Cybersecurity Enthusiast",
    bio: `I'm a passionate Full-Stack Developer and Cybersecurity Enthusiast, currently pursuing a B.Tech in Computer Science with a specialization in Cybersecurity and IoT. My academic background has given me a strong technical foundation and a forward-thinking mindset that drives me to explore how technology can solve real-world problems.

I have hands-on experience in developing responsive web applications and a strong grasp of Cloud Computing, IoT, and modern development frameworks. I enjoy working on end-to-end projects—from designing intuitive user interfaces to building secure back-end systems. Alongside development, I'm deeply interested in the principles of secure coding, ethical hacking, and data protection.

With a deep curiosity for future technologies, I'm constantly learning and adapting to the evolving tech landscape. I’m passionate about contributing to innovations that are not only efficient but also secure and sustainable, with a vision to make technology smarter and safer for everyone. 

Whether I'm writing clean code or analyzing security threats, I believe in creating digital solutions that are both innovative and secure.

"Thinking should become your capital asset, no matter whatever ups and downs you come across in your life."`,
    email: "yogeshofficial55@gmail.com",
    socials: {
      linkedin: "https://www.linkedin.com/in/yogeswaran-cs-8b140827a/",
      github: "https://github.com/yogeshofficepersonal",
      twitter: "https://twitter.com/",
    }
  },
  skills: [
    { name: "Python", level: 95 }, { name: "Node.js", level: 90 }, { name: "HTML", level: 97 }, { name: "CSS", level: 75 }, { name: "Java Script", level: 88 }, { name: "Canva", level: 98 }, { name: "Framer Motion", level: 85 }, { name: "Sql", level: 80 }, { name: "UI/UX Design", level: 92 }, { name: "MongoDB", level: 75 }, { name: "Wordpress", level: 70 }, { name: "Designing", level: 80 },
  ],
};

// Main App Component
const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [portfolioData, setPortfolioData] = useState({ works: [], certifications: [], blog: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Fetch data from your backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [worksRes, certsRes, blogRes] = await Promise.all([
          fetch(`${API_URL}/works`),
          fetch(`${API_URL}/certifications`),
          fetch(`${API_URL}/blog`),
        ]);
        const works = await worksRes.json();
        const certifications = await certsRes.json();
        const blog = await blogRes.json();
        setPortfolioData({ 
            works: works.map(item => ({...item, id: item._id})), 
            certifications: certifications.map(item => ({...item, id: item._id})), 
            blog: blog.map(item => ({...item, id: item._id})) 
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setIsLoading(false);
    };
    if(API_URL && API_URL !== 'https://your-service-name.onrender.com/api') {
        fetchData();
    } else {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const handleLogin = () => setIsAdminAuthenticated(true);
  const handleLogout = () => { setIsAdminAuthenticated(false); setActivePage('home'); };

  const navLinks = [
    { id: 'home', title: 'Home' }, { id: 'about', title: 'About' }, { id: 'works', title: 'Works' }, { id: 'certifications', title: 'Certifications' }, { id: 'blog', title: 'Blog' }, { id: 'contact', title: 'Contact' }, { id: 'admin', title: 'Admin', icon: Shield },
  ];

  const renderPage = () => {
    if (isLoading) return <div className="flex justify-center items-center h-screen"><p>Loading data from the server...</p></div>;
    if (activePage === 'admin') {
      return isAdminAuthenticated ? (
        <AdminPage portfolioData={portfolioData} setPortfolioData={setPortfolioData} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      );
    }
    switch (activePage) {
      case 'home': return <HomePage data={staticData.personalInfo} />;
      case 'about': return <AboutPage data={{ personalInfo: staticData.personalInfo, skills: staticData.skills }} />;
      case 'works': return <WorksPage data={portfolioData.works} />;
      case 'certifications': return <CertificationsPage data={portfolioData.certifications} />;
      case 'blog': return <BlogPage data={portfolioData.blog} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage data={staticData.personalInfo} />;
    }
  };
  
  const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
  const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.5 };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans transition-colors duration-500 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-indigo-600 dark:text-indigo-400 cursor-pointer" onClick={() => setActivePage('home')}><Logo /></motion.div>
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (<button key={link.id} onClick={() => setActivePage(link.id)} className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${activePage === link.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}><div className="flex items-center">{link.icon && <link.icon className="mr-2 h-4 w-4" />}{link.title}</div>{activePage === link.id && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" layoutId="underline" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}</button>))}
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button>
            </nav>
            <div className="md:hidden flex items-center"><button onClick={toggleTheme} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md z-50">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (<motion.div initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 pt-20"><nav className="flex flex-col items-center justify-center h-full space-y-6">{navLinks.map((link) => (<button key={link.id} onClick={() => { setActivePage(link.id); setIsMenuOpen(false); }} className="text-2xl font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{link.title}</button>))}</nav></motion.div>)}
      </AnimatePresence>
      <main className="pt-20 flex-grow">
        <AnimatePresence mode="wait"><motion.div key={activePage} variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>{renderPage()}</motion.div></AnimatePresence>
      </main>
      <Footer personalInfo={staticData.personalInfo} />
    </div>
  );
};

// Admin Panel Component
const AdminPage = ({ portfolioData, setPortfolioData, onLogout }) => {
    const [activeTab, setActiveTab] = useState('works');
    const tabs = ['works', 'certifications', 'blog'];

    const handleAddItem = async (section, newItemData) => {
        try {
            const response = await fetch(`${API_URL}/${section}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItemData),
            });
            const savedItem = await response.json();
            setPortfolioData(prevData => ({
                ...prevData,
                [section]: [...prevData[section], { ...savedItem, id: savedItem._id }]
            }));
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleDeleteItem = async (section, id) => {
        try {
            await fetch(`${API_URL}/${section}/${id}`, { method: 'DELETE' });
            setPortfolioData(prevData => ({
                ...prevData,
                [section]: prevData[section].filter(item => item.id !== id)
            }));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <Section>
            <div className="flex justify-between items-center text-center mb-12"><div className="flex-1"></div><div className="flex-1"><SectionTitle>Admin Panel</SectionTitle></div><div className="flex-1 flex justify-end"><button onClick={onLogout} className="flex items-center px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors"><LogOut className="h-5 w-5 mr-2" /> Logout</button></div></div>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 border-b border-gray-300 dark:border-gray-700"><nav className="-mb-px flex space-x-8" aria-label="Tabs">{tabs.map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}>Manage {tab}</button>))}</nav></div>
                <div><AnimatePresence mode="wait"><motion.div key={activeTab} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {activeTab === 'works' && <AdminWorks data={portfolioData.works} onAdd={(item) => handleAddItem('works', item)} onDelete={(id) => handleDeleteItem('works', id)} />}
                    {activeTab === 'certifications' && <AdminCertifications data={portfolioData.certifications} onAdd={(item) => handleAddItem('certifications', item)} onDelete={(id) => handleDeleteItem('certifications', id)} />}
                    {activeTab === 'blog' && <AdminBlog data={portfolioData.blog} onAdd={(item) => handleAddItem('blog', item)} onDelete={(id) => handleDeleteItem('blog', id)} />}
                </motion.div></AnimatePresence></div>
            </div>
        </Section>
    );
};

// --- Other components are the same as before ---
const Footer = ({ personalInfo }) => (<footer className="bg-gray-200 dark:bg-gray-800 py-6"><div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400"><p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p></div></footer>);
const Section = ({ children, className = '' }) => (<section className={`container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${className}`}>{children}</section>);
const SectionTitle = ({ children }) => (<motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white relative inline-block" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>{children}<span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-indigo-500 rounded-full"></span></motion.h2>);
const HomePage = ({ data }) => { const { name, title, socials, email } = data; const words = title.split(' '); return (<div className="min-h-[calc(100vh-5rem-4rem)] flex items-center justify-center relative overflow-hidden"><div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:opacity-20"></div><div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div><div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:opacity-20"></div><div className="text-center z-10 p-4"><motion.h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">{name}</span></motion.h1><motion.h2 className="text-xl md:text-2xl mt-4 text-gray-600 dark:text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}><AnimatePresence>{words.map((word, i) => (<motion.span key={word + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }} className="inline-block mr-2">{word}</motion.span>))}</AnimatePresence></motion.h2><motion.div className="mt-8 flex justify-center space-x-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2 }}><a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Github size={28} /></a><a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Linkedin size={28} /></a><a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Twitter size={28} /></a><a href={`mailto:${email}`} className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Mail size={28} /></a></motion.div></div></div>); };
const AboutPage = ({ data }) => { const { personalInfo, skills } = data; const { bio } = personalInfo; const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }; const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }; const initials = personalInfo.name.split(' ').map(n => n[0]).join(''); return (<Section><div className="text-center"><SectionTitle>About Me</SectionTitle></div><div className="grid md:grid-cols-5 gap-12 items-center"><motion.div className="md:col-span-2" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}><div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-1 shadow-lg"><img src="https://i.postimg.cc/mrxZ8VZX/about.jpg" alt={personalInfo.name} className="w-full h-full rounded-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/300x300/e2e8f0/64748b?text=${initials}`; }} /></div></motion.div><motion.div className="md:col-span-3" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.2 }}><p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{bio}</p></motion.div></div><div className="mt-20"><h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">My Skills</h3><motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>{skills.map((skill) => (<motion.div key={skill.name} className="flex flex-col items-center" variants={itemVariants}><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2"><motion.div className="bg-indigo-600 h-2.5 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} /></div><p className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</p></motion.div>))}</motion.div></div></Section>); };
const WorksPage = ({ data: works }) => { const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }; const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }; return (<Section><div className="text-center"><SectionTitle>My Works</SectionTitle></div><motion.div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>{works.map((work) => (<motion.div key={work.id} className="group relative overflow-hidden rounded-lg shadow-lg" variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}><img src={work.imageUrl} alt={work.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 transition-all duration-500 opacity-0 group-hover:opacity-100"><h3 className="text-xl font-bold text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{work.title}</h3><p className="text-indigo-300 text-sm mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{work.category}</p><p className="text-gray-200 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">{work.description}</p></div></motion.div>))}</motion.div></Section>); };
const CertificationsPage = ({ data: certifications }) => { const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }; const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }; return (<Section><div className="text-center"><SectionTitle>Certifications</SectionTitle></div><motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>{certifications.map((cert) => (<motion.div key={cert.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6 text-center hover:shadow-xl transition-shadow duration-300" variants={itemVariants}><img src={cert.imageUrl} alt={cert.name} className="w-full h-48 object-cover mb-4 rounded-md" /><h3 className="text-lg font-bold text-gray-800 dark:text-white">{cert.name}</h3><p className="text-indigo-500 dark:text-indigo-400 mt-1">{cert.issuer}</p><p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{cert.date}</p></motion.div>))}</motion.div></Section>); };
const BlogPage = ({ data: blog }) => { const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }; const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }; return (<Section><div className="text-center"><SectionTitle>My Blog</SectionTitle></div><motion.div className="max-w-3xl mx-auto space-y-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>{blog.map((post) => (<motion.div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300" variants={itemVariants}><p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p><h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{post.title}</h3><p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p><a href={`/blog/${post.slug}`} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Read More &rarr;</a></motion.div>))}</motion.div></Section>); };
const ContactPage = () => { const [status, setStatus] = useState(''); const handleSubmit = (e) => { e.preventDefault(); setStatus('sending'); setTimeout(() => { setStatus('success'); e.target.reset(); setTimeout(() => setStatus(''), 3000); }, 1500); }; return (<Section><div className="text-center"><SectionTitle>Contact Me</SectionTitle><p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 -mt-8 mb-12">Have a project in mind or just want to say hi? Feel free to reach out.</p></div><motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}><form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"><div className="grid md:grid-cols-2 gap-6"><input type="text" placeholder="Your Name" required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" /><input type="email" placeholder="Your Email" required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div><input type="text" placeholder="Subject" required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" /><textarea placeholder="Your Message" rows="5" required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea><div className="text-center"><button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400 w-full md:w-auto">{status === 'sending' ? 'Sending...' : 'Send Message'}</button></div>{status === 'success' && <p className="text-center text-green-500 mt-4">Message sent successfully!</p>}</form></motion.div></Section>); };
const LoginPage = ({ onLogin }) => { const [password, setPassword] = useState(''); const [error, setError] = useState(''); const ADMIN_PASSWORD = 'password123'; const handleSubmit = (e) => { e.preventDefault(); if (password === ADMIN_PASSWORD) { setError(''); onLogin(); } else { setError('Incorrect password. Please try again.'); } }; return (<Section><div className="max-w-md mx-auto text-center"><SectionTitle>Admin Login</SectionTitle><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}><form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"><div><label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Password</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>{error && <p className="text-red-500 text-sm">{error}</p>}<button type="submit" className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors"><LogIn className="h-5 w-5 mr-2" /> Login</button></form></motion.div></div></Section>); };
const AdminSection = ({ title, data, formFields, onAdd, onDelete }) => { const [formData, setFormData] = useState(formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})); const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); }; const handleSubmit = (e) => { e.preventDefault(); onAdd(formData); setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})); }; return (<div className="grid lg:grid-cols-3 gap-8"><div className="lg:col-span-1"><h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add New {title}</h3><form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">{formFields.map(field => (<div key={field.name}><label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>{field.type === 'textarea' ? (<textarea name={field.name} id={field.name} value={formData[field.name]} onChange={handleInputChange} required rows="3" className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>) : (<input type={field.type} name={field.name} id={field.name} value={formData[field.name]} onChange={handleInputChange} required className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" />)}</div>))}<button type="submit" className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors"><PlusCircle className="h-5 w-5 mr-2" /> Add {title}</button></form></div><div className="lg:col-span-2"><h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Existing {title}s</h3><div className="space-y-4">{data.length > 0 ? data.map(item => (<div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between"><div><h4 className="font-bold text-gray-800 dark:text-white">{item.title || item.name}</h4><p className="text-sm text-gray-500 dark:text-gray-400">{item.category || item.issuer || item.date}</p></div><div><button onClick={() => alert('Edit functionality to be implemented!')} className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Edit className="h-5 w-5" /></button><button onClick={() => onDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"><Trash2 className="h-5 w-5" /></button></div></div>)) : <p className="text-gray-500 dark:text-gray-400">No items yet. Add one using the form.</p>}</div></div></div>); };
const AdminWorks = ({ data, onAdd, onDelete }) => (<AdminSection title="Work" data={data} onAdd={onAdd} onDelete={onDelete} formFields={[{ name: 'title', label: 'Title', type: 'text' }, { name: 'category', label: 'Category', type: 'text' }, { name: 'imageUrl', label: 'Image URL', type: 'text' }, { name: 'description', label: 'Description', type: 'textarea' },]} />);
const AdminCertifications = ({ data, onAdd, onDelete }) => (<AdminSection title="Certification" data={data} onAdd={onAdd} onDelete={onDelete} formFields={[{ name: 'name', label: 'Name', type: 'text' }, { name: 'issuer', label: 'Issuer', type: 'text' }, { name: 'date', label: 'Date', type: 'text' }, { name: 'imageUrl', label: 'Image URL', type: 'text' },]} />);
const AdminBlog = ({ data, onAdd, onDelete }) => (<AdminSection title="Blog Post" data={data} onAdd={onAdd} onDelete={onDelete} formFields={[{ name: 'title', label: 'Title', type: 'text' }, { name: 'date', label: 'Date', type: 'text' }, { name: 'slug', label: 'Slug (e.g., my-new-post)', type: 'text' }, { name: 'excerpt', label: 'Excerpt', type: 'textarea' },]} />);

export default App;
