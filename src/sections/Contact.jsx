import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

export function Contact() {
	const containerRef = useRef(null)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	
	// Scroll-based animations
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	})
	
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
	const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
	const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSubmitting(true)
		
		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 2000))
		
		setIsSubmitting(false)
		// Reset form
		setFormData({ name: '', email: '', subject: '', message: '' })
		alert('Thank you for your message! I\'ll get back to you soon.')
	}

	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/harsh8423',
			icon: FaGithub,
			color: 'hover:text-gray-400',
			bgColor: 'bg-gray-800 hover:bg-gray-700'
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/hashtagharsh',
			icon: FaLinkedin,
			color: 'hover:text-blue-400',
			bgColor: 'bg-blue-600 hover:bg-blue-500'
		},
		{
			name: 'Email',
			url: 'mailto:harsh857498@gmail.com',
			icon: FaEnvelope,
			color: 'hover:text-red-400',
			bgColor: 'bg-red-600 hover:bg-red-500'
		}
	]

	return (
		<div ref={containerRef} className="text-center">
			<motion.div 
				className="mb-16"
				style={{ scale, opacity, y }}
			>
				<h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-brand to-white bg-clip-text text-transparent">
					Let's Connect
				</h2>
				<p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
					Ready to bring your vision to life? Let's discuss your next project and make something amazing together.
				</p>
			</motion.div>

			<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
				{/* Contact Form */}
				<motion.div 
					className="glass rounded-2xl p-8 border border-white/5"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<h3 className="text-2xl font-semibold text-white mb-6">Send me a message</h3>
					
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2 text-left">
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-400 focus:border-brand focus:outline-none transition-colors duration-300"
									placeholder="Your name"
								/>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2 text-left">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-400 focus:border-brand focus:outline-none transition-colors duration-300"
									placeholder="your@email.com"
								/>
							</div>
						</div>
						
						<div>
							<label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-2 text-left">
								Subject
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-400 focus:border-brand focus:outline-none transition-colors duration-300"
								placeholder="What's this about?"
							/>
						</div>
						
						<div>
							<label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2 text-left">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleInputChange}
								required
								rows={5}
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-400 focus:border-brand focus:outline-none transition-colors duration-300 resize-none"
								placeholder="Tell me about your project..."
							/>
						</div>
						
						<motion.button
							type="submit"
							disabled={isSubmitting}
							className="w-full px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-white font-semibold rounded-lg hover:from-brand-dark hover:to-brand transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							{isSubmitting ? (
								<>
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									Sending...
								</>
							) : (
								<>
									<FaPaperPlane />
									Send Message
								</>
							)}
						</motion.button>
					</form>
				</motion.div>

				{/* Contact Info & Social Links */}
				<motion.div 
					className="space-y-8"
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					{/* Contact Information */}
					<div className="glass rounded-2xl p-8 border border-white/5">
						<h3 className="text-2xl font-semibold text-white mb-6">Get in touch</h3>
						
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
									<FaEnvelope className="text-brand text-xl" />
								</div>
								<div className="text-left">
									<p className="text-sm text-zinc-400">Email</p>
									<p className="text-white font-medium">harsh857498@gmail.com</p>
								</div>
							</div>
							
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
									<FaMapMarkerAlt className="text-brand text-xl" />
								</div>
								<div className="text-left">
									<p className="text-sm text-zinc-400">Location</p>
									<p className="text-white font-medium">Mohali, Punjab</p>
								</div>
							</div>
							
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
									<FaPhone className="text-brand text-xl" />
								</div>
								<div className="text-left">
									<p className="text-sm text-zinc-400">Phone</p>
									<p className="text-white font-medium">+91 84230-47004</p>
								</div>
							</div>
						</div>
					</div>

					{/* Social Links */}
					<div className="glass rounded-2xl p-8 border border-white/5">
						<h3 className="text-2xl font-semibold text-white mb-6">Connect with me</h3>
						
						<div className="grid grid-cols-3 gap-4">
							{socialLinks.map((social, index) => (
								<motion.a
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className={`${social.bgColor} p-4 rounded-xl text-white transition-all duration-300 flex flex-col items-center gap-2 group`}
									whileHover={{ scale: 1.05, y: -5 }}
									whileTap={{ scale: 0.95 }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
								>
									<social.icon className="text-2xl group-hover:scale-110 transition-transform duration-300" />
									<span className="text-sm font-medium">{social.name}</span>
								</motion.a>
							))}
						</div>
						
						<p className="text-zinc-400 text-sm mt-6">
							I'm always open to discussing new opportunities, interesting projects, and creative collaborations.
						</p>
					</div>
				</motion.div>
			</div>

			{/* Call to Action */}
			<motion.div 
				className="mt-16 text-center"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.8 }}
			>
				<div className="glass rounded-2xl p-8 border border-brand/20 max-w-2xl mx-auto">
					<h3 className="text-2xl font-semibold text-white mb-4">Ready to start your project?</h3>
					<p className="text-zinc-300 mb-6">
						Let's turn your ideas into reality. Whether it's AI integration, full-stack development, or creative design, I'm here to help.
					</p>
					<motion.button
						onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
						className="px-8 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors duration-300"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Let's Talk
					</motion.button>
				</div>
			</motion.div>
		</div>
	)
}

