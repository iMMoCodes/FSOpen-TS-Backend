import patientData from '../../data/patientsUpdated';
import { v1 as uuid } from 'uuid';

import { toNewPatientEntry } from '../utils';
import { Patient, NewPatientEntry, Entry } from '../types';

const patients: Patient[] = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

const getEntriesExceptSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
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

const addPatientEntry = (
  entry: Entry | undefined,
  pat: Patient | undefined
): Entry | undefined => {
  if (pat && entry) {
    const newEntryEntry = {
      ...entry,
    };
    pat.entries.push(newEntryEntry);
    return newEntryEntry;
  }
  return undefined;
};

export default {
  getEntries,
  findById,
  getEntriesExceptSsn,
  addPatient,
  addPatientEntry,
};
