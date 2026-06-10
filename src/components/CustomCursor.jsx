import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursor) {
        cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX - 20) * 0.12
      ringY += (mouseY - ringY - 20) * 0.12
      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animate()

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
