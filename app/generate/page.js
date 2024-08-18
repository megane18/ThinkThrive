
'use client'
import { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Snackbar,
  Menu,
  MenuItem
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { firestore, auth } from '/firebase' // Make sure this path is correct
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/navigation'

const theme = createTheme({
  palette: {
    primary: {
      main: '#C06014',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#F1F0EA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3C3C3C',
      secondary: '#5D5D5D',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 600,
      color: '#3C3C3C',
    },
    h5: {
      fontWeight: 400,
      color: '#5D5D5D',
    },
  },
});

export default function Generate() {
  const [text, setText] = useState('')
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [flashcards, setFlashcards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [flippedCards, setFlippedCards] = useState({})
  const [savedSets, setSavedSets] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedSet, setSelectedSet] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchSavedSets()
  }, [])

  const fetchSavedSets = async () => {
    const user = auth.currentUser
    if (user) {
      const userSetsRef = collection(firestore, 'users', user.uid, 'flashcardSets')
      const userSetsSnap = await getDocs(userSetsRef)
      const sets = userSetsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setSavedSets(sets)
    }
  }


  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const handleSubmit = async () => {
    if (!text.trim()) {
      setSnackbarMessage('Please enter some text to generate flashcards.')
      setSnackbarOpen(true)
      return
    }
  
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })
  
      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }
  
      const data = await response.json()
      setFlashcards(data.flashcards)
      setFlippedCards({})
      setSelectedSet(null)
      setText('') // Clear the text field after generating flashcards
      setSnackbarMessage('Flashcards generated successfully!')
      setSnackbarOpen(true)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      setSnackbarMessage('An error occurred while generating flashcards. Please try again.')
      setSnackbarOpen(true)
    } finally {
      setIsLoading(false)
    }
  }
  
  const saveFlashcards = async () => {
    if (!setName.trim()) {
      setSnackbarMessage('Please enter a name for your flashcard set.')
      setSnackbarOpen(true)
      return
    }
  
    const user = auth.currentUser
    if (!user) {
      setSnackbarMessage('You must be logged in to save flashcards.')
      setSnackbarOpen(true)
      return
    }
  
    try {
      const userSetsRef = collection(firestore, 'users', user.uid, 'flashcardSets')
      const newSetRef = doc(userSetsRef)
      await setDoc(newSetRef, {
        name: setName,
        flashcards: flashcards
      })
  
      setSnackbarMessage('Flashcards saved successfully!')
      setSnackbarOpen(true)
      handleCloseDialog()
      setSetName('')
      fetchSavedSets() // Refresh the list of saved sets
    } catch (error) {
      console.error('Error saving flashcards:', error)
      setSnackbarMessage('An error occurred while saving flashcards. Please try again.')
      setSnackbarOpen(true)
    }
  }

  const handleCardFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleSetClick = async (setId) => {
    const user = auth.currentUser
    if (user) {
      const setRef = doc(firestore, 'users', user.uid, 'flashcardSets', setId)
      const setSnap = await getDoc(setRef)
      if (setSnap.exists()) {
        setSelectedSet({ id: setId, ...setSnap.data() })
        setFlashcards(setSnap.data().flashcards)
        setDrawerOpen(false)
      }
    }
  }

  const handleExitSavedSet = () => {
    setSelectedSet(null)
    setFlashcards([])
  }

  const handleDeleteSet = async (setId) => {
    const user = auth.currentUser
    if (user) {
      try {
        await deleteDoc(doc(firestore, 'users', user.uid, 'flashcardSets', setId))
        setSnackbarMessage('Flashcard set deleted successfully!')
        setSnackbarOpen(true)
        fetchSavedSets() // Refresh the list of saved sets
        if (selectedSet && selectedSet.id === setId) {
          handleExitSavedSet()
        }
      } catch (error) {
        console.error('Error deleting flashcard set:', error)
        setSnackbarMessage('An error occurred while deleting the flashcard set. Please try again.')
        setSnackbarOpen(true)
      }
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setSnackbarMessage('Logged out successfully!')
      setSnackbarOpen(true)
      router.push('/') // Redirect to landing page
    } catch (error) {
      console.error('Error signing out:', error)
      setSnackbarMessage('An error occurred while logging out. Please try again.')
      setSnackbarOpen(true)
    }
    handleMenuClose()
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F1F0EA 0%, #F9F9F7 100%)',
      }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ThinkThrive
            </Typography>
            <Button color="inherit" onClick={() => setDrawerOpen(true)}>
              Saved Sets
            </Button>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => {
            router.push('/flashcards')
            handleMenuClose()
          }}>
            Home Page
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
  
        <Container maxWidth="md">
          {!selectedSet ? (
            <Box sx={{ my: 4 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Generate Flashcards
                </Typography>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  label="Enter text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  fullWidth
                  disabled={isLoading}
                  sx={{ 
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Generate Flashcards'}
                </Button>
              </motion.div>
            </Box>
          ) : (
            <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {selectedSet.name}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleExitSavedSet}
                startIcon={<CloseIcon />}
                sx={{
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  }
                }}
              >
                Exit Set
              </Button>
            </Box>
          )}
  
          {flashcards.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {selectedSet ? `Flashcards: ${selectedSet.name}` : 'Generated Flashcards'}
                </Typography>
                <Grid container spacing={2}>
                  {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        layoutId={`card-${index}`}
                      >
                        <Card 
                          onClick={() => handleCardFlip(index)}
                          sx={{ 
                            height: 200, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            }
                          }}
                        >
                          <AnimatePresence>
                            {!flippedCards[index] ? (
                              <motion.div
                                key="front"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: theme.palette.primary.main,
                                  color: theme.palette.primary.contrastText,
                                }}
                              >
                                <CardContent>
                                  <Typography variant="body1" align="center">
                                    {flashcard.front}
                                  </Typography>
                                </CardContent>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="back"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: theme.palette.secondary.main,
                                  color: theme.palette.secondary.contrastText,
                                }}
                              >
                                <CardContent>
                                  <Typography variant="body1" align="center">
                                    {flashcard.back}
                                  </Typography>
                                </CardContent>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          )}
  
          {flashcards.length > 0 && !selectedSet && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="contained" 
                  onClick={handleOpenDialog}
                  sx={{ 
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  Save Flashcards
                </Button>
              </motion.div>
            </Box>
          )}
        
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Save Flashcard Set</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your flashcard set.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Set Name"
                type="text"
                fullWidth
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button 
                onClick={saveFlashcards} 
                color="primary"
                sx={{ 
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
  
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{ 
              width: 250,
              backgroundColor: theme.palette.background.default,
              height: '100%',
            }}
            role="presentation"
          >
           <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Saved Sets
                </Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <List>
              {savedSets.map((set) => (
                <ListItem
                  key={set.id}
                  button
                  onClick={() => handleSetClick(set.id)}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSet(set.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={set.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
  
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Box>
    </ThemeProvider>
  )
}

