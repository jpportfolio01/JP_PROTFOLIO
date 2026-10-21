// SQL Practice Modules with Schemas, Sample Data, and Questions
// Faculty: Dr. Jitendra Parmar (JUET Guna)

var SQL_MODULES = [
  {
    "module_id": 1,
    "module_name": "Basic Data Manipulation & Filtering (DDL/DML)",
    "short_name": "DDL & DML Basics",
    "description": "Master table creation, schema alterations, record insertion, truncation, and basic row filtering with WHERE clauses.",
    "schema": {
      "tables": [
        {
          "table_name": "departments",
          "columns": [
            {
              "name": "department_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "dept_name",
              "type": "VARCHAR(50)",
              "key": null
            },
            {
              "name": "location",
              "type": "VARCHAR(50)",
              "key": null
            }
          ],
          "sample_data": [
            {
              "department_id": 10,
              "dept_name": "Human Resources",
              "location": "Building A"
            },
            {
              "department_id": 20,
              "dept_name": "Engineering",
              "location": "Building B"
            },
            {
              "department_id": 30,
              "dept_name": "Marketing",
              "location": "Building A"
            },
            {
              "department_id": 40,
              "dept_name": "Sales",
              "location": "Building C"
            }
          ]
        },
        {
          "table_name": "employees",
          "columns": [
            {
              "name": "emp_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "emp_name",
              "type": "VARCHAR(50)",
              "key": null
            },
            {
              "name": "department_id",
              "type": "INT",
              "key": "FOREIGN KEY"
            },
            {
              "name": "salary",
              "type": "DECIMAL(10,2)",
              "key": null
            },
            {
              "name": "hire_date",
              "type": "DATE",
              "key": null
            },
            {
              "name": "bonus",
              "type": "DECIMAL(10,2)",
              "key": null
            }
          ],
          "sample_data": [
            {
              "emp_id": 1001,
              "emp_name": "Sarah Connor",
              "department_id": 20,
              "salary": 85000,
              "hire_date": "2021-03-15",
              "bonus": 5000
            },
            {
              "emp_id": 1002,
              "emp_name": "David Miller",
              "department_id": 10,
              "salary": 52000,
              "hire_date": "2022-06-01",
              "bonus": null
            },
            {
              "emp_id": 1003,
              "emp_name": "Elena Rostova",
              "department_id": 20,
              "salary": 92000,
              "hire_date": "2020-01-10",
              "bonus": 8000
            },
            {
              "emp_id": 1004,
              "emp_name": "James Wilson",
              "department_id": 30,
              "salary": 48000,
              "hire_date": "2023-08-20",
              "bonus": null
            },
            {
              "emp_id": 1005,
              "emp_name": "Amit Sharma",
              "department_id": 40,
              "salary": 61000,
              "hire_date": "2019-11-05",
              "bonus": 3000
            }
          ]
        }
      ]
    },
    "questions": [
      {
        "question_id": 1,
        "title": "Create Departments Table",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a DDL statement to create the departments table with department_id as an integer primary key, dept_name as a non-null string, and location as a variable character field.",
        "initialCode": "-- Write DDL query to create departments table\nCREATE TABLE departments (\n    department_id INT PRIMARY KEY,\n    dept_name VARCHAR(50) NOT NULL,\n    location VARCHAR(50)\n);",
        "query": "CREATE TABLE departments (\n    department_id INT PRIMARY KEY,\n    dept_name VARCHAR(50) NOT NULL,\n    location VARCHAR(50)\n);",
        "output": "Command(s) completed successfully."
      },
      {
        "question_id": 2,
        "title": "Create Employees Table",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a DDL query to create the employees table defining emp_id as the primary key, emp_name as non-null, salary with decimal precision, and department_id as a foreign key referencing departments.",
        "initialCode": "-- Write DDL query to create employees table\nCREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    emp_name VARCHAR(50) NOT NULL,\n    department_id INT,\n    salary DECIMAL(10, 2) NOT NULL,\n    hire_date DATE,\n    bonus DECIMAL(10, 2),\n    FOREIGN KEY (department_id) REFERENCES departments(department_id)\n);",
        "query": "CREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    emp_name VARCHAR(50) NOT NULL,\n    department_id INT,\n    salary DECIMAL(10, 2) NOT NULL,\n    hire_date DATE,\n    bonus DECIMAL(10, 2),\n    FOREIGN KEY (department_id) REFERENCES departments(department_id)\n);",
        "output": "Command(s) completed successfully."
      },
      {
        "question_id": 3,
        "title": "Add Column",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a DDL statement to alter the employees table and add a new column named performance_rating of integer type.",
        "initialCode": "-- Alter table to add performance_rating\nALTER TABLE employees ADD performance_rating INT;",
        "query": "ALTER TABLE employees ADD performance_rating INT;",
        "output": "Command(s) completed successfully."
      },
      {
        "question_id": 4,
        "title": "Drop Column",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a DDL statement to remove the performance_rating column from the employees table.",
        "initialCode": "-- Alter table to drop performance_rating\nALTER TABLE employees DROP COLUMN performance_rating;",
        "query": "ALTER TABLE employees DROP COLUMN performance_rating;",
        "output": "Command(s) completed successfully."
      },
      {
        "question_id": 5,
        "title": "Truncate Table",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write the SQL statement to delete all records from the employees table while retaining its table structure.",
        "initialCode": "-- Delete all records while retaining table structure\nDELETE FROM employees;",
        "query": "DELETE FROM employees;",
        "output": "Command(s) completed successfully."
      },
      {
        "question_id": 6,
        "title": "Drop Table",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write the SQL command to completely destroy the employees table structure and all stored records.",
        "initialCode": "-- Drop table employees\nDROP TABLE employees;",
        "query": "DROP TABLE employees;",
        "output": "Command(s) completed successfully."
      },
      {
        "question_id": 7,
        "title": "Insert Complete Record",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a DML query to insert a new employee with ID 1006, name 'Priya Patel', department 20, salary 75000.00, hire date '2022-04-12', and bonus 4500.00.",
        "initialCode": "-- Insert full employee record\nINSERT INTO employees (emp_id, emp_name, department_id, salary, hire_date, bonus)\nVALUES (1006, 'Priya Patel', 20, 75000.00, '2022-04-12', 4500.00);",
        "query": "INSERT INTO employees (emp_id, emp_name, department_id, salary, hire_date, bonus)\nVALUES (1006, 'Priya Patel', 20, 75000.00, '2022-04-12', 4500.00);",
        "output": "1 row affected."
      },
      {
        "question_id": 8,
        "title": "Insert Partial Record",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a DML query to insert a new employee with ID 1007, name 'Ravi Kumar', department 10, and salary 50000.00, leaving hire_date and bonus as NULL.",
        "initialCode": "-- Insert partial employee record\nINSERT INTO employees (emp_id, emp_name, department_id, salary)\nVALUES (1007, 'Ravi Kumar', 10, 50000.00);",
        "query": "INSERT INTO employees (emp_id, emp_name, department_id, salary)\nVALUES (1007, 'Ravi Kumar', 10, 50000.00);",
        "output": "1 row affected."
      },
      {
        "question_id": 9,
        "title": "Basic Filtering (Equality)",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a SQL query to retrieve all details of employees who belong to department 20.",
        "initialCode": "-- Write query here\nSELECT * FROM employees WHERE department_id = 20;",
        "query": "SELECT * FROM employees WHERE department_id = 20;",
        "output": [
          {
            "emp_id": 1001,
            "emp_name": "Sarah Connor",
            "department_id": 20,
            "salary": 85000,
            "hire_date": "2021-03-15",
            "bonus": 5000
          },
          {
            "emp_id": 1003,
            "emp_name": "Elena Rostova",
            "department_id": 20,
            "salary": 92000,
            "hire_date": "2020-01-10",
            "bonus": 8000
          }
        ]
      },
      {
        "question_id": 10,
        "title": "Salary Comparison",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a SQL query to select the emp_name and salary of all employees earning strictly more than 60000.00.",
        "initialCode": "-- Write query here\nSELECT emp_name, salary FROM employees WHERE salary > 60000.00;",
        "query": "SELECT emp_name, salary FROM employees WHERE salary > 60000.00;",
        "output": [
          {
            "emp_name": "Sarah Connor",
            "salary": 85000
          },
          {
            "emp_name": "Elena Rostova",
            "salary": 92000
          },
          {
            "emp_name": "Amit Sharma",
            "salary": 61000
          }
        ]
      },
      {
        "question_id": 11,
        "title": "Logical AND Filtering",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a SQL query to retrieve employees who work in department 20 AND have a salary greater than 80000.00.",
        "initialCode": "-- Write query here\nSELECT * FROM employees WHERE department_id = 20 AND salary > 80000.00;",
        "query": "SELECT * FROM employees WHERE department_id = 20 AND salary > 80000.00;",
        "output": [
          {
            "emp_id": 1001,
            "emp_name": "Sarah Connor",
            "department_id": 20,
            "salary": 85000,
            "hire_date": "2021-03-15",
            "bonus": 5000
          },
          {
            "emp_id": 1003,
            "emp_name": "Elena Rostova",
            "department_id": 20,
            "salary": 92000,
            "hire_date": "2020-01-10",
            "bonus": 8000
          }
        ]
      },
      {
        "question_id": 12,
        "title": "Logical OR Filtering",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a SQL query to list all departments located in either 'Building A' OR 'Building C'.",
        "initialCode": "-- Write query here\nSELECT * FROM departments WHERE location = 'Building A' OR location = 'Building C';",
        "query": "SELECT * FROM departments WHERE location = 'Building A' OR location = 'Building C';",
        "output": [
          {
            "department_id": 10,
            "dept_name": "Human Resources",
            "location": "Building A"
          },
          {
            "department_id": 30,
            "dept_name": "Marketing",
            "location": "Building A"
          },
          {
            "department_id": 40,
            "dept_name": "Sales",
            "location": "Building C"
          }
        ]
      },
      {
        "question_id": 13,
        "title": "Range Filtering (BETWEEN)",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a SQL query to display all employees whose salary falls between 50000.00 and 85000.00 inclusive.",
        "initialCode": "-- Write query here\nSELECT * FROM employees WHERE salary BETWEEN 50000.00 AND 85000.00;",
        "query": "SELECT * FROM employees WHERE salary BETWEEN 50000.00 AND 85000.00;",
        "output": [
          {
            "emp_id": 1001,
            "emp_name": "Sarah Connor",
            "department_id": 20,
            "salary": 85000,
            "hire_date": "2021-03-15",
            "bonus": 5000
          },
          {
            "emp_id": 1002,
            "emp_name": "David Miller",
            "department_id": 10,
            "salary": 52000,
            "hire_date": "2022-06-01",
            "bonus": null
          },
          {
            "emp_id": 1005,
            "emp_name": "Amit Sharma",
            "department_id": 40,
            "salary": 61000,
            "hire_date": "2019-11-05",
            "bonus": 3000
          }
        ]
      },
      {
        "question_id": 14,
        "title": "Pattern Matching (LIKE)",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a SQL query to find all employees whose name starts with the letter 'S'.",
        "initialCode": "-- Write query here\nSELECT * FROM employees WHERE emp_name LIKE 'S%';",
        "query": "SELECT * FROM employees WHERE emp_name LIKE 'S%';",
        "output": [
          {
            "emp_id": 1001,
            "emp_name": "Sarah Connor",
            "department_id": 20,
            "salary": 85000,
            "hire_date": "2021-03-15",
            "bonus": 5000
          }
        ]
      },
      {
        "question_id": 15,
        "title": "Handling NULL Values",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a SQL query to select all employees who do not have a bonus assigned (bonus IS NULL).",
        "initialCode": "-- Write query here\nSELECT * FROM employees WHERE bonus IS NULL;",
        "query": "SELECT * FROM employees WHERE bonus IS NULL;",
        "output": [
          {
            "emp_id": 1002,
            "emp_name": "David Miller",
            "department_id": 10,
            "salary": 52000,
            "hire_date": "2022-06-01",
            "bonus": null
          },
          {
            "emp_id": 1004,
            "emp_name": "James Wilson",
            "department_id": 30,
            "salary": 48000,
            "hire_date": "2023-08-20",
            "bonus": null
          }
        ]
      }
    ]
  },
  {
    "module_id": 2,
    "module_name": "Aggregations & Grouped Data Operations",
    "short_name": "Aggregations & GROUP BY",
    "description": "Calculate workforce metrics using aggregate functions (COUNT, SUM, AVG, MIN, MAX), group summaries, and filter aggregated groups with HAVING.",
    "schema": {
      "tables": [
        {
          "table_name": "workers",
          "columns": [
            {
              "name": "worker_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "worker_name",
              "type": "VARCHAR(50)",
              "key": null
            },
            {
              "name": "department",
              "type": "VARCHAR(50)",
              "key": null
            },
            {
              "name": "gender",
              "type": "CHAR(1)",
              "key": null
            },
            {
              "name": "age",
              "type": "INT",
              "key": null
            },
            {
              "name": "salary",
              "type": "DECIMAL(10,2)",
              "key": null
            }
          ],
          "sample_data": [
            {
              "worker_id": 101,
              "worker_name": "Amit",
              "department": "Production",
              "gender": "M",
              "age": 25,
              "salary": 28000
            },
            {
              "worker_id": 102,
              "worker_name": "Neha",
              "department": "Production",
              "gender": "F",
              "age": 29,
              "salary": 32000
            },
            {
              "worker_id": 103,
              "worker_name": "Rahul",
              "department": "Production",
              "gender": "M",
              "age": 34,
              "salary": 35000
            },
            {
              "worker_id": 104,
              "worker_name": "Priya",
              "department": "Quality Control",
              "gender": "F",
              "age": 27,
              "salary": 30000
            },
            {
              "worker_id": 105,
              "worker_name": "Karan",
              "department": "Quality Control",
              "gender": "M",
              "age": 41,
              "salary": 42000
            },
            {
              "worker_id": 106,
              "worker_name": "Anjali",
              "department": "Maintenance",
              "gender": "F",
              "age": 31,
              "salary": 38000
            },
            {
              "worker_id": 107,
              "worker_name": "Vijay",
              "department": "Maintenance",
              "gender": "M",
              "age": 45,
              "salary": 45000
            },
            {
              "worker_id": 108,
              "worker_name": "Riya",
              "department": "Packaging",
              "gender": "F",
              "age": 26,
              "salary": 29000
            },
            {
              "worker_id": 109,
              "worker_name": "Suresh",
              "department": "Packaging",
              "gender": "M",
              "age": 39,
              "salary": 33000
            },
            {
              "worker_id": 110,
              "worker_name": "Pooja",
              "department": "Stores",
              "gender": "F",
              "age": 36,
              "salary": 31000
            }
          ]
        }
      ]
    },
    "questions": [
      {
        "question_id": 1,
        "title": "Total Headcount",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a query using COUNT() to calculate the total number of workers in the factory.",
        "initialCode": "-- Calculate total workers\nSELECT COUNT(*) AS total_workers FROM workers;",
        "query": "SELECT COUNT(*) AS total_workers FROM workers;",
        "output": [
          {
            "total_workers": 10
          }
        ]
      },
      {
        "question_id": 2,
        "title": "Total Payroll",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a query using SUM() to find the total salary expense paid across all workers.",
        "initialCode": "-- Calculate total payroll\nSELECT SUM(salary) AS total_payroll FROM workers;",
        "query": "SELECT SUM(salary) AS total_payroll FROM workers;",
        "output": [
          {
            "total_payroll": 343000
          }
        ]
      },
      {
        "question_id": 3,
        "title": "Average Salary",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a query using AVG() to calculate the overall average salary of the workforce.",
        "initialCode": "-- Calculate average salary\nSELECT AVG(salary) AS avg_salary FROM workers;",
        "query": "SELECT AVG(salary) AS avg_salary FROM workers;",
        "output": [
          {
            "avg_salary": 34300
          }
        ]
      },
      {
        "question_id": 4,
        "title": "Minimum and Maximum Salary",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write a single query to find the minimum salary (MIN) and maximum salary (MAX) among all workers.",
        "initialCode": "-- Find min and max salary\nSELECT MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM workers;",
        "query": "SELECT MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM workers;",
        "output": [
          {
            "min_salary": 28000,
            "max_salary": 45000
          }
        ]
      },
      {
        "question_id": 5,
        "title": "Department-Wise Count",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a query using GROUP BY to display each department and the total number of workers assigned to it.",
        "initialCode": "-- Department worker count\nSELECT department, COUNT(*) AS worker_count FROM workers GROUP BY department ORDER BY MIN(worker_id);",
        "query": "SELECT department, COUNT(*) AS worker_count FROM workers GROUP BY department ORDER BY MIN(worker_id);",
        "output": [
          {
            "department": "Production",
            "worker_count": 3
          },
          {
            "department": "Quality Control",
            "worker_count": 2
          },
          {
            "department": "Maintenance",
            "worker_count": 2
          },
          {
            "department": "Packaging",
            "worker_count": 2
          },
          {
            "department": "Stores",
            "worker_count": 1
          }
        ]
      },
      {
        "question_id": 6,
        "title": "Department-Wise Average Salary",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a query to find the average salary for each department, ordered from highest average salary to lowest.",
        "initialCode": "-- Average salary per department descending\nSELECT department, AVG(salary) AS avg_salary FROM workers GROUP BY department ORDER BY avg_salary DESC;",
        "query": "SELECT department, AVG(salary) AS avg_salary FROM workers GROUP BY department ORDER BY avg_salary DESC;",
        "output": [
          {
            "department": "Maintenance",
            "avg_salary": 41500
          },
          {
            "department": "Quality Control",
            "avg_salary": 36000
          },
          {
            "department": "Production",
            "avg_salary": 31666.67
          },
          {
            "department": "Stores",
            "avg_salary": 31000
          },
          {
            "department": "Packaging",
            "avg_salary": 31000
          }
        ]
      },
      {
        "question_id": 7,
        "title": "Gender-Wise Average Salary",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a query using GROUP BY to find the average salary grouped by gender (M/F).",
        "initialCode": "-- Average salary by gender\nSELECT gender, AVG(salary) AS avg_salary FROM workers GROUP BY gender;",
        "query": "SELECT gender, AVG(salary) AS avg_salary FROM workers GROUP BY gender;",
        "output": [
          {
            "gender": "M",
            "avg_salary": 36600
          },
          {
            "gender": "F",
            "avg_salary": 32000
          }
        ]
      },
      {
        "question_id": 8,
        "title": "Age Statistics per Department",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a query to calculate the average worker age for each department.",
        "initialCode": "-- Average age per department\nSELECT department, AVG(age) AS avg_age FROM workers GROUP BY department;",
        "query": "SELECT department, AVG(age) AS avg_age FROM workers GROUP BY department;",
        "output": [
          {
            "department": "Production",
            "avg_age": 29.33
          },
          {
            "department": "Quality Control",
            "avg_age": 34
          },
          {
            "department": "Maintenance",
            "avg_age": 38
          },
          {
            "department": "Packaging",
            "avg_age": 32.5
          },
          {
            "department": "Stores",
            "avg_age": 36
          }
        ]
      },
      {
        "question_id": 9,
        "title": "Filtering Rows Before Grouping",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query to calculate the average salary per department considering only workers older than 30 years (WHERE age > 30).",
        "initialCode": "-- Average salary per department for age > 30\nSELECT department, AVG(salary) AS avg_salary FROM workers WHERE age > 30 GROUP BY department;",
        "query": "SELECT department, AVG(salary) AS avg_salary FROM workers WHERE age > 30 GROUP BY department;",
        "output": [
          {
            "department": "Production",
            "avg_salary": 35000
          },
          {
            "department": "Quality Control",
            "avg_salary": 42000
          },
          {
            "department": "Maintenance",
            "avg_salary": 41500
          },
          {
            "department": "Packaging",
            "avg_salary": 33000
          },
          {
            "department": "Stores",
            "avg_salary": 31000
          }
        ]
      },
      {
        "question_id": 10,
        "title": "Filtering Groups (HAVING Headcount)",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query to list all departments that have strictly more than 2 workers.",
        "initialCode": "-- Departments with count > 2\nSELECT department, COUNT(*) AS worker_count FROM workers GROUP BY department HAVING COUNT(*) > 2;",
        "query": "SELECT department, COUNT(*) AS worker_count FROM workers GROUP BY department HAVING COUNT(*) > 2;",
        "output": [
          {
            "department": "Production",
            "worker_count": 3
          }
        ]
      },
      {
        "question_id": 11,
        "title": "Filtering Groups (HAVING Average Salary)",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query using HAVING to show departments whose average worker salary exceeds 33000.00.",
        "initialCode": "-- Departments where avg salary > 33000\nSELECT department, AVG(salary) AS avg_salary FROM workers GROUP BY department HAVING AVG(salary) > 33000.00;",
        "query": "SELECT department, AVG(salary) AS avg_salary FROM workers GROUP BY department HAVING AVG(salary) > 33000.00;",
        "output": [
          {
            "department": "Maintenance",
            "avg_salary": 41500
          },
          {
            "department": "Quality Control",
            "avg_salary": 36000
          }
        ]
      },
      {
        "question_id": 12,
        "title": "Filtering Groups (HAVING Total Payroll)",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query to find departments whose total salary expense exceeds 80000.00.",
        "initialCode": "-- Departments with total salary > 80000\nSELECT department, SUM(salary) AS total_salary FROM workers GROUP BY department HAVING SUM(salary) > 80000.00;",
        "query": "SELECT department, SUM(salary) AS total_salary FROM workers GROUP BY department HAVING SUM(salary) > 80000.00;",
        "output": [
          {
            "department": "Production",
            "total_salary": 95000
          },
          {
            "department": "Maintenance",
            "total_salary": 83000
          }
        ]
      },
      {
        "question_id": 13,
        "title": "Combined WHERE and HAVING",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query to find the average salary per department for male workers only, displaying only departments where this male average salary exceeds 30000.00.",
        "initialCode": "-- WHERE gender='M' and HAVING avg > 30000\nSELECT department, AVG(salary) AS avg_male_salary FROM workers WHERE gender = 'M' GROUP BY department HAVING AVG(salary) > 30000.00;",
        "query": "SELECT department, AVG(salary) AS avg_male_salary FROM workers WHERE gender = 'M' GROUP BY department HAVING AVG(salary) > 30000.00;",
        "output": [
          {
            "department": "Production",
            "avg_male_salary": 31500
          },
          {
            "department": "Quality Control",
            "avg_male_salary": 42000
          },
          {
            "department": "Maintenance",
            "avg_male_salary": 45000
          },
          {
            "department": "Packaging",
            "avg_male_salary": 33000
          }
        ]
      },
      {
        "question_id": 14,
        "title": "Multi-Column Grouping",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query to group workers by both department and gender, showing the headcount for each combination.",
        "initialCode": "-- Group by department, gender\nSELECT department, gender, COUNT(*) AS worker_count FROM workers GROUP BY department, gender;",
        "query": "SELECT department, gender, COUNT(*) AS worker_count FROM workers GROUP BY department, gender;",
        "output": [
          {
            "department": "Production",
            "gender": "M",
            "worker_count": 2
          },
          {
            "department": "Production",
            "gender": "F",
            "worker_count": 1
          },
          {
            "department": "Quality Control",
            "gender": "F",
            "worker_count": 1
          },
          {
            "department": "Quality Control",
            "gender": "M",
            "worker_count": 1
          },
          {
            "department": "Maintenance",
            "gender": "F",
            "worker_count": 1
          },
          {
            "department": "Maintenance",
            "gender": "M",
            "worker_count": 1
          },
          {
            "department": "Packaging",
            "gender": "F",
            "worker_count": 1
          },
          {
            "department": "Packaging",
            "gender": "M",
            "worker_count": 1
          },
          {
            "department": "Stores",
            "gender": "F",
            "worker_count": 1
          }
        ]
      },
      {
        "question_id": 15,
        "title": "Sorting Grouped Results",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query to display each department along with its total salary payout, sorted in descending order of total payout.",
        "initialCode": "-- Group by department and order by total_payout desc\nSELECT department, SUM(salary) AS total_payout FROM workers GROUP BY department ORDER BY total_payout DESC;",
        "query": "SELECT department, SUM(salary) AS total_payout FROM workers GROUP BY department ORDER BY total_payout DESC;",
        "output": [
          {
            "department": "Production",
            "total_payout": 95000
          },
          {
            "department": "Maintenance",
            "total_payout": 83000
          },
          {
            "department": "Quality Control",
            "total_payout": 72000
          },
          {
            "department": "Packaging",
            "total_payout": 62000
          },
          {
            "department": "Stores",
            "total_payout": 31000
          }
        ]
      }
    ]
  },
  {
    "module_id": 3,
    "module_name": "Multi-Table Relational Queries (JOINs)",
    "short_name": "Relational JOINs",
    "description": "Connect relational data across tables using INNER JOIN, LEFT JOIN, RIGHT JOIN, Self Joins, and multi-table business operations.",
    "schema": {
      "tables": [
        {
          "table_name": "departments",
          "columns": [
            {
              "name": "department_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "dept_name",
              "type": "VARCHAR(50)",
              "key": null
            }
          ],
          "sample_data": [
            {
              "department_id": 10,
              "dept_name": "Human Resources"
            },
            {
              "department_id": 20,
              "dept_name": "Engineering"
            },
            {
              "department_id": 30,
              "dept_name": "Marketing"
            },
            {
              "department_id": 40,
              "dept_name": "Sales"
            }
          ]
        },
        {
          "table_name": "employees",
          "columns": [
            {
              "name": "emp_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "emp_name",
              "type": "VARCHAR(50)",
              "key": null
            },
            {
              "name": "department_id",
              "type": "INT",
              "key": "FOREIGN KEY"
            },
            {
              "name": "manager_id",
              "type": "INT",
              "key": null
            },
            {
              "name": "salary",
              "type": "DECIMAL(10,2)",
              "key": null
            }
          ],
          "sample_data": [
            {
              "emp_id": 101,
              "emp_name": "Amit",
              "department_id": 20,
              "manager_id": 103,
              "salary": 65000
            },
            {
              "emp_id": 102,
              "emp_name": "Ravi",
              "department_id": 10,
              "manager_id": 105,
              "salary": 45000
            },
            {
              "emp_id": 103,
              "emp_name": "Neha",
              "department_id": 20,
              "manager_id": null,
              "salary": 85000
            },
            {
              "emp_id": 104,
              "emp_name": "Priya",
              "department_id": 40,
              "manager_id": 105,
              "salary": 55000
            },
            {
              "emp_id": 105,
              "emp_name": "Rahul",
              "department_id": 10,
              "manager_id": null,
              "salary": 75000
            }
          ]
        },
        {
          "table_name": "projects",
          "columns": [
            {
              "name": "project_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "project_name",
              "type": "VARCHAR(50)",
              "key": null
            },
            {
              "name": "department_id",
              "type": "INT",
              "key": "FOREIGN KEY"
            }
          ],
          "sample_data": [
            {
              "project_id": 201,
              "project_name": "Alpha",
              "department_id": 20
            },
            {
              "project_id": 202,
              "project_name": "Beta",
              "department_id": 20
            },
            {
              "project_id": 203,
              "project_name": "Gamma",
              "department_id": 30
            }
          ]
        },
        {
          "table_name": "works_on",
          "columns": [
            {
              "name": "emp_id",
              "type": "INT",
              "key": "FOREIGN KEY"
            },
            {
              "name": "project_id",
              "type": "INT",
              "key": "FOREIGN KEY"
            },
            {
              "name": "hours",
              "type": "INT",
              "key": null
            }
          ],
          "sample_data": [
            {
              "emp_id": 101,
              "project_id": 201,
              "hours": 120
            },
            {
              "emp_id": 103,
              "project_id": 202,
              "hours": 150
            },
            {
              "emp_id": 101,
              "project_id": 203,
              "hours": 40
            }
          ]
        }
      ]
    },
    "questions": [
      {
        "question_id": 1,
        "title": "Basic INNER JOIN",
        "difficulty": "Easy",
        "points": 10,
        "question": "Write an INNER JOIN query to display emp_name, salary, and their corresponding dept_name.",
        "initialCode": "-- INNER JOIN employees and departments\nSELECT e.emp_name, e.salary, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.department_id;",
        "query": "SELECT e.emp_name, e.salary, d.dept_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;",
        "output": [
          {
            "emp_name": "Amit",
            "salary": 65000,
            "dept_name": "Engineering"
          },
          {
            "emp_name": "Ravi",
            "salary": 45000,
            "dept_name": "Human Resources"
          },
          {
            "emp_name": "Neha",
            "salary": 85000,
            "dept_name": "Engineering"
          },
          {
            "emp_name": "Priya",
            "salary": 55000,
            "dept_name": "Sales"
          },
          {
            "emp_name": "Rahul",
            "salary": 75000,
            "dept_name": "Human Resources"
          }
        ]
      },
      {
        "question_id": 2,
        "title": "Filtered JOIN",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a query joining employees and departments to display employees in the 'Engineering' department earning more than 70000.00.",
        "initialCode": "-- JOIN with filter\nSELECT e.emp_name, e.salary, d.dept_name\nFROM employees e\nJOIN departments d ON e.department_id = d.department_id\nWHERE d.dept_name = 'Engineering' AND e.salary > 70000.00;",
        "query": "SELECT e.emp_name, e.salary, d.dept_name FROM employees e JOIN departments d ON e.department_id = d.department_id WHERE d.dept_name = 'Engineering' AND e.salary > 70000.00;",
        "output": [
          {
            "emp_name": "Neha",
            "salary": 85000,
            "dept_name": "Engineering"
          }
        ]
      },
      {
        "question_id": 3,
        "title": "Basic LEFT JOIN",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a LEFT JOIN query to list all department names and associated employee names, ensuring departments without employees are still returned.",
        "initialCode": "-- LEFT JOIN departments and employees\nSELECT d.dept_name, e.emp_name\nFROM departments d\nLEFT JOIN employees e ON d.department_id = e.department_id\nORDER BY d.department_id, e.emp_id;",
        "query": "SELECT d.dept_name, e.emp_name FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id ORDER BY d.department_id, e.emp_id;",
        "output": [
          {
            "dept_name": "Human Resources",
            "emp_name": "Ravi"
          },
          {
            "dept_name": "Human Resources",
            "emp_name": "Rahul"
          },
          {
            "dept_name": "Engineering",
            "emp_name": "Amit"
          },
          {
            "dept_name": "Engineering",
            "emp_name": "Neha"
          },
          {
            "dept_name": "Marketing",
            "emp_name": null
          },
          {
            "dept_name": "Sales",
            "emp_name": "Priya"
          }
        ]
      },
      {
        "question_id": 4,
        "title": "Finding Unassigned Departments",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query using LEFT JOIN and WHERE department_id IS NULL to identify departments that currently have no assigned employees.",
        "initialCode": "-- Find departments with no employees\nSELECT d.dept_name\nFROM departments d\nLEFT JOIN employees e ON d.department_id = e.department_id\nWHERE e.emp_id IS NULL;",
        "query": "SELECT d.dept_name FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id WHERE e.emp_id IS NULL;",
        "output": [
          {
            "dept_name": "Marketing"
          }
        ]
      },
      {
        "question_id": 5,
        "title": "Basic RIGHT JOIN",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a RIGHT JOIN query between departments and employees that keeps all employee records regardless of whether their department ID matches.",
        "initialCode": "-- RIGHT JOIN departments and employees\nSELECT e.emp_name, d.dept_name\nFROM departments d\nRIGHT JOIN employees e ON d.department_id = e.department_id\nORDER BY e.emp_id;",
        "query": "SELECT e.emp_name, d.dept_name FROM departments d RIGHT JOIN employees e ON d.department_id = e.department_id ORDER BY e.emp_id;",
        "output": [
          {
            "emp_name": "Amit",
            "dept_name": "Engineering"
          },
          {
            "emp_name": "Ravi",
            "dept_name": "Human Resources"
          },
          {
            "emp_name": "Neha",
            "dept_name": "Engineering"
          },
          {
            "emp_name": "Priya",
            "dept_name": "Sales"
          },
          {
            "emp_name": "Rahul",
            "dept_name": "Human Resources"
          }
        ]
      },
      {
        "question_id": 6,
        "title": "Self Join (Manager Name)",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a SELF JOIN on the employees table to display each employee's name alongside their direct manager's name.",
        "initialCode": "-- SELF JOIN employees to get manager name\nSELECT e.emp_name AS employee, m.emp_name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.emp_id;",
        "query": "SELECT e.emp_name AS employee, m.emp_name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.emp_id;",
        "output": [
          {
            "employee": "Amit",
            "manager": "Neha"
          },
          {
            "employee": "Ravi",
            "manager": "Rahul"
          },
          {
            "employee": "Neha",
            "manager": null
          },
          {
            "employee": "Priya",
            "manager": "Rahul"
          },
          {
            "employee": "Rahul",
            "manager": null
          }
        ]
      },
      {
        "question_id": 7,
        "title": "Self Join (Salary Comparison)",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a SELF JOIN query to find employees who earn a higher salary than their direct manager.",
        "initialCode": "-- Employees earning more than their manager\nSELECT e.emp_name AS employee, e.salary AS emp_salary, m.emp_name AS manager, m.salary AS mgr_salary\nFROM employees e\nJOIN employees m ON e.manager_id = m.emp_id\nWHERE e.salary > m.salary;",
        "query": "SELECT e.emp_name AS employee, e.salary AS emp_salary, m.emp_name AS manager, m.salary AS mgr_salary FROM employees e JOIN employees m ON e.manager_id = m.emp_id WHERE e.salary > m.salary;",
        "output": []
      },
      {
        "question_id": 8,
        "title": "Three-Table JOIN",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query joining employees, works_on, and projects to display emp_name, project_name, and hours worked.",
        "initialCode": "-- 3-Table JOIN\nSELECT e.emp_name, p.project_name, w.hours\nFROM employees e\nJOIN works_on w ON e.emp_id = w.emp_id\nJOIN projects p ON w.project_id = p.project_id;",
        "query": "SELECT e.emp_name, p.project_name, w.hours FROM employees e JOIN works_on w ON e.emp_id = w.emp_id JOIN projects p ON w.project_id = p.project_id;",
        "output": [
          {
            "emp_name": "Amit",
            "project_name": "Alpha",
            "hours": 120
          },
          {
            "emp_name": "Neha",
            "project_name": "Beta",
            "hours": 150
          },
          {
            "emp_name": "Amit",
            "project_name": "Gamma",
            "hours": 40
          }
        ]
      },
      {
        "question_id": 9,
        "title": "Four-Table JOIN",
        "difficulty": "Hard",
        "points": 30,
        "question": "Write a query combining employees, departments, works_on, and projects to list employee name, employee department name, assigned project name, and project controlling department name.",
        "initialCode": "-- 4-Table JOIN\nSELECT e.emp_name, ed.dept_name AS emp_dept, p.project_name, pd.dept_name AS proj_dept\nFROM employees e\nJOIN departments ed ON e.department_id = ed.department_id\nJOIN works_on w ON e.emp_id = w.emp_id\nJOIN projects p ON w.project_id = p.project_id\nJOIN departments pd ON p.department_id = pd.department_id;",
        "query": "SELECT e.emp_name, ed.dept_name AS emp_dept, p.project_name, pd.dept_name AS proj_dept FROM employees e JOIN departments ed ON e.department_id = ed.department_id JOIN works_on w ON e.emp_id = w.emp_id JOIN projects p ON w.project_id = p.project_id JOIN departments pd ON p.department_id = pd.department_id;",
        "output": [
          {
            "emp_name": "Amit",
            "emp_dept": "Engineering",
            "project_name": "Alpha",
            "proj_dept": "Engineering"
          },
          {
            "emp_name": "Neha",
            "emp_dept": "Engineering",
            "project_name": "Beta",
            "proj_dept": "Engineering"
          },
          {
            "emp_name": "Amit",
            "emp_dept": "Engineering",
            "project_name": "Gamma",
            "proj_dept": "Marketing"
          }
        ]
      },
      {
        "question_id": 10,
        "title": "JOIN with GROUP BY",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query joining employees and departments to output each dept_name along with the count of employees in that department.",
        "initialCode": "-- Count employees per department\nSELECT d.dept_name, COUNT(e.emp_id) AS total_employees\nFROM departments d\nLEFT JOIN employees e ON d.department_id = e.department_id\nGROUP BY d.dept_name;",
        "query": "SELECT d.dept_name, COUNT(e.emp_id) AS total_employees FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.dept_name;",
        "output": [
          {
            "dept_name": "Engineering",
            "total_employees": 2
          },
          {
            "dept_name": "Human Resources",
            "total_employees": 2
          },
          {
            "dept_name": "Marketing",
            "total_employees": 0
          },
          {
            "dept_name": "Sales",
            "total_employees": 1
          }
        ]
      },
      {
        "question_id": 11,
        "title": "JOIN with Aggregations",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query joining departments and employees to display department name and average employee salary per department.",
        "initialCode": "-- Average salary per department\nSELECT d.dept_name, AVG(e.salary) AS avg_salary\nFROM departments d\nJOIN employees e ON d.department_id = e.department_id\nGROUP BY d.dept_name;",
        "query": "SELECT d.dept_name, AVG(e.salary) AS avg_salary FROM departments d JOIN employees e ON d.department_id = e.department_id GROUP BY d.dept_name;",
        "output": [
          {
            "dept_name": "Engineering",
            "avg_salary": 75000
          },
          {
            "dept_name": "Human Resources",
            "avg_salary": 60000
          },
          {
            "dept_name": "Sales",
            "avg_salary": 55000
          }
        ]
      },
      {
        "question_id": 12,
        "title": "JOIN with HAVING",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query joining employees and departments to display department names having an average salary greater than 60000.00.",
        "initialCode": "-- Department with avg salary > 60000\nSELECT d.dept_name, AVG(e.salary) AS avg_salary\nFROM departments d\nJOIN employees e ON d.department_id = e.department_id\nGROUP BY d.dept_name\nHAVING AVG(e.salary) > 60000.00;",
        "query": "SELECT d.dept_name, AVG(e.salary) AS avg_salary FROM departments d JOIN employees e ON d.department_id = e.department_id GROUP BY d.dept_name HAVING AVG(e.salary) > 60000.00;",
        "output": [
          {
            "dept_name": "Engineering",
            "avg_salary": 75000
          }
        ]
      },
      {
        "question_id": 13,
        "title": "Project Total Hours",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query joining projects and works_on to display each project's name and the total sum of hours logged for it.",
        "initialCode": "-- Total hours per project\nSELECT p.project_name, SUM(w.hours) AS total_hours\nFROM projects p\nJOIN works_on w ON p.project_id = w.project_id\nGROUP BY p.project_name;",
        "query": "SELECT p.project_name, SUM(w.hours) AS total_hours FROM projects p JOIN works_on w ON p.project_id = w.project_id GROUP BY p.project_name;",
        "output": [
          {
            "project_name": "Alpha",
            "total_hours": 120
          },
          {
            "project_name": "Beta",
            "total_hours": 150
          },
          {
            "project_name": "Gamma",
            "total_hours": 40
          }
        ]
      },
      {
        "question_id": 14,
        "title": "Employees Working on External Projects",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query to find employees working on projects controlled by a department different from their own assigned department.",
        "initialCode": "-- Employees on external projects\nSELECT e.emp_name, e.department_id AS emp_dept, p.project_name, p.department_id AS proj_dept\nFROM employees e\nJOIN works_on w ON e.emp_id = w.emp_id\nJOIN projects p ON w.project_id = p.project_id\nWHERE e.department_id <> p.department_id;",
        "query": "SELECT e.emp_name, e.department_id AS emp_dept, p.project_name, p.department_id AS proj_dept FROM employees e JOIN works_on w ON e.emp_id = w.emp_id JOIN projects p ON w.project_id = p.project_id WHERE e.department_id <> p.department_id;",
        "output": [
          {
            "emp_name": "Amit",
            "emp_dept": 20,
            "project_name": "Gamma",
            "proj_dept": 30
          }
        ]
      },
      {
        "question_id": 15,
        "title": "Count Direct Reports per Manager",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a SELF JOIN query with GROUP BY to list each manager's name and the total number of direct reports reporting to them.",
        "initialCode": "-- Manager and direct reports count\nSELECT m.emp_name AS manager_name, COUNT(e.emp_id) AS direct_reports\nFROM employees e\nJOIN employees m ON e.manager_id = m.emp_id\nGROUP BY m.emp_name;",
        "query": "SELECT m.emp_name AS manager_name, COUNT(e.emp_id) AS direct_reports FROM employees e JOIN employees m ON e.manager_id = m.emp_id GROUP BY m.emp_name;",
        "output": [
          {
            "manager_name": "Neha",
            "direct_reports": 1
          },
          {
            "manager_name": "Rahul",
            "direct_reports": 2
          }
        ]
      }
    ]
  },
  {
    "module_id": 4,
    "module_name": "Subqueries & Nested Logic",
    "short_name": "Subqueries & Logic",
    "description": "Formulate scalar subqueries, correlated subqueries, set memberships with IN / NOT IN, ANY, ALL, and existential operators EXISTS / NOT EXISTS.",
    "schema": {
      "tables": [
        {
          "table_name": "departments",
          "columns": [
            {
              "name": "department_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "dept_name",
              "type": "VARCHAR(50)",
              "key": null
            }
          ],
          "sample_data": [
            {
              "department_id": 10,
              "dept_name": "Human Resources"
            },
            {
              "department_id": 20,
              "dept_name": "Engineering"
            },
            {
              "department_id": 30,
              "dept_name": "Marketing"
            },
            {
              "department_id": 40,
              "dept_name": "Sales"
            }
          ]
        },
        {
          "table_name": "employees",
          "columns": [
            {
              "name": "emp_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "emp_name",
              "type": "VARCHAR(50)",
              "key": null
            },
            {
              "name": "department_id",
              "type": "INT",
              "key": "FOREIGN KEY"
            },
            {
              "name": "salary",
              "type": "DECIMAL(10,2)",
              "key": null
            }
          ],
          "sample_data": [
            {
              "emp_id": 101,
              "emp_name": "Amit",
              "department_id": 20,
              "salary": 65000
            },
            {
              "emp_id": 102,
              "emp_name": "Ravi",
              "department_id": 10,
              "salary": 45000
            },
            {
              "emp_id": 103,
              "emp_name": "Neha",
              "department_id": 20,
              "salary": 75000
            },
            {
              "emp_id": 104,
              "emp_name": "Priya",
              "department_id": 30,
              "salary": 55000
            },
            {
              "emp_id": 105,
              "emp_name": "Rahul",
              "department_id": 20,
              "salary": 85000
            }
          ]
        }
      ]
    },
    "questions": [
      {
        "question_id": 1,
        "title": "Above-Average Salary (Scalar Subquery)",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a query to find all employees earning strictly more than the overall average employee salary.",
        "initialCode": "-- Employees earning above overall average\nSELECT emp_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
        "query": "SELECT emp_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
        "output": [
          {
            "emp_name": "Neha",
            "salary": 75000
          },
          {
            "emp_name": "Rahul",
            "salary": 85000
          }
        ]
      },
      {
        "question_id": 2,
        "title": "Highest Paid Employee",
        "difficulty": "Easy",
        "points": 15,
        "question": "Write a query using a subquery to find the employee(s) who earn the single highest salary in the company.",
        "initialCode": "-- Employee with highest salary\nSELECT emp_name, salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);",
        "query": "SELECT emp_name, salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);",
        "output": [
          {
            "emp_name": "Rahul",
            "salary": 85000
          }
        ]
      },
      {
        "question_id": 3,
        "title": "Lowest Paid Employee",
        "difficulty": "Easy",
        "points": 15,
        "question": "Write a query using a subquery to find the details of the employee(s) with the lowest salary.",
        "initialCode": "-- Employee with lowest salary\nSELECT emp_name, salary FROM employees WHERE salary = (SELECT MIN(salary) FROM employees);",
        "query": "SELECT emp_name, salary FROM employees WHERE salary = (SELECT MIN(salary) FROM employees);",
        "output": [
          {
            "emp_name": "Ravi",
            "salary": 45000
          }
        ]
      },
      {
        "question_id": 4,
        "title": "Subquery in WHERE with IN",
        "difficulty": "Medium",
        "points": 15,
        "question": "Write a query using a subquery and the IN operator to retrieve all employees who belong to the 'Engineering' department.",
        "initialCode": "-- Subquery with IN operator\nSELECT emp_name, salary FROM employees WHERE department_id IN (SELECT department_id FROM departments WHERE dept_name = 'Engineering');",
        "query": "SELECT emp_name, salary FROM employees WHERE department_id IN (SELECT department_id FROM departments WHERE dept_name = 'Engineering');",
        "output": [
          {
            "emp_name": "Amit",
            "salary": 65000
          },
          {
            "emp_name": "Neha",
            "salary": 75000
          },
          {
            "emp_name": "Rahul",
            "salary": 85000
          }
        ]
      },
      {
        "question_id": 5,
        "title": "Subquery with NOT IN",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query using NOT IN to display employees who do not belong to either the 'Human Resources' or 'Sales' departments.",
        "initialCode": "-- Subquery with NOT IN\nSELECT emp_name, salary FROM employees WHERE department_id NOT IN (SELECT department_id FROM departments WHERE dept_name IN ('Human Resources', 'Sales'));",
        "query": "SELECT emp_name, salary FROM employees WHERE department_id NOT IN (SELECT department_id FROM departments WHERE dept_name IN ('Human Resources', 'Sales'));",
        "output": [
          {
            "emp_name": "Amit",
            "salary": 65000
          },
          {
            "emp_name": "Neha",
            "salary": 75000
          },
          {
            "emp_name": "Priya",
            "salary": 55000
          },
          {
            "emp_name": "Rahul",
            "salary": 85000
          }
        ]
      },
      {
        "question_id": 6,
        "title": "Subquery with ANY Operator",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using > ANY to find employees whose salary is greater than the salary of at least one employee in department 10.",
        "initialCode": "-- Subquery with > ANY\nSELECT emp_name, salary FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 10);",
        "query": "SELECT emp_name, salary FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 10);",
        "output": [
          {
            "emp_name": "Amit",
            "salary": 65000
          },
          {
            "emp_name": "Neha",
            "salary": 75000
          },
          {
            "emp_name": "Priya",
            "salary": 55000
          },
          {
            "emp_name": "Rahul",
            "salary": 85000
          }
        ]
      },
      {
        "question_id": 7,
        "title": "Subquery with ALL Operator",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using > ALL to find employees whose salary is greater than the salaries of all employees in department 10.",
        "initialCode": "-- Subquery with > ALL\nSELECT emp_name, salary FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 10);",
        "query": "SELECT emp_name, salary FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 10);",
        "output": [
          {
            "emp_name": "Amit",
            "salary": 65000
          },
          {
            "emp_name": "Neha",
            "salary": 75000
          },
          {
            "emp_name": "Priya",
            "salary": 55000
          },
          {
            "emp_name": "Rahul",
            "salary": 85000
          }
        ]
      },
      {
        "question_id": 8,
        "title": "Subquery with < ALL Operator",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using < ALL to list employees whose salary is lower than every employee working in department 20.",
        "initialCode": "-- Subquery with < ALL\nSELECT emp_name, salary FROM employees WHERE salary < ALL (SELECT salary FROM employees WHERE department_id = 20);",
        "query": "SELECT emp_name, salary FROM employees WHERE salary < ALL (SELECT salary FROM employees WHERE department_id = 20);",
        "output": [
          {
            "emp_name": "Ravi",
            "salary": 45000
          },
          {
            "emp_name": "Priya",
            "salary": 55000
          }
        ]
      },
      {
        "question_id": 9,
        "title": "Basic EXISTS Operator",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using EXISTS to list all departments that have at least one employee working in them.",
        "initialCode": "-- Departments with existing employees\nSELECT dept_name FROM departments d WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.department_id);",
        "query": "SELECT dept_name FROM departments d WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.department_id);",
        "output": [
          {
            "dept_name": "Human Resources"
          },
          {
            "dept_name": "Engineering"
          },
          {
            "dept_name": "Marketing"
          }
        ]
      },
      {
        "question_id": 10,
        "title": "Basic NOT EXISTS Operator",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using NOT EXISTS to list all departments that currently have no assigned employees.",
        "initialCode": "-- Departments without employees\nSELECT dept_name FROM departments d WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.department_id);",
        "query": "SELECT dept_name FROM departments d WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.department_id);",
        "output": [
          {
            "dept_name": "Sales"
          }
        ]
      },
      {
        "question_id": 11,
        "title": "Correlated Subquery (Department Average)",
        "difficulty": "Hard",
        "points": 30,
        "question": "Write a correlated subquery to find employees who earn more than the average salary of their own respective department.",
        "initialCode": "-- Correlated subquery for dept average\nSELECT e.emp_name, e.salary, e.department_id\nFROM employees e\nWHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id);",
        "query": "SELECT e.emp_name, e.salary, e.department_id FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id);",
        "output": [
          {
            "emp_name": "Rahul",
            "salary": 85000,
            "department_id": 20
          }
        ]
      },
      {
        "question_id": 12,
        "title": "Correlated Subquery (Department Maximum)",
        "difficulty": "Hard",
        "points": 30,
        "question": "Write a correlated subquery to list the highest-earning employee in each department.",
        "initialCode": "-- Highest earner per department\nSELECT e.emp_name, e.salary, e.department_id\nFROM employees e\nWHERE e.salary = (SELECT MAX(salary) FROM employees WHERE department_id = e.department_id);",
        "query": "SELECT e.emp_name, e.salary, e.department_id FROM employees e WHERE e.salary = (SELECT MAX(salary) FROM employees WHERE department_id = e.department_id);",
        "output": [
          {
            "emp_name": "Ravi",
            "salary": 45000,
            "department_id": 10
          },
          {
            "emp_name": "Priya",
            "salary": 55000,
            "department_id": 30
          },
          {
            "emp_name": "Rahul",
            "salary": 85000,
            "department_id": 20
          }
        ]
      },
      {
        "question_id": 13,
        "title": "Subquery in SELECT Clause",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query that selects emp_name, salary, and includes a computed column showing the company-wide average salary alongside each record.",
        "initialCode": "-- Subquery in SELECT clause\nSELECT emp_name, salary, (SELECT AVG(salary) FROM employees) AS company_avg_salary FROM employees;",
        "query": "SELECT emp_name, salary, (SELECT AVG(salary) FROM employees) AS company_avg_salary FROM employees;",
        "output": [
          {
            "emp_name": "Amit",
            "salary": 65000,
            "company_avg_salary": 65000
          },
          {
            "emp_name": "Ravi",
            "salary": 45000,
            "company_avg_salary": 65000
          },
          {
            "emp_name": "Neha",
            "salary": 75000,
            "company_avg_salary": 65000
          },
          {
            "emp_name": "Priya",
            "salary": 55000,
            "company_avg_salary": 65000
          },
          {
            "emp_name": "Rahul",
            "salary": 85000,
            "company_avg_salary": 65000
          }
        ]
      },
      {
        "question_id": 14,
        "title": "Subquery in FROM Clause (Derived Table)",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query that computes total salary per department in an inner subquery (FROM clause) and then selects the maximum department total from that result.",
        "initialCode": "-- Derived table in FROM clause\nSELECT MAX(dept_total) AS max_dept_payroll\nFROM (SELECT department_id, SUM(salary) AS dept_total FROM employees GROUP BY department_id) AS dept_summaries;",
        "query": "SELECT MAX(dept_total) AS max_dept_payroll FROM (SELECT department_id, SUM(salary) AS dept_total FROM employees GROUP BY department_id) AS dept_summaries;",
        "output": [
          {
            "max_dept_payroll": 225000
          }
        ]
      },
      {
        "question_id": 15,
        "title": "Nested Subqueries",
        "difficulty": "Hard",
        "points": 30,
        "question": "Write a query using double-nested subqueries to find employees working in the department that has the highest average salary.",
        "initialCode": "-- Employees in highest avg salary department\nSELECT emp_name, salary\nFROM employees\nWHERE department_id = (SELECT department_id FROM employees GROUP BY department_id ORDER BY AVG(salary) DESC LIMIT 1);",
        "query": "SELECT emp_name, salary FROM employees WHERE department_id = (SELECT department_id FROM employees GROUP BY department_id ORDER BY AVG(salary) DESC LIMIT 1);",
        "output": [
          {
            "emp_name": "Amit",
            "salary": 65000
          },
          {
            "emp_name": "Neha",
            "salary": 75000
          },
          {
            "emp_name": "Rahul",
            "salary": 85000
          }
        ]
      }
    ]
  },
  {
    "module_id": 5,
    "module_name": "Advanced Analytics & Complex Control Flow",
    "short_name": "Window Functions & CTEs",
    "description": "Execute window ranking (ROW_NUMBER, RANK, DENSE_RANK), moving metrics (LEAD, LAG, running totals), CASE expressions, Common Table Expressions (CTEs), and Set Operations.",
    "schema": {
      "tables": [
        {
          "table_name": "employees",
          "columns": [
            {
              "name": "emp_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "emp_name",
              "type": "VARCHAR(50)",
              "key": null
            },
            {
              "name": "department_id",
              "type": "INT",
              "key": null
            }
          ],
          "sample_data": [
            {
              "emp_id": 101,
              "emp_name": "Amit",
              "department_id": 20
            },
            {
              "emp_id": 102,
              "emp_name": "Ravi",
              "department_id": 10
            },
            {
              "emp_id": 103,
              "emp_name": "Neha",
              "department_id": 20
            },
            {
              "emp_id": 104,
              "emp_name": "Priya",
              "department_id": 30
            }
          ]
        },
        {
          "table_name": "sales",
          "columns": [
            {
              "name": "sale_id",
              "type": "INT",
              "key": "PRIMARY KEY"
            },
            {
              "name": "emp_id",
              "type": "INT",
              "key": "FOREIGN KEY"
            },
            {
              "name": "sale_amount",
              "type": "DECIMAL(10,2)",
              "key": null
            },
            {
              "name": "sale_date",
              "type": "DATE",
              "key": null
            },
            {
              "name": "region",
              "type": "VARCHAR(50)",
              "key": null
            }
          ],
          "sample_data": [
            {
              "sale_id": 1,
              "emp_id": 101,
              "sale_amount": 1500,
              "sale_date": "2024-01-10",
              "region": "North"
            },
            {
              "sale_id": 2,
              "emp_id": 102,
              "sale_amount": 2300,
              "sale_date": "2024-01-12",
              "region": "South"
            },
            {
              "sale_id": 3,
              "emp_id": 101,
              "sale_amount": 3100,
              "sale_date": "2024-01-15",
              "region": "North"
            },
            {
              "sale_id": 4,
              "emp_id": 103,
              "sale_amount": 1200,
              "sale_date": "2024-01-18",
              "region": "North"
            },
            {
              "sale_id": 5,
              "emp_id": 102,
              "sale_amount": 1900,
              "sale_date": "2024-01-20",
              "region": "South"
            },
            {
              "sale_id": 6,
              "emp_id": 101,
              "sale_amount": 2300,
              "sale_date": "2024-01-22",
              "region": "North"
            }
          ]
        }
      ]
    },
    "questions": [
      {
        "question_id": 1,
        "title": "Row Numbering",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query using ROW_NUMBER() OVER() to assign a unique sequential integer to each sale, ordered by sale_date ascending.",
        "initialCode": "-- Sequential row number ordered by sale_date\nSELECT sale_id, emp_id, sale_amount, sale_date, ROW_NUMBER() OVER(ORDER BY sale_date ASC) AS row_num FROM sales;",
        "query": "SELECT sale_id, emp_id, sale_amount, sale_date, ROW_NUMBER() OVER(ORDER BY sale_date ASC) AS row_num FROM sales;",
        "output": [
          {
            "sale_id": 1,
            "emp_id": 101,
            "sale_amount": 1500,
            "sale_date": "2024-01-10",
            "row_num": 1
          },
          {
            "sale_id": 2,
            "emp_id": 102,
            "sale_amount": 2300,
            "sale_date": "2024-01-12",
            "row_num": 2
          },
          {
            "sale_id": 3,
            "emp_id": 101,
            "sale_amount": 3100,
            "sale_date": "2024-01-15",
            "row_num": 3
          },
          {
            "sale_id": 4,
            "emp_id": 103,
            "sale_amount": 1200,
            "sale_date": "2024-01-18",
            "row_num": 4
          },
          {
            "sale_id": 5,
            "emp_id": 102,
            "sale_amount": 1900,
            "sale_date": "2024-01-20",
            "row_num": 5
          },
          {
            "sale_id": 6,
            "emp_id": 101,
            "sale_amount": 2300,
            "sale_date": "2024-01-22",
            "row_num": 6
          }
        ]
      },
      {
        "question_id": 2,
        "title": "Salary/Sale Ranking (RANK vs DENSE_RANK)",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using both RANK() and DENSE_RANK() to rank sales by sale_amount descending, demonstrating how ties are handled.",
        "initialCode": "-- Compare RANK and DENSE_RANK\nSELECT sale_id, sale_amount, RANK() OVER(ORDER BY sale_amount DESC) AS rnk, DENSE_RANK() OVER(ORDER BY sale_amount DESC) AS dense_rnk FROM sales;",
        "query": "SELECT sale_id, sale_amount, RANK() OVER(ORDER BY sale_amount DESC) AS rnk, DENSE_RANK() OVER(ORDER BY sale_amount DESC) AS dense_rnk FROM sales;",
        "output": [
          {
            "sale_id": 3,
            "sale_amount": 3100,
            "rnk": 1,
            "dense_rnk": 1
          },
          {
            "sale_id": 2,
            "sale_amount": 2300,
            "rnk": 2,
            "dense_rnk": 2
          },
          {
            "sale_id": 6,
            "sale_amount": 2300,
            "rnk": 2,
            "dense_rnk": 2
          },
          {
            "sale_id": 5,
            "sale_amount": 1900,
            "rnk": 4,
            "dense_rnk": 3
          },
          {
            "sale_id": 1,
            "sale_amount": 1500,
            "rnk": 5,
            "dense_rnk": 4
          },
          {
            "sale_id": 4,
            "sale_amount": 1200,
            "rnk": 6,
            "dense_rnk": 5
          }
        ]
      },
      {
        "question_id": 3,
        "title": "Partitioned Window Ranking",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using DENSE_RANK() OVER(PARTITION BY region ORDER BY sale_amount DESC) to rank sales individually within each region.",
        "initialCode": "-- Partitioned ranking by region\nSELECT sale_id, region, sale_amount, DENSE_RANK() OVER(PARTITION BY region ORDER BY sale_amount DESC) AS regional_rank FROM sales;",
        "query": "SELECT sale_id, region, sale_amount, DENSE_RANK() OVER(PARTITION BY region ORDER BY sale_amount DESC) AS regional_rank FROM sales;",
        "output": [
          {
            "sale_id": 3,
            "region": "North",
            "sale_amount": 3100,
            "regional_rank": 1
          },
          {
            "sale_id": 6,
            "region": "North",
            "sale_amount": 2300,
            "regional_rank": 2
          },
          {
            "sale_id": 1,
            "region": "North",
            "sale_amount": 1500,
            "regional_rank": 3
          },
          {
            "sale_id": 4,
            "region": "North",
            "sale_amount": 1200,
            "regional_rank": 4
          },
          {
            "sale_id": 2,
            "region": "South",
            "sale_amount": 2300,
            "regional_rank": 1
          },
          {
            "sale_id": 5,
            "region": "South",
            "sale_amount": 1900,
            "regional_rank": 2
          }
        ]
      },
      {
        "question_id": 4,
        "title": "Running Total Calculation",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using SUM(sale_amount) OVER(ORDER BY sale_date) to calculate a cumulative running total of sales over time.",
        "initialCode": "-- Cumulative running total of sales\nSELECT sale_id, sale_date, sale_amount, SUM(sale_amount) OVER(ORDER BY sale_date ASC) AS running_total FROM sales;",
        "query": "SELECT sale_id, sale_date, sale_amount, SUM(sale_amount) OVER(ORDER BY sale_date ASC) AS running_total FROM sales;",
        "output": [
          {
            "sale_id": 1,
            "sale_date": "2024-01-10",
            "sale_amount": 1500,
            "running_total": 1500
          },
          {
            "sale_id": 2,
            "sale_date": "2024-01-12",
            "sale_amount": 2300,
            "running_total": 3800
          },
          {
            "sale_id": 3,
            "sale_date": "2024-01-15",
            "sale_amount": 3100,
            "running_total": 6900
          },
          {
            "sale_id": 4,
            "sale_date": "2024-01-18",
            "sale_amount": 1200,
            "running_total": 8100
          },
          {
            "sale_id": 5,
            "sale_date": "2024-01-20",
            "sale_amount": 1900,
            "running_total": 10000
          },
          {
            "sale_id": 6,
            "sale_date": "2024-01-22",
            "sale_amount": 2300,
            "running_total": 12300
          }
        ]
      },
      {
        "question_id": 5,
        "title": "Partitioned Aggregate Window Function",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query displaying sale_id, region, sale_amount, and the average sale amount for that sale's region using AVG() OVER(PARTITION BY region).",
        "initialCode": "-- Average sale amount per region window\nSELECT sale_id, region, sale_amount, AVG(sale_amount) OVER(PARTITION BY region) AS avg_region_sale FROM sales;",
        "query": "SELECT sale_id, region, sale_amount, AVG(sale_amount) OVER(PARTITION BY region) AS avg_region_sale FROM sales;",
        "output": [
          {
            "sale_id": 1,
            "region": "North",
            "sale_amount": 1500,
            "avg_region_sale": 2025
          },
          {
            "sale_id": 3,
            "region": "North",
            "sale_amount": 3100,
            "avg_region_sale": 2025
          },
          {
            "sale_id": 4,
            "region": "North",
            "sale_amount": 1200,
            "avg_region_sale": 2025
          },
          {
            "sale_id": 6,
            "region": "North",
            "sale_amount": 2300,
            "avg_region_sale": 2025
          },
          {
            "sale_id": 2,
            "region": "South",
            "sale_amount": 2300,
            "avg_region_sale": 2100
          },
          {
            "sale_id": 5,
            "region": "South",
            "sale_amount": 1900,
            "avg_region_sale": 2100
          }
        ]
      },
      {
        "question_id": 6,
        "title": "Prior Value Access (LAG)",
        "difficulty": "Hard",
        "points": 30,
        "question": "Write a query using LAG(sale_amount) OVER(PARTITION BY emp_id ORDER BY sale_date) to retrieve each employee's previous sale amount alongside their current sale.",
        "initialCode": "-- Previous sale using LAG\nSELECT sale_id, emp_id, sale_date, sale_amount, LAG(sale_amount) OVER(PARTITION BY emp_id ORDER BY sale_date ASC) AS prev_sale FROM sales;",
        "query": "SELECT sale_id, emp_id, sale_date, sale_amount, LAG(sale_amount) OVER(PARTITION BY emp_id ORDER BY sale_date ASC) AS prev_sale FROM sales;",
        "output": [
          {
            "sale_id": 1,
            "emp_id": 101,
            "sale_date": "2024-01-10",
            "sale_amount": 1500,
            "prev_sale": null
          },
          {
            "sale_id": 3,
            "emp_id": 101,
            "sale_date": "2024-01-15",
            "sale_amount": 3100,
            "prev_sale": 1500
          },
          {
            "sale_id": 6,
            "emp_id": 101,
            "sale_date": "2024-01-22",
            "sale_amount": 2300,
            "prev_sale": 3100
          },
          {
            "sale_id": 2,
            "emp_id": 102,
            "sale_date": "2024-01-12",
            "sale_amount": 2300,
            "prev_sale": null
          },
          {
            "sale_id": 5,
            "emp_id": 102,
            "sale_date": "2024-01-20",
            "sale_amount": 1900,
            "prev_sale": 2300
          },
          {
            "sale_id": 4,
            "emp_id": 103,
            "sale_date": "2024-01-18",
            "sale_amount": 1200,
            "prev_sale": null
          }
        ]
      },
      {
        "question_id": 7,
        "title": "Next Value Access (LEAD)",
        "difficulty": "Hard",
        "points": 30,
        "question": "Write a query using LEAD(sale_amount) OVER(PARTITION BY emp_id ORDER BY sale_date) to display each employee's next upcoming sale amount.",
        "initialCode": "-- Next upcoming sale using LEAD\nSELECT sale_id, emp_id, sale_date, sale_amount, LEAD(sale_amount) OVER(PARTITION BY emp_id ORDER BY sale_date ASC) AS next_sale FROM sales;",
        "query": "SELECT sale_id, emp_id, sale_date, sale_amount, LEAD(sale_amount) OVER(PARTITION BY emp_id ORDER BY sale_date ASC) AS next_sale FROM sales;",
        "output": [
          {
            "sale_id": 1,
            "emp_id": 101,
            "sale_date": "2024-01-10",
            "sale_amount": 1500,
            "next_sale": 3100
          },
          {
            "sale_id": 3,
            "emp_id": 101,
            "sale_date": "2024-01-15",
            "sale_amount": 3100,
            "next_sale": 2300
          },
          {
            "sale_id": 6,
            "emp_id": 101,
            "sale_date": "2024-01-22",
            "sale_amount": 2300,
            "next_sale": null
          },
          {
            "sale_id": 2,
            "emp_id": 102,
            "sale_date": "2024-01-12",
            "sale_amount": 2300,
            "next_sale": 1900
          },
          {
            "sale_id": 5,
            "emp_id": 102,
            "sale_date": "2024-01-20",
            "sale_amount": 1900,
            "next_sale": null
          },
          {
            "sale_id": 4,
            "emp_id": 103,
            "sale_date": "2024-01-18",
            "sale_amount": 1200,
            "next_sale": null
          }
        ]
      },
      {
        "question_id": 8,
        "title": "Basic CASE Statement",
        "difficulty": "Easy",
        "points": 15,
        "question": "Write a query using a CASE expression to add a column named sale_category that flags sales over 2000.00 as 'High' and all others as 'Standard'.",
        "initialCode": "-- Categorize sale using CASE WHEN\nSELECT sale_id, sale_amount, CASE WHEN sale_amount > 2000.00 THEN 'High' ELSE 'Standard' END AS sale_category FROM sales;",
        "query": "SELECT sale_id, sale_amount, CASE WHEN sale_amount > 2000.00 THEN 'High' ELSE 'Standard' END AS sale_category FROM sales;",
        "output": [
          {
            "sale_id": 1,
            "sale_amount": 1500,
            "sale_category": "Standard"
          },
          {
            "sale_id": 2,
            "sale_amount": 2300,
            "sale_category": "High"
          },
          {
            "sale_id": 3,
            "sale_amount": 3100,
            "sale_category": "High"
          },
          {
            "sale_id": 4,
            "sale_amount": 1200,
            "sale_category": "Standard"
          },
          {
            "sale_id": 5,
            "sale_amount": 1900,
            "sale_category": "Standard"
          },
          {
            "sale_id": 6,
            "sale_amount": 2300,
            "sale_category": "High"
          }
        ]
      },
      {
        "question_id": 9,
        "title": "Multi-Condition CASE Statement",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query using CASE WHEN to categorize sales into three tiers: 'Tier 1' (> 2500), 'Tier 2' (1500–2500), and 'Tier 3' (< 1500).",
        "initialCode": "-- 3-Tier categorization with CASE WHEN\nSELECT sale_id, sale_amount, CASE WHEN sale_amount > 2500.00 THEN 'Tier 1' WHEN sale_amount BETWEEN 1500.00 AND 2500.00 THEN 'Tier 2' ELSE 'Tier 3' END AS tier FROM sales;",
        "query": "SELECT sale_id, sale_amount, CASE WHEN sale_amount > 2500.00 THEN 'Tier 1' WHEN sale_amount BETWEEN 1500.00 AND 2500.00 THEN 'Tier 2' ELSE 'Tier 3' END AS tier FROM sales;",
        "output": [
          {
            "sale_id": 1,
            "sale_amount": 1500,
            "tier": "Tier 2"
          },
          {
            "sale_id": 2,
            "sale_amount": 2300,
            "tier": "Tier 2"
          },
          {
            "sale_id": 3,
            "sale_amount": 3100,
            "tier": "Tier 1"
          },
          {
            "sale_id": 4,
            "sale_amount": 1200,
            "tier": "Tier 3"
          },
          {
            "sale_id": 5,
            "sale_amount": 1900,
            "tier": "Tier 2"
          },
          {
            "sale_id": 6,
            "sale_amount": 2300,
            "tier": "Tier 2"
          }
        ]
      },
      {
        "question_id": 10,
        "title": "Conditional Aggregation",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using SUM(CASE WHEN ... THEN ... END) to calculate the total sales amount for the 'North' region and 'South' region as separate output columns in a single row.",
        "initialCode": "-- Conditional sum for North and South\nSELECT SUM(CASE WHEN region = 'North' THEN sale_amount ELSE 0 END) AS north_total, SUM(CASE WHEN region = 'South' THEN sale_amount ELSE 0 END) AS south_total FROM sales;",
        "query": "SELECT SUM(CASE WHEN region = 'North' THEN sale_amount ELSE 0 END) AS north_total, SUM(CASE WHEN region = 'South' THEN sale_amount ELSE 0 END) AS south_total FROM sales;",
        "output": [
          {
            "north_total": 8100,
            "south_total": 4200
          }
        ]
      },
      {
        "question_id": 11,
        "title": "Single Common Table Expression (CTE)",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query using a WITH clause to compute total sales per employee, then filter the CTE result to display only employees with total sales exceeding 3000.00.",
        "initialCode": "-- CTE with summary filter\nWITH emp_sales_summary AS (SELECT emp_id, SUM(sale_amount) AS total_sales FROM sales GROUP BY emp_id)\nSELECT emp_id, total_sales FROM emp_sales_summary WHERE total_sales > 3000.00;",
        "query": "WITH emp_sales_summary AS (SELECT emp_id, SUM(sale_amount) AS total_sales FROM sales GROUP BY emp_id) SELECT emp_id, total_sales FROM emp_sales_summary WHERE total_sales > 3000.00;",
        "output": [
          {
            "emp_id": 101,
            "total_sales": 6900
          },
          {
            "emp_id": 102,
            "total_sales": 4200
          }
        ]
      },
      {
        "question_id": 12,
        "title": "Multiple CTEs",
        "difficulty": "Hard",
        "points": 25,
        "question": "Write a query using two sequential CTEs: the first calculating total sales per employee, and the second joining that summary with the employees table to include employee names.",
        "initialCode": "-- Multiple CTEs chaining\nWITH sales_totals AS (SELECT emp_id, SUM(sale_amount) AS total_sales FROM sales GROUP BY emp_id),\nemp_details AS (SELECT e.emp_id, e.emp_name, st.total_sales FROM employees e JOIN sales_totals st ON e.emp_id = st.emp_id)\nSELECT * FROM emp_details;",
        "query": "WITH sales_totals AS (SELECT emp_id, SUM(sale_amount) AS total_sales FROM sales GROUP BY emp_id), emp_details AS (SELECT e.emp_id, e.emp_name, st.total_sales FROM employees e JOIN sales_totals st ON e.emp_id = st.emp_id) SELECT * FROM emp_details;",
        "output": [
          {
            "emp_id": 101,
            "emp_name": "Amit",
            "total_sales": 6900
          },
          {
            "emp_id": 102,
            "emp_name": "Ravi",
            "total_sales": 4200
          },
          {
            "emp_id": 103,
            "emp_name": "Neha",
            "total_sales": 1200
          }
        ]
      },
      {
        "question_id": 13,
        "title": "Set Operation (UNION vs UNION ALL)",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write queries using UNION and UNION ALL to combine list of emp_ids from the sales table and the employees table, observing how duplicates are handled.",
        "initialCode": "-- UNION distinct employee IDs\nSELECT emp_id FROM employees UNION SELECT emp_id FROM sales;",
        "query": "SELECT emp_id FROM employees UNION SELECT emp_id FROM sales;",
        "output": [
          {
            "emp_id": 101
          },
          {
            "emp_id": 102
          },
          {
            "emp_id": 103
          },
          {
            "emp_id": 104
          }
        ]
      },
      {
        "question_id": 14,
        "title": "Set Operation (INTERSECT)",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query using INTERSECT to find emp_id values that exist in both the employees table and the sales table.",
        "initialCode": "-- INTERSECT common employee IDs\nSELECT emp_id FROM employees INTERSECT SELECT emp_id FROM sales;",
        "query": "SELECT emp_id FROM employees INTERSECT SELECT emp_id FROM sales;",
        "output": [
          {
            "emp_id": 101
          },
          {
            "emp_id": 102
          },
          {
            "emp_id": 103
          }
        ]
      },
      {
        "question_id": 15,
        "title": "Set Operation (EXCEPT / MINUS)",
        "difficulty": "Medium",
        "points": 20,
        "question": "Write a query using EXCEPT (or MINUS) to find employees present in the employees table who have never recorded a transaction in the sales table.",
        "initialCode": "-- EXCEPT employees without sales\nSELECT emp_id FROM employees EXCEPT SELECT emp_id FROM sales;",
        "query": "SELECT emp_id FROM employees EXCEPT SELECT emp_id FROM sales;",
        "output": [
          {
            "emp_id": 104
          }
        ]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SQL_MODULES };
}
