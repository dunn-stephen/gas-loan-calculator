# 💰 GAS Loan Calculator

A sophisticated loan calculator web application built with Google Apps Script, featuring a modern responsive UI, real-time calculations, and data visualization.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### Core Functionality
- **Loan Calculations**: Calculate monthly payments, total interest, and other key metrics
- **Multiple Loans**: Manage and compare multiple loans simultaneously
- **Priority Scoring**: Automatic loan prioritization based on interest rates and terms
- **Data Persistence**: Loans are saved per user using Google's PropertiesService

### User Interface
- **Modern Design**: Clean, Material Design-inspired interface
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Instant calculations as you type
- **Interactive Charts**: Visual loan comparisons using Google Charts

### Advanced Features
- **Sorting & Filtering**: Sort loans by any metric
- **Early Payoff Estimates**: See potential savings from early repayment
- **Interest Analysis**: Daily interest calculations and principal-to-interest ratios
- **Export Options**: (Coming soon) Export loan data to sheets or PDF

## 📊 Key Metrics Calculated

- **Monthly Payment**: Based on principal, rate, and term
- **Total Payment**: Sum of all payments over the loan term
- **Total Interest**: Total amount paid in interest
- **Interest Per Day**: Daily interest cost
- **Principal to Interest Ratio**: How much principal vs interest you're paying
- **Priority Score**: Algorithm-based score to help prioritize loan repayment

## 🚀 Quick Start

### Deploy as Web App

1. Open the script in Google Apps Script Editor
2. Click "Deploy" → "New deployment"
3. Choose "Web app" as the type
4. Set execute as "Me" and access to "Anyone" (or your preference)
5. Click "Deploy" and copy the web app URL

### Access the App

Once deployed, access your loan calculator at:
```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## 🛠️ Development Setup

This project uses [clasp](https://github.com/google/clasp) to manage the Google Apps Script code locally.

### Prerequisites
- Node.js and npm installed
- Google account with Apps Script enabled
- clasp installed globally: `npm install -g @google/clasp`

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/gas-loan-calculator.git
cd gas-loan-calculator

# Login to clasp
clasp login

# Create a new Apps Script project (first time only)
clasp create --type webapp --title "Loan Calculator"

# Or connect to existing project
clasp clone YOUR_SCRIPT_ID
```

### Development Workflow

1. **Pull latest changes from Google Apps Script:**
   ```bash
   clasp pull
   ```

2. **Make your changes locally** using your preferred editor

3. **Push changes to Google Apps Script:**
   ```bash
   clasp push
   ```

4. **Open in Apps Script Editor:**
   ```bash
   clasp open
   ```

5. **Commit changes to GitHub:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

## 📁 Project Structure

```
gas-loan-calculator/
├── Code.gs              # Server-side Apps Script code
├── Index.html           # Main HTML template
├── JavaScript.html      # Client-side JavaScript
├── Stylesheet.html      # CSS styles
├── appsscript.json      # Apps Script manifest
├── .clasp.json          # Clasp configuration (not in git)
├── .gitignore           # Git ignore file
└── README.md            # This file
```

### File Descriptions

- **`Code.gs`**: Server-side logic including loan calculations, data management, and API endpoints
- **`Index.html`**: Main HTML structure with Material Design components
- **`JavaScript.html`**: Client-side interactivity, form handling, and Google Charts integration
- **`Stylesheet.html`**: Responsive CSS with dark mode support
- **`appsscript.json`**: Configuration for the Apps Script runtime

## 🔧 Configuration

### Apps Script Manifest (`appsscript.json`)
```json
{
  "timeZone": "America/New_York",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_ACCESSING",
    "access": "ANYONE"
  }
}
```

## 📝 Usage Guide

### Adding a Loan
1. Click the "Add Loan" button
2. Enter loan details (name, principal, interest rate, term)
3. Click "Save" to add the loan

### Viewing Metrics
- Each loan card displays all calculated metrics
- Click on column headers to sort by that metric
- Use the chart dropdown to visualize different metrics

### Managing Loans
- **Edit**: Click the edit icon on any loan card
- **Delete**: Click the delete icon (confirmation required)
- **Compare**: View the chart to compare loans visually

## 🎨 Customization

### Styling
Modify `Stylesheet.html` to customize:
- Color scheme (CSS variables in `:root`)
- Component styles
- Responsive breakpoints

### Calculations
Edit `Code.gs` to modify:
- Interest calculation formulas
- Priority score algorithm
- Default loan values

### UI Components
Update `Index.html` and `JavaScript.html` to:
- Add new features
- Modify form fields
- Change layout structure

## 🔒 Security & Privacy

- **Data Storage**: All loan data is stored in user-specific PropertiesService
- **No External APIs**: All calculations are done within Google's infrastructure
- **User Isolation**: Each user's data is completely separate
- **No Tracking**: No analytics or tracking code included

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Apps Script team for the platform
- Google Charts for visualization
- Material Design for UI inspiration

## 📮 Contact

For questions or support, please open an issue in the GitHub repository.

---

Made with ❤️ using Google Apps Script