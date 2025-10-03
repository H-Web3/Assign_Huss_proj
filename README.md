## Setting up the project

Download the zip file, unzip it, open with vsCode or your favourite Editor,  
start running  (the code)
- npm create vite@latest
- npm install (for installing dependencies)
- npm run dev (run server)

Sometimes NodeJs gives version error, only then run command "npm install node" and again run server

## Structure created and modified

src/  
├── components/  
│   ├── AssignmentTable.jsx  
│   ├── Button.jsx  
│   ├── Input.jsx  
│    
├── pages/  
│   ├── CreateAssignment.jsx  
|  
├── utils/  
│   ├── apis.js  
│   ├── httpAction.js  
│   └── validators/  
│       └── createAssignmentSchema.js  
|  
├── App.jsx  
└── index.css  

## Extras
Some extra parts of code are commented out like AssignmentTable.jsx and it's  
implementation part in CreateAssignment.jsx file are commented. If want to use just uncomment it will work (inshallah).