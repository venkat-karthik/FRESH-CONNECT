#!/bin/bash

# FreshServe Connect Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🌱 FreshServe Connect Deployment Script"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Build the application
echo "📦 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🚀 Deployment Options:"
echo "1. Vercel (Recommended)"
echo "2. Netlify"
echo "3. Docker"
echo "4. Manual deployment"
echo ""

read -p "Choose deployment option (1-4): " choice

case $choice in
    1)
        echo "🔄 Deploying to Vercel..."
        if command_exists vercel; then
            vercel --prod
        else
            echo "❌ Vercel CLI not found. Install it with: npm i -g vercel"
            echo "📖 Or deploy manually at: https://vercel.com"
        fi
        ;;
    2)
        echo "🔄 Deploying to Netlify..."
        if command_exists netlify; then
            netlify deploy --prod --dir=.next
        else
            echo "❌ Netlify CLI not found. Install it with: npm i -g netlify-cli"
            echo "📖 Or deploy manually at: https://netlify.com"
        fi
        ;;
    3)
        echo "🐳 Building Docker image..."
        docker build -t freshserve-connect .
        echo "✅ Docker image built successfully!"
        echo "🚀 Run with: docker run -p 3000:3000 freshserve-connect"
        ;;
    4)
        echo "📁 Manual deployment ready!"
        echo "📦 Built files are in the .next directory"
        echo "🚀 Upload the entire project to your hosting provider"
        echo "⚙️  Make sure to set NODE_ENV=production"
        ;;
    *)
        echo "❌ Invalid option selected"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment process completed!"
echo "🌐 Your FreshServe Connect app should be live soon!"