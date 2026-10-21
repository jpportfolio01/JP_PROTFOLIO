const SEED_DATA = {
  province_names: [
    { province_id: 'ON', province_name: 'Ontario' },
    { province_id: 'BC', province_name: 'British Columbia' },
    { province_id: 'AB', province_name: 'Alberta' },
    { province_id: 'QC', province_name: 'Quebec' },
    { province_id: 'NS', province_name: 'Nova Scotia' },
    { province_id: 'MB', province_name: 'Manitoba' }
  ],
  doctors: [
    { doctor_id: 1, first_name: 'Claude', last_name: 'Monet', specialty: 'Cardiology' },
    { doctor_id: 2, first_name: 'Georgia', last_name: 'O-Keeffe', specialty: 'Neurology' },
    { doctor_id: 3, first_name: 'Vincent', last_name: 'van Gogh', specialty: 'Pediatrics' },
    { doctor_id: 4, first_name: 'Pablo', last_name: 'Picasso', specialty: 'Orthopedics' },
    { doctor_id: 5, first_name: 'Frida', last_name: 'Kahlo', specialty: 'General Surgery' }
  ],
  patients: [
    { patient_id: 1, first_name: 'Donald', last_name: 'Waterfield', gender: 'M', birth_date: '1963-02-12', city: 'Toronto', province_id: 'ON', allergies: 'Penicillin', height: 156, weight: 65 },
    { patient_id: 2, first_name: 'Mickey', last_name: 'Bannister', gender: 'M', birth_date: '1995-05-18', city: 'Hamilton', province_id: 'ON', allergies: null, height: 185, weight: 88 },
    { patient_id: 3, first_name: 'Jocelyn', last_name: 'Stronach', gender: 'F', birth_date: '1984-11-22', city: 'Vancouver', province_id: 'BC', allergies: 'Sulfa', height: 162, weight: 58 },
    { patient_id: 4, first_name: 'Daphne', last_name: 'Phelps', gender: 'F', birth_date: '1976-08-30', city: 'Calgary', province_id: 'AB', allergies: 'Penicillin', height: 170, weight: 72 },
    { patient_id: 5, first_name: 'Wallace', last_name: 'Browning', gender: 'M', birth_date: '1959-01-15', city: 'Ottawa', province_id: 'ON', allergies: null, height: 178, weight: 81 },
    { patient_id: 6, first_name: 'Alice', last_name: 'Wonder', gender: 'F', birth_date: '2001-04-10', city: 'Montreal', province_id: 'QC', allergies: 'Aspirin', height: 165, weight: 55 },
    { patient_id: 7, first_name: 'Robert', last_name: 'Smith', gender: 'M', birth_date: '1988-09-05', city: 'Toronto', province_id: 'ON', allergies: null, height: 192, weight: 95 },
    { patient_id: 8, first_name: 'Elena', last_name: 'Rostova', gender: 'F', birth_date: '1992-12-03', city: 'Vancouver', province_id: 'BC', allergies: null, height: 168, weight: 62 },
    { patient_id: 9, first_name: 'Karan', last_name: 'Sharma', gender: 'M', birth_date: '1999-07-21', city: 'Edmonton', province_id: 'AB', allergies: 'Dust', height: 174, weight: 70 },
    { patient_id: 10, first_name: 'Aisha', last_name: 'Khan', gender: 'F', birth_date: '1997-03-14', city: 'Victoria', province_id: 'BC', allergies: 'Penicillin', height: 160, weight: 54 }
  ],
  admissions: [
    { patient_id: 1, admission_date: '2023-01-10', discharge_date: '2023-01-15', diagnosis: 'Hypertension', attending_doctor_id: 1 },
    { patient_id: 2, admission_date: '2023-02-04', discharge_date: '2023-02-08', diagnosis: 'Fractured Rib', attending_doctor_id: 4 },
    { patient_id: 3, admission_date: '2023-03-12', discharge_date: '2023-03-18', diagnosis: 'Migraine', attending_doctor_id: 2 },
    { patient_id: 4, admission_date: '2023-04-01', discharge_date: '2023-04-05', diagnosis: 'Appendicitis', attending_doctor_id: 5 },
    { patient_id: 5, admission_date: '2023-05-20', discharge_date: '2023-05-26', diagnosis: 'Hypertension', attending_doctor_id: 1 },
    { patient_id: 7, admission_date: '2023-06-11', discharge_date: '2023-06-16', diagnosis: 'Concussion', attending_doctor_id: 2 },
    { patient_id: 8, admission_date: '2023-07-08', discharge_date: '2023-07-12', diagnosis: 'Asthma', attending_doctor_id: 3 },
    { patient_id: 9, admission_date: '2023-08-19', discharge_date: '2023-08-25', diagnosis: 'Appendicitis', attending_doctor_id: 5 }
  ]
};

module.exports = { SEED_DATA };
