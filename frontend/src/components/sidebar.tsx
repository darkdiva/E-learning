import React, { useState } from "react"
import "../App.css"
import FilteredUsersList from "./filteredUserList";


export default function Side_bar() {
    const [selectedRole, setSelectedRole] = useState("instructor");
    const handleRoleClick = (role: string) => {
        setSelectedRole(role);
    }

  return (
    <div className="side_bar">
      <div className="side_bar_container">
        <div className="group-24">
            <div className={`instructors role ${selectedRole === 'instructor' ? 'side_bar_selected' : ''}`}>
              <img
                src="https://cdn.iconfinder.com/stored_data/1005025/128/png?token=1682540590-kXFc4Hnm5JM675WxZlxVdvpe0KCWF%2F1kfp4IYfZZeR4%3D"
                className="image-5"
              />
              <p onClick={() => handleRoleClick("instructor")} className="instructors_2">Instructors</p>
            </div>
          <div className={`students role ${selectedRole === 'student' ? 'side_bar_selected' : ''}`}>
            <img
              src="https://cdn.iconfinder.com/stored_data/1005010/128/png?token=1682540089-Mggk%2F1d%2BgD6C3yIHkF5mLASkKpZWaXXp%2FaImQWOPQqE%3D"
              className="image-3"
            />
            <p onClick={() => handleRoleClick("student")} className="students_2">Students</p>
          </div>
          <div className={`contentcreators role ${selectedRole === 'content creator' ? 'side_bar_selected' : ''}`}>
            <img
              src="https://cdn.iconfinder.com/stored_data/1005048/128/png?token=1682541188-qAa61w0WhCXjLedcUwHbYnxomWx%2BvIo7TeCIp%2FX2tjg%3D"
              className="image-4"
            />
            <p onClick={() => handleRoleClick("content creator")} className="contentcreators_2">Content Creators</p>
          </div>
          <div className={`contentmanager role ${selectedRole === 'content manager' ? 'side_bar_selected' : ''}`}>
            <img
              src="https://cdn.iconfinder.com/stored_data/1005057/128/png?token=1682541470-pmKpGNFPq2cuOxfTI9ky8mPCkeJLKABf0xryqrTY6cU%3D"
              className="image-8"
            />
            <p onClick={() => handleRoleClick("content manager")} className="contentmanager_2">Content Manager</p>
          </div>
          <div className={`admin role ${selectedRole === 'admin' ? 'side_bar_selected' : ''}`}>
            <p onClick={() => handleRoleClick("admin")} className="admin_2">Administrators</p>
            <img
              src="https://cdn.iconfinder.com/stored_data/1005036/128/png?token=1682540844-UPN2hJNMNlJMj1wQtvuK97CHvg%2BH04zSnhmBA%2BkCriM%3D"
              className="image-1"
            />
          </div>
          <div className={`parent role ${selectedRole === 'parent' ? 'side_bar_selected' : ''}`}>
            <img
              src="https://cdn.iconfinder.com/stored_data/1005059/128/png?token=1682541573-zhuydKx7D334r9tTqAc2GdOwiiJHmXNZNEsid%2FzAe8Y%3D"
              className="image-81"
            />
            <p onClick={() => handleRoleClick("parent")} className="parent_2">Parents</p>
          </div>
          <div className="line-1" />
          <p className="clients">Clients</p>
          <div className="message">
            <img
              src="https://cdn.iconfinder.com/stored_data/922805/128/png?token=1682541622-Rdyyvf2WhX5Z4JjnJG6OGkwtDYw1KtrqVE2KCGRD94U%3D"
              className="image-10"
            />
            <p className="message_2">Message</p>
          </div>
          <div className="call">
            <img
              src="https://cdn.iconfinder.com/stored_data/1005064/128/png?token=1682541692-aNrYxou1dXK3f80qOijm3M3JyhbTnUSOGaRffDZduJ8%3D"
              className="image-11"
            />
            <p className="call-meeting">Call Meeting</p>
          </div>
          <div className="line-45" />
          <div className="log-out">
            <img
              src="https://cdn.iconfinder.com/stored_data/1005070/128/png?token=1682541857-GGQpOwG5GzPmzLI%2B9%2BtJEkWrxdASPDneSk%2FbwRmKfl0%3D"
              className="logout"
            />
            <p className="logout-1">Log out</p>
          </div>
        </div>
      </div>
      <FilteredUsersList role={selectedRole} />
    </div>
  )
}
