import { useMemo } from 'react'
import { Html } from '@react-three/drei'

export function Laptop({ scale = 1, screenContent = null, openDeg = 110 }) {
	const sizes = useMemo(() => ({
		base: { w: 1.6, h: 0.06, d: 1.0 },
		screen: { w: 1.6, h: 1.0, d: 0.05 },
		hingeGap: 0.02,
	}), [])

	return (
		<group scale={scale}>
			{/* Base */}
			<mesh position={[0, 0, 0]} castShadow receiveShadow>
				<boxGeometry args={[sizes.base.w, sizes.base.h, sizes.base.d]} />
				<meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
			</mesh>

			{/* Screen group with hinge pivot along back edge of base */}
			<group position={[0, sizes.base.h / 2 + sizes.hingeGap, -sizes.base.d / 2]} rotation={[(-openDeg * Math.PI / 720), 0, 0]}>
				{/* Move pivot to hinge line, then place screen so its bottom edge sits on the hinge */}
				<group position={[0, 0, 0]}>
					<mesh position={[0, sizes.screen.h / 2, sizes.screen.d / 2]} castShadow receiveShadow>
						<boxGeometry args={[sizes.screen.w, sizes.screen.h, sizes.screen.d]} />
						<meshStandardMaterial color="#111827" metalness={0.5} roughness={0.6} />
					</mesh>

					{/* Screen glass (front plane) */}
					<mesh position={[0, sizes.screen.h / 2, sizes.screen.d + 0.001]}>
						<planeGeometry args={[sizes.screen.w * 0.92, sizes.screen.h * 0.86]} />
						<meshStandardMaterial color="#0b1326" emissive="#0b1326" emissiveIntensity={0.6} roughness={0.3} metalness={0.1} />
					</mesh>

					{/* Optional DOM content to simulate browser on screen */}
					{screenContent && (
						<Html
							transform
							position={[0, sizes.screen.h / 2, sizes.screen.d + 0.002]}
							rotation={[-Math.PI / 2, 0, 0]}
							distanceFactor={1.2}
							occlude
						>
							<div style={{ width: 480, height: 300, borderRadius: 10, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}>
								{screenContent}
							</div>
						</Html>
					)}
				</group>
			</group>
		</group>
	)
}

