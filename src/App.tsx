import { useEffect, useState } from 'react'
import jobsData from './data.json'
import { dataTypes } from './utils/types'
import './App.css'
import JobsCard from './components/JobsCard'
import crossIcon from './assets/icon-remove.svg'
import accountLogo from './assets/account.svg'
import eyecamLogo from './assets/eyecam-co.svg'
import faceitLogo from './assets/faceit.svg'
import insureLogo from './assets/insure.svg'
import loopStudiosLogo from './assets/loop-studios.svg'
import manageLogo from './assets/manage.svg'
import myhomeLogo from './assets/myhome.svg'
import photosnapLogo from './assets/photosnap.svg'
import shortlyLogo from './assets/shortly.svg'
import airFilterLogo from './assets/the-air-filter-company.svg'

function App() {
  const [jobs, setJobs] = useState<dataTypes[]>([])
  const [filter, setFilter] = useState<string[]>([])

  useEffect(() => {
    setJobs(jobsData as dataTypes[])
  }, [])

  function filterJobs() {
    if (filter.length > 0) {
      const filteredJobs = jobsData.filter((d) => {
        return filter.every((key) => {
          return d.role == key ||
            d.level == key ||
            d.languages.includes(key) ||
            d.tools.includes(key)
        })
      })
      setJobs(filteredJobs as dataTypes[])
    } else {
      setJobs(jobsData as dataTypes[])
    }
  }

  function addFilter(e: any) {
    if (!filter.includes(e.target.innerHTML)) {
      setFilter(current => [...current, e.target.innerHTML])
    }
    console.log(filter)
  }

  function deleteTag(tag: any) {
    setFilter(current => current.filter(item => item !== tag))
  }

  useEffect(() => {
    filterJobs();
  }, [filter])

  return (
    <div className='App'>
      <div className="headerCont">
        <header></header>
        <div className="filter">
          <div className="filterSection">
            {filter.map(item => (
              <div className='tagsWrapper'>
                <div className="filterTag">{item}</div>
                <div className="deleteTag" onClick={() => deleteTag(item)}>
                  <img src={crossIcon} alt="cross icon" />
                </div>
              </div>
            ))}
          </div>
          <div className="clearSection" onClick={() => setFilter([])}>Clear</div>
        </div>
      </div>
      {jobs.map(job => (
        <div className='jobCardWrapper'>
          {job.featured ? (<div className="featuredLine"></div>) : null}
          <JobsCard key={job.id} avatarSrc={job.company.includes("Photosnap") ? photosnapLogo : job.company.includes("Manage") ? manageLogo : job.company.includes("Account") ? accountLogo : job.company.includes("MyHome") ? myhomeLogo : job.company.includes("Loop Studios") ? loopStudiosLogo : job.company.includes("FaceIt") ? faceitLogo : job.company.includes("Shortly") ? shortlyLogo : job.company.includes("Insure") ? insureLogo : job.company.includes("Eyecam Co.") ? eyecamLogo : job.company.includes("Filter Company") ? airFilterLogo : '' }
            jobName={job.position}
            employeer={job.company}
            postedAt={job.postedAt}
            contract={job.contract}
            location={job.location}
            languages={job.languages}
            tools={job.tools}
            role={job.role}
            level={job.level}
            isFeatured={job.featured}
            isNew={job.new}
            addFilter={(tag: any) => addFilter(tag)}
          />
        </div>

      ))}
    </div>
  )
}

export default App
