import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Personal Task Manager' }}>
          {(props) => (
            <HomeScreen
              {...props}
              tasks={tasks}
              toggleTaskStatus={toggleTaskStatus}
              deleteTask={deleteTask}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddTask" options={{ title: 'Tambah Tugas' }}>
          {(props) => <AddTaskScreen {...props} onAddTask={addTask} />}
        </Stack.Screen>
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={({ route }) => ({
            title: route.params?.task?.title ? 'Detail Tugas' : 'Detail',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
