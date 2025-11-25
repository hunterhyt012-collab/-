import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  subItems?: MenuItem[];
  view?: string;
}

export interface User {
  name: string;
  role: string;
  avatar: string;
}

export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  
  // 1. UserManagement
  ADD_USER = 'ADD_USER',
  ALL_USERS = 'ALL_USERS',
  
  // 2. DepartmentManagement
  ADD_DEPT = 'ADD_DEPT',
  ALL_DEPTS = 'ALL_DEPTS',
  
  // 3. ProjectManagement
  ADD_PROJECT = 'ADD_PROJECT',
  ALL_PROJECTS = 'ALL_PROJECTS',
  
  // 4. TaskManagement
  ADD_TASK = 'ADD_TASK',
  ALL_TASKS = 'ALL_TASKS',
  
  // 5. AttendanceManagement
  WORK_RECORD_REGISTRATION = 'WORK_RECORD_REGISTRATION',
  VIEW_ATTENDANCE_BY_DATE = 'VIEW_ATTENDANCE_BY_DATE',
  VIEW_DAILY_DETAILS = 'VIEW_DAILY_DETAILS',
  ATTENDANCE_APPROVAL = 'ATTENDANCE_APPROVAL',
  
  // 6. ReportManagement
  REPORT_SUMMARY = 'REPORT_SUMMARY',
  
  // 7. System
  GENERAL_SETTINGS = 'GENERAL_SETTINGS',
  AUDIT_LOGS = 'AUDIT_LOGS',
  
  // 8. MenuManagement
  ADD_MENU = 'ADD_MENU',
  ALL_MENUS = 'ALL_MENUS',
}