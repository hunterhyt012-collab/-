import React, { useState } from 'react';
import { 
  Users, Building2, Briefcase, CheckSquare, Calendar, 
  BarChart3, Settings, Menu as MenuIcon, ChevronDown, ChevronRight, LogOut, LayoutDashboard,
  FileText, ShieldCheck, List
} from 'lucide-react';
import { MenuItem, ViewType } from '../types';

interface SidebarProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'user-mgmt': true, 
    'attend-mgmt': true
  });

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Structure based on User Request
  const menuStructure: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      view: ViewType.DASHBOARD
    },
    // 1. UserManagement
    {
      id: 'user-mgmt',
      label: 'User Management',
      icon: Users,
      subItems: [
        { id: 'add-user', label: 'Add User', view: ViewType.ADD_USER },
        { id: 'all-users', label: 'All User', view: ViewType.ALL_USERS },
      ]
    },
    // 2. DepartmentManagement
    {
      id: 'dept-mgmt',
      label: 'Department Management',
      icon: Building2,
      subItems: [
        { id: 'add-dept', label: 'Add Department', view: ViewType.ADD_DEPT },
        { id: 'all-depts', label: 'All Department', view: ViewType.ALL_DEPTS },
      ]
    },
    // 3. ProjectManagement
    {
      id: 'proj-mgmt',
      label: 'Project Management',
      icon: Briefcase,
      subItems: [
        { id: 'add-proj', label: 'Add Project', view: ViewType.ADD_PROJECT },
        { id: 'all-projs', label: 'All Project', view: ViewType.ALL_PROJECTS },
      ]
    },
    // 4. TaskManagement
    {
      id: 'task-mgmt',
      label: 'Task Management',
      icon: CheckSquare,
      subItems: [
        { id: 'add-task', label: 'Add Task', view: ViewType.ADD_TASK },
        { id: 'all-tasks', label: 'All Task', view: ViewType.ALL_TASKS },
      ]
    },
    // 5. AttendanceManagement
    {
      id: 'attend-mgmt',
      label: 'Attendance Management',
      icon: Calendar,
      subItems: [
        { id: 'work-rec', label: 'Work Record Registration', view: ViewType.WORK_RECORD_REGISTRATION },
        { id: 'view-date', label: 'View Attendance By Date', view: ViewType.VIEW_ATTENDANCE_BY_DATE },
        { id: 'view-daily', label: 'View Daily Details', view: ViewType.VIEW_DAILY_DETAILS },
        { id: 'attend-app', label: 'Attendance Approval', view: ViewType.ATTENDANCE_APPROVAL },
      ]
    },
    // 6. ReportManagement
    {
      id: 'report-mgmt',
      label: 'Report Management',
      icon: BarChart3,
      subItems: [
        { id: 'rep-sum', label: 'Report Summary', view: ViewType.REPORT_SUMMARY },
      ]
    },

    },
    // 7. MenuManagement
    {
      id: 'menu-mgmt',
      label: 'Menu Management',
      icon: MenuIcon,
      subItems: [
        { id: 'add-menu', label: 'Add Menu', view: ViewType.ADD_MENU },
        { id: 'all-menu', label: 'All Menu', view: ViewType.ALL_MENUS },
      ]
    },
  ];

  return (
    <div className="w-72 bg-slate-900 text-slate-300 flex flex-col h-full shadow-xl font-sans border-r border-slate-800">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/30">
          <span className="text-white font-bold text-lg">J</span>
        </div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-tight leading-none">JavaSwing</h1>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Dashboard UI</span>
        </div>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700">
        <nav className="space-y-1 px-3">
          {menuStructure.map((item) => (
            <div key={item.id} className="mb-1">
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      expandedMenus[item.id] 
                        ? 'bg-slate-800/80 text-white shadow-sm' 
                        : 'hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon && <item.icon className={`w-5 h-5 mr-3 transition-colors ${expandedMenus[item.id] ? 'text-indigo-400' : 'text-slate-400'}`} />}
                      {item.label}
                    </div>
                    {expandedMenus[item.id] ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  
                  {/* Submenu items with animation container */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus[item.id] ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-4 space-y-1 pl-4 border-l-2 border-slate-700/50">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => subItem.view && onNavigate(subItem.view as ViewType)}
                          className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-150 group ${
                            currentView === subItem.view
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-colors ${currentView === subItem.view ? 'bg-white' : 'bg-slate-600 group-hover:bg-slate-400'}`}></span>
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => item.view && onNavigate(item.view as ViewType)}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    currentView === item.view
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                      : 'hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {item.icon && <item.icon className={`w-5 h-5 mr-3 ${currentView === item.view ? 'text-white' : 'text-slate-400'}`} />}
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-slate-400 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors group">
          <LogOut className="w-5 h-5 mr-3 group-hover:text-red-400" />
          Logout
        </button>
      </div>
    </div>
  );
};