import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isHovering, setIsHovering] = useState(false)
	const [isClicking, setIsClicking] = useState(false)

	useEffect(() => {
		const updateMousePosition = (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}

		const handleMouseDown = () => setIsClicking(true)
		const handleMouseUp = () => setIsClicking(false)

		// Add event listeners
		window.addEventListener('mousemove', updateMousePosition)
		window.addEventListener('mousedown', handleMouseDown)
		window.addEventListener('mouseup', handleMouseUp)

		// Add hover detection for interactive elements
		const handleMouseEnter = () => setIsHovering(true)
		const handleMouseLeave = () => setIsHovering(false)

		// Select all interactive elements
		const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
		interactiveElements.forEach(el => {
			el.addEventListener('mouseenter', handleMouseEnter)
			el.addEventListener('mouseleave', handleMouseLeave)
		})

		return () => {
			window.removeEventListener('mousemove', updateMousePosition)
			window.removeEventListener('mousedown', handleMouseDown)
			window.removeEventListener('mouseup', handleMouseUp)
			
			interactiveElements.forEach(el => {
				el.removeEventListener('mouseenter', handleMouseEnter)
				el.removeEventListener('mouseleave', handleMouseLeave)
			})
		}
	}, [])

	return (
		<>
			{/* Main Cursor */}
			<motion.div
				className="fixed top-0 left-0 w-4 h-4 bg-brand rounded-full pointer-events-none z-[9999] mix-blend-difference"
				animate={{
					x: mousePosition.x - 8,
					y: mousePosition.y - 8,
					scale: isHovering ? 1.5 : 1,
					opacity: isClicking ? 0.7 : 1,
				}}
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 28,
					mass: 0.5,
				}}
			/>

			{/* Cursor Ring */}
			<motion.div
				className="fixed top-0 left-0 w-8 h-8 border border-brand/30 rounded-full pointer-events-none z-[9998] mix-blend-difference"
				animate={{
					x: mousePosition.x - 16,
					y: mousePosition.y - 16,
					scale: isHovering ? 2 : 1,
					opacity: isHovering ? 0.8 : 0.3,
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 20,
					mass: 0.8,
				}}
			/>

			{/* Cursor Trail */}
			<motion.div
				className="fixed top-0 left-0 w-2 h-2 bg-brand/20 rounded-full pointer-events-none z-[9997]"
				animate={{
					x: mousePosition.x - 4,
					y: mousePosition.y - 4,
					scale: isHovering ? 0.5 : 1,
					opacity: isHovering ? 0.3 : 0.1,
				}}
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 15,
					mass: 1,
				}}
			/>

			{/* Hover Effect */}
			{isHovering && (
				<motion.div
					className="fixed top-0 left-0 w-16 h-16 bg-brand/10 rounded-full pointer-events-none z-[9996]"
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						x: mousePosition.x - 32,
						y: mousePosition.y - 32,
						scale: 1,
						opacity: 1,
					}}
					exit={{ scale: 0, opacity: 0 }}
					transition={{ duration: 0.3 }}
				/>
			)}

			{/* Click Effect */}
			{isClicking && (
				<motion.div
					className="fixed top-0 left-0 w-12 h-12 border-2 border-brand rounded-full pointer-events-none z-[9995]"
					initial={{ scale: 0, opacity: 1 }}
					animate={{
						x: mousePosition.x - 24,
						y: mousePosition.y - 24,
						scale: 1.5,
						opacity: 0,
					}}
					transition={{ duration: 0.4 }}
				/>
			)}
		</>
	)
} 