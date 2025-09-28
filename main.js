// Import necessary libraries
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"
import anime from "animejs"

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initAnimations()
  initParticles()
  initScrollAnimations()
  initNavigation()
  initTypewriter()
  initProjectCardHoverEffects()
  initCTAButtonAnimation()
  initFormSubmission()
  addGlitchEffect()
})

// GSAP Animations
function initAnimations() {
  // Landing page entrance animation
  gsap
    .timeline()
    .from(".main-title", {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: "power3.out",
    })
    .from(
      ".subtitle",
      {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
      },
      "-=0.5",
    )
    .from(
      ".cta-button",
      {
        duration: 0.8,
        scale: 0,
        opacity: 0,
        ease: "back.out(1.7)",
      },
      "-=0.3",
    )

  // Navbar animation
  gsap.from(".navbar", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power2.out",
    delay: 0.5,
  })
}

// Three.js Particles
function initParticles() {
  const container = document.querySelector(".particles-container")
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 1000
  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x00ffff,
    transparent: true,
    opacity: 0.8,
  })

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  camera.position.z = 3

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    particlesMesh.rotation.x += 0.0005
    particlesMesh.rotation.y += 0.001

    renderer.render(scene, camera)
  }
  animate()

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

// Scroll animations
function initScrollAnimations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger)

  // About section animation
  gsap.from(".about-card", {
    scrollTrigger: {
      trigger: ".about-card",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    duration: 1,
    y: 100,
    opacity: 0,
    ease: "power2.out",
  })

  // Project cards animation
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out",
  })

  // Terminal animation
  gsap.from(".terminal-container", {
    scrollTrigger: {
      trigger: ".terminal-container",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    duration: 1,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)",
  })
}

// Navigation functionality
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        gsap.to(window, {
          duration: 1,
          scrollTo: targetSection,
          ease: "power2.inOut",
        })
      }
    })
  })
}

// Typewriter effect for form labels
function initTypewriter() {
  const labels = document.querySelectorAll(".terminal-label")

  labels.forEach((label, index) => {
    const text = label.textContent
    label.textContent = ""

    setTimeout(() => {
      let i = 0
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          label.textContent += text.charAt(i)
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)
    }, index * 500)
  })
}

// Project card hover effects
function initProjectCardHoverEffects() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      anime({
        targets: this,
        rotateY: 5,
        rotateX: 5,
        scale: 1.05,
        duration: 400,
        easing: "easeOutQuad",
      })
    })

    card.addEventListener("mouseleave", function () {
      anime({
        targets: this,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 400,
        easing: "easeOutQuad",
      })
    })
  })
}

// CTA button animation
function initCTAButtonAnimation() {
  document.querySelector(".cta-button").addEventListener("click", function () {
    anime({
      targets: this,
      scale: [1, 0.95, 1],
      duration: 200,
      easing: "easeInOutQuad",
    })

    // Scroll to about section
    gsap.to(window, {
      duration: 1.5,
      scrollTo: "#about",
      ease: "power2.inOut",
    })
  })
}

// Form submission
function initFormSubmission() {
  document.querySelector(".terminal-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const button = this.querySelector(".terminal-button")
    const originalText = button.innerHTML

    // Animate button
    anime({
      targets: button,
      scale: [1, 0.95, 1],
      duration: 200,
      easing: "easeInOutQuad",
    })

    button.innerHTML = "<span>TRANSMITTING...</span>"

    // Simulate form submission
    setTimeout(() => {
      button.innerHTML = "<span>TRANSMISSION_COMPLETE</span>"
      setTimeout(() => {
        button.innerHTML = originalText
      }, 2000)
    }, 1500)
  })
}

// Add glitch effect to random elements periodically
function addGlitchEffect() {
  setInterval(() => {
    const glitchElements = document.querySelectorAll(".glitch")
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)]

    if (randomElement) {
      randomElement.style.animation = "none"
      setTimeout(() => {
        randomElement.style.animation = "glitch 2s infinite"
      }, 100)
    }
  }, 5000)
}
