import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
	{
		name: "Shitij Agarwal",
		role: "UI/UX Designer at JP Morgan",
		avatar: "SA",
		rating: 5,
		text: "You delivered our full-stack MVP in record time. The architecture decisions you made saved us months of refactoring. Highly recommended!",
		project: "Mock Web App"
	},
	{
		name: "Shubham Verma",
		role: "CTO at Skillmigle",
		avatar: "SV",
		rating: 5,
		text: "You delivered our full-stack Hackathon hosting platform in record time. The code quality and architecture decisions you made saved us months of refactoring. Highly recommended!",
		project: "SaaS Platform"
	},
	{
		// name: "Emily Watson",
		// role: "Founder at CreativeAgency",
		// avatar: "EW",
		
		text: "Good things come to those who hustle. Let's build something great together!",
		project: "I would love to see your name here!"
	}
]

export function Testimonials() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isHovered, setIsHovered] = useState(false)
	const containerRef = useRef(null)
	
	// Scroll-based animations
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	})
	
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
	const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
	const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

	// Auto-advance testimonials
	useEffect(() => {
		if (!isHovered) {
			const timer = setInterval(() => {
				setCurrentIndex((prev) => (prev + 1) % testimonials.length)
			}, 5000)
			return () => clearInterval(timer)
		}
	}, [isHovered])

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length)
	}

	const prevTestimonial = () => {
		setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
	}

	return (
		<div ref={containerRef} className="text-center">
			<motion.div 
				className="mb-16"
				style={{ scale, opacity, y }}
			>
				<h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-brand to-white bg-clip-text text-transparent">
					What Clients Say
				</h2>
				<p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
					Real stories from real projects. Here's what happens when vision meets execution...
				</p>
			</motion.div>

			{/* Testimonials Carousel */}
			<div className="relative max-w-4xl mx-auto">
				{/* Navigation Arrows */}
				<motion.button
					onClick={prevTestimonial}
					className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:border-brand/30 transition-all duration-300 group flex items-center justify-center"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					<FaChevronLeft className="text-white group-hover:text-brand transition-colors duration-300" />
				</motion.button>

				<motion.button
					onClick={nextTestimonial}
					className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:border-brand/30 transition-all duration-300 group flex items-center justify-center"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					<FaChevronRight className="text-white group-hover:text-brand transition-colors duration-300" />
				</motion.button>

				{/* Testimonial Cards Container */}
				<div 
					className="relative h-96 overflow-hidden rounded-2xl"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							className={`absolute inset-0 glass p-8 flex flex-col justify-center ${
								index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
							}`}
							initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
							animate={{ 
								opacity: index === currentIndex ? 1 : 0,
								scale: index === currentIndex ? 1 : 0.8,
								rotateY: index === currentIndex ? 0 : 15
							}}
							transition={{ duration: 0.6, ease: "easeOut" }}
						>
							{/* Quote Icon */}
							<motion.div 
								className="text-brand text-4xl mb-6 opacity-60"
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								<FaQuoteLeft />
							</motion.div>

							{/* Rating */}
							<motion.div 
								className="flex justify-center gap-1 mb-6"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								{Array.from({ length: testimonial.rating }).map((_, i) => (
									<FaStar key={i} className="text-yellow-400 text-lg" />
								))}
							</motion.div>

							{/* Testimonial Text */}
							<motion.p 
								className="text-lg text-zinc-200 mb-8 leading-relaxed italic"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								"{testimonial.text}"
							</motion.p>

							{/* Project Badge */}
							<motion.div 
								className="inline-block px-4 py-2 bg-brand/10 border border-brand/20 rounded-full text-brand text-sm font-medium mb-6"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.5 }}
							>
								{testimonial.project}
							</motion.div>

							{/* Author Info */}
							<motion.div 
								className="flex items-center justify-center gap-4"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 }}
							>
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-semibold text-lg">
									{testimonial.avatar}
								</div>
								<div className="text-left">
									<div className="font-semibold text-white">{testimonial.name}</div>
									<div className="text-sm text-zinc-400">{testimonial.role}</div>
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>

				{/* Dots Indicator */}
				<motion.div 
					className="flex justify-center gap-2 mt-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					{testimonials.map((_, index) => (
						<motion.button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-3 h-3 rounded-full transition-all duration-300 ${
								index === currentIndex 
									? 'bg-brand scale-125' 
									: 'bg-white/20 hover:bg-white/40'
							}`}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
						/>
					))}
				</motion.div>
			</div>

			{/* Story continuation hint */}
			<motion.div 
				className="mt-16 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 1 }}
			>
				<p className="text-zinc-500 text-sm">
					Ready to see the skills behind these results? Scroll down to explore my expertise...
				</p>
			</motion.div>
		</div>
	)
} 