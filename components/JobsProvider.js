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
      else setJobs([
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'Tech Corp',
          location: "Remote",
          description: 'Build and maintain web/mobile interfaces.',
          salary: "$80k - $100k",
          link: 'https://www.indeed.com/viewjob?jk=d46480488e3aa20c'
        },
        {
          id: 2,
          title: 'Backend Developer',
          company: 'Data Inc.',
          location: "Remote",
          description: 'Work on APIs and server-side logic.',
          salary: "$80k - $100k",
          link: 'https://www.indeed.com/viewjob?jk=ba9bf4e04cfd9cdb',
        },
      ]);
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