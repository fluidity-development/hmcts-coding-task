import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Grid, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const API_URL = 'http://localhost:8080/api/tasks';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [caseNumber, setCaseNumber] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [dueDateTime, setDueDateTime] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = {
      title,
      caseNumber,
      description,
      status,
      dueDateTime: dueDateTime ? new Date(dueDateTime).toISOString() : null
    };

    try {
      if (editingTaskId) {
        await axios.put(`${API_URL}/${editingTaskId}`, taskData);
        setEditingTaskId(null);
      } else {
        await axios.post(API_URL, taskData);
      }
      
      setTitle('');
      setCaseNumber('');
      setDescription('');
      setStatus('PENDING');
      setDueDateTime('');
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setCaseNumber(task.caseNumber);
    setDescription(task.description || '');
    setStatus(task.status);
    setDueDateTime(task.dueDateTime ? task.dueDateTime.substr(0, 16) : '');
    setEditingTaskId(task.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${API_URL}/${id}/status`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom style={{ marginTop: 20 }}>
        Task Management System
      </Typography>
      
      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Case Number"
                fullWidth
                required
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Status"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Due Date/Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={dueDateTime}
                onChange={(e) => setDueDateTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {editingTaskId ? 'Update Task' : 'Create Task'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h5" gutterBottom>
        My Tasks
      </Typography>

      {tasks.length === 0 ? (
        <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
          No tasks found. Create a new task above.
        </Typography>
      ) : (
        tasks.map((task) => (
          <Paper key={task.id} elevation={2} style={{ padding: 16, marginBottom: 16 }}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography variant="h6">{task.title}</Typography>
                {task.caseNumber && (
                  <Typography variant="body2" color="textSecondary">
                    Case Number: {task.caseNumber}
                  </Typography>
                )}
                {task.description && (
                  <Typography variant="body1" color="textSecondary">
                    {task.description}
                  </Typography>
                )}
                <Box display="flex" alignItems="center" mt={1}>
                  <Button
                    size="small"
                    variant={task.status === 'PENDING' ? 'contained' : 'outlined'}
                    color="warning"
                    onClick={() => handleStatusChange(task.id, 'PENDING')}
                    style={{ marginRight: 8 }}
                  >
                    Pending
                  </Button>
                  <Button
                    size="small"
                    variant={task.status === 'IN_PROGRESS' ? 'contained' : 'outlined'}
                    color="info"
                    onClick={() => handleStatusChange(task.id, 'IN_PROGRESS')}
                    style={{ marginRight: 8 }}
                  >
                    In Progress
                  </Button>
                  <Button
                    size="small"
                    variant={task.status === 'COMPLETED' ? 'contained' : 'outlined'}
                    color="success"
                    onClick={() => handleStatusChange(task.id, 'COMPLETED')}
                  >
                    Completed
                  </Button>
                </Box>
                {task.dueDateTime && (
                  <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
                    Due: {new Date(task.dueDateTime).toLocaleString()}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={2} container direction="column" alignItems="flex-end">
                <IconButton onClick={() => handleEdit(task)} color="primary" size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(task.id)} color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Container>
  );
}

export default TaskApp;