import {
  Entry,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewPatientEntry,
  OccupationalHealthcareEntry,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCareCheck = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseHealthCheckRating = (HCRating: unknown): HealthCheckRating => {
  if (!HCRating || !isHealthCareCheck(HCRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + HCRating);
  }
  return HCRating;
};

const parseString = (x: unknown): string => {
  if (!x || !isString(x)) {
    throw new Error('Incorrect or missing string value: ' + x);
  }
  return x;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: Entry[];
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: entries,
  };
  return newEntry;
};

type EntryFields = {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  healthCheckRating: unknown;
  type: unknown;
  discharge: {
    date: unknown;
    criteria: unknown;
  };
  employerName: unknown;
};

export const toNewEntry = ({
  id,
  description,
  date,
  specialist,
  type,
  healthCheckRating,
  employerName,
  discharge,
}: EntryFields): Entry | undefined => {
  if (type === 'HealthCheck') {
    const newEntry: HealthCheckEntry = {
      id: parseString(id),
      description: parseString(description),
      date: parseDate(date),
      specialist: parseString(specialist),
      healthCheckRating: parseHealthCheckRating(healthCheckRating),
      type,
    };
    return newEntry;
  } else if (type === 'Hospital') {
    const newEntry: HospitalEntry = {
      id: parseString(id),
      description: parseString(description),
      date: parseDate(date),
      specialist: parseString(specialist),
      discharge: {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria),
      },
      type,
    };
    return newEntry;
  } else if (type === 'OccupationalHealthcare') {
    const newEntry: OccupationalHealthcareEntry = {
      id: parseString(id),
      description: parseString(description),
      date: parseDate(date),
      specialist: parseString(specialist),
      employerName: parseString(employerName),
      type,
    };
    return newEntry;
  }
  return;
};
