import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

import { toNewPatientEntry } from '../utils';
import { Patient, NewPatientEntry } from '../types';

const patients: Patient[] = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Array<Patient> => {
  return patients;
};

const getEntriesExceptSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getEntriesExceptSsn, addPatient };
