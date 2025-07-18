"use client"
import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CommandLineIcon, ArrowDownTrayIcon, Bars3Icon, XMarkIcon, BuildingStorefrontIcon, CurrencyDollarIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

// Reusable Logo Component
const Logo = ({ onClick, className }) => (
  <a href="#hero" onClick={onClick} className={`block ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-full h-full"
    >
      <motion.path
        d="M 25 75 L 50 25 L 75 75"
        stroke="#00ffff"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M 37.5 50 L 62.5 50 M 50 50 L 50 75"
        stroke="#ff00ff"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
      />
    </svg>
  </a>
);

// Preloader Component with SVG path animation
const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex justify-center items-center bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
    >
      <div className="w-40 h-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          {/* Stylized 'A' */}
          <motion.path
            d="M 25 75 L 50 25 L 75 75"
            stroke="#00ffff"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              default: { duration: 2, ease: "easeInOut" },
            }}
          />
          {/* Stylized 'T' (as crossbar of A) */}
          <motion.path
            d="M 37.5 50 L 62.5 50 M 50 50 L 50 75"
            stroke="#ff00ff"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              default: { duration: 2, ease: "easeInOut", delay: 0.5 },
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
};


const AnimatedSection = ({ children, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.section
      id={id} ref={ref} initial="hidden" animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
        hidden: { opacity: 0, y: 50 },
      }}
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      {children}
    </motion.section>
  );
};


export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    },100); // 0.1 seconds delay for preloader show

    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const projects = [
    {
      title: "Internal Systems (Intranet, Budget, Finance)",
      description: "พัฒนาระบบ Intranet หลักและระบบย่อยที่เกี่ยวข้องกัน เช่น ระบบจัดการงบประมาณ (Budget) และระบบเบิกจ่าย (Finance) เพื่อเพิ่มประสิทธิภาพการทำงานภายในองค์กร",
      icon: <BuildingStorefrontIcon className="h-8 w-8 text-cyan-400" />,
      tags: ["Internal Tools", "Fullstack", "System Integration"]
    },
    {
      title: "Jewelry E-commerce & Landing Page",
      description: "สร้างเว็บ E-commerce สำหรับธุรกิจครอบครัวด้วย Template จาก Vercel เชื่อมต่อระบบชำระเงิน Stripe และสร้าง Landing Page สำหรับแสดงโปรไฟล์และ Catalog",
      icon: <CurrencyDollarIcon className="h-8 w-8 text-purple-400" />,
      tags: ["E-commerce", "Stripe", "Next.js", "Vercel", "Landing Page"]
    },
    {
      title: "Maintenance & DevOps (CI/CD, AWS)",
      description: "ดูแลและปรับปรุงโปรเจกต์กว่า 25+ Repositories รวมถึงแก้ไข Pipeline CI/CD (Python/Gitlab), จัดการ AWS Lambda (JavaScript) และสร้าง/แก้ไข API Services ทั้งหมดขององค์กร",
      icon: <WrenchScrewdriverIcon className="h-8 w-8 text-emerald-400" />,
      tags: ["Maintenance", "DevOps", "CI/CD", "AWS Lambda", "API"]
    }
  ];

  const skills = {
    "Frontend": ["React.JS", "Next.JS", "Vue.JS", "React Native", "Tailwind CSS", "AntD", "MeterialUI", "HTML/CSS"],
    "Backend": ["Node.JS", "NestJS", "Python", "Microservices", "REST API"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "NoSQL", "Amazon RDS"],
    "DevOps & Cloud": ["AWS", "Google Cloud", "Docker", "CI/CD", "Gitlab", "Nginx", "PM2", "AWS Lambda", "AWS S3", "AWS EC2"]
  };

  return (
    <div className="bg-gray-900 min-h-screen overflow-x-hidden relative font-poppins">
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md p-4 border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
              <Logo onClick={handleNavClick} className="w-10 h-10" />
              <div className="hidden md:flex space-x-8">
                {['About', 'Skills', 'Projects', 'Contact'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={handleNavClick} className="text-gray-300 font-semibold hover:text-cyan-400 transition-colors duration-300">{item}</a>
                ))}
              </div>
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                  {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </button>
              </div>
            </div>
            <motion.div
              initial="closed"
              animate={isMenuOpen ? "open" : "closed"}
              variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: "-100%" } }}
              transition={{ duration: 0.3 }}
              className={`absolute left-0 w-full bg-gray-900/95 backdrop-blur-lg p-4 ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
              {['About', 'Skills', 'Projects', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={handleNavClick} className="block text-center py-3 text-lg text-gray-200 hover:text-cyan-400 transition-colors duration-300">{item}</a>
              ))}
            </motion.div>
          </nav>

          <main className="container mx-auto relative z-10">
            <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4">
              <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: 'spring' }} className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  Amonthep Tanlaeo
                </span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl">
                Fullstack Developer ผู้หลงใหลในการสร้างสรรค์เว็บแอปพลิเคชันที่สวยงามและมีประสิทธิภาพ
              </motion.p>
              <motion.a href="#projects" onClick={handleNavClick} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1 }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30">
                ดูผลงานของฉัน
              </motion.a>
            </section>

            <AnimatedSection id="about">
              <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">About Me</h2>
              <motion.div variants={projectVariants} className="max-w-4xl mx-auto text-center text-gray-200 text-lg leading-relaxed bg-gray-800/50 p-8 rounded-lg">
                <p>สวัสดีครับ! ผม อามรเทพ ทันแล้ว เป็นนักพัฒนา Fullstack ที่มีประสบการณ์ในการสร้างและปรับขนาดเว็บแอปพลิเคชันที่ซับซ้อน ผมเชื่อในการเรียนรู้ตลอดชีวิตและมักจะมองหาเทคโนโลยีใหม่ๆ เพื่อมาปรับปรุงงานของผมเสมอ</p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection id="skills">
              <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">My Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(skills).map(([category, skillList]) => (
                  <motion.div key={category} variants={projectVariants} className="bg-gray-800/50 p-6 rounded-lg transition-all duration-300 hover:bg-gray-800/80">
                    <h3 className="text-2xl font-bold mb-4 text-cyan-400">{category}</h3>
                    <ul>
                      {skillList.map(skill => (
                        <motion.li key={skill} className="mb-2 text-gray-300 flex items-center" whileHover={{ x: 5, color: '#00ffff' }} transition={{ duration: 0.2 }}>
                          <CommandLineIcon className="h-5 w-5 mr-3 text-purple-400" />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection id="projects">
              <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div key={index} variants={projectVariants} className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:bg-gray-800/80 hover:scale-105">
                    <div className="p-6 flex-grow">
                      <div className="flex items-center mb-4">{project.icon} <h3 className="text-xl font-bold ml-4 text-gray-100">{project.title}</h3></div>
                      <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                    </div>
                    <div className="p-6 bg-gray-900/50"><div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (<span key={tag} className="bg-gray-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>))}
                    </div></div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection id="contact">
              <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Get In Touch</h2>
              <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">ผมกำลังมองหาโอกาสใหม่ๆ อยู่เสมอ หากคุณมีโปรเจกต์ที่น่าสนใจ หรือต้องการพูดคุย สามารถติดต่อผมได้เลยครับ</p>
              <div className="text-center flex flex-wrap justify-center items-center gap-6">
                <motion.a href="mailto:amontheptanlaeo111@gmail.com" whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full transition-transform transform shadow-lg">Email Me</motion.a>
                <motion.a href="https://github.com/amontheptanlaeo" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform">View GitHub</motion.a>
                <motion.a href="https://www.linkedin.com/in/amonthep-tanlaeo" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform">View LinkedIn</motion.a>
                <motion.a href="/amonthep-tanlaeo-resume.pdf" download whileHover={{ scale: 1.05 }} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform flex items-center justify-center gap-2"><ArrowDownTrayIcon className="h-5 w-5" />Download CV</motion.a>
              </div>
            </AnimatedSection>
          </main>

          <footer className="text-center py-8 text-gray-500 border-t border-gray-800 mt-16">
            <p>&copy; {new Date().getFullYear()} Amonthep Tanlaeo. All Rights Reserved.</p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
