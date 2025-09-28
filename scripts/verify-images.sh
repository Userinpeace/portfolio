#!/bin/bash

# Image verification script for deployment
echo "🔍 Verifying all images exist..."

# Check project images
images=(
  "3d-text-explosion-animation.png"
  "mario-trails-animation.png" 
  "ai-live-platform.png"
  "futuristic-neural-network-dashboard-with-glowing-n.jpg"
  "quantum-computing-interface-with-glowing-circuits.jpg"
  "cybersecurity-threat-map-with-neon-indicators.jpg"
)

missing_images=()

for image in "${images[@]}"; do
  if [[ -f "public/$image" ]]; then
    echo "✅ $image - Found"
  else
    echo "❌ $image - Missing"
    missing_images+=("$image")
  fi
done

if [[ ${#missing_images[@]} -eq 0 ]]; then
  echo "🎉 All images found! Ready for deployment."
  exit 0
else
  echo "⚠️ Missing images: ${missing_images[*]}"
  echo "Please add these images to the public folder before deployment."
  exit 1
fi