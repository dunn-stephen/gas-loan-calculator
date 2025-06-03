// Main server-side code for Loan Calculator Web App

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Loan Calculator Dashboard')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Include HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Loan calculation functions
function calculateMonthlyPayment(principal, annualRate, months) {
  if (months === 0) return principal;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  
  const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  return payment;
}

function calculateLoanMetrics(loan) {
  const monthlyPayment = calculateMonthlyPayment(loan.principal, loan.rate, loan.months);
  const totalPayment = monthlyPayment * loan.months;
  const totalInterest = totalPayment - loan.principal;
  const interestPerDay = totalInterest / (loan.months * 30);
  const principalToInterestRatio = loan.principal / (totalInterest || 1);
  
  // Priority score calculation (higher is better)
  const priorityScore = (loan.rate * 10) + (interestPerDay * 100) - (loan.months / 12);
  
  return {
    ...loan,
    monthlyPayment: monthlyPayment,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
    interestPerDay: interestPerDay,
    principalToInterestRatio: principalToInterestRatio,
    priorityScore: priorityScore,
    earlyPayoffSavings: totalInterest * 0.25 // Estimate 25% savings
  };
}

// Get all loans with calculated metrics
function getAllLoans() {
  try {
    const userProperties = PropertiesService.getUserProperties();
    const loansJson = userProperties.getProperty('loans');
    const loans = loansJson ? JSON.parse(loansJson) : getDefaultLoans();
    
    return loans.map(loan => calculateLoanMetrics(loan));
  } catch (error) {
    console.error('Error getting loans:', error);
    return getDefaultLoans().map(loan => calculateLoanMetrics(loan));
  }
}

// Save loans to PropertiesService
function saveLoans(loans) {
  try {
    const userProperties = PropertiesService.getUserProperties();
    // Remove calculated fields before saving
    const loansToSave = loans.map(loan => ({
      id: loan.id,
      name: loan.name,
      principal: loan.principal,
      rate: loan.rate,
      months: loan.months
    }));
    userProperties.setProperty('loans', JSON.stringify(loansToSave));
    return { success: true };
  } catch (error) {
    console.error('Error saving loans:', error);
    return { success: false, error: error.toString() };
  }
}

// Add a new loan
function addLoan(loanData) {
  try {
    const loans = getAllLoans();
    const newLoan = {
      id: Date.now().toString(),
      name: loanData.name || `Loan ${loans.length + 1}`,
      principal: parseFloat(loanData.principal) || 10000,
      rate: parseFloat(loanData.rate) || 5.0,
      months: parseInt(loanData.months) || 60
    };
    
    loans.push(newLoan);
    saveLoans(loans);
    return calculateLoanMetrics(newLoan);
  } catch (error) {
    console.error('Error adding loan:', error);
    throw new Error('Failed to add loan');
  }
}

// Update an existing loan
function updateLoan(loanId, updates) {
  try {
    const loans = getAllLoans();
    const index = loans.findIndex(loan => loan.id === loanId);
    
    if (index === -1) {
      throw new Error('Loan not found');
    }
    
    loans[index] = {
      ...loans[index],
      ...updates,
      id: loanId // Ensure ID doesn't change
    };
    
    saveLoans(loans);
    return calculateLoanMetrics(loans[index]);
  } catch (error) {
    console.error('Error updating loan:', error);
    throw new Error('Failed to update loan');
  }
}

// Delete a loan
function deleteLoan(loanId) {
  try {
    const loans = getAllLoans();
    const filteredLoans = loans.filter(loan => loan.id !== loanId);
    saveLoans(filteredLoans);
    return { success: true };
  } catch (error) {
    console.error('Error deleting loan:', error);
    throw new Error('Failed to delete loan');
  }
}

// Sort loans by a specific field
function sortLoans(sortBy, ascending = true) {
  try {
    const loans = getAllLoans();
    
    loans.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      // Handle string comparison for name
      if (sortBy === 'name') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (ascending) {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return loans;
  } catch (error) {
    console.error('Error sorting loans:', error);
    return getAllLoans();
  }
}

// Get user preferences
function getUserPreferences() {
  const userProperties = PropertiesService.getUserProperties();
  return {
    darkMode: userProperties.getProperty('darkMode') === 'true',
    useVirtualized: userProperties.getProperty('useVirtualized') === 'true',
    chartMetric: userProperties.getProperty('chartMetric') || 'totalInterest'
  };
}

// Save user preferences
function saveUserPreferences(preferences) {
  try {
    const userProperties = PropertiesService.getUserProperties();
    Object.keys(preferences).forEach(key => {
      userProperties.setProperty(key, preferences[key].toString());
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving preferences:', error);
    return { success: false, error: error.toString() };
  }
}

// Get default loans for new users
function getDefaultLoans() {
  return [
    {
      id: '1',
      name: 'Car Loan',
      principal: 25000,
      rate: 4.5,
      months: 60
    },
    {
      id: '2',
      name: 'Personal Loan',
      principal: 10000,
      rate: 8.5,
      months: 36
    },
    {
      id: '3',
      name: 'Home Equity',
      principal: 50000,
      rate: 6.0,
      months: 120
    }
  ];
}

// Get chart data for visualization
function getChartData(metric) {
  try {
    const loans = getAllLoans();
    const chartData = [['Loan', metric]];
    
    const metricLabels = {
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      priorityScore: 'Priority Score',
      interestPerDay: 'Interest Per Day'
    };
    
    loans.forEach(loan => {
      chartData.push([loan.name, loan[metric]]);
    });
    
    return {
      data: chartData,
      title: `Loan Comparison by ${metricLabels[metric] || metric}`
    };
  } catch (error) {
    console.error('Error getting chart data:', error);
    return {
      data: [['Loan', metric]],
      title: 'Loan Comparison'
    };
  }
}

// Format currency for display
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Format number with commas
function formatNumber(value, decimals = 2) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}
