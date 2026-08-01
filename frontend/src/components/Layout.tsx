import { Link, Outlet } from 'react-router-dom';
export default function Layout(){
 const links=[['/','Control Tower'],['/operations','Operations'],['/clients','CRM Clients'],['/fleet','Fleet'],['/drivers','Chauffeurs'],['/notifications','Notifications'],['/supply','Supply'],['/warehouse','Warehouse'],['/finance','Finance'],['/admin','Administration']];
 return <div className="app"><aside className="sidebar"><div className="brand">MSS COMMAND CENTER<small>STABLE 0.9.1</small></div><nav className="nav">{links.map(([to,label])=><Link key={to} to={to}>{label}</Link>)}</nav></aside><main className="main"><Outlet/></main></div>
}