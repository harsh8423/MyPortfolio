import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  AmbientLight, 
  DirectionalLight, 
  SpotLight, 
  BoxGeometry, 
  MeshPhysicalMaterial, 
  Mesh, 
  CanvasTexture 
} from 'three';
import { Mail, Globe, Github, Linkedin, Twitter, X } from 'lucide-react';

const GoldenVisitingCard = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cardRef = useRef(null);
  const cameraRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardOpacity, setCardOpacity] = useState(1);
  
  // Set initial opacity immediately
  useEffect(() => {
    setCardOpacity(1);
  }, []);

  useEffect(() => {
    // Scroll effect for card opacity
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 2; // Hero section is 200vh
      
      if (scrollY <= heroHeight) {
        // Calculate opacity based on scroll position within hero section
        const opacity = Math.max(0, 1 - (scrollY / heroHeight) * 1.5);
        setCardOpacity(opacity);
        console.log('Scroll opacity:', opacity, 'scrollY:', scrollY, 'heroHeight:', heroHeight);
      } else {
        setCardOpacity(0);
      }
    };
    
    // Ensure card is visible on initial load
    setCardOpacity(1);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1.6, 0.1, 1000); // aspect will be updated after sizing
    const renderer = new WebGLRenderer({ 
      antialias: false,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    // Initial size will be set by setRendererSize() after mount
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    
    mountRef.current.appendChild(renderer.domElement);

    // Resize handling
    const setRendererSize = () => {
      if (mountRef.current && renderer) {
        const isMobile = window.innerWidth < 768;
        
        // Force specific sizes based on screen size
        let finalWidth, finalHeight;
        
        if (isMobile) {
          // Mobile: 320x200
          finalWidth = 320;
          finalHeight = 200;
        } else {
          // Desktop: 480x300 (original size)
          finalWidth = 480;
          finalHeight = 300;
        }
        
        renderer.setSize(finalWidth, finalHeight);
        camera.aspect = finalWidth / finalHeight;
        camera.updateProjectionMatrix();
        
        // Debug logging
        console.log('Renderer size set:', finalWidth, finalHeight, 'Mobile:', isMobile);
      }
    };
    
    const onResize = () => setRendererSize();
    const ro = new ResizeObserver(onResize);
    if (mountRef.current) ro.observe(mountRef.current);
    window.addEventListener('resize', onResize);
    
    // Initial size setup with small delay to ensure DOM is ready
    setTimeout(() => setRendererSize(), 100);

    // Camera position
    camera.position.z = 6;
    camera.position.y = 0.5;
    camera.lookAt(0, 0, 0);

    // Enhanced lighting setup for better 3D texture visibility
    const ambientLight = new AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const spotLight = new SpotLight(0xffd700, 0.6);
    spotLight.position.set(-5, 5, 3);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    scene.add(spotLight);

    // Additional rim light for better edge definition
    const rimLight = new DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    // Create optimized front side texture with lower resolution
    const createFrontTexture = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // Increased resolution for bigger card
      canvas.width = 614; // Increased from 512
      canvas.height = 368; // Increased from 307
      
      // Simplified golden gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(0.5, '#DAA520');
      gradient.addColorStop(1, '#B8860B');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Simplified metallic texture with fewer iterations
      ctx.globalCompositeOperation = 'overlay';
      
      // Horizontal metallic lines (reduced frequency)
      for (let i = 0; i < canvas.width; i += 4) {
        const opacity = Math.random() * 0.06 + 0.02;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(i, 0, 2, canvas.height);
      }
      
      // Vertical metallic lines (reduced frequency)
      for (let i = 0; i < canvas.height; i += 4) {
        const opacity = Math.random() * 0.04 + 0.01;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(0, i, canvas.width, 2);
      }
      
      ctx.globalCompositeOperation = 'source-over';
      
      // Simplified shine effect
      const shineGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
      shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shineGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // High contrast content
      ctx.fillStyle = '#000000';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // Name - scaled for increased resolution
      ctx.font = 'bold 48px Arial Black'; // Increased from 40px
      ctx.textAlign = 'center';
      ctx.fillText('HARSH TIWARI', canvas.width / 2, 84);
      
      // Role - scaled for increased resolution
      ctx.font = 'bold 23px Arial'; // Increased from 19px
      ctx.fillText('Full-Stack Developer | AI Agent Builder', canvas.width / 2, 120);
      
      // Reset shadow for logo
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // Logo circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 198, 38, 0, 2 * Math.PI); // Increased from 32
      
      const logoGradient = ctx.createRadialGradient(
        canvas.width / 2, 198, 0,
        canvas.width / 2, 198, 38
      );
      logoGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      logoGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      logoGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      
      ctx.fillStyle = logoGradient;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Initials in circle
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 31px Arial Black'; // Increased from 26px
      ctx.fillText('HT', canvas.width / 2, 206);
      
      // Contact info
      ctx.font = 'bold 19px Arial'; // Increased from 16px
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'left';
      ctx.fillText('📧 harsh857498@gmail.com', 60, 300);
      
      ctx.textAlign = 'right';
      ctx.fillText('🌐 Portfolio', canvas.width - 60, 300);
      
      return new CanvasTexture(canvas);
    };

    // Create optimized back side texture
    const createBackTexture = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 614; // Increased resolution
      canvas.height = 368;
      
      // Simplified golden gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#B8860B');
      gradient.addColorStop(0.5, '#DAA520');
      gradient.addColorStop(1, '#FFD700');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced metallic texture with more detail
      ctx.globalCompositeOperation = 'overlay';
      
      // Horizontal metallic lines with varying thickness
      for (let i = 0; i < canvas.width; i += 3) {
        const opacity = Math.random() * 0.08 + 0.03;
        const thickness = Math.random() * 2 + 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(i, 0, thickness, canvas.height);
      }
      
      // Vertical metallic lines with varying thickness
      for (let i = 0; i < canvas.height; i += 3) {
        const opacity = Math.random() * 0.06 + 0.02;
        const thickness = Math.random() * 2 + 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(0, i, canvas.width, thickness);
      }
      
      // Diagonal metallic lines for more texture
      for (let i = 0; i < canvas.width + canvas.height; i += 6) {
        const opacity = Math.random() * 0.04 + 0.01;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i - canvas.height, canvas.height);
        ctx.stroke();
      }
      
      ctx.globalCompositeOperation = 'source-over';
      
      // Enhanced shine effect with multiple layers
      const shineGradient1 = ctx.createLinearGradient(canvas.width, 0, 0, canvas.height);
      shineGradient1.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shineGradient1.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
      shineGradient1.addColorStop(0.6, 'rgba(255, 255, 255, 0.25)');
      shineGradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shineGradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Secondary shine layer
      const shineGradient2 = ctx.createRadialGradient(canvas.width * 0.3, canvas.height * 0.3, 0, canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.8);
      shineGradient2.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      shineGradient2.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
      shineGradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shineGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Quote
      ctx.fillStyle = '#000000';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      ctx.font = 'italic bold 26px Arial'; // Increased from 22px
      ctx.textAlign = 'center';
      ctx.fillText('"Let\'s build something', canvas.width / 2, 108);
      ctx.fillText('amazing together."', canvas.width / 2, 144);
      
      // QR Code image (will load asynchronously and update texture)
      const qrSize = 84;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = 180;

      // Draw QR frame background
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 0;
      ctx.fillRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);

      const texture = new CanvasTexture(canvas);
      const img = new Image();
      img.onload = () => {
        // Clear inner area (in case of fallback drawn before)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(qrX, qrY, qrSize, qrSize);
        ctx.drawImage(img, qrX, qrY, qrSize, qrSize);
        texture.needsUpdate = true;
      };
      img.onerror = () => {
        // Fallback simple matrix if image fails
        ctx.fillStyle = '#000000';
        const cell = qrSize / 17;
        for (let i = 0; i < 17; i++) {
          for (let j = 0; j < 17; j++) {
            if (Math.random() > 0.5) ctx.fillRect(qrX + i * cell, qrY + j * cell, cell, cell);
          }
        }
        texture.needsUpdate = true;
      };
      img.src = '/qr.jpeg';

      // Social links
      ctx.fillStyle = '#000000';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 2;
      ctx.font = 'bold 20px Arial'; // Increased from 17px
      ctx.textAlign = 'center';
      ctx.fillText('GitHub • LinkedIn • Twitter', canvas.width / 2, 312);
      
      return texture;
    };

    // Card geometry - increased size by 20%
    const cardGeometry = new BoxGeometry(6, 3.6, 0.12); // Increased from 5x3x0.1
    
    // Create materials with optimized textures
    const frontTexture = createFrontTexture();
    const backTexture = createBackTexture();
    
    const frontMaterial = new MeshPhysicalMaterial({
      map: frontTexture,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      envMapIntensity: 1.2,
      ior: 1.5,
      transmission: 0.1,
      thickness: 0.5,
    });

    const backMaterial = new MeshPhysicalMaterial({
      map: backTexture,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      envMapIntensity: 1.2,
      ior: 1.5,
      transmission: 0.1,
      thickness: 0.5,
    });

    const sideMaterial = new MeshPhysicalMaterial({
      color: 0xdaa520,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      envMapIntensity: 1.2,
    });

    const materials = [
      sideMaterial, // right
      sideMaterial, // left  
      sideMaterial, // top
      sideMaterial, // bottom
      frontMaterial, // front
      backMaterial // back
    ];

    const card = new Mesh(cardGeometry, materials);
    cardRef.current = card;
    scene.add(card);
    
    // Debug logging
    console.log('Card added to scene, card position:', card.position);

    // Mouse interaction
    const handleMouseDown = (event) => {
      mouseRef.current.isDown = true;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseMove = (event) => {
      if (mouseRef.current.isDown) {
        const deltaX = event.clientX - mouseRef.current.x;
        const deltaY = event.clientY - mouseRef.current.y;
        
        targetRotationRef.current.y += deltaX * 0.01;
        targetRotationRef.current.x += deltaY * 0.01;
        
        // Limit vertical rotation
        targetRotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationRef.current.x));
        
        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleClick = (event) => {
      if (!mouseRef.current.isDown) {
        setShowModal(true);
      }
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mouseenter', () => setIsHovered(true));
    canvas.addEventListener('mouseleave', () => {
      setIsHovered(false);
      mouseRef.current.isDown = false;
    });

    // Optimized animation loop with throttling
    let animationId;
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime) => {
      animationId = requestAnimationFrame(animate);
      
      // Throttle rendering for better performance
      if (currentTime - lastTime < frameInterval) {
        return;
      }
      lastTime = currentTime;

      // Smooth rotation interpolation
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.05;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.05;

      if (card) {
        card.rotation.x = rotationRef.current.x;
        card.rotation.y = rotationRef.current.y;
        
        // Add subtle floating rotation for more dynamic feel
        card.rotation.z = Math.sin(currentTime * 0.0005) * 0.02;
        
        // Enhanced hover effect with smooth transitions
        if (isHovered) {
          card.position.y = Math.sin(currentTime * 0.001) * 0.15 + 0.3;
          card.scale.setScalar(1.08);
        } else {
          card.position.y += (0 - card.position.y) * 0.05;
          card.scale.x += (1 - card.scale.x) * 0.05;
          card.scale.y += (1 - card.scale.y) * 0.05;
          card.scale.z += (1 - card.scale.z) * 0.05;
        }
      }

      renderer.render(scene, camera);
      
      // Debug logging (only log occasionally to avoid spam)
      if (Math.random() < 0.01) {
        console.log('Animation frame rendered, card visible:', card && card.visible);
      }
    };

    animate();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      try { ro.disconnect(); } catch {}
      window.removeEventListener('resize', onResize);
      
      renderer.dispose();
      scene.clear();
      frontTexture.dispose();
      backTexture.dispose();
    };
  }, [isHovered]);

  return (
    <>
      {/* 3D Card Container - Responsive positioning with opacity control and floating animation */}
      <motion.div 
        className="relative z-20 transition-opacity duration-500"
        style={{ opacity: cardOpacity }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="relative cursor-grab active:cursor-grabbing"
          style={{
            filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))'
          }}
        >
          <div ref={mountRef} className="rounded-2xl overflow-hidden w-full max-w-[320px] sm:max-w-[480px] min-h-[200px] sm:min-h-[300px] h-[200px] sm:h-[300px]" />
          
          {/* Instruction text */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-zinc-400 whitespace-nowrap">
            Drag to rotate • Click for details
          </div>
        </div>
      </motion.div>

      {/* Enhanced Modal - Exactly like the card */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-3 sm:p-4">
          <div 
            className="rounded-2xl p-4 sm:p-8 max-w-3xl w-full mx-4 relative overflow-hidden shadow-2xl max-h-[90vh]"
            style={{
              background: `
                linear-gradient(135deg, #FFD700 0%, #FFA500 20%, #FFD700 40%, #DAA520 60%, #FFD700 80%, #B8860B 100%),
                radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
              `,
              boxShadow: `
                0 40px 80px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                0 0 50px rgba(255, 215, 0, 0.4)
              `
            }}
          >
            {/* Enhanced metallic texture for modal */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-50"
              style={{
                background: `
                  repeating-linear-gradient(45deg, 
                    transparent 0px, 
                    rgba(255, 255, 255, 0.04) 1px, 
                    rgba(255, 255, 255, 0.1) 2px, 
                    transparent 3px, 
                    transparent 6px
                  ),
                  repeating-linear-gradient(-45deg, 
                    transparent 0px, 
                    rgba(255, 255, 255, 0.03) 1px, 
                    rgba(255, 255, 255, 0.08) 2px, 
                    transparent 3px, 
                    transparent 8px
                  ),
                  repeating-linear-gradient(90deg, 
                    transparent 0px, 
                    rgba(255, 255, 255, 0.02) 1px, 
                    rgba(255, 255, 255, 0.06) 2px, 
                    transparent 3px, 
                    transparent 10px
                  )
                `
              }}
            ></div>

            {/* Enhanced shine effect for modal */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-70"
              style={{
                background: `linear-gradient(
                  110deg,
                  transparent 25%,
                  rgba(255, 255, 255, 0.3) 45%,
                  rgba(255, 255, 255, 0.6) 50%,
                  rgba(255, 255, 255, 0.3) 55%,
                  transparent 75%
                )`,
                animation: 'shine 3s ease-in-out infinite'
              }}
            ></div>

            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center hover:bg-opacity-30 transition-all text-white z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative z-10 h-full flex flex-col text-white overflow-y-auto">
              {/* Header with QR and Identity */}
              <div className="grid md:grid-cols-12 gap-4 sm:gap-6 items-start">
                {/* QR at top-left (centered on mobile) */}
                <div className="md:col-span-4 flex md:block justify-center">
                  <div 
                    className="inline-block p-3 rounded-xl backdrop-blur-sm"
                    style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-white p-2 flex items-center justify-center">
                      <img src="/qr.jpeg" alt="QR Code" className="w-full h-full object-contain rounded" />
                    </div>
                    <p className="text-xs text-white/90 mt-2 text-center">Scan to connect</p>
                  </div>
                </div>

                {/* Identity */}
                <div className="md:col-span-8 text-center md:text-left">
                  <div 
                    className="w-20 h-20 sm:w-24 sm:h-24 mx-auto md:mx-0 mb-3 sm:mb-4 rounded-full flex items-center text-center justify-center shadow-lg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <span className="text-2xl sm:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>HT</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Harsh Tiwari</h2>
                  <p className="text-lg sm:text-xl mb-4 sm:mb-6 opacity-90 font-medium">Full-Stack Developer | AI Agent Builder</p>
                </div>
              </div>

              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div 
                  className="flex items-center p-4 rounded-xl backdrop-blur-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Email</p>
                    <p className="text-white font-medium">harsh857498@gmail.com</p>
                  </div>
                </div>
                
                <div 
                  className="flex items-center p-4 rounded-xl backdrop-blur-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Website</p>
                    <p className="text-white font-medium">harshtiwari.dev</p>
                  </div>
                </div>
                
                <div 
                  className="flex items-center p-4 rounded-xl backdrop-blur-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">GitHub</p>
                    <p className="text-white font-medium">github.com/harsh8423</p>
                  </div>
                </div>
                
                <div 
                  className="flex items-center p-4 rounded-xl backdrop-blur-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">LinkedIn</p>
                    <p className="text-white font-medium">linkedin.com/in/hashtagharsh</p>
                  </div>
                </div>
              </div>

              {/* Bottom spacing */}
              <div className="mt-4" />

              {/* Bottom Quote */}
              {/* <div 
                className="mt-4 sm:mt-6 p-4 rounded-xl backdrop-blur-sm text-center"
                style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              >
                <p className="text-lg text-white italic font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                  "Let's build something amazing together."
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`        
        @keyframes shine {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-100%);
          }
          50% {
            opacity: 0.8;
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
};

export default GoldenVisitingCard;