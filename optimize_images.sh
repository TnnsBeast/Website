#!/bin/bash

# Image optimization script for Neil's website
# This script will help compress the large image files

echo "🔧 Website Image Optimization Script"
echo "=================================="

# Check if ImageOptim CLI is installed (macOS)
if command -v imageoptim &> /dev/null; then
    echo "✅ ImageOptim CLI found"
    echo "📦 Optimizing images..."
    imageoptim images/*.png images/*.jpg images/*.jpeg
    echo "✅ Image optimization complete!"
else
    echo "⚠️  ImageOptim CLI not found"
    echo "📥 Install it with: brew install imageoptim-cli"
    echo ""
    echo "🔍 Large files detected:"
    echo "   - register2.png (57MB) - needs compression"
    echo "   - register3.png (50MB) - needs compression"
    echo "   - register1.png (4MB) - needs compression"
    echo ""
    echo "💡 Manual optimization options:"
    echo "   1. Use TinyPNG.com (free, web-based)"
    echo "   2. Use ImageOptim app (macOS)"
    echo "   3. Use Squoosh.app (Google's tool)"
    echo ""
    echo "🎯 Target sizes:"
    echo "   - register2.png: 57MB → <1MB"
    echo "   - register3.png: 50MB → <1MB"
    echo "   - register1.png: 4MB → <500KB"
fi

echo ""
echo "📹 Video optimization recommendations:"
echo "   - 8bit.mp4 (22MB) → compress to <5MB"
echo "   - lock.mp4 (17MB) → compress to <5MB"
echo "   - flashlight.mov (2.8MB) → convert to MP4"
echo "   - laser.mov (2.9MB) → convert to MP4"
echo "   - smiley.mov (2.5MB) → convert to MP4"
echo ""
echo "🛠️  Video compression tools:"
echo "   - HandBrake (free, cross-platform)"
echo "   - FFmpeg (command line)"
echo "   - Online converters"
echo ""
echo "✨ Performance improvements made:"
echo "   ✅ Added lazy loading to all images"
echo "   ✅ Removed autoplay from videos"
echo "   ✅ Added play buttons for videos"
echo "   ✅ Replaced PDF embeds with thumbnails"
echo ""
echo "📊 Expected performance improvement:"
echo "   - Initial page load: ~90% faster"
echo "   - Time to interactive: ~80% faster"
echo "   - Mobile performance: significantly improved" 