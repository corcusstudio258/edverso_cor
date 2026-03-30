// data/modules.ts

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface Assessment {
  questions: Question[];
}

export interface ModuleContent {
  id: number;
  title: string;
  description: string;
  assessment?: Assessment;
}

export const modules: ModuleContent[] = [
  {
  id: 1,
  title: "Healthcare",
  description: "Learn about health awareness, hygiene, and public wellbeing.",
  assessment: {
    questions: [
      {
        id: 1,
        question: "Which of the following best defines health according to WHO?",
        options: [
          "Absence of disease",
          "State of complete physical, mental and social well-being",
          "Ability to work efficiently",
          "Freedom from illness"
        ],
        answer: "State of complete physical, mental and social well-being"
      },
      {
        id: 2,
        question: "What is the primary purpose of hand hygiene?",
        options: [
          "To smell good",
          "To prevent spread of infectious diseases",
          "To comply with social norms",
          "To save water"
        ],
        answer: "To prevent spread of infectious diseases"
      },
      {
        id: 3,
        question: "Which practice is NOT recommended for mental wellbeing?",
        options: [
          "Regular exercise",
          "Adequate sleep",
          "Ignoring stress completely",
          "Mindfulness meditation"
        ],
        answer: "Ignoring stress completely"
      },
      {
        id: 4,
        question: "What does a balanced diet primarily include?",
        options: [
          "Only fruits and vegetables",
          "Fruits, vegetables, proteins and whole grains",
          "Only protein-rich foods",
          "Processed and packaged foods"
        ],
        answer: "Fruits, vegetables, proteins and whole grains"
      },
      {
        id: 5,
        question: "Which of these is a key aspect of public health?",
        options: [
          "Individual treatment only",
          "Disease prevention and health promotion",
          "Focusing only on physical health",
          "Ignoring community aspects"
        ],
        answer: "Disease prevention and health promotion"
      },
      {
        id: 6,
        question: "What is the recommended duration for hand washing?",
        options: [
          "5-10 seconds",
          "20-30 seconds",
          "1 minute",
          "2 minutes"
        ],
        answer: "20-30 seconds"
      },
      {
        id: 7,
        question: "Which nutrient is essential for brain function?",
        options: [
          "Carbohydrates",
          "Proteins",
          "Fats",
          "All of the above"
        ],
        answer: "All of the above"
      },
      {
        id: 8,
        question: "What is a common symptom of stress?",
        options: [
          "Increased energy",
          "Improved concentration",
          "Sleep disturbances",
          "Decreased appetite only"
        ],
        answer: "Sleep disturbances"
      },
      {
        id: 9,
        question: "Which practice helps in preventing infectious diseases?",
        options: [
          "Sharing personal items",
          "Vaccination",
          "Avoiding sunlight",
          "Eating junk food"
        ],
        answer: "Vaccination"
      },
      {
        id: 10,
        question: "What is the importance of hydration?",
        options: [
          "Only for thirst quenching",
          "Regulates body temperature and supports bodily functions",
          "Makes you look good",
          "Only important during exercise"
        ],
        answer: "Regulates body temperature and supports bodily functions"
      },
      {
        id: 11,
        question: "What is the recommended daily water intake for adults?",
        options: [
          "1-2 glasses",
          "4-6 glasses",
          "8-10 glasses",
          "Only when thirsty"
        ],
        answer: "8-10 glasses"
      },
      {
        id: 12,
        question: "Which vitamin is produced when skin is exposed to sunlight?",
        options: [
          "Vitamin A",
          "Vitamin B12",
          "Vitamin D",
          "Vitamin K"
        ],
        answer: "Vitamin D"
      },
      {
        id: 13,
        question: "What is the normal resting heart rate for adults?",
        options: [
          "30-40 beats per minute",
          "60-100 beats per minute",
          "120-140 beats per minute",
          "150-180 beats per minute"
        ],
        answer: "60-100 beats per minute"
      },
      {
        id: 14,
        question: "Which of these is a cardiovascular exercise?",
        options: [
          "Weight lifting",
          "Yoga stretching",
          "Running or jogging",
          "Meditation"
        ],
        answer: "Running or jogging"
      },
      {
        id: 15,
        question: "What does BMI stand for?",
        options: [
          "Body Mass Indicator",
          "Basic Metabolic Index",
          "Body Mass Index",
          "Bone Muscle Integrity"
        ],
        answer: "Body Mass Index"
      },
      {
        id: 16,
        question: "Which food group is the primary source of energy?",
        options: [
          "Proteins",
          "Fats",
          "Carbohydrates",
          "Vitamins"
        ],
        answer: "Carbohydrates"
      },
      {
        id: 17,
        question: "What is the main function of calcium in the body?",
        options: [
          "Energy production",
          "Bone and teeth health",
          "Blood clotting",
          "Both bone/teeth health and blood clotting"
        ],
        answer: "Both bone/teeth health and blood clotting"
      },
      {
        id: 18,
        question: "Which practice helps prevent osteoporosis?",
        options: [
          "High sugar diet",
          "Sedentary lifestyle",
          "Calcium and vitamin D intake",
          "Smoking"
        ],
        answer: "Calcium and vitamin D intake"
      },
      {
        id: 19,
        question: "What is the recommended sleep duration for adults?",
        options: [
          "4-5 hours",
          "6-7 hours",
          "7-9 hours",
          "10-12 hours"
        ],
        answer: "7-9 hours"
      },
      {
        id: 20,
        question: "Which of these is a symptom of dehydration?",
        options: [
          "Increased energy",
          "Clear urine",
          "Dry mouth and fatigue",
          "Frequent urination"
        ],
        answer: "Dry mouth and fatigue"
      },
      {
        id: 21,
        question: "What is the primary cause of dental cavities?",
        options: [
          "Brushing too hard",
          "Bacteria and sugar",
          "Drinking cold water",
          "Eating vegetables"
        ],
        answer: "Bacteria and sugar"
      },
      {
        id: 22,
        question: "Which vaccination is typically given at birth?",
        options: [
          "MMR",
          "Hepatitis B",
          "Chickenpox",
          "HPV"
        ],
        answer: "Hepatitis B"
      },
      {
        id: 23,
        question: "What is the normal blood pressure range for adults?",
        options: [
          "180/120 mmHg",
          "140/90 mmHg",
          "120/80 mmHg",
          "90/60 mmHg"
        ],
        answer: "120/80 mmHg"
      },
      {
        id: 24,
        question: "Which activity strengthens the immune system?",
        options: [
          "Smoking",
          "Regular exercise",
          "Poor sleep",
          "High stress"
        ],
        answer: "Regular exercise"
      },
      {
        id: 25,
        question: "What is the leading cause of preventable death worldwide?",
        options: [
          "Car accidents",
          "Smoking",
          "Alcohol consumption",
          "Drug abuse"
        ],
        answer: "Smoking"
      },
      {
        id: 26,
        question: "Which mineral is crucial for oxygen transport in blood?",
        options: [
          "Calcium",
          "Iron",
          "Potassium",
          "Sodium"
        ],
        answer: "Iron"
      },
      {
        id: 27,
        question: "What is the main benefit of dietary fiber?",
        options: [
          "Provides quick energy",
          "Builds muscle",
          "Promotes digestive health",
          "Strengthens bones"
        ],
        answer: "Promotes digestive health"
      },
      {
        id: 28,
        question: "Which practice reduces risk of heart disease?",
        options: [
          "High salt diet",
          "Regular physical activity",
          "Smoking",
          "Sitting for long hours"
        ],
        answer: "Regular physical activity"
      },
      {
        id: 29,
        question: "What is the recommended frequency for dental check-ups?",
        options: [
          "Every 5 years",
          "Every 3 years",
          "Every 6 months",
          "Only when in pain"
        ],
        answer: "Every 6 months"
      },
      {
        id: 30,
        question: "Which vitamin helps in wound healing?",
        options: [
          "Vitamin A",
          "Vitamin C",
          "Vitamin D",
          "Vitamin E"
        ],
        answer: "Vitamin C"
      },
      {
        id: 31,
        question: "What is the primary method of HIV transmission?",
        options: [
          "Shaking hands",
          "Sharing food",
          "Unprotected sexual contact",
          "Mosquito bites"
        ],
        answer: "Unprotected sexual contact"
      },
      {
        id: 32,
        question: "Which food is rich in omega-3 fatty acids?",
        options: [
          "Red meat",
          "Fried chicken",
          "Salmon fish",
          "White bread"
        ],
        answer: "Salmon fish"
      },
      {
        id: 33,
        question: "What is the main purpose of CPR?",
        options: [
          "To stop bleeding",
          "To maintain blood circulation during cardiac arrest",
          "To reduce fever",
          "To treat fractures"
        ],
        answer: "To maintain blood circulation during cardiac arrest"
      },
      {
        id: 34,
        question: "Which condition is characterized by high blood sugar?",
        options: [
          "Hypertension",
          "Diabetes",
          "Anemia",
          "Asthma"
        ],
        answer: "Diabetes"
      },
      {
        id: 35,
        question: "What is the benefit of mindfulness meditation?",
        options: [
          "Increases stress",
          "Reduces anxiety and improves focus",
          "Causes weight gain",
          "Decreases immunity"
        ],
        answer: "Reduces anxiety and improves focus"
      },
      {
        id: 36,
        question: "Which practice prevents mosquito-borne diseases?",
        options: [
          "Keeping stagnant water",
          "Using mosquito nets",
          "Sleeping during day",
          "Eating garlic"
        ],
        answer: "Using mosquito nets"
      },
      {
        id: 37,
        question: "What is the main cause of food poisoning?",
        options: [
          "Eating too fast",
          "Bacterial contamination",
          "Drinking water",
          "Eating fruits"
        ],
        answer: "Bacterial contamination"
      },
      {
        id: 38,
        question: "Which activity improves bone density?",
        options: [
          "Swimming",
          "Weight-bearing exercises",
          "Watching TV",
          "Sleeping"
        ],
        answer: "Weight-bearing exercises"
      },
      {
        id: 39,
        question: "What is the recommended alcohol consumption for adults?",
        options: [
          "No limit",
          "Moderate consumption",
          "Only on weekends",
          "As much as wanted"
        ],
        answer: "Moderate consumption"
      },
      {
        id: 40,
        question: "Which symptom requires immediate medical attention?",
        options: [
          "Mild headache",
          "Sudden chest pain",
          "Minor cut",
          "Slight cough"
        ],
        answer: "Sudden chest pain"
      },
      {
        id: 41,
        question: "What is the primary benefit of breastfeeding for infants?",
        options: [
          "It's cheaper",
          "Provides ideal nutrition and antibodies",
          "Easier for mother",
          "Faster feeding"
        ],
        answer: "Provides ideal nutrition and antibodies"
      },
      {
        id: 42,
        question: "Which practice reduces risk of skin cancer?",
        options: [
          "Tanning beds",
          "Sun exposure during peak hours",
          "Using sunscreen",
          "Ignoring moles"
        ],
        answer: "Using sunscreen"
      },
      {
        id: 43,
        question: "What is the normal body temperature in Celsius?",
        options: [
          "34°C",
          "36°C",
          "37°C",
          "40°C"
        ],
        answer: "37°C"
      },
      {
        id: 44,
        question: "Which nutrient helps build and repair tissues?",
        options: [
          "Carbohydrates",
          "Proteins",
          "Fats",
          "Vitamins"
        ],
        answer: "Proteins"
      },
      {
        id: 45,
        question: "What is the main purpose of antibiotics?",
        options: [
          "Treat viral infections",
          "Treat bacterial infections",
          "Reduce pain",
          "Lower fever"
        ],
        answer: "Treat bacterial infections"
      },
      {
        id: 46,
        question: "Which practice maintains good posture?",
        options: [
          "Slouching",
          "Sitting straight with shoulders back",
          "Standing on one leg",
          "Lying down all day"
        ],
        answer: "Sitting straight with shoulders back"
      },
      {
        id: 47,
        question: "What is the benefit of regular health screenings?",
        options: [
          "Early detection of diseases",
          "Increased medical costs",
          "Waste of time",
          "Causes anxiety"
        ],
        answer: "Early detection of diseases"
      },
      {
        id: 48,
        question: "Which food should be limited to maintain heart health?",
        options: [
          "Fresh fruits",
          "Vegetables",
          "Saturated and trans fats",
          "Whole grains"
        ],
        answer: "Saturated and trans fats"
      },
      {
        id: 49,
        question: "What is the recommended way to lift heavy objects?",
        options: [
          "Bend from waist",
          "Use your back muscles",
          "Lift with your legs",
          "Pull quickly"
        ],
        answer: "Lift with your legs"
      },
      {
        id: 50,
        question: "Which practice promotes environmental health?",
        options: [
          "Littering",
          "Proper waste disposal",
          "Burning plastic",
          "Using disposable items excessively"
        ],
        answer: "Proper waste disposal"
      }
    ]
  }
},
  {
  id: 2,
  title: "FinancialLiteracy",
  description: "Understand budgeting, saving, and the basics of financial planning.",
  assessment: {
    questions: [
      {
        id: 1,
        question: "What is the 50-30-20 rule in budgeting?",
        options: [
          "50% savings, 30% needs, 20% wants",
          "50% needs, 30% wants, 20% savings",
          "50% wants, 30% needs, 20% savings",
          "50% taxes, 30% savings, 20% needs"
        ],
        answer: "50% needs, 30% wants, 20% savings"
      },
      {
        id: 2,
        question: "What is compound interest?",
        options: [
          "Interest on principal only",
          "Interest on principal plus accumulated interest",
          "Simple interest calculation",
          "Interest only on savings"
        ],
        answer: "Interest on principal plus accumulated interest"
      },
      {
        id: 3,
        question: "Which is considered 'good debt'?",
        options: [
          "Credit card debt",
          "Education loan",
          "Personal loan for vacation",
          "Payday loans"
        ],
        answer: "Education loan"
      },
      {
        id: 4,
        question: "What does diversification mean in investing?",
        options: [
          "Putting all money in one stock",
          "Spreading investments across different assets",
          "Investing only in gold",
          "Keeping money in savings account"
        ],
        answer: "Spreading investments across different assets"
      },
      {
        id: 5,
        question: "What is an emergency fund?",
        options: [
          "Money for vacation",
          "3-6 months of living expenses for unexpected events",
          "Investment in stocks",
          "Retirement fund"
        ],
        answer: "3-6 months of living expenses for unexpected events"
      },
      {
        id: 6,
        question: "What affects credit score negatively?",
        options: [
          "Paying bills on time",
          "Keeping credit utilization low",
          "Missing loan payments",
          "Having a mix of credit types"
        ],
        answer: "Missing loan payments"
      },
      {
        id: 7,
        question: "What is the primary purpose of insurance?",
        options: [
          "Wealth creation",
          "Risk management and financial protection",
          "Tax avoidance",
          "Entertainment"
        ],
        answer: "Risk management and financial protection"
      },
      {
        id: 8,
        question: "Which investment typically carries highest risk?",
        options: [
          "Fixed deposits",
          "Government bonds",
          "Stocks",
          "Savings account"
        ],
        answer: "Stocks"
      },
      {
        id: 9,
        question: "What does ROI stand for?",
        options: [
          "Return on Investment",
          "Rate of Interest",
          "Risk of Inflation",
          "Return on Income"
        ],
        answer: "Return on Investment"
      },
      {
        id: 10,
        question: "When should retirement planning start?",
        options: [
          "At age 50",
          "At retirement age",
          "As early as possible",
          "Only when you have high income"
        ],
        answer: "As early as possible"
      },
      {
        id: 11,
        question: "What is a credit score range considered 'excellent'?",
        options: [
          "300-500",
          "500-650",
          "650-750",
          "750-850"
        ],
        answer: "750-850"
      },
      {
        id: 12,
        question: "What is the rule of 72 used for?",
        options: [
          "Calculating retirement age",
          "Estimating how long it takes for money to double",
          "Determining loan eligibility",
          "Calculating tax liability"
        ],
        answer: "Estimating how long it takes for money to double"
      },
      {
        id: 13,
        question: "Which expense should be prioritized in a budget?",
        options: [
          "Entertainment",
          "Essential living expenses",
          "Luxury items",
          "Vacation funds"
        ],
        answer: "Essential living expenses"
      },
      {
        id: 14,
        question: "What is a mutual fund?",
        options: [
          "A single stock investment",
          "Pooled money from multiple investors",
          "A type of bank account",
          "Government bond"
        ],
        answer: "Pooled money from multiple investors"
      },
      {
        id: 15,
        question: "What does APR stand for?",
        options: [
          "Annual Percentage Rate",
          "Average Payment Return",
          "Annual Principal Refund",
          "Automatic Payment Request"
        ],
        answer: "Annual Percentage Rate"
      },
      {
        id: 16,
        question: "Which is a characteristic of a good budget?",
        options: [
          "Rigid and inflexible",
          "Realistic and adjustable",
          "Focuses only on income",
          "Ignores unexpected expenses"
        ],
        answer: "Realistic and adjustable"
      },
      {
        id: 17,
        question: "What is the primary benefit of starting investments early?",
        options: [
          "Higher risk tolerance",
          "More time for compound interest to work",
          "Lower taxes",
          "Guaranteed returns"
        ],
        answer: "More time for compound interest to work"
      },
      {
        id: 18,
        question: "What is inflation?",
        options: [
          "Increase in currency value",
          "Rise in prices over time",
          "Decrease in interest rates",
          "Growth in investments"
        ],
        answer: "Rise in prices over time"
      },
      {
        id: 19,
        question: "Which document shows your income and taxes?",
        options: [
          "Bank statement",
          "W-2 form",
          "Credit report",
          "Budget worksheet"
        ],
        answer: "W-2 form"
      },
      {
        id: 20,
        question: "What is a 401(k) plan?",
        options: [
          "A type of insurance",
          "Employer-sponsored retirement plan",
          "Government welfare program",
          "Stock trading platform"
        ],
        answer: "Employer-sponsored retirement plan"
      },
      {
        id: 21,
        question: "What is the purpose of a will?",
        options: [
          "To avoid taxes",
          "To specify asset distribution after death",
          "To increase credit score",
          "To track daily expenses"
        ],
        answer: "To specify asset distribution after death"
      },
      {
        id: 22,
        question: "Which is NOT a type of insurance?",
        options: [
          "Health insurance",
          "Life insurance",
          "Auto insurance",
          "Savings insurance"
        ],
        answer: "Savings insurance"
      },
      {
        id: 23,
        question: "What is a deductible in insurance?",
        options: [
          "The amount you pay before insurance coverage begins",
          "The total coverage amount",
          "The monthly premium",
          "The insurance company's profit"
        ],
        answer: "The amount you pay before insurance coverage begins"
      },
      {
        id: 24,
        question: "What is net worth?",
        options: [
          "Annual income",
          "Assets minus liabilities",
          "Monthly salary",
          "Investment returns"
        ],
        answer: "Assets minus liabilities"
      },
      {
        id: 25,
        question: "Which is a smart saving strategy?",
        options: [
          "Spending all income",
          "Paying yourself first",
          "Saving only at year-end",
          "Keeping all money in cash"
        ],
        answer: "Paying yourself first"
      },
      {
        id: 26,
        question: "What is a common retirement planning mistake?",
        options: [
          "Starting early",
          "Diversifying investments",
          "Not contributing enough",
          "Monitoring progress regularly"
        ],
        answer: "Not contributing enough"
      },
      {
        id: 27,
        question: "What does FDIC insurance protect?",
        options: [
          "Stock investments",
          "Bank deposits",
          "Real estate",
          "Retirement accounts"
        ],
        answer: "Bank deposits"
      },
      {
        id: 28,
        question: "What is a bear market?",
        options: [
          "Rising stock prices",
          "Falling stock prices",
          "Stable market conditions",
          "New stock issuance"
        ],
        answer: "Falling stock prices"
      },
      {
        id: 29,
        question: "Which is a tax-advantaged account?",
        options: [
          "Regular checking account",
          "IRA (Individual Retirement Account)",
          "Standard brokerage account",
          "Savings account"
        ],
        answer: "IRA (Individual Retirement Account)"
      },
      {
        id: 30,
        question: "What is liquidity?",
        options: [
          "How quickly an asset can be converted to cash",
          "The interest rate on loans",
          "Stock market volatility",
          "Inflation rate"
        ],
        answer: "How quickly an asset can be converted to cash"
      },
      {
        id: 31,
        question: "What is the primary purpose of a budget?",
        options: [
          "To restrict all spending",
          "To track and plan income and expenses",
          "To impress friends",
          "To avoid paying taxes"
        ],
        answer: "To track and plan income and expenses"
      },
      {
        id: 32,
        question: "Which factor does NOT affect credit score?",
        options: [
          "Payment history",
          "Credit utilization",
          "Length of credit history",
          "Marital status"
        ],
        answer: "Marital status"
      },
      {
        id: 33,
        question: "What is dollar-cost averaging?",
        options: [
          "Investing fixed amounts regularly",
          "Buying only expensive stocks",
          "Timing the market perfectly",
          "Investing all money at once"
        ],
        answer: "Investing fixed amounts regularly"
      },
      {
        id: 34,
        question: "What is an ETF?",
        options: [
          "Electronic Transfer Fee",
          "Exchange-Traded Fund",
          "Estimated Tax Formula",
          "Emergency Transfer Fund"
        ],
        answer: "Exchange-Traded Fund"
      },
      {
        id: 35,
        question: "What is the recommended credit utilization ratio?",
        options: [
          "Below 30%",
          "50-70%",
          "80-100%",
          "Above 100%"
        ],
        answer: "Below 30%"
      },
      {
        id: 36,
        question: "What is a Roth IRA?",
        options: [
          "Retirement account with tax-free withdrawals",
          "Type of stock investment",
          "Bank savings account",
          "Insurance policy"
        ],
        answer: "Retirement account with tax-free withdrawals"
      },
      {
        id: 37,
        question: "What is the main risk of keeping money in cash?",
        options: [
          "Losing it to theft",
          "Inflation eroding purchasing power",
          "Bank failure",
          "Tax penalties"
        ],
        answer: "Inflation eroding purchasing power"
      },
      {
        id: 38,
        question: "What is a bond?",
        options: [
          "Loan to a company or government",
          "Type of stock",
          "Bank account",
          "Insurance policy"
        ],
        answer: "Loan to a company or government"
      },
      {
        id: 39,
        question: "What is financial literacy?",
        options: [
          "Ability to speak about money",
          "Knowledge and skills to make informed financial decisions",
          "Understanding only banking",
          "Knowing how to spend money"
        ],
        answer: "Knowledge and skills to make informed financial decisions"
      },
      {
        id: 40,
        question: "What is a common feature of predatory lending?",
        options: [
          "Low interest rates",
          "Transparent terms",
          "Very high interest rates and fees",
          "Government backing"
        ],
        answer: "Very high interest rates and fees"
      },
      {
        id: 41,
        question: "What is asset allocation?",
        options: [
          "Dividing investments among different asset classes",
          "Selling all assets",
          "Buying only one type of investment",
          "Calculating net worth"
        ],
        answer: "Dividing investments among different asset classes"
      },
      {
        id: 42,
        question: "What is the purpose of a credit report?",
        options: [
          "To track spending habits",
          "To show credit history and score",
          "To calculate taxes",
          "To plan retirement"
        ],
        answer: "To show credit history and score"
      },
      {
        id: 43,
        question: "What is a bull market?",
        options: [
          "Falling stock prices",
          "Rising stock prices",
          "Stable market",
          "New company listings"
        ],
        answer: "Rising stock prices"
      },
      {
        id: 44,
        question: "What is the time value of money?",
        options: [
          "Money today is worth more than same amount in future",
          "Money loses value over time",
          "Time affects interest rates only",
          "Money has no time-related value"
        ],
        answer: "Money today is worth more than same amount in future"
      },
      {
        id: 45,
        question: "What is a mortgage?",
        options: [
          "Loan for education",
          "Loan for real estate purchase",
          "Personal loan",
          "Credit card debt"
        ],
        answer: "Loan for real estate purchase"
      },
      {
        id: 46,
        question: "What is a common investment mistake?",
        options: [
          "Diversifying portfolio",
          "Emotional investing",
          "Long-term planning",
          "Regular contributions"
        ],
        answer: "Emotional investing"
      },
      {
        id: 47,
        question: "What is the purpose of an emergency fund?",
        options: [
          "To invest in stocks",
          "To cover unexpected expenses without debt",
          "To pay for vacations",
          "To show financial status"
        ],
        answer: "To cover unexpected expenses without debt"
      },
      {
        id: 48,
        question: "What is a blue-chip stock?",
        options: [
          "Risky new company stock",
          "Well-established, financially sound company",
          "Penny stock",
          "Foreign company stock"
        ],
        answer: "Well-established, financially sound company"
      },
      {
        id: 49,
        question: "What is tax withholding?",
        options: [
          "Illegal tax avoidance",
          "Employer deducting taxes from paycheck",
          "Tax refund process",
          "Investment tax strategy"
        ],
        answer: "Employer deducting taxes from paycheck"
      },
      {
        id: 50,
        question: "What is the first step in financial planning?",
        options: [
          "Investing in stocks",
          "Setting financial goals",
          "Buying insurance",
          "Applying for credit cards"
        ],
        answer: "Setting financial goals"
      }
    ]
  }
},
  {
  id: 3,
  title: "DigitalLiteracy",
  description: "Master essential digital tools, online safety, and productivity software.",
  assessment: {
    questions: [
      {
        id: 1,
        question: "What is two-factor authentication?",
        options: [
          "Using two passwords",
          "Security process with two verification methods",
          "Having two email accounts",
          "Using two different devices"
        ],
        answer: "Security process with two verification methods"
      },
      {
        id: 2,
        question: "Which is a characteristic of strong password?",
        options: [
          "Simple and easy to remember",
          "Contains personal information",
          "Mix of uppercase, lowercase, numbers and symbols",
          "Same as username"
        ],
        answer: "Mix of uppercase, lowercase, numbers and symbols"
      },
      {
        id: 3,
        question: "What is phishing?",
        options: [
          "A fishing game",
          "Legitimate email from bank",
          "Fraudulent attempt to obtain sensitive information",
          "Social media trend"
        ],
        answer: "Fraudulent attempt to obtain sensitive information"
      },
      {
        id: 4,
        question: "Which practice ensures information credibility?",
        options: [
          "Believing all online information",
          "Checking multiple reliable sources",
          "Trusting social media posts",
          "Following viral trends"
        ],
        answer: "Checking multiple reliable sources"
      },
      {
        id: 5,
        question: "What is cloud computing?",
        options: [
          "Weather forecasting technology",
          "Delivery of computing services over internet",
          "Computer hardware manufacturing",
          "Gaming technology"
        ],
        answer: "Delivery of computing services over internet"
      },
      {
        id: 6,
        question: "Which is NOT good email etiquette?",
        options: [
          "Clear subject line",
          "Professional greeting",
          "Using all caps for emphasis",
          "Proper spelling and grammar"
        ],
        answer: "Using all caps for emphasis"
      },
      {
        id: 7,
        question: "What does VPN provide?",
        options: [
          "Faster internet speed",
          "Secure and private internet connection",
          "Free software downloads",
          "Social media access"
        ],
        answer: "Secure and private internet connection"
      },
      {
        id: 8,
        question: "Which tool is best for real-time collaboration?",
        options: [
          "Google Docs",
          "Microsoft Paint",
          "Notepad",
          "Calculator"
        ],
        answer: "Google Docs"
      },
      {
        id: 9,
        question: "What is digital footprint?",
        options: [
          "Shoe size measurement",
          "Trail of data you create online",
          "Social media likes",
          "Email storage space"
        ],
        answer: "Trail of data you create online"
      },
      {
        id: 10,
        question: "Which is an example of malware?",
        options: [
          "Antivirus software",
          "Firewall",
          "Virus or ransomware",
          "Password manager"
        ],
        answer: "Virus or ransomware"
      },
      {
        id: 11,
        question: "What is the primary purpose of a firewall?",
        options: [
          "To block spam emails",
          "To monitor network traffic and block unauthorized access",
          "To speed up internet connection",
          "To store passwords securely"
        ],
        answer: "To monitor network traffic and block unauthorized access"
      },
      {
        id: 12,
        question: "What does HTTPS in a website URL indicate?",
        options: [
          "The website is free",
          "The connection is encrypted and secure",
          "The website has high traffic",
          "The website is government-owned"
        ],
        answer: "The connection is encrypted and secure"
      },
      {
        id: 13,
        question: "Which practice protects against identity theft?",
        options: [
          "Sharing passwords with friends",
          "Using public Wi-Fi for banking",
          "Regularly monitoring financial statements",
          "Posting personal information on social media"
        ],
        answer: "Regularly monitoring financial statements"
      },
      {
        id: 14,
        question: "What is a browser cookie?",
        options: [
          "A type of malware",
          "A small file stored by websites to remember user preferences",
          "A hardware component",
          "A type of antivirus software"
        ],
        answer: "A small file stored by websites to remember user preferences"
      },
      {
        id: 15,
        question: "Which file format is best for preserving document formatting?",
        options: [
          ".txt",
          ".pdf",
          ".docx",
          ".jpg"
        ],
        answer: ".pdf"
      },
      {
        id: 16,
        question: "What is the purpose of Ctrl + Z keyboard shortcut?",
        options: [
          "Undo last action",
          "Copy selected text",
          "Paste copied content",
          "Save document"
        ],
        answer: "Undo last action"
      },
      {
        id: 17,
        question: "What is social engineering?",
        options: [
          "Computer programming",
          "Manipulating people to reveal confidential information",
          "Social media marketing",
          "Engineering software"
        ],
        answer: "Manipulating people to reveal confidential information"
      },
      {
        id: 18,
        question: "Which is a characteristic of secure website?",
        options: [
          "No privacy policy",
          "HTTP protocol only",
          "Padlock icon in address bar",
          "Many pop-up ads"
        ],
        answer: "Padlock icon in address bar"
      },
      {
        id: 19,
        question: "What is data encryption?",
        options: [
          "Deleting data permanently",
          "Converting data into coded form to prevent unauthorized access",
          "Backing up data to cloud",
          "Organizing data in folders"
        ],
        answer: "Converting data into coded form to prevent unauthorized access"
      },
      {
        id: 20,
        question: "Which practice helps prevent ransomware attacks?",
        options: [
          "Opening email attachments from unknown senders",
          "Regularly backing up important files",
          "Using simple passwords",
          "Disabling antivirus software"
        ],
        answer: "Regularly backing up important files"
      },
      {
        id: 21,
        question: "What is the purpose of a spreadsheet?",
        options: [
          "Writing documents",
          "Creating presentations",
          "Organizing and analyzing numerical data",
          "Editing photos"
        ],
        answer: "Organizing and analyzing numerical data"
      },
      {
        id: 22,
        question: "Which is NOT a social media platform?",
        options: [
          "Facebook",
          "Instagram",
          "Microsoft Excel",
          "LinkedIn"
        ],
        answer: "Microsoft Excel"
      },
      {
        id: 23,
        question: "What does CC mean in email?",
        options: [
          "Carbon Copy - sends copy to additional recipients",
          "Confidential Content",
          "Computer Code",
          "Cancel Copy"
        ],
        answer: "Carbon Copy - sends copy to additional recipients"
      },
      {
        id: 24,
        question: "What is open-source software?",
        options: [
          "Software that costs money",
          "Software with source code available for modification",
          "Software that never updates",
          "Software for opening files"
        ],
        answer: "Software with source code available for modification"
      },
      {
        id: 25,
        question: "Which practice maintains digital privacy?",
        options: [
          "Sharing location on all social media posts",
          "Using incognito mode for sensitive browsing",
          "Accepting all cookies without reading",
          "Using same password for all accounts"
        ],
        answer: "Using incognito mode for sensitive browsing"
      },
      {
        id: 26,
        question: "What is a URL?",
        options: [
          "User Registration Link",
          "Uniform Resource Locator - website address",
          "Universal Remote Link",
          "User Rights License"
        ],
        answer: "Uniform Resource Locator - website address"
      },
      {
        id: 27,
        question: "Which tool is used for video conferencing?",
        options: [
          "Microsoft Word",
          "Zoom",
          "Adobe Photoshop",
          "Windows Calculator"
        ],
        answer: "Zoom"
      },
      {
        id: 28,
        question: "What is the purpose of antivirus software?",
        options: [
          "To create viruses",
          "To detect and remove malicious software",
          "To speed up computer",
          "To connect to internet"
        ],
        answer: "To detect and remove malicious software"
      },
      {
        id: 29,
        question: "Which file extension indicates a compressed file?",
        options: [
          ".exe",
          ".zip",
          ".docx",
          ".mp4"
        ],
        answer: ".zip"
      },
      {
        id: 30,
        question: "What is digital citizenship?",
        options: [
          "Being born in digital era",
          "Responsible use of technology and online etiquette",
          "Owning digital devices",
          "Using social media frequently"
        ],
        answer: "Responsible use of technology and online etiquette"
      },
      {
        id: 31,
        question: "What is the purpose of a backup?",
        options: [
          "To delete files permanently",
          "To create copy of data for restoration if needed",
          "To speed up computer performance",
          "To organize files"
        ],
        answer: "To create copy of data for restoration if needed"
      },
      {
        id: 32,
        question: "Which is a safe online shopping practice?",
        options: [
          "Using debit card on unsecured websites",
          "Checking for HTTPS and padlock icon",
          "Saving payment information on public computers",
          "Ignoring return policies"
        ],
        answer: "Checking for HTTPS and padlock icon"
      },
      {
        id: 33,
        question: "What is a strong indicator of fake news?",
        options: [
          "Multiple credible sources confirming information",
          "Lack of author and publication date",
          "Professional website design",
          "Fact-checking by reputable organizations"
        ],
        answer: "Lack of author and publication date"
      },
      {
        id: 34,
        question: "What does CPU stand for?",
        options: [
          "Computer Processing Unit",
          "Central Processing Unit",
          "Central Power Unit",
          "Computer Power Unit"
        ],
        answer: "Central Processing Unit"
      },
      {
        id: 35,
        question: "Which practice protects mobile device security?",
        options: [
          "Disabling automatic updates",
          "Using public Wi-Fi without VPN",
          "Installing apps only from official app stores",
          "Never using passcodes"
        ],
        answer: "Installing apps only from official app stores"
      },
      {
        id: 36,
        question: "What is the purpose of a webinar?",
        options: [
          "Online shopping",
          "Web-based seminar or presentation",
          "Social media chatting",
          "File storage"
        ],
        answer: "Web-based seminar or presentation"
      },
      {
        id: 37,
        question: "Which is an example of productivity software?",
        options: [
          "Video game",
          "Microsoft Office Suite",
          "Social media app",
          "Music streaming service"
        ],
        answer: "Microsoft Office Suite"
      },
      {
        id: 38,
        question: "What is the purpose of a spam filter?",
        options: [
          "To block unwanted emails",
          "To speed up internet",
          "To organize files",
          "To create backups"
        ],
        answer: "To block unwanted emails"
      },
      {
        id: 39,
        question: "What is digital divide?",
        options: [
          "Division between different file types",
          "Gap between those with and without digital access",
          "Difference between internet speeds",
          "Separation of personal and work devices"
        ],
        answer: "Gap between those with and without digital access"
      },
      {
        id: 40,
        question: "Which practice ensures data privacy?",
        options: [
          "Sharing login credentials",
          "Reading privacy policies before agreeing",
          "Using default settings on all apps",
          "Posting sensitive information online"
        ],
        answer: "Reading privacy policies before agreeing"
      },
      {
        id: 41,
        question: "What is the purpose of a spreadsheet formula?",
        options: [
          "To write documents",
          "To perform calculations automatically",
          "To create presentations",
          "To edit photos"
        ],
        answer: "To perform calculations automatically"
      },
      {
        id: 42,
        question: "Which is a characteristic of reliable website?",
        options: [
          "No contact information",
          "Recent publication date",
          "Many spelling errors",
          "Anonymous authorship"
        ],
        answer: "Recent publication date"
      },
      {
        id: 43,
        question: "What is the purpose of a bookmark in web browser?",
        options: [
          "To mark pages in document",
          "To save website links for quick access",
          "To speed up browsing",
          "To block websites"
        ],
        answer: "To save website links for quick access"
      },
      {
        id: 44,
        question: "What is cyberbullying?",
        options: [
          "Online gaming",
          "Using strong passwords",
          "Harassment through digital platforms",
          "Safe internet browsing"
        ],
        answer: "Harassment through digital platforms"
      },
      {
        id: 45,
        question: "Which tool is used for project management?",
        options: [
          "Trello or Asana",
          "Microsoft Paint",
          "Windows Media Player",
          "Adobe Reader"
        ],
        answer: "Trello or Asana"
      },
      {
        id: 46,
        question: "What is the purpose of a read receipt in email?",
        options: [
          "To delete email",
          "To confirm recipient opened email",
          "To encrypt message",
          "To schedule sending"
        ],
        answer: "To confirm recipient opened email"
      },
      {
        id: 47,
        question: "Which practice maintains computer health?",
        options: [
          "Never installing updates",
          "Regularly running antivirus scans",
          "Filling hard drive to capacity",
          "Using multiple antivirus programs"
        ],
        answer: "Regularly running antivirus scans"
      },
      {
        id: 48,
        question: "What is the purpose of a screenshot?",
        options: [
          "To capture what's displayed on screen",
          "To print document",
          "To scan document",
          "To record video"
        ],
        answer: "To capture what's displayed on screen"
      },
      {
        id: 49,
        question: "What is netiquette?",
        options: [
          "Internet speed",
          "Proper behavior and etiquette online",
          "Network hardware",
          "Internet service provider"
        ],
        answer: "Proper behavior and etiquette online"
      },
      {
        id: 50,
        question: "Which is essential for remote work?",
        options: [
          "Reliable internet connection",
          "Gaming computer",
          "Multiple social media accounts",
          "Expensive office furniture"
        ],
        answer: "Reliable internet connection"
      }
    ]
  }
},
{
  id: 4,
  title: "SkillDevelopment",
  description: "Enhance communication, creativity, and leadership skills.",
  assessment: {
    questions: [
      {
        id: 1,
        question: "What is active listening?",
        options: [
          "Hearing without understanding",
          "Fully concentrating and responding to the speaker",
          "Interrupting frequently",
          "Thinking about your response while others speak"
        ],
        answer: "Fully concentrating and responding to the speaker"
      },
      {
        id: 2,
        question: "Which is a characteristic of good leadership?",
        options: [
          "Micromanaging team members",
          "Taking all credit for success",
          "Inspiring and motivating others",
          "Avoiding decision-making"
        ],
        answer: "Inspiring and motivating others"
      },
      {
        id: 3,
        question: "What does SMART goals stand for?",
        options: [
          "Simple, Measurable, Achievable, Realistic, Timely",
          "Specific, Measurable, Achievable, Relevant, Time-bound",
          "Strategic, Manageable, Actionable, Relevant, Timely",
          "Specific, Meaningful, Attainable, Realistic, Trackable"
        ],
        answer: "Specific, Measurable, Achievable, Relevant, Time-bound"
      },
      {
        id: 4,
        question: "Which technique enhances creativity?",
        options: [
          "Sticking to familiar methods",
          "Avoiding new experiences",
          "Brainstorming and mind mapping",
          "Working in isolation always"
        ],
        answer: "Brainstorming and mind mapping"
      },
      {
        id: 5,
        question: "What is emotional intelligence?",
        options: [
          "Only being emotional",
          "Understanding and managing own and others' emotions",
          "Ignoring emotions at workplace",
          "Being highly sensitive"
        ],
        answer: "Understanding and managing own and others' emotions"
      },
      {
        id: 6,
        question: "Which is an effective time management technique?",
        options: [
          "Multitasking constantly",
          "Pomodoro technique",
          "Working without breaks",
          "Responding to emails immediately always"
        ],
        answer: "Pomodoro technique"
      },
      {
        id: 7,
        question: "What is constructive feedback?",
        options: [
          "Only pointing out mistakes",
          "Specific, actionable suggestions for improvement",
          "General criticism",
          "Comparing with others negatively"
        ],
        answer: "Specific, actionable suggestions for improvement"
      },
      {
        id: 8,
        question: "Which is a critical thinking skill?",
        options: [
          "Accepting all information at face value",
          "Analyzing information objectively",
          "Following popular opinion",
          "Avoiding questions"
        ],
        answer: "Analyzing information objectively"
      },
      {
        id: 9,
        question: "What does delegation involve?",
        options: [
          "Doing everything yourself",
          "Assigning tasks with authority and responsibility",
          "Micromanaging team members",
          "Avoiding team input"
        ],
        answer: "Assigning tasks with authority and responsibility"
      },
      {
        id: 10,
        question: "Which communication style is most effective?",
        options: [
          "Aggressive",
          "Passive",
          "Assertive",
          "Passive-aggressive"
        ],
        answer: "Assertive"
      },
      {
        id: 11,
        question: "What is the primary purpose of networking?",
        options: [
          "To get free meals",
          "To build professional relationships for mutual benefit",
          "To show off achievements",
          "To avoid working"
        ],
        answer: "To build professional relationships for mutual benefit"
      },
      {
        id: 12,
        question: "Which is a key element of effective teamwork?",
        options: [
          "Individual competition",
          "Clear communication and trust",
          "Working in silos",
          "Blaming others for mistakes"
        ],
        answer: "Clear communication and trust"
      },
      {
        id: 13,
        question: "What is conflict resolution?",
        options: [
          "Avoiding conflicts completely",
          "Finding peaceful solution to disagreements",
          "Letting conflicts escalate",
          "Taking sides in arguments"
        ],
        answer: "Finding peaceful solution to disagreements"
      },
      {
        id: 14,
        question: "Which practice improves public speaking?",
        options: [
          "Avoiding eye contact",
          "Reading slides word-for-word",
          "Practice and preparation",
          "Speaking very fast"
        ],
        answer: "Practice and preparation"
      },
      {
        id: 15,
        question: "What is growth mindset?",
        options: [
          "Believing abilities are fixed",
          "Believing abilities can be developed through effort",
          "Avoiding challenges",
          "Giving up easily"
        ],
        answer: "Believing abilities can be developed through effort"
      },
      {
        id: 16,
        question: "Which is a characteristic of effective negotiation?",
        options: [
          "Win-lose approach",
          "Active listening and compromise",
          "Refusing to budge",
          "Making threats"
        ],
        answer: "Active listening and compromise"
      },
      {
        id: 17,
        question: "What is the purpose of a SWOT analysis?",
        options: [
          "To evaluate personal Strengths, Weaknesses, Opportunities, Threats",
          "To calculate salary",
          "To design websites",
          "To manage time only"
        ],
        answer: "To evaluate personal Strengths, Weaknesses, Opportunities, Threats"
      },
      {
        id: 18,
        question: "Which technique enhances problem-solving?",
        options: [
          "Jumping to conclusions",
          "Root cause analysis",
          "Ignoring the problem",
          "Blaming others"
        ],
        answer: "Root cause analysis"
      },
      {
        id: 19,
        question: "What is empathy in communication?",
        options: [
          "Feeling sorry for others",
          "Understanding and sharing others' feelings",
          "Agreeing with everyone",
          "Being emotional"
        ],
        answer: "Understanding and sharing others' feelings"
      },
      {
        id: 20,
        question: "Which is a sign of good time management?",
        options: [
          "Constant rushing",
          "Meeting deadlines consistently",
          "Working overtime regularly",
          "Multitasking excessively"
        ],
        answer: "Meeting deadlines consistently"
      },
      {
        id: 21,
        question: "What is the primary benefit of continuous learning?",
        options: [
          "Staying relevant in changing environments",
          "Impressing others",
          "Avoiding promotions",
          "Working harder"
        ],
        answer: "Staying relevant in changing environments"
      },
      {
        id: 22,
        question: "Which is a characteristic of effective feedback?",
        options: [
          "Given only annually",
          "Timely and specific",
          "Focused only on negatives",
          "Given in public always"
        ],
        answer: "Timely and specific"
      },
      {
        id: 23,
        question: "What is the purpose of a mentor?",
        options: [
          "To do your work",
          "To provide guidance and share experience",
          "To criticize constantly",
          "To replace managers"
        ],
        answer: "To provide guidance and share experience"
      },
      {
        id: 24,
        question: "Which practice enhances adaptability?",
        options: [
          "Resisting change",
          "Embracing new challenges",
          "Sticking to routines only",
          "Avoiding learning new skills"
        ],
        answer: "Embracing new challenges"
      },
      {
        id: 25,
        question: "What is strategic thinking?",
        options: [
          "Focusing only on daily tasks",
          "Long-term planning and big-picture perspective",
          "Reacting to situations",
          "Following others' plans"
        ],
        answer: "Long-term planning and big-picture perspective"
      },
      {
        id: 26,
        question: "Which is a key leadership quality?",
        options: [
          "Taking all decisions alone",
          "Accountability and responsibility",
          "Blaming team for failures",
          "Avoiding difficult conversations"
        ],
        answer: "Accountability and responsibility"
      },
      {
        id: 27,
        question: "What is the primary purpose of body language?",
        options: [
          "To exercise",
          "To communicate non-verbally",
          "To look professional",
          "To imitate others"
        ],
        answer: "To communicate non-verbally"
      },
      {
        id: 28,
        question: "Which technique improves decision-making?",
        options: [
          "Making snap decisions",
          "Pros and cons analysis",
          "Following gut feeling only",
          "Avoiding responsibility"
        ],
        answer: "Pros and cons analysis"
      },
      {
        id: 29,
        question: "What is resilience?",
        options: [
          "Avoiding challenges",
          "Bouncing back from setbacks",
          "Never failing",
          "Being rigid"
        ],
        answer: "Bouncing back from setbacks"
      },
      {
        id: 30,
        question: "Which practice enhances innovation?",
        options: [
          "Following rules strictly",
          "Encouraging new ideas and experimentation",
          "Criticizing failures",
          "Maintaining status quo"
        ],
        answer: "Encouraging new ideas and experimentation"
      },
      {
        id: 31,
        question: "What is the primary purpose of professional development?",
        options: [
          "To get promotions only",
          "To enhance skills and career growth",
          "To impress colleagues",
          "To avoid current work"
        ],
        answer: "To enhance skills and career growth"
      },
      {
        id: 32,
        question: "Which is a characteristic of effective meetings?",
        options: [
          "No agenda",
          "Clear objectives and time management",
          "Dominating speakers",
          "No follow-up actions"
        ],
        answer: "Clear objectives and time management"
      },
      {
        id: 33,
        question: "What is cultural intelligence?",
        options: [
          "Speaking multiple languages",
          "Working effectively across cultures",
          "Traveling frequently",
          "Knowing world history"
        ],
        answer: "Working effectively across cultures"
      },
      {
        id: 34,
        question: "Which practice improves writing skills?",
        options: [
          "Using complex words always",
          "Clear and concise communication",
          "Long sentences",
          "Avoiding proofreading"
        ],
        answer: "Clear and concise communication"
      },
      {
        id: 35,
        question: "What is the primary benefit of self-awareness?",
        options: [
          "To criticize others",
          "Understanding own strengths and weaknesses",
          "Avoiding feedback",
          "Being overconfident"
        ],
        answer: "Understanding own strengths and weaknesses"
      },
      {
        id: 36,
        question: "Which is a characteristic of effective persuasion?",
        options: [
          "Using force",
          "Building logical arguments and rapport",
          "Making demands",
          "Ignoring objections"
        ],
        answer: "Building logical arguments and rapport"
      },
      {
        id: 37,
        question: "What is the purpose of a personal development plan?",
        options: [
          "To track daily expenses",
          "To set and achieve career goals",
          "To compare with others",
          "To avoid work responsibilities"
        ],
        answer: "To set and achieve career goals"
      },
      {
        id: 38,
        question: "Which practice enhances motivation?",
        options: [
          "Setting meaningful goals",
          "Focusing only on failures",
          "Comparing with others negatively",
          "Avoiding challenges"
        ],
        answer: "Setting meaningful goals"
      },
      {
        id: 39,
        question: "What is collaborative problem-solving?",
        options: [
          "Working together to find solutions",
          "Solving alone",
          "Letting others solve it",
          "Competing for best solution"
        ],
        answer: "Working together to find solutions"
      },
      {
        id: 40,
        question: "Which is a key element of emotional intelligence?",
        options: [
          "Ignoring emotions",
          "Self-regulation and empathy",
          "Being overly emotional",
          "Suppressing feelings"
        ],
        answer: "Self-regulation and empathy"
      },
      {
        id: 41,
        question: "What is the primary purpose of storytelling in communication?",
        options: [
          "To entertain only",
          "To make messages memorable and relatable",
          "To show off experiences",
          "To waste time"
        ],
        answer: "To make messages memorable and relatable"
      },
      {
        id: 42,
        question: "Which practice improves concentration?",
        options: [
          "Constant multitasking",
          "Checking phone frequently",
          "Working in noisy environments",
          "Minimizing distractions",
        ],
        answer: "Minimizing distractions"
      },
      {
        id: 43,
        question: "What is the primary benefit of mentorship?",
        options: [
          "Learning from experienced guidance",
          "Faster career advancement",
          "Getting promotions easily",
          "Avoiding mistakes completely"
        ],
        answer: "Learning from experienced guidance"
      },
      {
        id: 44,
        question: "Which is a characteristic of effective coaching?",
        options: [
          "Asking powerful questions to facilitate learning",
          "Giving direct solutions",
          "Criticizing performance",
          "Doing the work for others"
        ],
        answer: "Asking powerful questions to facilitate learning"
      },
      {
        id: 45,
        question: "What is the purpose of reflective practice?",
        options: [
          "To blame others",
          "To learn from experiences and improve",
          "To dwell on past mistakes",
          "To avoid future planning"
        ],
        answer: "To learn from experiences and improve"
      },
      {
        id: 46,
        question: "Which technique enhances memory retention?",
        options: [
          "Cramming information",
          "Spaced repetition and association",
          "Reading once only",
          "Multitasking while learning"
        ],
        answer: "Spaced repetition and association"
      },
      {
        id: 47,
        question: "What is the primary purpose of professional networking?",
        options: [
          "To build valuable career connections",
          "To socialize",
          "To find dates",
          "To complain about work"
        ],
        answer: "To build valuable career connections"
      },
      {
        id: 48,
        question: "Which practice improves work-life balance?",
        options: [
          "Setting clear boundaries",
          "Working overtime regularly",
          "Checking work emails constantly",
          "Taking work on vacation"
        ],
        answer: "Setting clear boundaries"
      },
      {
        id: 49,
        question: "What is the primary benefit of receiving feedback?",
        options: [
          "To identify areas for improvement",
          "To feel criticized",
          "To compare with others",
          "To justify current performance"
        ],
        answer: "To identify areas for improvement"
      },
      {
        id: 50,
        question: "Which is a characteristic of lifelong learning?",
        options: [
          "Stopping education after degree",
          "Learning only for promotions",
          "Continuously acquiring new knowledge and skills",
          "Avoiding new technologies"
        ],
        answer: "Continuously acquiring new knowledge and skills"
      }
    ]
  }
},
{
  id: 5,
  title: "CommunityDevelopment",
  description: "Explore ways to contribute to society through sustainable action.",
  assessment: {
    questions: [
      {
        id: 1,
        question: "What is sustainable development?",
        options: [
          "Development that meets present needs without compromising future",
          "Rapid economic growth only",
          "Environmental protection only",
          "Social welfare programs only"
        ],
        answer: "Development that meets present needs without compromising future"
      },
      {
        id: 2,
        question: "What is social entrepreneurship?",
        options: [
          "Only profit-making business",
          "Using business principles to solve social problems",
          "Charity work only",
          "Government welfare programs"
        ],
        answer: "Using business principles to solve social problems"
      },
      {
        id: 3,
        question: "Which is key in community needs assessment?",
        options: [
          "Assuming community needs",
          "Community participation and input",
          "External expert opinion only",
          "Government directives only"
        ],
        answer: "Community participation and input"
      },
      {
        id: 4,
        question: "What does volunteer retention involve?",
        options: [
          "Only recruitment",
          "Recognition, training and meaningful engagement",
          "Financial compensation only",
          "Strict supervision only"
        ],
        answer: "Recognition, training and meaningful engagement"
      },
      {
        id: 5,
        question: "Which is a sustainable practice?",
        options: [
          "Wasteful resource use",
          "Renewable energy adoption",
          "Single-use plastics",
          "Deforestation"
        ],
        answer: "Renewable energy adoption"
      },
      {
        id: 6,
        question: "What is community mobilization?",
        options: [
          "Forcing community to act",
          "Organizing community for collective action",
          "Individual action only",
          "Government enforcement"
        ],
        answer: "Organizing community for collective action"
      },
      {
        id: 7,
        question: "Which is important in cross-cultural community work?",
        options: [
          "Cultural sensitivity and respect",
          "Imposing external values",
          "Ignoring cultural differences",
          "Working only with similar communities"
        ],
        answer: "Cultural sensitivity and respect"
      },
      {
        id: 8,
        question: "What is asset-based community development?",
        options: [
          "Focusing only on community problems",
          "Building on community strengths and assets",
          "External resource dependency",
          "Government-led initiatives only"
        ],
        answer: "Building on community strengths and assets"
      },
      {
        id: 9,
        question: "Which sustainable development goal focuses on quality education?",
        options: [
          "SDG 3",
          "SDG 4",
          "SDG 5",
          "SDG 6"
        ],
        answer: "SDG 4"
      },
      {
        id: 10,
        question: "What is participatory planning?",
        options: [
          "Expert-only decision making",
          "Involving community members in planning process",
          "Government planning without consultation",
          "Individual planning"
        ],
        answer: "Involving community members in planning process"
      },
      {
        id: 11,
        question: "What is the primary goal of community development?",
        options: [
          "Building more houses",
          "Empowering communities to address their own needs",
          "Increasing government control",
          "Creating dependency on external aid"
        ],
        answer: "Empowering communities to address their own needs"
      },
      {
        id: 12,
        question: "Which practice promotes environmental sustainability?",
        options: [
          "Using disposable products",
          "Implementing recycling programs",
          "Burning waste openly",
          "Clearing forests for agriculture"
        ],
        answer: "Implementing recycling programs"
      },
      {
        id: 13,
        question: "What is social capital?",
        options: [
          "Money for social programs",
          "Networks and relationships that enable collective action",
          "Government social funds",
          "Charity donations"
        ],
        answer: "Networks and relationships that enable collective action"
      },
      {
        id: 14,
        question: "Which approach builds community resilience?",
        options: [
          "Dependency on external aid",
          "Developing local skills and resources",
          "Ignoring climate change",
          "Focusing only on immediate needs"
        ],
        answer: "Developing local skills and resources"
      },
      {
        id: 15,
        question: "What is community-based monitoring?",
        options: [
          "Government surveillance",
          "Community members tracking project progress and outcomes",
          "External audits only",
          "Corporate oversight"
        ],
        answer: "Community members tracking project progress and outcomes"
      },
      {
        id: 16,
        question: "Which is a principle of sustainable agriculture?",
        options: [
          "Heavy chemical pesticide use",
          "Crop rotation and soil conservation",
          "Monoculture farming",
          "Excessive water consumption"
        ],
        answer: "Crop rotation and soil conservation"
      },
      {
        id: 17,
        question: "What is the purpose of community mapping?",
        options: [
          "To sell land",
          "To identify community resources and needs visually",
          "For government taxation",
          "To restrict community access"
        ],
        answer: "To identify community resources and needs visually"
      },
      {
        id: 18,
        question: "Which practice ensures project sustainability?",
        options: [
          "Complete external funding",
          "Community ownership and capacity building",
          "Short-term interventions",
          "Dependency on donors"
        ],
        answer: "Community ownership and capacity building"
      },
      {
        id: 19,
        question: "What is social inclusion in community development?",
        options: [
          "Working with selected groups only",
          "Ensuring all community members can participate",
          "Excluding minority voices",
          "Following traditional hierarchies only"
        ],
        answer: "Ensuring all community members can participate"
      },
      {
        id: 20,
        question: "Which SDG focuses on clean water and sanitation?",
        options: [
          "SDG 5",
          "SDG 6",
          "SDG 7",
          "SDG 8"
        ],
        answer: "SDG 6"
      },
      {
        id: 21,
        question: "What is community-led development?",
        options: [
          "Development directed by external agencies",
          "Communities driving their own development process",
          "Government-imposed programs",
          "Corporate social responsibility projects"
        ],
        answer: "Communities driving their own development process"
      },
      {
        id: 22,
        question: "Which practice promotes gender equality in communities?",
        options: [
          "Excluding women from decision-making",
          "Ensuring equal participation and opportunities",
          "Following traditional gender roles only",
          "Prioritizing men's needs"
        ],
        answer: "Ensuring equal participation and opportunities"
      },
      {
        id: 23,
        question: "What is the purpose of community dialogues?",
        options: [
          "To impose decisions",
          "To facilitate open discussion and consensus building",
          "To create conflict",
          "To avoid community input"
        ],
        answer: "To facilitate open discussion and consensus building"
      },
      {
        id: 24,
        question: "Which is a characteristic of effective community leadership?",
        options: [
          "Making all decisions alone",
          "Empowering others and facilitating participation",
          "Controlling information",
          "Maintaining dependency"
        ],
        answer: "Empowering others and facilitating participation"
      },
      {
        id: 25,
        question: "What is environmental justice?",
        options: [
          "Only protecting wealthy areas",
          "Fair treatment regarding environmental benefits and burdens",
          "Ignoring pollution in poor communities",
          "Focusing only on natural areas"
        ],
        answer: "Fair treatment regarding environmental benefits and burdens"
      },
      {
        id: 26,
        question: "Which approach builds community capacity?",
        options: [
          "Doing everything for the community",
          "Training and skill development for self-reliance",
          "Creating dependency",
          "Importing external experts only"
        ],
        answer: "Training and skill development for self-reliance"
      },
      {
        id: 27,
        question: "What is participatory budgeting?",
        options: [
          "Government deciding budgets alone",
          "Community members participating in budget decisions",
          "Corporate control of funds",
          "No budget planning"
        ],
        answer: "Community members participating in budget decisions"
      },
      {
        id: 28,
        question: "Which practice supports sustainable livelihoods?",
        options: [
          "Dependence on single income source",
          "Diversified income generation",
          "Exploiting natural resources unsustainably",
          "Ignoring local skills"
        ],
        answer: "Diversified income generation"
      },
      {
        id: 29,
        question: "What is the purpose of community-based organizations?",
        options: [
          "To replace government services",
          "To address local needs through collective action",
          "To create profit for members only",
          "To compete with other communities"
        ],
        answer: "To address local needs through collective action"
      },
      {
        id: 30,
        question: "Which SDG focuses on sustainable cities and communities?",
        options: [
          "SDG 10",
          "SDG 11",
          "SDG 12",
          "SDG 13"
        ],
        answer: "SDG 11"
      },
      {
        id: 31,
        question: "What is community resilience?",
        options: [
          "Resistance to all change",
          "Ability to adapt and recover from challenges",
          "Dependence on external help",
          "Ignoring potential risks"
        ],
        answer: "Ability to adapt and recover from challenges"
      },
      {
        id: 32,
        question: "Which practice promotes food security?",
        options: [
          "Dependence on food imports",
          "Supporting local food production and distribution",
          "Monoculture farming only",
          "Food waste"
        ],
        answer: "Supporting local food production and distribution"
      },
      {
        id: 33,
        question: "What is the role of youth in community development?",
        options: [
          "No significant role",
          "Active participation and leadership",
          "Following elders only",
          "Waiting until adulthood"
        ],
        answer: "Active participation and leadership"
      },
      {
        id: 34,
        question: "Which approach ensures cultural preservation?",
        options: [
          "Ignoring traditional knowledge",
          "Documenting and valuing local culture",
          "Imposing external cultural values",
          "Focusing only on modernization"
        ],
        answer: "Documenting and valuing local culture"
      },
      {
        id: 35,
        question: "What is community-based disaster risk reduction?",
        options: [
          "Waiting for government rescue",
          "Community-led preparedness and response planning",
          "Ignoring climate risks",
          "Dependence on external agencies only"
        ],
        answer: "Community-led preparedness and response planning"
      },
      {
        id: 36,
        question: "Which practice supports sustainable tourism?",
        options: [
          "Mass tourism without regulation",
          "Community-benefiting and environmentally responsible tourism",
          "Destroying natural habitats",
          "Exploiting local culture"
        ],
        answer: "Community-benefiting and environmentally responsible tourism"
      },
      {
        id: 37,
        question: "What is the purpose of community health programs?",
        options: [
          "To replace hospitals",
          "To promote health and prevent disease locally",
          "To create medical dependency",
          "To focus only on treatment"
        ],
        answer: "To promote health and prevent disease locally"
      },
      {
        id: 38,
        question: "Which approach promotes inclusive education?",
        options: [
          "Educating only wealthy children",
          "Ensuring access for all community members",
          "Following traditional education only",
          "Excluding children with disabilities"
        ],
        answer: "Ensuring access for all community members"
      },
      {
        id: 39,
        question: "What is community economic development?",
        options: [
          "Only attracting large corporations",
          "Building local economy through community initiatives",
          "Dependence on external investment only",
          "Ignoring local businesses"
        ],
        answer: "Building local economy through community initiatives"
      },
      {
        id: 40,
        question: "Which SDG focuses on climate action?",
        options: [
          "SDG 12",
          "SDG 13",
          "SDG 14",
          "SDG 15"
        ],
        answer: "SDG 13"
      },
      {
        id: 41,
        question: "What is the purpose of community gardens?",
        options: [
          "Only for decoration",
          "To promote food security and community bonding",
          "To increase property values only",
          "To replace farms"
        ],
        answer: "To promote food security and community bonding"
      },
      {
        id: 42,
        question: "Which practice supports waste management?",
        options: [
          "Open dumping",
          "Reduce, reuse, recycle approach",
          "Burning plastic waste",
          "Ignoring waste separation"
        ],
        answer: "Reduce, reuse, recycle approach"
      },
      {
        id: 43,
        question: "What is community-based conservation?",
        options: [
          "Government-only protection",
          "Local community involvement in natural resource management",
          "Complete restriction on resource use",
          "Ignoring traditional knowledge"
        ],
        answer: "Local community involvement in natural resource management"
      },
      {
        id: 44,
        question: "Which approach builds social cohesion?",
        options: [
          "Creating divisions",
          "Promoting intergroup activities and dialogue",
          "Encouraging competition only",
          "Ignoring conflicts"
        ],
        answer: "Promoting intergroup activities and dialogue"
      },
      {
        id: 45,
        question: "What is the role of elders in community development?",
        options: [
          "No role in modern development",
          "Sharing wisdom and guiding younger generations",
          "Making all decisions alone",
          "Resisting all changes"
        ],
        answer: "Sharing wisdom and guiding younger generations"
      },
      {
        id: 46,
        question: "Which practice promotes sustainable water management?",
        options: [
          "Wasteful water use",
          "Rainwater harvesting and conservation",
          "Polluting water sources",
          "Over-extracting groundwater"
        ],
        answer: "Rainwater harvesting and conservation"
      },
      {
        id: 47,
        question: "What is community-based research?",
        options: [
          "Research done only by academics",
          "Research involving community members as partners",
          "Research without community knowledge",
          "Research for corporate profit only"
        ],
        answer: "Research involving community members as partners"
      },
      {
        id: 48,
        question: "Which approach ensures project accountability?",
        options: [
          "No transparency",
          "Regular community reporting and feedback",
          "Hiding project failures",
          "External audits only"
        ],
        answer: "Regular community reporting and feedback"
      },
      {
        id: 49,
        question: "What is the purpose of community celebrations?",
        options: [
          "Only for entertainment",
          "To strengthen social bonds and cultural identity",
          "To exclude outsiders",
          "To create division"
        ],
        answer: "To strengthen social bonds and cultural identity"
      },
      {
        id: 50,
        question: "Which SDG focuses on partnerships for the goals?",
        options: [
          "SDG 16",
          "SDG 17",
          "SDG 18",
          "SDG 19"
        ],
        answer: "SDG 17"
      }
    ]
  }
},
{
  "id": 6,
  "title": "PoliticsandGovernment",
  "description": "Understand how government works and your role as a responsible citizen.",
  "assessment": {
    "questions": [
      {
        "id": 1,
        "question": "How many fundamental rights are in Indian Constitution?",
        "options": [
          "Five",
          "Six",
          "Seven",
          "Eight"
        ],
        "answer": "Six"
      },
      {
        "id": 2,
        "question": "What is the minimum voting age in India?",
        "options": [
          "16 years",
          "18 years",
          "21 years",
          "25 years"
        ],
        "answer": "18 years"
      },
      {
        "id": 3,
        "question": "Which article abolishes untouchability?",
        "options": [
          "Article 14",
          "Article 17",
          "Article 21",
          "Article 32"
        ],
        "answer": "Article 17"
      },
      {
        "id": 4,
        "question": "What does RTI stand for?",
        "options": [
          "Right to Information",
          "Right to Independence",
          "Right to Internet",
          "Right to Investigation"
        ],
        "answer": "Right to Information"
      },
      {
        "id": 5,
        "question": "Who is the constitutional head of India?",
        "options": [
          "Prime Minister",
          "President",
          "Chief Justice",
          "Speaker of Lok Sabha"
        ],
        "answer": "President"
      },
      {
        "id": 6,
        "question": "What is the full form of MLA?",
        "options": [
          "Member of Legislative Assembly",
          "Member of Legal Affairs",
          "Member of Local Administration",
          "Member of Land Authority"
        ],
        "answer": "Member of Legislative Assembly"
      },
      {
        "id": 7,
        "question": "Which body conducts elections in India?",
        "options": [
          "Supreme Court",
          "Election Commission of India",
          "President's Office",
          "Parliament"
        ],
        "answer": "Election Commission of India"
      },
      {
        "id": 8,
        "question": "What is the term of Lok Sabha?",
        "options": [
          "4 years",
          "5 years",
          "6 years",
          "7 years"
        ],
        "answer": "5 years"
      },
      {
        "id": 9,
        "question": "Which fundamental right protects religious freedom?",
        "options": [
          "Right to Equality",
          "Right to Freedom of Religion",
          "Right to Education",
          "Right to Constitutional Remedies"
        ],
        "answer": "Right to Freedom of Religion"
      },
      {
        "id": 10,
        "question": "What is Panchayati Raj system?",
        "options": [
          "Urban local government",
          "Rural local self-government",
          "State government",
          "Central government"
        ],
        "answer": "Rural local self-government"
      },
      {
        "id": 11,
        "question": "Who is the current Prime Minister of India?",
        "options": [
          "Narendra Modi",
          "Rahul Gandhi",
          "Amit Shah",
          "Manmohan Singh"
        ],
        "answer": "Narendra Modi"
      },
      {
        "id": 12,
        "question": "How many houses are there in the Indian Parliament?",
        "options": [
          "One",
          "Two",
          "Three",
          "Four"
        ],
        "answer": "Two"
      },
      {
        "id": 13,
        "question": "Which is the highest court in India?",
        "options": [
          "High Court",
          "Supreme Court",
          "District Court",
          "Session Court"
        ],
        "answer": "Supreme Court"
      },
      {
        "id": 14,
        "question": "What is the duration of the President's term in India?",
        "options": [
          "4 years",
          "5 years",
          "6 years",
          "7 years"
        ],
        "answer": "5 years"
      },
      {
        "id": 15,
        "question": "Which article provides the Right to Education?",
        "options": [
          "Article 21",
          "Article 21A",
          "Article 22",
          "Article 23"
        ],
        "answer": "Article 21A"
      },
      {
        "id": 16,
        "question": "Who appoints the Chief Justice of India?",
        "options": [
          "Prime Minister",
          "President",
          "Law Minister",
          "Parliament"
        ],
        "answer": "President"
      },
      {
        "id": 17,
        "question": "What is the full form of MP?",
        "options": [
          "Member of Parliament",
          "Member of Police",
          "Member of Panel",
          "Member of Public"
        ],
        "answer": "Member of Parliament"
      },
      {
        "id": 18,
        "question": "Which amendment introduced the Anti-Defection Law?",
        "options": [
          "52nd Amendment",
          "42nd Amendment",
          "44th Amendment",
          "73rd Amendment"
        ],
        "answer": "52nd Amendment"
      },
      {
        "id": 19,
        "question": "Who is the head of the Union Cabinet?",
        "options": [
          "President",
          "Vice President",
          "Prime Minister",
          "Home Minister"
        ],
        "answer": "Prime Minister"
      },
      {
        "id": 20,
        "question": "Which state has the largest number of Lok Sabha seats?",
        "options": [
          "Maharashtra",
          "Uttar Pradesh",
          "Bihar",
          "West Bengal"
        ],
        "answer": "Uttar Pradesh"
      },
      {
        "id": 21,
        "question": "What is the minimum age to become President of India?",
        "options": [
          "30 years",
          "35 years",
          "40 years",
          "45 years"
        ],
        "answer": "35 years"
      },
      {
        "id": 22,
        "question": "Which fundamental duty was added by the 86th Amendment?",
        "options": [
          "To protect environment",
          "To vote in elections",
          "To pay taxes",
          "To provide education to child"
        ],
        "answer": "To provide education to child"
      },
      {
        "id": 23,
        "question": "Who can declare emergency in India?",
        "options": [
          "Prime Minister",
          "President",
          "Chief Justice",
          "Parliament"
        ],
        "answer": "President"
      },
      {
        "id": 24,
        "question": "What is the strength of Lok Sabha?",
        "options": [
          "543",
          "545",
          "547",
          "550"
        ],
        "answer": "543"
      },
      {
        "id": 25,
        "question": "Which article deals with the impeachment of President?",
        "options": [
          "Article 61",
          "Article 71",
          "Article 81",
          "Article 91"
        ],
        "answer": "Article 61"
      },
      {
        "id": 26,
        "question": "Who is the ex-officio Chairman of Rajya Sabha?",
        "options": [
          "Prime Minister",
          "President",
          "Vice President",
          "Speaker"
        ],
        "answer": "Vice President"
      },
      {
        "id": 27,
        "question": "What is the tenure of a Rajya Sabha member?",
        "options": [
          "4 years",
          "5 years",
          "6 years",
          "7 years"
        ],
        "answer": "6 years"
      },
      {
        "id": 28,
        "question": "Which body recommends the distribution of taxes between Centre and States?",
        "options": [
          "Planning Commission",
          "Finance Commission",
          "RBI",
          "NDC"
        ],
        "answer": "Finance Commission"
      },
      {
        "id": 29,
        "question": "Who is the guardian of Fundamental Rights?",
        "options": [
          "President",
          "Prime Minister",
          "Supreme Court",
          "Parliament"
        ],
        "answer": "Supreme Court"
      },
      {
        "id": 30,
        "question": "Which article provides for the establishment of Supreme Court?",
        "options": [
          "Article 124",
          "Article 132",
          "Article 143",
          "Article 148"
        ],
        "answer": "Article 124"
      },
      {
        "id": 31,
        "question": "What is the full form of UAPA?",
        "options": [
          "Unlawful Activities Prevention Act",
          "United Anti-Piracy Act",
          "Urban Area Planning Act",
          "Universal Aid Provision Act"
        ],
        "answer": "Unlawful Activities Prevention Act"
      },
      {
        "id": 32,
        "question": "Which schedule contains the languages recognized by Constitution?",
        "options": [
          "6th Schedule",
          "7th Schedule",
          "8th Schedule",
          "9th Schedule"
        ],
        "answer": "8th Schedule"
      },
      {
        "id": 33,
        "question": "Who administers the oath to the President?",
        "options": [
          "Prime Minister",
          "Vice President",
          "Chief Justice",
          "Speaker"
        ],
        "answer": "Chief Justice"
      },
      {
        "id": 34,
        "question": "Which constitutional amendment introduced GST?",
        "options": [
          "99th Amendment",
          "100th Amendment",
          "101st Amendment",
          "102nd Amendment"
        ],
        "answer": "101st Amendment"
      },
      {
        "id": 35,
        "question": "What is the maximum strength of Rajya Sabha?",
        "options": [
          "240",
          "245",
          "250",
          "252"
        ],
        "answer": "250"
      },
      {
        "id": 36,
        "question": "Which article deals with the right to constitutional remedies?",
        "options": [
          "Article 30",
          "Article 31",
          "Article 32",
          "Article 33"
        ],
        "answer": "Article 32"
      },
      {
        "id": 37,
        "question": "Who is the head of a state government?",
        "options": [
          "Governor",
          "Chief Minister",
          "Chief Justice",
          "Speaker"
        ],
        "answer": "Chief Minister"
      },
      {
        "id": 38,
        "question": "Which commission was established for backward classes?",
        "options": [
          "Sarkaria Commission",
          "Mandal Commission",
          "Shah Commission",
          "Kothari Commission"
        ],
        "answer": "Mandal Commission"
      },
      {
        "id": 39,
        "question": "What is the minimum age to become a Rajya Sabha member?",
        "options": [
          "25 years",
          "30 years",
          "35 years",
          "40 years"
        ],
        "answer": "30 years"
      },
      {
        "id": 40,
        "question": "Which article deals with the appointment of Prime Minister?",
        "options": [
          "Article 74",
          "Article 75",
          "Article 76",
          "Article 77"
        ],
        "answer": "Article 75"
      },
      {
        "id": 41,
        "question": "What is the full form of NHRC?",
        "options": [
          "National Human Rights Commission",
          "National Health Research Centre",
          "National Highway Regulatory Committee",
          "National Housing Reconstruction Corporation"
        ],
        "answer": "National Human Rights Commission"
      },
      {
        "id": 42,
        "question": "Which article provides for the formation of new states?",
        "options": [
          "Article 1",
          "Article 2",
          "Article 3",
          "Article 4"
        ],
        "answer": "Article 3"
      },
      {
        "id": 43,
        "question": "Who is the commander-in-chief of Indian Armed Forces?",
        "options": [
          "Prime Minister",
          "Defence Minister",
          "President",
          "Chief of Army Staff"
        ],
        "answer": "President"
      },
      {
        "id": 44,
        "question": "Which constitutional body audits government accounts?",
        "options": [
          "CAG",
          "CBI",
          "NITI Aayog",
          "Finance Ministry"
        ],
        "answer": "CAG"
      },
      {
        "id": 45,
        "question": "What is the term of a Supreme Court judge?",
        "options": [
          "Until 62 years",
          "Until 65 years",
          "Until 70 years",
          "Lifetime appointment"
        ],
        "answer": "Until 65 years"
      },
      {
        "id": 46,
        "question": "Which article deals with the Governor's power to pardon?",
        "options": [
          "Article 151",
          "Article 161",
          "Article 171",
          "Article 181"
        ],
        "answer": "Article 161"
      },
      {
        "id": 47,
        "question": "What is the full form of MPLAD?",
        "options": [
          "Member of Parliament Local Area Development",
          "Member of Parliament Legislative Assistance Division",
          "Member of Parliament Legal Aid Department",
          "Member of Parliament Local Administration Directorate"
        ],
        "answer": "Member of Parliament Local Area Development"
      },
      {
        "id": 48,
        "question": "Which constitutional amendment lowered voting age from 21 to 18?",
        "options": [
          "61st Amendment",
          "62nd Amendment",
          "63rd Amendment",
          "64th Amendment"
        ],
        "answer": "61st Amendment"
      },
      {
        "id": 49,
        "question": "Who presides over the joint session of Parliament?",
        "options": [
          "President",
          "Vice President",
          "Speaker of Lok Sabha",
          "Prime Minister"
        ],
        "answer": "Speaker of Lok Sabha"
      },
      {
        "id": 50,
        "question": "Which article defines the term 'State' for fundamental rights?",
        "options": [
          "Article 11",
          "Article 12",
          "Article 13",
          "Article 14"
        ],
        "answer": "Article 12"
      }
    ]
  }
},
{
  "id": 7,
  "title": "Entrepreneurship",
  "description": "Learn how to think like an entrepreneur and build innovative ventures.",
  "assessment": {
    "questions": [
      {
        "id": 1,
        "question": "What is bootstrapping in entrepreneurship?",
        "options": [
          "Using personal savings to start business",
          "Taking bank loans only",
          "Government funding",
          "Venture capital funding"
        ],
        "answer": "Using personal savings to start business"
      },
      {
        "id": 2,
        "question": "Which is NOT a characteristic of entrepreneurial mindset?",
        "options": [
          "Risk aversion",
          "Innovation",
          "Resilience",
          "Opportunity recognition"
        ],
        "answer": "Risk aversion"
      },
      {
        "id": 3,
        "question": "What does MVP stand for?",
        "options": [
          "Most Valuable Product",
          "Minimum Viable Product",
          "Maximum Value Proposition",
          "Minimum Venture Plan"
        ],
        "answer": "Minimum Viable Product"
      },
      {
        "id": 4,
        "question": "Which funding source provides equity investment?",
        "options": [
          "Bank loans",
          "Venture capital",
          "Personal savings",
          "Family loans"
        ],
        "answer": "Venture capital"
      },
      {
        "id": 5,
        "question": "What is market validation?",
        "options": [
          "Assuming market needs",
          "Testing business idea with potential customers",
          "Copying competitors",
          "Writing business plan only"
        ],
        "answer": "Testing business idea with potential customers"
      },
      {
        "id": 6,
        "question": "Which is essential in business plan?",
        "options": [
          "Only financial projections",
          "Comprehensive market and financial analysis",
          "Only product description",
          "Only team details"
        ],
        "answer": "Comprehensive market and financial analysis"
      },
      {
        "id": 7,
        "question": "What is pivot in startup context?",
        "options": [
          "Sticking to original plan always",
          "Significant change in business strategy",
          "Business closure",
          "Hiring new employees"
        ],
        "answer": "Significant change in business strategy"
      },
      {
        "id": 8,
        "question": "Which helps in identifying business opportunities?",
        "options": [
          "Ignoring market trends",
          "Solving customer problems",
          "Copying existing businesses",
          "Avoiding competition analysis"
        ],
        "answer": "Solving customer problems"
      },
      {
        "id": 9,
        "question": "What is cash flow management?",
        "options": [
          "Only tracking income",
          "Monitoring cash inflows and outflows",
          "Ignoring expenses",
          "Focusing only on profits"
        ],
        "answer": "Monitoring cash inflows and outflows"
      },
      {
        "id": 10,
        "question": "Which government scheme supports startups in India?",
        "options": [
          "Startup India",
          "Make in India",
          "Digital India",
          "All of the above"
        ],
        "answer": "All of the above"
      },
      {
        "id": 11,
        "question": "What is the primary purpose of a SWOT analysis?",
        "options": [
          "To analyze company's internal strengths/weaknesses and external opportunities/threats",
          "To calculate financial ratios",
          "To design marketing campaigns",
          "To hire employees"
        ],
        "answer": "To analyze company's internal strengths/weaknesses and external opportunities/threats"
      },
      {
        "id": 12,
        "question": "What is a unicorn startup?",
        "options": [
          "A startup valued at over $1 billion",
          "A startup with mythical business model",
          "A startup that only operates online",
          "A startup with single founder"
        ],
        "answer": "A startup valued at over $1 billion"
      },
      {
        "id": 13,
        "question": "Which term describes when a startup offers shares to the public for the first time?",
        "options": [
          "IPO (Initial Public Offering)",
          "VC Funding",
          "Angel Investment",
          "Crowdfunding"
        ],
        "answer": "IPO (Initial Public Offering)"
      },
      {
        "id": 14,
        "question": "What is the main goal of customer discovery?",
        "options": [
          "To understand customer needs and validate problems",
          "To sell products immediately",
          "To create fancy presentations",
          "To write detailed business plans"
        ],
        "answer": "To understand customer needs and validate problems"
      },
      {
        "id": 15,
        "question": "What does 'burn rate' refer to in startups?",
        "options": [
          "The rate at which company spends its capital",
          "Employee turnover rate",
          "Product failure rate",
          "Customer acquisition speed"
        ],
        "answer": "The rate at which company spends its capital"
      },
      {
        "id": 16,
        "question": "Which business structure provides limited liability protection?",
        "options": [
          "Sole Proprietorship",
          "Partnership",
          "LLC (Limited Liability Company)",
          "All of the above"
        ],
        "answer": "LLC (Limited Liability Company)"
      },
      {
        "id": 17,
        "question": "What is product-market fit?",
        "options": [
          "When product satisfies strong market demand",
          "When product is cheapest in market",
          "When product has most features",
          "When product is patented"
        ],
        "answer": "When product satisfies strong market demand"
      },
      {
        "id": 18,
        "question": "What is the main purpose of a pitch deck?",
        "options": [
          "To present business idea to potential investors",
          "To train employees",
          "To file taxes",
          "To design products"
        ],
        "answer": "To present business idea to potential investors"
      },
      {
        "id": 19,
        "question": "Which metric measures customer acquisition cost?",
        "options": [
          "Total marketing spend divided by number of new customers",
          "Total revenue divided by total customers",
          "Number of website visitors",
          "Social media followers count"
        ],
        "answer": "Total marketing spend divided by number of new customers"
      },
      {
        "id": 20,
        "question": "What is agile methodology in product development?",
        "options": [
          "Iterative approach with continuous improvements",
          "Building complete product before testing",
          "Only working on one feature at a time",
          "Avoiding customer feedback during development"
        ],
        "answer": "Iterative approach with continuous improvements"
      },
      {
        "id": 21,
        "question": "What is the primary role of an angel investor?",
        "options": [
          "Provide early-stage funding and mentorship",
          "Manage daily operations",
          "Handle legal compliance",
          "Design marketing materials"
        ],
        "answer": "Provide early-stage funding and mentorship"
      },
      {
        "id": 22,
        "question": "What does ROI stand for?",
        "options": [
          "Return on Investment",
          "Risk of Innovation",
          "Revenue on Income",
          "Rate of Interest"
        ],
        "answer": "Return on Investment"
      },
      {
        "id": 23,
        "question": "Which pricing strategy involves setting high initial prices?",
        "options": [
          "Penetration Pricing",
          "Skimming Pricing",
          "Competitive Pricing",
          "Cost-Plus Pricing"
        ],
        "answer": "Skimming Pricing"
      },
      {
        "id": 24,
        "question": "What is a business incubator?",
        "options": [
          "Organization that helps startups in early stages",
          "Equipment for storing products",
          "Software for accounting",
          "Office building for large corporations"
        ],
        "answer": "Organization that helps startups in early stages"
      },
      {
        "id": 25,
        "question": "What is the main purpose of networking for entrepreneurs?",
        "options": [
          "Building relationships for opportunities and support",
          "Selling products directly",
          "Showing off success",
          "Avoiding competition"
        ],
        "answer": "Building relationships for opportunities and support"
      },
      {
        "id": 26,
        "question": "What is disruptive innovation?",
        "options": [
          "Innovation that creates new market and value network",
          "Small improvements to existing products",
          "Copying successful business models",
          "Breaking company rules for innovation"
        ],
        "answer": "Innovation that creates new market and value network"
      },
      {
        "id": 27,
        "question": "Which financial statement shows company's profitability?",
        "options": [
          "Balance Sheet",
          "Income Statement",
          "Cash Flow Statement",
          "Statement of Equity"
        ],
        "answer": "Income Statement"
      },
      {
        "id": 28,
        "question": "What is the lean startup methodology?",
        "options": [
          "Building minimum viable products and iterating based on feedback",
          "Hiring minimal employees",
          "Using cheapest resources available",
          "Working only from home"
        ],
        "answer": "Building minimum viable products and iterating based on feedback"
      },
      {
        "id": 29,
        "question": "What is intellectual property?",
        "options": [
          "Creations of mind that have commercial value",
          "Physical business assets",
          "Employee skills and knowledge",
          "Office furniture and equipment"
        ],
        "answer": "Creations of mind that have commercial value"
      },
      {
        "id": 30,
        "question": "Which is a common reason startups fail?",
        "options": [
          "No market need for product",
          "Too much funding",
          "Too many customers",
          "Excessive profits"
        ],
        "answer": "No market need for product"
      },
      {
        "id": 31,
        "question": "What is a value proposition?",
        "options": [
          "The unique value a product provides to customers",
          "The price of the product",
          "The company's mission statement",
          "The shareholder agreement"
        ],
        "answer": "The unique value a product provides to customers"
      },
      {
        "id": 32,
        "question": "What is customer retention?",
        "options": [
          "Ability to keep customers over time",
          "Acquiring new customers",
          "Firing difficult customers",
          "Increasing product prices"
        ],
        "answer": "Ability to keep customers over time"
      },
      {
        "id": 33,
        "question": "What is the break-even point?",
        "options": [
          "Where total revenue equals total costs",
          "When company makes maximum profit",
          "When company hires first employee",
          "When product is launched"
        ],
        "answer": "Where total revenue equals total costs"
      },
      {
        "id": 34,
        "question": "What is scalability in business?",
        "options": [
          "Ability to grow without being hampered by structure",
          "Ability to shrink operations quickly",
          "Measuring company size",
          "Counting number of employees"
        ],
        "answer": "Ability to grow without being hampered by structure"
      },
      {
        "id": 35,
        "question": "What is a business model canvas?",
        "options": [
          "Strategic management template for developing business models",
          "Artwork for office decoration",
          "Financial accounting software",
          "Marketing campaign template"
        ],
        "answer": "Strategic management template for developing business models"
      },
      {
        "id": 36,
        "question": "What is due diligence in investment?",
        "options": [
          "Comprehensive appraisal of business before investment",
          "Daily business operations",
          "Customer service procedures",
          "Employee training process"
        ],
        "answer": "Comprehensive appraisal of business before investment"
      },
      {
        "id": 37,
        "question": "What is the main purpose of A/B testing?",
        "options": [
          "Compare two versions to determine which performs better",
          "Test product quality",
          "Check accounting accuracy",
          "Evaluate employee performance"
        ],
        "answer": "Compare two versions to determine which performs better"
      },
      {
        "id": 38,
        "question": "What is a trademark?",
        "options": [
          "Protection for brand names and logos",
          "Protection for inventions",
          "Protection for creative works",
          "Protection for business secrets"
        ],
        "answer": "Protection for brand names and logos"
      },
      {
        "id": 39,
        "question": "What is growth hacking?",
        "options": [
          "Creative, low-cost strategies for acquiring customers",
          "Breaking into computer systems",
          "Rapid employee hiring",
          "Quick product manufacturing"
        ],
        "answer": "Creative, low-cost strategies for acquiring customers"
      },
      {
        "id": 40,
        "question": "What is the role of a mentor in entrepreneurship?",
        "options": [
          "Provide guidance and share experience",
          "Provide all funding needed",
          "Handle legal matters",
          "Manage daily operations"
        ],
        "answer": "Provide guidance and share experience"
      },
      {
        "id": 41,
        "question": "What is customer lifetime value (CLV)?",
        "options": [
          "Total revenue business can expect from single customer",
          "Cost of acquiring one customer",
          "Time customer stays on website",
          "Number of products customer buys"
        ],
        "answer": "Total revenue business can expect from single customer"
      },
      {
        "id": 42,
        "question": "What is a patent?",
        "options": [
          "Legal protection for inventions",
          "Business license",
          "Tax identification number",
          "Import-export certificate"
        ],
        "answer": "Legal protection for inventions"
      },
      {
        "id": 43,
        "question": "What is the main purpose of competitor analysis?",
        "options": [
          "Understand competitive landscape and identify advantages",
          "Copy competitors exactly",
          "Ignore market trends",
          "Focus only on internal operations"
        ],
        "answer": "Understand competitive landscape and identify advantages"
      },
      {
        "id": 44,
        "question": "What is equity financing?",
        "options": [
          "Raising capital by selling company shares",
          "Taking loans from banks",
          "Using personal savings",
          "Getting government grants"
        ],
        "answer": "Raising capital by selling company shares"
      },
      {
        "id": 45,
        "question": "What is a mission statement?",
        "options": [
          "Declaration of organization's core purpose and focus",
          "Financial target for the year",
          "Marketing slogan",
          "Employee job descriptions"
        ],
        "answer": "Declaration of organization's core purpose and focus"
      },
      {
        "id": 46,
        "question": "What is the main benefit of crowdfunding?",
        "options": [
          "Raising small amounts from many people",
          "Getting free money",
          "Avoiding business planning",
          "Skipping market research"
        ],
        "answer": "Raising small amounts from many people"
      },
      {
        "id": 47,
        "question": "What is digital marketing?",
        "options": [
          "Marketing through digital channels and technologies",
          "Only social media marketing",
          "Traditional print advertising",
          "Door-to-door sales"
        ],
        "answer": "Marketing through digital channels and technologies"
      },
      {
        "id": 48,
        "question": "What is the main purpose of a feasibility study?",
        "options": [
          "Assess practicality of business idea",
          "Write detailed business plan",
          "Hire initial team",
          "Design product packaging"
        ],
        "answer": "Assess practicality of business idea"
      },
      {
        "id": 49,
        "question": "What is an exit strategy?",
        "options": [
          "Plan for selling business or transferring ownership",
          "Emergency business closure plan",
          "Employee termination process",
          "Customer refund policy"
        ],
        "answer": "Plan for selling business or transferring ownership"
      },
      {
        "id": 50,
        "question": "What is the key to successful entrepreneurship?",
        "options": [
          "Solving real customer problems effectively",
          "Having the most funding",
          "Working the longest hours",
          "Having no competition"
        ],
        "answer": "Solving real customer problems effectively"
      }
    ]
  }
}
];