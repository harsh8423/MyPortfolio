import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Laptop } from './Laptop.jsx'

// Utility: smoothstep
function smoothstep(edge0, edge1, x) {
	const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
	return t * t * (3 - 2 * t)
}

export function ScrollLaptopScene({ scrollY, viewportHeight, onPhaseChange }) {
	const groupRef = useRef()
	const { camera } = useThree()

	// Define scroll phases as fractions of the total viewport height
	// 0.00-0.15: side view -> rotate to front
	// 0.15-0.30: zoom in towards screen
	// 0.30-0.45: "enter screen" (simulate browser zoom into DOM)
	const phases = useMemo(() => ({
		rotateEnd: 0.1,
		zoomEnd: 0.1,
		enterEnd: 0.1,
	}), [])

	useFrame(() => {
		const total = Math.max(1, viewportHeight)
		const progress = Math.min(1, Math.max(0, scrollY.current / total))

		// Notify phase changes (optional)
		if (onPhaseChange) {
			let phase = 'rotate'
			if (progress >= phases.rotateEnd && progress < phases.zoomEnd) phase = 'zoom'
			else if (progress >= phases.zoomEnd) phase = 'enter'
			onPhaseChange(phase)
		}

		// Camera base setup
		camera.near = 0.01
		camera.far = 100
		camera.updateProjectionMatrix()

		// 1) Rotation from side (y rotation ~ -Math.PI/2) to front (0)
		const rotateT = smoothstep(0, phases.rotateEnd, progress)
		const rotationY = -Math.PI / 2 * (1 - rotateT)

		// 2) Zoom from z=4 to z=1.6 while slightly lifting the camera to center screen
		const zoomT = smoothstep(phases.rotateEnd, phases.zoomEnd, progress)
		const camZ = 4 - zoomT * (4 - 1.6)
		const camY = 0.4 * zoomT

		// 3) Enter screen: push camera close and slightly through the screen to simulate browser takeover
		const enterT = smoothstep(phases.zoomEnd, phases.enterEnd, progress)
		const enterOffsetZ = enterT * 0.9

		camera.position.set(0, camY, camZ - enterOffsetZ)
		camera.lookAt(0, 0.2, 0)

		if (groupRef.current) {
			groupRef.current.rotation.y = rotationY
			groupRef.current.position.set(0, -0.3 + zoomT * 0.1, 0)
		}
	})

	return (
		<group ref={groupRef}>
			<Laptop scale={1.2} openDeg={102} />
			<mesh position={[0, -0.33, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<circleGeometry args={[3, 64]} />
				<meshStandardMaterial color="#0b0b0b" />
			</mesh>
		</group>
	)
}

