"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MatrixRain from "@/components/effects/MatrixRain"
import ProjectModal from "@/components/ProjectModal"
import BlogSection from "@/components/BlogSection"
import LoadingSpinner from "@/components/ui/loading"
import Notification from "@/components/ui/notification"
import { Github, Linkedin, Mail, ExternalLink, Code, Zap, Shield, Download, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"

export default function CyberpunkPortfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isContactLoading, setIsContactLoading] = useState(false)
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 100])

  useEffect(() => {
    setIsLoaded(true)
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    // Set up intersection observer for section detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          console.log(`Section '${sectionId}' is now in view`)
          if (sectionId && sectionId !== activeSection) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    const sections = ['home', 'about', 'projects', 'blog', 'contact']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [activeSection])

  // Sound effect utility
  const playSound = (type: "click" | "hover" | "success" | "error") => {
    if (!soundEnabled) return
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    const frequencies = {
      click: 800,
      hover: 600,
      success: 1000,
      error: 300
    }
    
    oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime)
    oscillator.type = 'square'
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsContactLoading(true)
    playSound("click")
    
    // Store form reference before async operations
    const form = e.currentTarget
    
    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string
    }
    
    console.log('Frontend: Submitting form data:', data)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      console.log('Frontend: Response received:', response.status, response.ok)
      console.log('Frontend: Response headers:', response.headers)

      if (response.ok) {
        const responseText = await response.text()
        console.log('Frontend: Raw response text:', responseText)
        
        let result
        try {
          result = JSON.parse(responseText)
          console.log('Frontend: Parsed JSON response:', result)
        } catch (parseError) {
          console.error('Frontend: JSON parse error:', parseError)
          throw new Error('Invalid JSON response from server')
        }
        
        setContactStatus("success")
        setNotification({ message: "MESSAGE.TRANSMITTED_SUCCESSFULLY", type: "success" })
        playSound("success")
        
        // Reset form using stored reference
        form.reset()
      } else {
        const errorText = await response.text()
        console.log('Frontend: Error response text:', errorText)
        throw new Error('Failed to send message')
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setContactStatus("idle")
        setNotification(null)
      }, 3000)
    } catch (error) {
      console.error('Frontend: Catch block error:', error)
      setContactStatus("error")
      setNotification({ message: "TRANSMISSION.FAILED - TRY.AGAIN", type: "error" })
      playSound("error")
      setTimeout(() => {
        setContactStatus("idle")
        setNotification(null)
      }, 3000)
    } finally {
      setIsContactLoading(false)
    }
  }

  // Download resume function
  const downloadResume = () => {
    playSound("click")
    // Create a mock PDF download
    const link = document.createElement('a')
    link.href = '/resume-cyberdev.pdf' // You would put your actual resume here
    link.download = 'Rahul-Pawar-Resume-2024.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const projects = [
    {
      id: 1,
      title: "3D Animated Text Explosion",
      description: "Interactive 3D text animation with explosive particle effects",
      fullDescription: "A stunning 3D text animation project that creates explosive particle effects when text elements are triggered. Built with modern web technologies, it features dynamic particle systems, realistic physics simulations, and smooth WebGL-based animations that respond to user interactions in real-time.",
      tech: ["JavaScript", "Three.js", "WebGL", "GSAP", "CSS3", "HTML5"],
      image: "/3d-text-explosion-animation.png",
      demoUrl: "https://userinpeace.github.io/3D-Animated-Text-Explosion-",
      githubUrl: "https://github.com/Userinpeace/3D-Animated-Text-Explosion-",
      features: [
        "3D text rendering with WebGL",
        "Particle explosion animations",
        "Interactive mouse and touch controls",
        "Smooth performance optimization",
        "Customizable particle effects",
        "Responsive design for all devices"
      ],
      challenges: "Creating smooth particle animations while maintaining 60fps performance across different devices",
      solution: "Implemented efficient particle pooling system and optimized WebGL shaders for maximum performance"
    },
    {
      id: 2,
      title: "Mario Trails",
      description: "Interactive Mario-themed animation with dynamic trail effects",
      fullDescription: "A creative web animation project featuring Mario character with dynamic trail effects and interactive gameplay elements. The project showcases advanced CSS animations, JavaScript interactions, and smooth character movement with particle trail systems that create an engaging visual experience.",
      tech: ["JavaScript", "CSS3", "HTML5", "Canvas API", "Animation API", "DOM"],
      image: "/mario-trails-animation.png",
      demoUrl: "https://userinpeace.github.io/mario-trails",
      githubUrl: "https://github.com/Userinpeace/mario-trails",
      features: [
        "Character animation with trail effects",
        "Interactive keyboard controls",
        "Smooth movement mechanics",
        "Dynamic particle generation",
        "Retro gaming aesthetics",
        "Cross-browser compatibility"
      ],
      challenges: "Implementing smooth trail effects that don't impact performance while maintaining retro game aesthetics",
      solution: "Used canvas-based rendering with optimized particle lifecycle management and CSS transforms for smooth animations"
    },
    {
      id: 3,
      title: "AI Live",
      description: "Real-time AI-powered live interaction platform",
      fullDescription: "An innovative AI-powered platform that enables real-time interactions and live communication features. The project integrates advanced AI capabilities with modern web technologies to create seamless user experiences, featuring real-time data processing, intelligent responses, and dynamic content generation.",
      tech: ["React", "Node.js", "AI/ML APIs", "WebSocket", "Express.js", "MongoDB"],
      image: "/ai-live-platform.png",
      demoUrl: "https://userinpeace.github.io/ai-live",
      githubUrl: "https://github.com/Userinpeace/ai-live",
      features: [
        "Real-time AI-powered interactions",
        "Live chat and communication",
        "Dynamic content generation",
        "Intelligent response system",
        "Modern responsive UI/UX",
        "Scalable backend architecture"
      ],
      challenges: "Integrating multiple AI services while maintaining low latency for real-time interactions",
      solution: "Implemented efficient WebSocket connections with AI service optimization and intelligent caching strategies"
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground matrix-bg cyber-grid">
      <MatrixRain />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-enhanced gpu-accelerated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold neon-text-enhanced text-primary">&lt;USERINPEACE/&gt;</div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "blog", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    playSound("click")
                    scrollToSection(item)
                  }}
                  onMouseEnter={() => playSound("hover")}
                  className={`px-6 py-3 rounded-md transition-all duration-300 gpu-accelerated ${
                    activeSection === item 
                      ? "text-primary neon-text-enhanced nav-active" 
                      : "text-muted-foreground hover:text-primary cyber-button hover:bg-primary/5"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSoundEnabled(!soundEnabled)
                  playSound("click")
                }}
                className="text-muted-foreground hover:text-primary transition-all duration-300 gpu-accelerated"
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                onClick={downloadResume}
                onMouseEnter={() => playSound("hover")}
                className="cyber-button-enhanced border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground gpu-accelerated"
              >
                <Download className="mr-2 h-4 w-4" />
                RESUME
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 neon-text-enhanced text-primary gpu-accelerated"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              CYBER
              <motion.span 
                className="text-secondary glitch-effect neon-text-enhanced"
                animate={{ 
                  textShadow: [
                    "0 0 5px #ec4899",
                    "0 0 20px #ec4899, 0 0 30px #ec4899",
                    "0 0 5px #ec4899"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                DEV
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Cybersecurity Analyst & Software Engineer specializing in secure development and digital asset protection
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                onClick={() => scrollToSection("projects")}
                className="cyber-button-enhanced neon-border bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-4 text-lg gpu-accelerated"
              >
                <Code className="mr-2 h-5 w-5" />
                VIEW PROJECTS
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="cyber-button-enhanced border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 text-lg gpu-accelerated"
              >
                <Mail className="mr-2 h-5 w-5" />
                CONTACT ME
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary rounded-full"
            animate={{ 
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/3 w-3 h-3 bg-accent rounded-full"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-16 neon-text text-primary"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ABOUT
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                I'm a passionate Cybersecurity Analyst and Software Engineer who thrives at the intersection of secure software development and modern cybersecurity practices. With expertise in building scalable applications and safeguarding digital assets, I craft solutions that are both innovative and resilient.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                My work spans from full-stack development to vulnerability assessment, threat detection, and system hardening—pushing the boundaries of what's possible in secure technology.
              </p>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-secondary">⚡ CORE.SKILLS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "JavaScript / React / Node.js",
                    "Python / SQL",
                    "HTML / CSS / API Development",
                    "Linux / Network Security",
                    "Burp Suite / Nmap / Vulnerability Assessment",
                    "Threat Intelligence / Penetration Testing",
                    "Cloud Security / Data Encryption",
                    "AI & Emerging Technologies",
                  ].map((skill) => (
                    <div key={skill} className="neon-border p-3 rounded-md hologram-effect">
                      <span className="text-sm font-mono">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative flex items-start justify-center md:justify-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="neon-border p-8 hologram-effect bg-card w-full max-w-sm">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm text-primary">SYSTEM.STATUS</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between">
                      <span>CPU:</span>
                      <span className="text-primary">98% EFFICIENCY</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CREATIVITY:</span>
                      <span className="text-secondary">MAXIMUM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COFFEE_LEVEL:</span>
                      <span className="text-accent">OPTIMAL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PROJECTS_COMPLETED:</span>
                      <span className="text-primary">50+</span>
                    </div>
                    <div className="pt-4 border-t border-primary/20">
                      <div className="terminal-cursor text-secondary text-center">
                        READY_FOR_NEW_CHALLENGE
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-16 neon-text-enhanced text-primary gpu-accelerated"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            PROJECTS
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="cyber-card glass-enhanced group overflow-hidden h-full flex flex-col gpu-accelerated">
                  <div className="relative overflow-hidden cyber-loading">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <motion.div 
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-secondary">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span 
                          key={tech} 
                          className="px-2 py-1 bg-muted rounded text-xs font-mono"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="w-full cyber-button bg-primary text-primary-foreground hover:bg-primary/80"
                        onClick={() => {
                          playSound("click")
                          setSelectedProject(project.id)
                        }}
                        onMouseEnter={() => playSound("hover")}
                      >
                        <Code className="mr-2 h-4 w-4" />
                        VIEW PROJECT
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog">
        <BlogSection playSound={playSound} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 neon-text-enhanced text-primary gpu-accelerated">CONTACT</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary">INITIALIZE.CONNECTION</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ready to collaborate on your next digital project? Let's connect and build something extraordinary
                together.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-mono">EMAIL: rahulpawar96110211@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span className="font-mono">GITHUB: /Userinpeace</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="font-mono">LINKEDIN: /in/rahul-pawar-734745157</span>
                </div>
              </div>
            </div>
            <Card className="cyber-card glass-enhanced p-8 gpu-accelerated">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-mono text-secondary mb-3 neon-text">NAME.INPUT</label>
                  <Input 
                    name="name"
                    className="cyber-input bg-input border-border text-foreground h-12" 
                    placeholder="Enter your name"
                    required
                    disabled={isContactLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-secondary mb-3 neon-text">EMAIL.INPUT</label>
                  <Input
                    name="email"
                    type="email"
                    className="cyber-input bg-input border-border text-foreground h-12"
                    placeholder="Enter your email"
                    required
                    disabled={isContactLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-secondary mb-3 neon-text">MESSAGE.INPUT</label>
                  <Textarea
                    name="message"
                    className="cyber-input bg-input border-border text-foreground min-h-32 resize-none"
                    placeholder="Enter your message"
                    required
                    disabled={isContactLoading}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isContactLoading}
                  className="w-full cyber-button-enhanced bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50 h-14 text-lg gpu-accelerated"
                >
                  {isContactLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      TRANSMIT.MESSAGE
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground font-mono">© 2025 USERINPEACE - ALL RIGHTS RESERVED</p>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={projects.find(p => p.id === selectedProject) || null}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        playSound={playSound}
      />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={!!notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}
