import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, Typography } from '@mui/material'

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div
      className="flashcard"
      onClick={flipCard}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100%',
        height: '200px',
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
          }}
        >
          <CardContent>
            <Typography variant="h6">Front:</Typography>
            <Typography>{front}</Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardContent>
            <Typography variant="h6">Back:</Typography>
            <Typography>{back}</Typography>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default Flashcard