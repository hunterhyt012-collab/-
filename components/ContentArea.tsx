import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { 
  Users, Briefcase, LayoutDashboard, Clock as ClockIcon, Settings, 
  ChevronLeft, ChevronRight, AlertCircle
} from 'lucide-react';

interface ContentAreaProps {
  currentView: ViewType;
}

// --- Swing-like UI Components ---

const SwingClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format matches: 2025/11/13 (水) 20:20:20
  const dateStr = time.toLocaleDateString('ja-JP', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    weekday: 'short' 
  });
  const timeStr = time.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  return (
    <div className="border border-slate-800 bg-white px-4 py-1 text-sm font-mono text-slate-900 shadow-sm min-w-[200px] text-center">
      {dateStr} {timeStr}
    </div>
  );
};

const SwingHeader: React.FC = () => (
  <div className="flex justify-between items-center border-b-2 border-slate-800 pb-2 mb-8 mt-2">
    <h2 className="text-2xl font-normal text-slate-900 tracking-wide pl-2">
      お疲れ様、 Admin!!!
    </h2>
    <SwingClock />
  </div>
);

const SwingWindow: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <div className="h-full flex flex-col pt-2">
    <div className="text-sm text-slate-600 mb-0.5 ml-1">{title}</div>
    <div className="bg-white border-2 border-slate-400 rounded-xl shadow-xl flex-1 px-8 py-6 flex flex-col relative overflow-hidden">
      {/* Window Controls Decoration */}
      <div className="absolute top-3 right-4 flex space-x-4">
        <button className="text-slate-800 hover:text-slate-600 font-bold text-xl leading-none">－</button>
        <button className="text-slate-800 hover:text-slate-600 font-bold text-xl leading-none">□</button>
        <button className="text-slate-800 hover:text-slate-600 font-bold text-xl leading-none">×</button>
      </div>
      
      <SwingHeader />
      
      <div className="flex-1 overflow-auto custom-scrollbar">
        {children}
      </div>
    </div>
  </div>
);

const SearchBar: React.FC<{ onSearch: () => void; onCreate: () => void; createLabel: string }> = ({ onCreate, createLabel }) => (
  <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 px-2">
    <div className="flex items-center gap-3 w-full md:w-auto">
      <label className="text-slate-800 font-normal text-sm md:text-base whitespace-nowrap mr-2">キーワード</label>
      <input type="text" className="border border-slate-800 px-2 py-1.5 w-48 shadow-inner focus:outline-none bg-white" />
      <button className="border border-slate-500 bg-white hover:bg-slate-50 px-4 py-1 text-sm text-slate-800 shadow-sm transition-colors mx-1">
        検索
      </button>
      <button className="border border-slate-500 bg-white hover:bg-slate-50 px-4 py-1 text-sm text-slate-800 shadow-sm transition-colors">
        全て
      </button>
    </div>
    <button className="bg-green-100 hover:bg-green-200 text-slate-800 border border-green-400/50 px-8 py-2 shadow-sm text-sm transition-colors" onClick={onCreate}>
      {createLabel}
    </button>
  </div>
);

const SwingTable: React.FC<{ columns: string[]; data: any[][] }> = ({ columns, data }) => (
  <div className="flex flex-col h-full px-2">
    <div className="border border-slate-800 mb-4 bg-white">
      <table className="w-full text-center border-collapse table-fixed">
        <thead className="text-slate-900">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="border border-slate-800 py-3 px-2 font-normal text-sm bg-white">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50">
              {row.map((cell, cIdx) => {
                 // Check if it's the specific Action columns based on index logic
                 const isEdit = cIdx === row.length - 2;
                 const isDelete = cIdx === row.length - 1;
                 
                 if (isEdit) {
                   return (
                     <td key={cIdx} className="border border-slate-800 py-1 px-1 bg-blue-100 hover:bg-blue-200 cursor-pointer transition-colors w-24">
                       <span className="text-slate-800 text-sm">編集</span>
                     </td>
                   );
                 }
                 if (isDelete) {
                   return (
                     <td key={cIdx} className="border border-slate-800 py-1 px-1 bg-red-100 hover:bg-red-200 cursor-pointer transition-colors w-24">
                       <span className="text-slate-800 text-sm">削除</span>
                     </td>
                   );
                 }
                 
                 return (
                  <td key={cIdx} className="border border-slate-800 py-3 px-2 text-slate-800 text-sm h-12 truncate">
                    {cell}
                  </td>
                 )
              })}
            </tr>
          ))}
          {/* Fill empty rows to maintain grid look */}
          {[...Array(Math.max(0, 5 - data.length))].map((_, i) => (
             <tr key={`empty-${i}`}>
               {columns.map((_, j) => <td key={j} className="border border-slate-800 py-3 px-2 h-12"></td>)}
             </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    {/* Pagination */}
    <div className="flex justify-end mt-2 mb-2">
      <div className="flex items-center space-x-3">
        <button className="p-1 hover:bg-slate-100"><ChevronLeft className="w-8 h-8 text-slate-800 stroke-1" /></button>
        <div className="px-4 py-2 border border-slate-800 font-normal text-slate-800 bg-white text-lg">1</div>
        <button className="p-1 hover:bg-slate-100"><ChevronRight className="w-8 h-8 text-slate-800 stroke-1" /></button>
      </div>
    </div>
  </div>
);

const SwingForm: React.FC<{ fields: { label: string, type: 'text' | 'select', options?: string[] }[], onSubmitLabel: string }> = ({ fields, onSubmitLabel }) => (
  <div className="flex flex-col items-center justify-center h-full pb-16">
    <div className="w-full max-w-xl space-y-6">
      {fields.map((field, idx) => (
        <div key={idx} className="flex items-center">
          <label className="w-1/3 text-center pr-4 text-slate-800 text-sm">{field.label}</label>
          <div className="flex-1">
            {field.type === 'select' ? (
              <div className="relative">
                <select className="w-full border border-slate-800 py-1.5 px-3 appearance-none bg-white focus:outline-none shadow-sm text-sm h-9">
                  <option></option>
                  {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-800 text-xs">▽</div>
              </div>
            ) : (
              <input type="text" className="w-full border border-slate-800 py-1.5 px-3 focus:outline-none shadow-sm text-sm h-9" />
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-center pt-10">
        <button className="bg-green-100 hover:bg-green-200 text-slate-800 border border-green-400/50 px-16 py-2 shadow-sm text-sm transition-colors">
          {onSubmitLabel}
        </button>
      </div>
    </div>
  </div>
);

// --- Main Content Renderer ---

const DashboardHome = () => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Total Users', val: '2,543', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Projects', val: '42', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Open Tasks', val: '156', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-100' },
        { label: 'Attendance', val: '98%', icon: ClockIcon, color: 'text-emerald-600', bg: 'bg-emerald-100' },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className={`p-4 rounded-xl mr-5 ${stat.bg}`}>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stat.val}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ContentArea: React.FC<ContentAreaProps> = ({ currentView }) => {
  const renderContent = () => {
    switch (currentView) {
      case ViewType.DASHBOARD:
        return <DashboardHome />;
        
      // --- 1. User Management ---
      case ViewType.ADD_USER:
        return (
          <SwingWindow title="AddUser">
             <SwingForm 
               fields={[
                 { label: 'ユーザー名', type: 'text' },
                 { label: 'メールアドレス', type: 'text' },
                 { label: '部署名', type: 'select', options: ['開発部', '人事部', '営業部'] },
                 { label: 'パスワード', type: 'text' },
               ]}
               onSubmitLabel="作成"
             />
          </SwingWindow>
        );
      case ViewType.ALL_USERS:
        return (
          <SwingWindow title="All User">
            <SearchBar onSearch={() => {}} onCreate={() => {}} createLabel="新ユーザー作成" />
            <SwingTable 
              columns={['ユーザー名', 'メール', '部署名', 'ステータス', '編集', '削除']}
              data={[
                ['山田 太郎', 'taro@test.com', '開発部', 'Active', '', ''],
                ['鈴木 花子', 'hanako@test.com', '人事部', 'Active', '', ''],
                ['佐藤 次郎', 'jiro@test.com', '営業部', 'Away', '', ''],
              ]}
            />
          </SwingWindow>
        );

      // --- 2. Department Management ---
      case ViewType.ADD_DEPT:
        return (
           <SwingWindow title="AddDepartment">
             <SwingForm 
               fields={[
                 { label: '部署名', type: 'text' },
                 { label: 'プロジェクト名', type: 'select', options: ['Banking App', 'Recruitment', 'Salesforce'] },
                 { label: 'タスク名', type: 'select', options: ['Backend', 'Design', 'Meeting'] },
               ]}
               onSubmitLabel="作成"
             />
          </SwingWindow>
        );
      case ViewType.ALL_DEPTS:
        return (
          <SwingWindow title="All Department">
            <SearchBar onSearch={() => {}} onCreate={() => {}} createLabel="新部署作成" />
            <SwingTable 
              columns={['Department名', 'Project名', 'Task名', '編集', '削除']}
              data={[
                ['開発部', 'Banking App', 'Backend API', '', ''],
                ['人事部', 'Recruitment', 'Interview', '', ''],
                ['営業部', 'Q4 Sales', 'Cold Calling', '', ''],
              ]}
            />
          </SwingWindow>
        );

      // --- 3. Project Management ---
      case ViewType.ADD_PROJECT:
        return (
          <SwingWindow title="AddProject">
             <SwingForm 
               fields={[
                 { label: 'プロジェクト名', type: 'text' },
                 { label: '部署名', type: 'select', options: ['開発部', '人事部', '営業部'] },
                 { label: 'タスク名', type: 'select', options: ['Design', 'Coding', 'Testing'] },
               ]}
               onSubmitLabel="作成"
             />
          </SwingWindow>
        );
      case ViewType.ALL_PROJECTS:
        return (
          <SwingWindow title="All Project">
            <SearchBar onSearch={() => {}} onCreate={() => {}} createLabel="新プロジェクト作成" />
            <SwingTable 
              columns={['Project名', 'Department名', 'Task名', '編集', '削除']}
              data={[
                ['Banking App', '開発部', 'Backend API', '', ''],
                ['Recruitment', '人事部', 'Interview', '', ''],
                ['Website Redesign', '営業部', 'Mockups', '', ''],
              ]}
            />
          </SwingWindow>
        );

      // --- 4. Task Management ---
      case ViewType.ADD_TASK:
        return (
          <SwingWindow title="AddTask">
             <SwingForm 
               fields={[
                 { label: 'タスク名', type: 'text' },
                 { label: '部署名', type: 'select', options: ['開発部', '人事部', '営業部'] },
                 { label: 'プロジェクト名', type: 'select', options: ['Banking App', 'Recruitment'] },
                 { label: 'ノート', type: 'text' },
               ]}
               onSubmitLabel="作成"
             />
          </SwingWindow>
        );
      case ViewType.ALL_TASKS:
        return (
          <SwingWindow title="All Task">
            <SearchBar onSearch={() => {}} onCreate={() => {}} createLabel="新タスク作成" />
            <SwingTable 
              columns={['Task 名', 'Project名', 'Department名', 'ノート', '編集', '削除']}
              data={[
                ['Code', 'Banking App', '開発部', 'Urgent', '', ''],
                ['Interview', 'Recruitment', '人事部', 'Online', '', ''],
                ['Test', 'Banking App', '開発部', 'Module A', '', ''],
              ]}
            />
          </SwingWindow>
        );

      // --- 5. Attendance Management ---
      case ViewType.WORK_RECORD_REGISTRATION:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full border border-slate-200">
              <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-indigo-50/50">
                <ClockIcon className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Attendance Check</h2>
              <div className="grid grid-cols-2 gap-6 mb-8 mt-8">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-6 rounded-2xl font-bold shadow-lg transition-all transform hover:-translate-y-1">
                  Check In
                </button>
                <button className="bg-amber-500 hover:bg-amber-600 text-white py-4 px-6 rounded-2xl font-bold shadow-lg transition-all transform hover:-translate-y-1">
                   Check Out
                </button>
              </div>
              <div className="text-xl font-mono font-semibold text-slate-700">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        );
      
      // Placeholders for other views
      case ViewType.VIEW_ATTENDANCE_BY_DATE:
      case ViewType.VIEW_DAILY_DETAILS:
      case ViewType.ATTENDANCE_APPROVAL:
      case ViewType.REPORT_SUMMARY:
      case ViewType.GENERAL_SETTINGS:
      case ViewType.AUDIT_LOGS:
      case ViewType.ADD_MENU:
      case ViewType.ALL_MENUS:
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Settings className="w-16 h-16 mb-4 opacity-50" />
                <h3 className="text-lg font-medium">Coming Soon</h3>
                <p>This module is under development.</p>
            </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <LayoutDashboard className="w-20 h-20 mb-6 text-slate-300" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">Welcome to Dashboard</h3>
            <p>Select an item from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 md:p-6 mx-auto h-[calc(100vh-64px)] overflow-hidden">
      {renderContent()}
    </div>
  );
};