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

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id value: ' + id);
  }
  return id;
};
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name value: ' + name);
  }
  return name;
};
const parseSSn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn value: ' + ssn);
  }
  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation value: ' + occupation);
  }
  return occupation;
};
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description value: ' + description);
  }
  return description;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist value: ' + specialist);
  }
  return specialist;
};
const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria value: ' + criteria);
  }
  return criteria;
};
const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName value: ' + employerName);
  }
  return employerName;
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
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
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
      id: parseId(id),
      description: parseDescription(description),
      date: parseDate(date),
      specialist: parseSpecialist(specialist),
      healthCheckRating: parseHealthCheckRating(healthCheckRating),
      type,
    };
    return newEntry;
  } else if (type === 'Hospital') {
    const newEntry: HospitalEntry = {
      id: parseId(id),
      description: parseDescription(description),
      date: parseDate(date),
      specialist: parseSpecialist(specialist),
      discharge: {
        date: parseDate(discharge.date),
        criteria: parseCriteria(discharge.criteria),
      },
      type,
    };
    return newEntry;
  } else if (type === 'OccupationalHealthcare') {
    const newEntry: OccupationalHealthcareEntry = {
      id: parseId(id),
      description: parseDescription(description),
      date: parseDate(date),
      specialist: parseSpecialist(specialist),
      employerName: parseEmployerName(employerName),
      type,
    };
    return newEntry;
  }
  return;
};
