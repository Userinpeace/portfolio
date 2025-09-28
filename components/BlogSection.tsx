"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Code, Brain, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  readTime: number
  publishedAt: string
  image: string
  tags: string[]
}

interface BlogSectionProps {
  playSound: (type: "click" | "hover" | "success" | "error") => void
}

export default function BlogSection({ playSound }: BlogSectionProps) {
  // Helper function to format date consistently across server and client
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications.",
      content: "Artificial intelligence is transforming web development in unprecedented ways. From automated code generation to intelligent user interfaces, AI is becoming an integral part of modern web development workflows...",
      category: "AI",
      readTime: 8,
      publishedAt: "2024-01-15",
      image: "/futuristic-neural-network-dashboard-with-glowing-n.jpg",
      tags: ["AI", "Web Development", "Machine Learning", "Future Tech"]
    },
    {
      id: 2,
      title: "Quantum Computing: Beyond Classical Limitations",
      excerpt: "Diving deep into quantum computing principles and their potential applications in solving complex computational problems.",
      content: "Quantum computing represents a paradigm shift in computational power. Unlike classical computers that use bits, quantum computers leverage quantum bits (qubits) to perform calculations...",
      category: "Quantum",
      readTime: 12,
      publishedAt: "2024-01-10",
      image: "/quantum-computing-interface-with-glowing-circuits.jpg",
      tags: ["Quantum Computing", "Physics", "Technology", "Innovation"]
    },
    {
      id: 3,
      title: "Cybersecurity in the Age of IoT",
      excerpt: "Understanding the security challenges and solutions in our increasingly connected world of Internet of Things devices.",
      content: "As IoT devices proliferate, cybersecurity becomes more critical than ever. The interconnected nature of these devices creates new attack vectors and security challenges...",
      category: "Security",
      readTime: 6,
      publishedAt: "2024-01-05",
      image: "/cybersecurity-threat-map-with-neon-indicators.jpg",
      tags: ["Cybersecurity", "IoT", "Network Security", "Privacy"]
    }
  ]

  const categoryIcons = {
    AI: Brain,
    Quantum: Code,
    Security: Shield
  }

  const categoryColors = {
    AI: "text-primary border-primary/30",
    Quantum: "text-secondary border-secondary/30", 
    Security: "text-accent border-accent/30"
  }

  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-center mb-16 neon-text text-primary"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          BLOG
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            const CategoryIcon = categoryIcons[post.category as keyof typeof categoryIcons]
            const categoryColor = categoryColors[post.category as keyof typeof categoryColors]

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="neon-border bg-card group overflow-hidden h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className={`${categoryColor} bg-background/80 backdrop-blur-sm`}>
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}m read
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-secondary line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs border-border/50 text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full cyber-button bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          playSound("click")
                          // Here you would navigate to the full blog post
                          console.log(`Reading blog post: ${post.id}`)
                        }}
                        onMouseEnter={() => playSound("hover")}
                      >
                        READ.FULL_POST
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* View All Posts Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="outline"
            className="cyber-button border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg"
            onClick={() => {
              playSound("click")
              // Here you would navigate to the full blog page
              console.log("Navigating to full blog page")
            }}
            onMouseEnter={() => playSound("hover")}
          >
            VIEW.ALL_POSTS
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
