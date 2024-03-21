import './JobsCard.css'

interface Props {
  avatarSrc: string,
  employeer: string,
  jobName: string,
  postedAt: string,
  contract: string,
  location: string,
  languages: string[],
  tools: string[],
  role: string,
  level: string
  isNew: boolean,
  isFeatured: boolean
  addFilter: any
}

export default function JobsCard(props: Props) {
  return (
    <div className='JobsCard'>
      <div className="contentCont">
        <img src={props.avatarSrc} alt="Avatar" className='avatarImg' />
        <div className="jobInfo">
          <div className="employeer">
            <h1>{props.employeer}</h1>
            {props.isNew ? (<div className="badge new"><span>NEW!</span></div>) : null}
            {props.isFeatured ? (<div className="badge featured"><span>FEATURED</span></div>) : null}
          </div>
          <div className="jobName">{props.jobName}</div>
          <div className="jobDetails">{props.postedAt} • {props.contract} • {props.location}</div>
        </div>
      </div>
      <hr />
      <div className="jobTags">
        <div className="tag" onClick={props.addFilter}>{props.role}</div>
        <div className="tag" onClick={props.addFilter}>{props.level}</div>
        {props.languages.map(language => (
          <div className="tag" onClick={props.addFilter}>{language}</div>
        ))}
        {props.tools.map(tools => (
          <div className="tag" onClick={props.addFilter}>{tools}</div>
        ))}
      </div>
    </div>
  )
}
