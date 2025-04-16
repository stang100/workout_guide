import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Box,
  Chip,
  Stack,
  alpha,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  CardActions,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
  muscleGroups: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  tips: string[];
}

type Category = 'All' | 'Upper Body' | 'Lower Body' | 'Core';

const defaultExercises: Exercise[] = [
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'Upper Body',
    description: 'A classic bodyweight exercise that targets your chest, shoulders, and triceps.',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    difficulty: 'Beginner',
    imageUrl: '/images/push-up.webp',
    tips: [
      'Keep your body in a straight line',
      'Position hands slightly wider than shoulders',
      'Lower your chest to the ground',
      'Push back up to starting position',
    ],
  },
  {
    id: 'squats',
    name: 'Squats',
    category: 'Lower Body',
    description: 'A fundamental lower body exercise that builds strength in your legs and core.',
    muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
    difficulty: 'Beginner',
    imageUrl: '/images/squat.jpg',
    tips: [
      'Keep feet shoulder-width apart',
      'Keep your back straight',
      'Lower until thighs are parallel to ground',
      'Drive through your heels to stand',
    ],
  },
  {
    id: 'planks',
    name: 'Planks',
    category: 'Core',
    description: 'An isometric core exercise that builds stability and strength.',
    muscleGroups: ['Core', 'Shoulders', 'Back'],
    difficulty: 'Beginner',
    imageUrl: '/images/plank.gif',
    tips: [
      'Keep your body in a straight line',
      'Engage your core muscles',
      'Look at the floor to maintain neutral neck',
      'Hold the position for desired duration',
    ],
  },
];

const categories: Category[] = ['All', 'Upper Body', 'Lower Body', 'Core'];
const difficulties: Exercise['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced'];

const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [exercises, setExercises] = useState<Exercise[]>(defaultExercises);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: '',
    category: 'Upper Body',
    description: '',
    muscleGroups: [],
    difficulty: 'Beginner',
    imageUrl: '',
    tips: [''],
  });
  const [currentMuscleGroup, setCurrentMuscleGroup] = useState('');
  const [currentFormTip, setCurrentFormTip] = useState('');

  const filteredExercises = exercises.filter(
    (exercise) => selectedCategory === 'All' || exercise.category === selectedCategory
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setIsEditing(false);
    setEditingExerciseId(null);
    setNewExercise({
      name: '',
      category: 'Upper Body',
      description: '',
      muscleGroups: [],
      difficulty: 'Beginner',
      imageUrl: '',
      tips: [''],
    });
    setCurrentMuscleGroup('');
    setCurrentFormTip('');
  };

  const handleEditExercise = (exercise: Exercise) => {
    setOpenDialog(true);
    setIsEditing(true);
    setEditingExerciseId(exercise.id);
    setNewExercise({
      name: exercise.name,
      category: exercise.category,
      description: exercise.description,
      muscleGroups: [...exercise.muscleGroups],
      difficulty: exercise.difficulty,
      imageUrl: exercise.imageUrl,
      tips: [...exercise.tips],
    });
    setCurrentMuscleGroup('');
    setCurrentFormTip('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEditing(false);
    setEditingExerciseId(null);
    setNewExercise({
      name: '',
      category: 'Upper Body',
      description: '',
      muscleGroups: [],
      difficulty: 'Beginner',
      imageUrl: '',
      tips: [''],
    });
    setCurrentMuscleGroup('');
    setCurrentFormTip('');
  };

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.description) {
      const exercise: Exercise = {
        id: isEditing ? editingExerciseId! : newExercise.name.toLowerCase().replace(/\s+/g, '-'),
        name: newExercise.name,
        category: newExercise.category as Category,
        description: newExercise.description,
        muscleGroups: newExercise.muscleGroups || [],
        difficulty: newExercise.difficulty || 'Beginner',
        imageUrl: newExercise.imageUrl || '/images/default-exercise.jpg',
        tips: newExercise.tips?.filter(tip => tip.trim()) || [],
      };

      if (isEditing) {
        setExercises(exercises.map(e => e.id === editingExerciseId ? exercise : e));
      } else {
        setExercises([...exercises, exercise]);
      }
      handleCloseDialog();
    }
  };

  const handleAddMuscleGroup = () => {
    if (currentMuscleGroup.trim()) {
      setNewExercise({
        ...newExercise,
        muscleGroups: [...(newExercise.muscleGroups || []), currentMuscleGroup.trim()],
      });
      setCurrentMuscleGroup('');
    }
  };

  const handleRemoveMuscleGroup = (index: number) => {
    setNewExercise({
      ...newExercise,
      muscleGroups: (newExercise.muscleGroups || []).filter((_, i) => i !== index),
    });
  };

  const handleAddTip = () => {
    if (currentFormTip.trim()) {
      setNewExercise({
        ...newExercise,
        tips: [...(newExercise.tips || []), currentFormTip.trim()],
      });
      setCurrentFormTip('');
    }
  };

  const handleRemoveTip = (index: number) => {
    setNewExercise({
      ...newExercise,
      tips: (newExercise.tips || []).filter((_, i) => i !== index),
    });
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
          }}
        >
          Exercise Library
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          Learn proper form for foundational bodyweight exercises
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            flexGrow: 1,
            mr: 2,
            background: (theme) => alpha(theme.palette.primary.light, 0.1),
            borderRadius: 2,
          }}
        >
          <Tabs
            value={selectedCategory}
            onChange={(_: React.SyntheticEvent, newValue: Category) => setSelectedCategory(newValue)}
            centered
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                py: 2,
                px: 4,
                color: 'text.secondary',
              },
              '& .Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          >
            {categories.map((category) => (
              <Tab 
                key={category} 
                label={category} 
                value={category}
                icon={category === 'All' ? <FitnessCenterIcon /> : undefined}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Paper>
        <Tooltip title="Create Custom Exercise">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
            }}
          >
            Create Exercise
          </Button>
        </Tooltip>
      </Box>

      <Grid container spacing={4}>
        {filteredExercises.map((exercise) => (
          <Grid item xs={12} md={6} key={exercise.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 2,
                },
                background: (theme) => alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(8px)',
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={exercise.imageUrl}
                alt={exercise.name}
                sx={{ 
                  objectFit: 'cover',
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={exercise.difficulty} 
                    color="primary" 
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      background: (theme) => alpha(theme.palette.primary.light, 0.2),
                      color: 'primary.dark',
                    }}
                  />
                  <Chip 
                    label={exercise.category} 
                    color="secondary" 
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      background: (theme) => alpha(theme.palette.secondary.light, 0.2),
                      color: 'secondary.dark',
                    }}
                  />
                </Stack>
                <Typography 
                  variant="h5" 
                  component="h2"
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  {exercise.name}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ mb: 3 }}
                >
                  {exercise.description}
                </Typography>
                
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  Muscle Groups:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  {exercise.muscleGroups.map((muscle) => (
                    <Chip 
                      key={muscle} 
                      label={muscle} 
                      size="small" 
                      variant="outlined"
                      sx={{ 
                        borderColor: (theme) => alpha(theme.palette.primary.light, 0.5),
                        color: 'text.secondary',
                        background: (theme) => alpha(theme.palette.primary.light, 0.1),
                      }}
                    />
                  ))}
                </Stack>

                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  Form Tips:
                </Typography>
                <List dense sx={{ p: 0 }}>
                  {exercise.tips.map((tip, index) => (
                    <ListItem 
                      key={index}
                      sx={{ 
                        py: 0.5,
                        px: 0,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon 
                          fontSize="small" 
                          sx={{ 
                            color: 'primary.main',
                            opacity: 0.7,
                          }} 
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={tip}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: 'text.secondary',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Tooltip title="Edit Exercise">
                  <IconButton 
                    onClick={() => handleEditExercise(exercise)}
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Exercise">
                  <IconButton 
                    onClick={() => handleDeleteExercise(exercise.id)}
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {isEditing ? 'Edit Exercise' : 'Create Custom Exercise'}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Exercise Name"
              fullWidth
              value={newExercise.name}
              onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
            />
            <TextField
              select
              label="Category"
              fullWidth
              value={newExercise.category}
              onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
              SelectProps={{
                native: true,
              }}
            >
              {categories.filter(cat => cat !== 'All').map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </TextField>
            <TextField
              select
              label="Difficulty"
              fullWidth
              value={newExercise.difficulty}
              onChange={(e) => setNewExercise({ ...newExercise, difficulty: e.target.value as Exercise['difficulty'] })}
              SelectProps={{
                native: true,
              }}
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </TextField>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newExercise.description}
              onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
            />
            <TextField
              label="Image URL"
              fullWidth
              value={newExercise.imageUrl}
              onChange={(e) => setNewExercise({ ...newExercise, imageUrl: e.target.value })}
              placeholder="Leave empty for default image"
            />
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Muscle Groups
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <TextField
                  size="small"
                  value={currentMuscleGroup}
                  onChange={(e) => setCurrentMuscleGroup(e.target.value)}
                  placeholder="Add muscle group"
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddMuscleGroup}
                  disabled={!currentMuscleGroup.trim()}
                >
                  Add
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {newExercise.muscleGroups?.map((muscle, index) => (
                  <Chip
                    key={index}
                    label={muscle}
                    onDelete={() => handleRemoveMuscleGroup(index)}
                    size="small"
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Form Tips
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <TextField
                  size="small"
                  value={currentFormTip}
                  onChange={(e) => setCurrentFormTip(e.target.value)}
                  placeholder="Add form tip"
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddTip}
                  disabled={!currentFormTip.trim()}
                >
                  Add
                </Button>
              </Stack>
              <List dense>
                {newExercise.tips?.map((tip, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        size="small"
                        onClick={() => handleRemoveTip(index)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddExercise}
            disabled={!newExercise.name || !newExercise.description}
          >
            {isEditing ? 'Save Changes' : 'Create Exercise'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Exercises; 