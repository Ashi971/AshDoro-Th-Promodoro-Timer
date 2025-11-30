# 🍅 AshDoro - The Pomodoro Timer

> A beautiful, feature-rich Pomodoro timer web app with productivity analytics and focus tracking.

![AshDoro Banner](https://img.shields.io/badge/AshDoro-Pomodoro%20Timer-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🎯 Multiple Timer Modes
- **🍅 Pomodoro (25 min)** - Classic focus session
- **⚡ Short Focus (15 min)** - Quick tasks
- **🎯 Deep Work (50 min)** - Intense concentration
- **☕ Short Break (5 min)** - Quick rest
- **🌴 Long Break (15 min)** - Extended relaxation

### 📊 Advanced Analytics Dashboard
- **Real-time Statistics** - Track total focus time, sessions, and completion rates
- **Radar Chart** - Compare session quality across different activity types
- **Line Chart** - Visualize daily focus trends
- **Bar Chart** - Monitor session distribution
- **Recent Sessions List** - View your last 10 focus sessions with details

### 🎨 Dynamic UI Features
- **Animated Background** - Color gradients that change as your timer progresses
- **Smooth Hover Effects** - Polished interactions with shimmer and ripple effects
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Activity Categorization** - Auto-categorizes tasks (Study, Coding, Writing, Design, etc.)

### 💡 Productivity Tools
- **14 Rotating Productivity Tips** - Get focus advice during sessions
- **Break Suggestions** - Automatic break reminders after focus sessions
- **Session History** - All data stored locally on your device
- **Task Naming** - Label each focus session for better tracking

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or server required!

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ashi971/AshDoro-Th-Promodoro-Timer.git
cd AshDoro-Th-Promodoro-Timer
```

2. **Open the app**
   - Simply double-click `index.html` in your browser
   - Or drag and drop `index.html` into your browser window

That's it! 🎉 No build process, no dependencies, no server needed.

### Optional: Run with Local Server

If you prefer using a local server:

**Using Python:**
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

**Using Node.js:**
```bash
npx http-server
# Visit the URL shown in terminal
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## 📖 How to Use

### Starting a Focus Session

1. **Choose Your Timer Mode**
   - Click one of the timer mode buttons at the top
   - Default is 25-minute Pomodoro

2. **Start the Timer**
   - Click the **START** button
   - Enter a task name when prompted (e.g., "Study JavaScript")
   - Watch the background color change as you focus! 🎨

3. **During Your Session**
   - Read the productivity tips that appear below the timer
   - Tips rotate every 30 seconds
   - Background gradually darkens to help you stay focused

4. **Complete or Stop**
   - Let the timer complete for full credit
   - Click **STOP** to end early (saves as incomplete session)
   - Get a break suggestion after completing a focus session

### Taking a Break

1. Click **☕ Short Break** (5 min) or **🌴 Long Break** (15 min)
2. Enjoy the calming green gradient
3. Return refreshed and ready to focus!

### Viewing Your Analytics

1. Click **Analytics** in the navigation bar
2. See your productivity dashboard with:
   - Total focus time and session count
   - Completion rate percentage
   - Best performing day
   - Activity quality radar chart
   - Daily focus trends
   - Recent session history

## 📁 Project Structure

```
AshDoro-Th-Promodoro-Timer/
├── index.html          # Main timer page
├── analytics.html      # Analytics dashboard
├── task.html           # Tasks page (optional)
├── app.js             # Timer logic and data handling
├── analytics.js       # Analytics charts and calculations
├── style.css          # All styling and animations
├── pngwing.com (3) (1).png  # Timer background image
└── README.md          # This file
```

## 🎨 Customization

### Change Timer Background
Replace `pngwing.com (3) (1).png` with your own image, or edit `style.css`:

```css
.bg-warp {
    background-image: url(your-image.png);
    background-size: cover;
}
```

### Modify Timer Durations
Edit the timer mode buttons in `index.html`:

```html
<button class="mode-btn" data-mode="custom" data-minutes="30">
    🔥 Custom<br><span class="mode-time">30 min</span>
</button>
```

### Add More Productivity Tips
Edit the `productivityTips` array in `app.js`:

```javascript
const productivityTips = [
    "Your custom tip here",
    "Another great tip",
    // Add as many as you want!
];
```

### Change Color Scheme
Modify the gradient colors in `app.js`:

```javascript
// Default blue gradient
document.body.style.backgroundImage = 
    "linear-gradient(to bottom, #001F3F, #0F52BA)";
```

## 💾 Data Storage

- All data is stored in your browser's **localStorage**
- Data persists across browser sessions
- No backend or database required
- Private and secure - never leaves your device

### Data Persistence

✅ **Your data stays:**
- After closing the browser
- After restarting your computer
- Until you manually clear browser data

❌ **You'll lose data if:**
- You clear browser cache/cookies
- You use Incognito/Private browsing mode
- You switch to a different browser

### Export Your Data (Future Feature)
Want to backup your data? You can add an export button or manually access it via browser console:

```javascript
// Get all sessions
localStorage.getItem('pomodoroSessions')
```

## 🛠️ Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling, animations, and gradients
- **Vanilla JavaScript** - All logic and interactivity
- **Chart.js** - Beautiful analytics charts
- **Bootstrap 4** - Responsive navigation
- **LocalStorage API** - Client-side data persistence

## 🌟 Browser Compatibility

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

## 📱 Responsive Design

AshDoro works beautifully on:
- 🖥️ Desktop (1920x1080 and above)
- 💻 Laptop (1366x768 and above)
- 📱 Tablet (768px and above)
- 📱 Mobile (320px and above)

## 🐛 Known Issues

- Charts may not render perfectly on very old browsers
- Timer continues in background if you close the tab (feature, not bug!)

## 🔮 Future Enhancements

- [ ] Data export/import functionality
- [ ] Dark/Light theme toggle
- [ ] Sound notifications when timer completes
- [ ] Task list integration
- [ ] Weekly/Monthly reports
- [ ] Custom timer durations
- [ ] Sync across devices (cloud storage)
- [ ] Desktop notifications

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects!

## 👨‍💻 Author

**Ashi971**
- GitHub: [@Ashi971](https://github.com/Ashi971)
- Project Link: [AshDoro](https://github.com/Ashi971/AshDoro-Th-Promodoro-Timer)

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique® by Francesco Cirillo
- Chart.js for beautiful data visualizations
- Bootstrap for responsive components
- The amazing open-source community

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ and ☕ by Ashi971**

[Report Bug](https://github.com/Ashi971/AshDoro-Th-Promodoro-Timer/issues) · [Request Feature](https://github.com/Ashi971/AshDoro-Th-Promodoro-Timer/issues)

</div>
