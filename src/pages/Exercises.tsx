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
} from '@mui/material';

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

const exercises: Exercise[] = [
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

const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredExercises = exercises.filter(
    (exercise) => selectedCategory === 'All' || exercise.category === selectedCategory
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        Exercise Library
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Learn proper form for foundational bodyweight exercises
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={selectedCategory}
          onChange={(_: React.SyntheticEvent, newValue: Category) => setSelectedCategory(newValue)}
          centered
        >
          {categories.map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={4}>
        {filteredExercises.map((exercise) => (
          <Grid item xs={12} md={6} key={exercise.id}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                image={exercise.imageUrl}
                alt={exercise.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {exercise.name}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip label={exercise.difficulty} color="primary" size="small" />
                  <Chip label={exercise.category} color="secondary" size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {exercise.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Muscle Groups:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  {exercise.muscleGroups.map((muscle) => (
                    <Chip key={muscle} label={muscle} size="small" variant="outlined" />
                  ))}
                </Stack>
                <Typography variant="subtitle2" gutterBottom>
                  Form Tips:
                </Typography>
                <ul>
                  {exercise.tips.map((tip, index) => (
                    <li key={index}>
                      <Typography variant="body2" color="text.secondary">
                        {tip}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Exercises; 