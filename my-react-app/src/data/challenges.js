export const CHALLENGES = [
  {
    id: 'q1',
    category: 'basics',
    title: 'Select All Patients',
    difficulty: 'Easy',
    points: 10,
    description: 'Retrieve all columns from the patients table use limit 1.',
    initialCode: '',
    expectedQuery: 'SELECT * FROM patients LIMIT 1;'
  },
  {
    id: 'q2',
    category: 'basics',
    title: 'Filter by Province id',
    difficulty: 'Easy',
    points: 10,
    description: "Get first_name, last_name, and city of patients from Ontario ('ON').",
    initialCode: '',
    expectedQuery: "SELECT first_name, last_name, city FROM patients WHERE province_id = 'ON';"
  },
  {
    id: 'q3',
    category: 'basics',
    title: 'Distinct Cities',
    difficulty: 'Easy',
    points: 10,
    description: 'List unique city names from the patients table.',
    initialCode: '',
    expectedQuery: 'SELECT DISTINCT city FROM patients;'
  },
  {
    id: 'q4',
    category: 'basics',
    title: 'Sort by Height',
    difficulty: 'Easy',
    points: 10,
    description: "List patients' first_name and height, sorted by height in descending order.",
    initialCode: '',
    expectedQuery: 'SELECT first_name, height FROM patients ORDER BY height DESC;'
  },
  {
    id: 'q5',
    category: 'basics',
    title: 'Patients with Allergies',
    difficulty: 'Easy',
    points: 10,
    description: "Show first_name, last_name, and allergies of patients who have allergies to 'Penicillin'.",
    initialCode: '',
    expectedQuery: "SELECT first_name, last_name, allergies FROM patients WHERE allergies = 'Penicillin';"
  },
  {
    id: 'q6',
    category: 'aggregations',
    title: 'Total Patients per Province',
    difficulty: 'Medium',
    points: 20,
    description: 'Show province_id and total number of patients from each province as total_patients.',
    initialCode: '',
    expectedQuery: 'SELECT province_id, COUNT(*) AS total_patients FROM patients GROUP BY province_id;'
  },
  {
    id: 'q7',
    category: 'aggregations',
    title: 'Average Weight by Gender',
    difficulty: 'Medium',
    points: 20,
    description: 'Calculate average weight for each gender rounded to 2 decimal places as avg_weight.',
    initialCode: '',
    expectedQuery: 'SELECT gender, ROUND(AVG(weight), 2) AS avg_weight FROM patients GROUP BY gender;'
  },
  {
    id: 'q8',
    category: 'aggregations',
    title: 'Extreme Heights',
    difficulty: 'Easy',
    points: 10,
    description: 'Show the highest (max_height) and lowest (min_height) height among all patients.',
    initialCode: '',
    expectedQuery: 'SELECT MAX(height) AS max_height, MIN(height) AS min_height FROM patients;'
  },
  {
    id: 'q9',
    category: 'joins',
    title: 'Patient Admissions with Doctor',
    difficulty: 'Medium',
    points: 25,
    description: "Show patient's first_name, last_name, and their attending doctor's specialty.",
    initialCode: '',
    expectedQuery: 'SELECT p.first_name, p.last_name, d.specialty FROM patients p JOIN admissions a ON p.patient_id = a.patient_id JOIN doctors d ON a.attending_doctor_id = d.doctor_id;'
  },
  {
    id: 'q10',
    category: 'joins',
    title: 'Patients without Admissions',
    difficulty: 'Hard',
    points: 30,
    description: 'Find first_name and last_name of all patients who have never been admitted.',
    initialCode: '',
    expectedQuery: 'SELECT first_name, last_name FROM patients WHERE patient_id NOT IN (SELECT patient_id FROM admissions);'
  }
];
