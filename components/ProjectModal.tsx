"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, Code, Zap, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  tech: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  features: string[]
  challenges: string
  solution: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  playSound: (type: "click" | "hover" | "success" | "error") => void
}

export default function ProjectModal({ project, isOpen, onClose, playSound }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-background/95 backdrop-blur-md border border-primary/20 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border p-6">
              <div className="flex items-center justify-between">
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold text-primary neon-text"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {project.title}
                </motion.h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    playSound("click")
                    onClose()
                  }}
                  className="text-muted-foreground hover:text-primary"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Project Image */}
              <motion.div 
                className="relative overflow-hidden rounded-lg neon-border"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-secondary">PROJECT.OVERVIEW</h3>
                <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-secondary flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  TECH.STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <Badge 
                        variant="outline" 
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-secondary flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  KEY.FEATURES
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-md bg-muted/20 border border-border/50"
                    >
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Challenges & Solutions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-secondary flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  CHALLENGES.& SOLUTIONS
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-accent">CHALLENGE</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                      {project.challenges}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">SOLUTION</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed p-4 bg-primary/10 border border-primary/20 rounded-md">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border"
              >
                {project.demoUrl && (
                  <Button 
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/80 cyber-button"
                    onClick={() => {
                      playSound("click")
                      window.open(project.demoUrl, '_blank')
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    LIVE.DEMO
                  </Button>
                )}
                {project.githubUrl && (
                  <Button 
                    variant="outline" 
                    className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground cyber-button"
                    onClick={() => {
                      playSound("click")
                      window.open(project.githubUrl, '_blank')
                    }}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    SOURCE.CODE
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
