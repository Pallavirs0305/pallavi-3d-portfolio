import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

function AvatarParticles({ introRef }: { introRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const count = 180
    const positions = new Float32Array(count * 3)
    const rng = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      const a = rng(i + 1) * Math.PI * 2
      const r = 3.1 + rng(i + 41) * 2.5
      const y = (rng(i + 91) - 0.5) * 6.4
      positions[i * 3] = Math.cos(a) * r * 0.82
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = -0.7 + (rng(i + 151) - 0.5) * 0.8
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [])

  useFrame((_, dt) => {
    const p = pointsRef.current
    if (!p) return

    p.rotation.y += dt * 0.035
    const intro = introRef.current
    const material = p.material as THREE.PointsMaterial
    material.opacity = THREE.MathUtils.lerp(
      material.opacity,
      intro > 0 ? 0.7 * intro : 0.16,
      Math.min(1, dt * 5)
    )
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#69f6ff"
        size={0.035}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HolographicAvatar() {
  const texture = useLoader(TextureLoader, `${import.meta.env.BASE_URL}images/pallavi-avatar.png`)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)
  const elapsed = useRef(0)
  const reveal = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uOpacity: { value: 1 },
      uBlueKey: { value: 0.18 },
    }),
    [texture]
  )

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useFrame((state, dt) => {
    elapsed.current += dt
    reveal.current = THREE.MathUtils.clamp((elapsed.current - 0.25) / 2.35, 0, 1)

    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * Math.min(1, dt * 4)
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * Math.min(1, dt * 4)

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uReveal.value = reveal.current
    }

    if (groupRef.current) {
      const introStrength = 1 - reveal.current
      groupRef.current.rotation.y = smoothMouse.current.x * 0.12
      groupRef.current.rotation.x = smoothMouse.current.y * -0.045
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.045
      groupRef.current.position.z = introStrength * 0.15
      groupRef.current.scale.setScalar(1 + introStrength * 0.025)
    }
  })

  const ratio =
    texture.image?.width && texture.image?.height
      ? texture.image.width / texture.image.height
      : 0.73
  const height = 8.2
  const width = height * ratio

  return (
    <>
      <group ref={groupRef} position={[0, -0.55, 0]}>
        <mesh>
          <planeGeometry args={[width, height, 1, 1]} />
          <shaderMaterial
            ref={materialRef}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.NormalBlending}
            vertexShader={'
              uniform float uTime;
              uniform float uReveal;
              varying vec2 vUv;

              void main() {
                vUv = uv;
                vec3 p = position;
                float intro = 1.0 - uReveal;
                float wave = sin(p.y * 8.0 + uTime * 3.0) * 0.018 * intro;
                p.x += wave;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
              }
            '}
            fragmentShader={'
              uniform sampler2D uMap;
              uniform float uTime;
              uniform float uReveal;
              uniform float uOpacity;
              uniform float uBlueKey;
              varying vec2 vUv;

              float luminance(vec3 c) {
                return dot(c, vec3(0.299, 0.587, 0.114));
              }

              void main() {
                vec2 uv = vUv;
                float intro = 1.0 - uReveal;
                float scanWave = sin((uv.y * 92.0) - uTime * 5.5);
                float scan = smoothstep(0.78, 1.0, scanWave) * intro;

                vec4 tex = texture2D(uMap, uv);
                vec3 original = tex.rgb;

                float blueBias = original.b - max(original.r, original.g);
                float skyMask = smoothstep(uBlueKey, uBlueKey + 0.15, blueBias);
                skyMask *= smoothstep(0.16, 0.5, original.b);

                float alpha = 1.0 - skyMask * 0.18;
                float lum = luminance(original);

                vec3 holoColor = vec3(0.06, 0.86, 0.92);
                vec3 holo = holoColor * (0.46 + lum * 1.15) + vec3(scan * 0.2);

                vec3 color = mix(holo, original, uReveal);
                color += holoColor * scan * 0.45;

                float edgeGlow = smoothstep(0.78, 1.0, lum) * intro * 0.18;
                color += holoColor * edgeGlow;

                gl_FragColor = vec4(color, alpha * uOpacity);
              }
            '}
          />
        </mesh>

        <mesh position={[0, -height * 0.48, -0.1]}>
          <planeGeometry args={[width * 0.82, 0.08]} />
          <meshBasicMaterial
            color="#62f7ff"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <AvatarParticles introRef={reveal} />
    </>
  )
}

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#070b10']} />

      <ambientLight intensity={0.65} />
      <pointLight position={[0, 3, 4]} intensity={4.5} color="#6ff8ff" />
      <pointLight position={[-4, -2, 1]} intensity={2.2} color="#8b5cf6" />

      <HolographicAvatar />

      <mesh position={[0, 0.15, -4]}>
        <planeGeometry args={[22, 16]} />
        <meshBasicMaterial color="#070b10" transparent opacity={0.38} />
      </mesh>
    </>
  )
}
