import { useState } from 'react'
import { Box, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material'
import './App.css'

interface AppProps {
  userRole?: 'admin' | 'user' | 'guest'
}

function App({ userRole = 'guest' }: AppProps) {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera' },
    { id: 2, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California' },
    { id: 3, title: 'Imagine', artist: 'John Lennon', album: 'Imagine' }
  ])
  const [newSong, setNewSong] = useState({ title: '', artist: '', album: '' })

  const handleAddSong = () => {
    if (newSong.title && newSong.artist) {
      setSongs([...songs, { 
        id: songs.length + 1, 
        ...newSong 
      }])
      setNewSong({ title: '', artist: '', album: '' })
    }
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Music Library
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Logged in as: {userRole}
      </Typography>

      {/* Song List */}
      <List sx={{ mb: 4, bgcolor: 'background.paper' }}>
        {songs.map((song) => (
          <ListItem key={song.id} divider>
            <ListItemText 
              primary={song.title} 
              secondary={`${song.artist} • ${song.album}`} 
            />
          </ListItem>
        ))}
      </List>

      {/* Add Song Form (only for admin) */}
      {userRole === 'admin' && (
        <Box sx={{ 
          p: 3, 
          border: '1px solid', 
          borderColor: 'divider', 
          borderRadius: 1,
          mb: 4
        }}>
          <Typography variant="h6" gutterBottom>
            Add New Song
          </Typography>
          <TextField
            label="Title"
            value={newSong.title}
            onChange={(e) => setNewSong({...newSong, title: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Artist"
            value={newSong.artist}
            onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Album"
            value={newSong.album}
            onChange={(e) => setNewSong({...newSong, album: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            onClick={handleAddSong}
            disabled={!newSong.title || !newSong.artist}
          >
            Add Song
          </Button>
        </Box>
      )}

      {/* Features based on user role */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined">
          {userRole === 'admin' ? 'Manage Library' : 'Browse Songs'}
        </Button>
        {userRole !== 'guest' && (
          <Button variant="outlined">
            Create Playlist
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default App