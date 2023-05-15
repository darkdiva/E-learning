import React from "react";
import "../App.css";
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="top">
      <div className="nav_container">
      <p className="ib_league">IB League</p>
        <div className="top-left">
          <Link to="/api/home" className="home">Home</Link>
          <p className="workspace">Ad Banner</p>
          <div className="selected">
            <Link to="/api/admin/community" className="community">Community</Link>
          </div>
          <p className="subscription">Subscription</p>
        </div>
        <img 
        src="https://cdn.iconfinder.com/stored_data/1004986/128/png?token=1682539325-UeKDDCNlIRCfGXC7u3LBoE8z%2BmKkCOxCQTyNd8%2FzjVQ%3D" 
        className="search_bar"/>
        <div 
        className="top-right">
          <img src="https://cdn.iconfinder.com/stored_data/1004344/128/png?token=1682520389-By%2F41cZTYrx%2BIeSksEsClpazrQEj1AxpWUvpDr0I62Y%3D"/>
          <img src="https://cdn.iconfinder.com/stored_data/1004332/128/png?token=1682519938-x5OU3LParVDQMbJopHCZO1S%2BRwR0xMO73aBQi5nC%2FHE%3D"/>
          <img src="https://cdn.iconfinder.com/stored_data/1004352/128/png?token=1682520606-lBxI0j28r0oOAXZ8sXSMVBM5v%2F6LSzPPvgIknHKIX%2Bk%3D"/>
        </div>
      </div>
    </div>
  )
}

