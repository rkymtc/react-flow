# Team Management Application

A modern team management application that allows you to manage teams and users, visualize their relationships, and analyze team structures.

## 🚀 Features

### 📊 Team Management
- Create and edit teams
- View team details
- Manage team members
- Delete teams with automatic member reassignment

### 👥 User Management
- Add and edit users
- Assign users to teams
- Toggle user active/inactive status
- Remove users from teams
- Delete users from the system

### 📈 Visualization and Analytics
- Interactive organization chart
- Team distribution pie chart
- User statistics bar chart
- Easy management with right-click menus
- Zoom and navigation controls

## 🛠️ Technologies

- **Frontend:** React, TypeScript, Vite
- **UI Framework:** Material-UI
- **Charts:** React Flow, Recharts
- **Routing:** React Router
- **State Management:** Context API
- **Data Storage:** LocalStorage
- **Development Tools:** ESLint, Prettier

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/username/team-management.git
cd team-management
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open in your browser:
\`\`\`
http://localhost:5173
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/         # Reusable components
│   ├── common/        # Common UI components
│   ├── diagrams/      # Diagram components
│   └── forms/         # Form components
├── context/           # Context definitions
├── pages/             # Page components
├── styles/            # Global styles
├── types/             # TypeScript types
└── main.tsx          # Entry point
\`\`\`

## 🎨 UI/UX Features

- Dark theme with modern color palette
- Responsive design
- Animations and transition effects
- Consistent typography and spacing
- Helpful tooltips and feedback
- User-friendly forms with validation
- Modern card and list designs
- Gradients and shadow effects

## 🔍 Usage

### Team Management
1. Click the "Add Team" button
2. Enter team name and description
3. Create the team
4. Edit or delete teams from the team card

### User Management
1. Click the "Add User" button
2. Enter user information
3. Assign to a team
4. Create the user
5. Edit, delete, or change status from the user list

### Diagram Usage
1. Right-click team nodes to show/hide members
2. Right-click user nodes to remove from team
3. Use zoom controls for navigation
4. Open help panel for detailed usage instructions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'feat: Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Create a Pull Request

## 📝 Todo

- [ ] User roles and authentication
- [ ] Drag-and-drop team assignments
- [ ] Additional charts and analytics
- [ ] Team hierarchy (sub-teams)
- [ ] Search and filtering capabilities
- [ ] Undo/redo functionality
- [ ] Unit tests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial Developer* - [GitHub](https://github.com/username)

## 🙏 Acknowledgments

- Material-UI team for the amazing UI library
- React Flow team for the powerful diagram library
- Recharts team for the impressive charting library 