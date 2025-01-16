#!/bin/bash

# Create main project directories
mkdir -p src/{components/ui,store,hooks}

# Create component files
touch src/components/Header.jsx
touch src/components/Sidebar.jsx
touch src/components/TaskInput.jsx
touch src/components/TaskList.jsx
touch src/components/TaskItem.jsx
touch src/components/TaskDetails.jsx

# Create UI component files
touch src/components/ui/{Button,Input,Calendar}.jsx

# Create store files
touch src/store/index.js
touch src/store/taskSlice.js

# Create hooks
touch src/hooks/useLocalStorage.js

# Create root files
touch src/{App,index}.jsx

# Create a basic .gitignore
echo "node_modules
dist
.env
.DS_Store" > .gitignore

echo "Project structure created successfully!"

# List the created structure
tree src/