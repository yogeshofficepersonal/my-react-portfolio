import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, Award, BookOpen, Send, Menu, X, Sun, Moon, Linkedin, Github, Twitter, Shield, PlusCircle, Edit, Trash2 } from 'lucide-react';

// Initial Data
const initialData = {
  personalInfo: {
    name: "Alex Doe",
    title: "Full-Stack Developer & UI/UX Enthusiast",
    bio: "I'm a passionate developer based in Tech City, specializing in creating stunning, high-performance websites and applications. With a keen eye for design and a love for clean code, I turn complex problems into beautiful, intuitive digital experiences. When I'm not coding, you can find me exploring the latest tech trends or contributing to open-source projects.",
    email: "hello@alexdoe.com",
    socials: {
      linkedin: "https://linkedin.com/in/alexdoe",
      github: "https://github.com/alexdoe",
      twitter: "https://twitter.com/alexdoe",
    }
  },
  skills: [
    { name: "React", level: 95 },
    { name: "Node.js", level: 90 },
    { name: "Tailwind CSS", level: 98 },
    { name: "Framer Motion", level: 85 },
    { name: "Firebase", level: 80 },
    { name: "UI/UX Design", level: 92 },
    { name: "MongoDB", level: 75 },
    { name: "GraphQL", level: 70 },
  ],
  works: [
    { id: 1, title: "E-commerce Platform", category: "Web App", imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Project+1", description: "A feature-rich e-commerce platform with a custom CMS and payment gateway integration." },
    { id: 2, title: "Real-time Chat App", category: "Web App", imageUrl: "https://placehold.co/600x400/2a2a2a/ffffff?text=Project+2", description: "A scalable chat application using WebSockets for instant messaging and notifications." },
  ],
  certifications: [
    { id: 1, name: "Certified JavaScript Developer", issuer: "Tech Certification Inc.", date: "2023", imageUrl: "https://placehold.co/400x300/1e1e1e/ffffff?text=Cert+1" },
    { id: 2, name: "Advanced React Patterns", issuer: "CodeAcademy Pro", date: "2023", imageUrl: "https://placehold.co/400x300/2e2e2e/ffffff?text=Cert+2" },
  ],
  blog: [
    { id: 1, title: "The Rise of Serverless Architecture", date: "July 20, 2025", excerpt: "Exploring the benefits and challenges of adopting serverless for modern web applications...", slug: "serverless-rise" },
    { id: 2, title: "Mastering Animations with Framer Motion", date: "June 28, 2025", excerpt: "A deep dive into creating complex, performant animations in React with Framer Motion...", slug: "framer-motion-guide" },
  ]
};

// Main App Component
const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [portfolioData, setPortfolioData] = useState(initialData);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const navLinks = [
    { id: 'home', title: 'Home', icon: User },
    { id: 'about', title: 'About', icon: User },
    { id: 'works', title: 'Works', icon: Code },
    { id: 'certifications', title: 'Certifications', icon: Award },
    { id: 'blog', title: 'Blog', icon: BookOpen },
    { id: 'contact', title: 'Contact', icon: Send },
    { id: 'admin', title: 'Admin', icon: Shield },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage data={portfolioData.personalInfo} />;
      case 'about': return <AboutPage data={{ personalInfo: portfolioData.personalInfo, skills: portfolioData.skills }} />;
      case 'works': return <WorksPage data={portfolioData.works} />;
      case 'certifications': return <CertificationsPage data={portfolioData.certifications} />;
      case 'blog': return <BlogPage data={portfolioData.blog} />;
      case 'contact': return <ContactPage />;
      case 'admin': return <AdminPage portfolioData={portfolioData} setPortfolioData={setPortfolioData} />;
      default: return <HomePage data={portfolioData.personalInfo} />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans transition-colors duration-500">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
              onClick={() => setActivePage('home')}
            >
              {portfolioData.personalInfo.name.split(' ')[0]}<span className="text-gray-500">.</span>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                    activePage === link.id
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <div className="flex items-center">
                    {link.id === 'admin' && <Shield className="mr-2 h-4 w-4" />}
                    {link.title}
                  </div>
                  {activePage === link.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>

            <div className="md:hidden flex items-center">
              <button onClick={toggleTheme} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md z-50">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 pt-20"
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-2xl font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.title}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 py-6 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} {portfolioData.personalInfo.name}. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
};

// Page Components
const Section = ({ children, className = '' }) => (
  <section className={`container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ children }) => (
    <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
    >
        {children}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-indigo-500 rounded-full"></span>
    </motion.h2>
);

const HomePage = ({ data }) => {
    const { name, title, socials } = data;
    const words = title.split(' ');

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div>
            <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:opacity-20"></div>

            <div className="text-center z-10 p-4">
                <motion.h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                    Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">{name}</span>
                </motion.h1>
                <motion.h2 className="text-xl md:text-2xl mt-4 text-gray-600 dark:text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
                    <AnimatePresence>
                        {words.map((word, i) => (
                            <motion.span key={word + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }} className="inline-block mr-2">
                                {word}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </motion.h2>
                <motion.div className="mt-8 flex justify-center space-x-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2 }}>
                    <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Github size={28} /></a>
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Linkedin size={28} /></a>
                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Twitter size={28} /></a>
                </motion.div>
            </div>
        </div>
    );
};

const AboutPage = ({ data }) => {
    const { personalInfo, skills } = data;
    const { bio } = personalInfo;
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <Section>
            <div className="text-center"><SectionTitle>About Me</SectionTitle></div>
            <div className="grid md:grid-cols-5 gap-12 items-center">
                <motion.div className="md:col-span-2" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                    <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-1 shadow-lg">
                        <img src={`https://i.pravatar.cc/300?u=${personalInfo.email}`} alt={personalInfo.name} className="w-full h-full rounded-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x300/e2e8f0/64748b?text=AD'; }} />
                    </div>
                </motion.div>
                <motion.div className="md:col-span-3" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{bio}</p>
                </motion.div>
            </div>
            <div className="mt-20">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">My Skills</h3>
                <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    {skills.map((skill) => (
                        <motion.div key={skill.name} className="flex flex-col items-center" variants={itemVariants}>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                                <motion.div className="bg-indigo-600 h-2.5 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} />
                            </div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

const WorksPage = ({ data: works }) => {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <Section>
            <div className="text-center"><SectionTitle>My Works</SectionTitle></div>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                {works.map((work) => (
                    <motion.div key={work.id} className="group relative overflow-hidden rounded-lg shadow-lg" variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                        <img src={work.imageUrl} alt={work.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 transition-all duration-500 opacity-0 group-hover:opacity-100">
                            <h3 className="text-xl font-bold text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{work.title}</h3>
                            <p className="text-indigo-300 text-sm mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{work.category}</p>
                            <p className="text-gray-200 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">{work.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

const CertificationsPage = ({ data: certifications }) => {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <Section>
            <div className="text-center"><SectionTitle>Certifications</SectionTitle></div>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                {certifications.map((cert) => (
                    <motion.div key={cert.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6 text-center hover:shadow-xl transition-shadow duration-300" variants={itemVariants}>
                        <img src={cert.imageUrl} alt={cert.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{cert.name}</h3>
                        <p className="text-indigo-500 dark:text-indigo-400 mt-1">{cert.issuer}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{cert.date}</p>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

const BlogPage = ({ data: blog }) => {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <Section>
            <div className="text-center"><SectionTitle>My Blog</SectionTitle></div>
            <motion.div className="max-w-3xl mx-auto space-y-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                {blog.map((post) => (
                    <motion.div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300" variants={itemVariants}>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{post.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                        <a href={`/blog/${post.slug}`} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Read More &rarr;</a>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

const ContactPage = () => {
    const [status, setStatus] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            e.target.reset();
            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    return (
        <Section>
            <div className="text-center">
                <SectionTitle>Contact Me</SectionTitle>
                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 -mt-8 mb-12">Have a project in mind or just want to say hi? Feel free to reach out.</p>
            </div>
            <motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Your Name" required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input type="email" placeholder="Your Email" required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <input type="text" placeholder="Subject" required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <textarea placeholder="Your Message" rows="5" required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    <div className="text-center">
                        <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400 w-full md:w-auto">
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                    {status === 'success' && <p className="text-center text-green-500 mt-4">Message sent successfully!</p>}
                </form>
            </motion.div>
        </Section>
    );
};

// Admin Panel Component
const AdminPage = ({ portfolioData, setPortfolioData }) => {
    const [activeTab, setActiveTab] = useState('works');
    
    // Generic handler for adding new items
    const handleAddItem = (section, newItemData) => {
        setPortfolioData(prevData => ({
            ...prevData,
            [section]: [...prevData[section], { id: Date.now(), ...newItemData }]
        }));
    };

    // Generic handler for deleting items
    const handleDeleteItem = (section, id) => {
        setPortfolioData(prevData => ({
            ...prevData,
            [section]: prevData[section].filter(item => item.id !== id)
        }));
    };

    const tabs = ['works', 'certifications', 'blog'];

    return (
        <Section>
            <div className="text-center"><SectionTitle>Admin Panel</SectionTitle></div>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 border-b border-gray-300 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                            >
                                Manage {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'works' && <AdminWorks data={portfolioData.works} onAdd={(item) => handleAddItem('works', item)} onDelete={(id) => handleDeleteItem('works', id)} />}
                            {activeTab === 'certifications' && <AdminCertifications data={portfolioData.certifications} onAdd={(item) => handleAddItem('certifications', item)} onDelete={(id) => handleDeleteItem('certifications', id)} />}
                            {activeTab === 'blog' && <AdminBlog data={portfolioData.blog} onAdd={(item) => handleAddItem('blog', item)} onDelete={(id) => handleDeleteItem('blog', id)} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Section>
    );
};

const AdminSection = ({ title, data, formFields, onAdd, onDelete }) => {
    const [formData, setFormData] = useState(formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        // Reset form
        setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add New {title}</h3>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea name={field.name} id={field.name} value={formData[field.name]} onChange={handleInputChange} required rows="3" className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            ) : (
                                <input type={field.type} name={field.name} id={field.name} value={formData[field.name]} onChange={handleInputChange} required className="mt-1 w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            )}
                        </div>
                    ))}
                    <button type="submit" className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors">
                        <PlusCircle className="h-5 w-5 mr-2" /> Add {title}
                    </button>
                </form>
            </div>
            <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Existing {title}s</h3>
                <div className="space-y-4">
                    {data.length > 0 ? data.map(item => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white">{item.title || item.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.category || item.issuer || item.date}</p>
                            </div>
                            <div>
                                <button onClick={() => alert('Edit functionality to be implemented!')} className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Edit className="h-5 w-5" /></button>
                                <button onClick={() => onDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"><Trash2 className="h-5 w-5" /></button>
                            </div>
                        </div>
                    )) : <p className="text-gray-500 dark:text-gray-400">No items yet. Add one using the form.</p>}
                </div>
            </div>
        </div>
    );
};

const AdminWorks = ({ data, onAdd, onDelete }) => (
    <AdminSection
        title="Work"
        data={data}
        onAdd={onAdd}
        onDelete={onDelete}
        formFields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'imageUrl', label: 'Image URL', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
        ]}
    />
);

const AdminCertifications = ({ data, onAdd, onDelete }) => (
    <AdminSection
        title="Certification"
        data={data}
        onAdd={onAdd}
        onDelete={onDelete}
        formFields={[
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'issuer', label: 'Issuer', type: 'text' },
            { name: 'date', label: 'Date', type: 'text' },
            { name: 'imageUrl', label: 'Image URL', type: 'text' },
        ]}
    />
);

const AdminBlog = ({ data, onAdd, onDelete }) => (
    <AdminSection
        title="Blog Post"
        data={data}
        onAdd={onAdd}
        onDelete={onDelete}
        formFields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'date', label: 'Date', type: 'text' },
            { name: 'slug', label: 'Slug (e.g., my-new-post)', type: 'text' },
            { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
        ]}
    />
);

export default App;
