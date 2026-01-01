import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fade,
  Grow,
  Slide
} from "@mui/material";
import { Add, Edit, Delete, CheckCircle, RadioButtonUnchecked, Warning, Schedule, EventAvailable } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#0f0f1e',
      paper: '#1a1a2e',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
    },
    text: {
      primary: '#e5e7eb',
      secondary: '#9ca3af',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.4)',
          '&:hover': {
            boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.6)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(99, 102, 241, 0.5)',
            },
          },
        },
      },
    },
  },
});

export default function Dashboard() {
  const { token } = useContext(AuthContext);

  const [profile, setProfile] = useState({});
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editTask, setEditTask] = useState({
    id: "",
    title: "",
    dueDate: "",
  });

  const headers = { authorization: token };

  const loadData = async () => {
    const userRes = await axios.get(
      "http://localhost:5000/api/user/profile",
      { headers }
    );

    const taskRes = await axios.get(
      "http://localhost:5000/api/tasks",
      { headers }
    );

    setProfile(userRes.data);
    setTasks(taskRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addTask = async () => {
    if (!title.trim() || !dueDate) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, dueDate },
      { headers }
    );

    setTitle("");
    setDueDate("");
    loadData();
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      { headers }
    );
    loadData();
  };

  const toggleComplete = async (task) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      { completed: !task.completed },
      { headers }
    );
    loadData();
  };

  const openEditDialog = (task) => {
    setEditTask({
      id: task._id,
      title: task.title,
      dueDate: task.dueDate?.split("T")[0],
    });
    setOpenEdit(true);
  };

  const updateTask = async () => {
    if (!editTask.title.trim() || !editTask.dueDate) return;

    await axios.put(
      `http://localhost:5000/api/tasks/${editTask.id}`,
      {
        title: editTask.title,
        dueDate: editTask.dueDate,
      },
      { headers }
    );

    setOpenEdit(false);
    loadData();
  };


  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedTasks = tasks.filter((t) => t.completed);

  const pendingTasks = tasks.filter((t) => !t.completed);

  const overdueTasks = pendingTasks.filter(
    (t) => normalizeDate(t.dueDate) < today
  );

  const todayTasks = pendingTasks.filter(
    (t) => normalizeDate(t.dueDate).getTime() === today.getTime()
  );

  const upcomingTasks = pendingTasks.filter(
    (t) => normalizeDate(t.dueDate) > today
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
      }}>
        <Navbar />

        <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
          <Fade in timeout={800}>
            <Box mb={5} textAlign="center">
              <Typography 
                variant="h5" 
                fontWeight={700}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Welcome back, {profile.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Stay organized and manage your tasks efficiently
              </Typography>
            </Box>
          </Fade>

          <Grow in timeout={1000}>
            <Card 
              sx={{ 
                mb: 5,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                borderColor: 'rgba(99, 102, 241, 0.2)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" mb={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Add /> Create New Task
                </Typography>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label="Task Title"
                      placeholder="What needs to be done?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Due Date"
                      InputLabelProps={{ shrink: true }}
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={addTask}
                      startIcon={<Add />}
                      sx={{ 
                        height: '56px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      }}
                    >
                      Add Task
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grow>

          <Divider sx={{ mb: 5, borderColor: 'rgba(255, 255, 255, 0.05)' }} />

          <TaskSection 
            title="Overdue Tasks" 
            tasks={overdueTasks} 
            icon={<Warning sx={{ color: 'error.main' }} />}
            color="error"
            openEditDialog={openEditDialog}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            animationDelay={1200}
          />
          
          <TaskSection 
            title="Today's Tasks" 
            tasks={todayTasks} 
            icon={<Schedule sx={{ color: 'warning.main' }} />}
            color="warning"
            openEditDialog={openEditDialog}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            animationDelay={1400}
          />
          
          <TaskSection 
            title="Upcoming Tasks" 
            tasks={upcomingTasks} 
            icon={<EventAvailable sx={{ color: 'primary.main' }} />}
            color="primary"
            openEditDialog={openEditDialog}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            animationDelay={1600}
          />
          
          <TaskSection 
            title="Completed Tasks" 
            tasks={completedTasks} 
            icon={<CheckCircle sx={{ color: 'success.main' }} />}
            color="success"
            openEditDialog={openEditDialog}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            animationDelay={1800}
          />
        </Container>

        <Dialog 
          open={openEdit} 
          onClose={() => setOpenEdit(false)}
          TransitionComponent={Slide}
          TransitionProps={{ direction: 'up' }}
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: 3,
              minWidth: { xs: '90%', sm: 500 },
            }
          }}
        >
          <DialogTitle sx={{ 
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            pb: 2,
          }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Edit /> Edit Task
            </Box>
          </DialogTitle>

          <DialogContent sx={{ pt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Task Title"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />

            <TextField
              fullWidth
              margin="normal"
              type="date"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              value={editTask.dueDate}
              onChange={(e) =>
                setEditTask({ ...editTask, dueDate: e.target.value })
              }
            />
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={() => setOpenEdit(false)} variant="outlined">
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={updateTask}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              }}
            >
              Update Task
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}


function TaskSection({ title, tasks, icon, color, openEditDialog, deleteTask, toggleComplete, animationDelay }) {
  if (tasks.length === 0) return null;

  return (
    <Fade in timeout={animationDelay}>
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          {icon}
          <Typography variant="h6">
            {title}
          </Typography>
          <Chip 
            label={tasks.length} 
            size="small" 
            sx={{ 
              bgcolor: `rgba(${color === 'error' ? '239, 68, 68' : color === 'warning' ? '245, 158, 11' : color === 'primary' ? '99, 102, 241' : '16, 185, 129'}, 0.2)`,
              color: `${color}.main`,
              fontWeight: 600,
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEditDialog}
              onDelete={deleteTask}
              onToggle={toggleComplete}
              delay={index * 100}
              sectionColor={color}
            />
          ))}
        </Grid>
      </Box>
    </Fade>
  );
}


function TaskCard({ task, onEdit, onDelete, onToggle, delay = 0, sectionColor = 'primary' }) {
  const getGradient = () => {
    if (sectionColor === 'error') return 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)';
    if (sectionColor === 'warning') return 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)';
    if (sectionColor === 'success') return 'linear-gradient(90deg, #10b981 0%, #34d399 100%)';
    return 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)';
  };

  return (
    <Grow in timeout={800} style={{ transformOrigin: '0 0 0', transitionDelay: `${delay}ms` }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: getGradient(),
            },
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              borderColor: `rgba(${sectionColor === 'error' ? '239, 68, 68' : sectionColor === 'warning' ? '245, 158, 11' : sectionColor === 'success' ? '16, 185, 129' : '99, 102, 241'}, 0.5)`,
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography 
              fontWeight={600} 
              fontSize="1.1rem"
              mb={1.5}
              sx={{
                opacity: task.completed ? 0.7 : 1,
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              📅 {new Date(task.dueDate).toDateString()}
            </Typography>

            <Chip
              icon={task.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
              label={task.completed ? "Completed" : "Pending"}
              color={task.completed ? "success" : sectionColor}
              size="small"
              sx={{ 
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          </CardContent>

          <Box px={2} pb={2}>
            <Button
              fullWidth
              variant={task.completed ? "outlined" : "contained"}
              sx={{ 
                mb: 1,
                ...(!task.completed && {
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                }),
              }}
              onClick={() => onToggle(task)}
              startIcon={task.completed ? <RadioButtonUnchecked /> : <CheckCircle />}
            >
              {task.completed ? "Mark Pending" : "Complete"}
            </Button>

            <Box display="flex" gap={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => onEdit(task)}
                startIcon={<Edit />}
              >
                Edit
              </Button>

              <Button
                fullWidth
                color="error"
                variant="outlined"
                onClick={() => onDelete(task._id)}
                startIcon={<Delete />}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grow>
  );
}