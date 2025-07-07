import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const JobsContext = createContext();

export default function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  // Load jobs from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const storedJobs = await AsyncStorage.getItem('jobs');
      if (storedJobs) setJobs(JSON.parse(storedJobs));
    })();
  }, []);

  // Save jobs to AsyncStorage whenever jobs change
  useEffect(() => {
    AsyncStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs((prevJobs) => [
      { ...job, id: prevJobs.length + 1 },
      ...prevJobs,
    ]);
  };
  const deleteJob = (jobId) => {
  setJobs((prevJobs) => prevJobs.filter(job => job.id !== jobId));
};

  return (
    <JobsContext.Provider value={{ jobs, addJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
}