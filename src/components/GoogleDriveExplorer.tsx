import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../lib/firebase';
import { User } from 'firebase/auth';
import { 
  Folder, 
  FolderPlus, 
  FileText, 
  Trash2, 
  Search, 
  LogOut, 
  File, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  ExternalLink, 
  HardDrive, 
  X, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Inbox
} from 'lucide-react';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  iconLink?: string;
  webViewLink?: string;
  createdTime?: string;
}

interface BreadcrumbItem {
  id: string;
  name: string;
}

export default function GoogleDriveExplorer() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all'); // all, folders, files
  const [error, setError] = useState<string | null>(null);

  // Directory hierarchy state
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: 'root', name: 'My Drive' }
  ]);

  // Modal State Controllers
  const [activeModal, setActiveModal] = useState<'none' | 'newFolder' | 'newNote' | 'confirmDelete' | 'confirmBackup' | 'success'>('none');
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [targetFileToDelete, setTargetFileToDelete] = useState<DriveFile | null>(null);
  const [targetBackupReport, setTargetBackupReport] = useState<{ id: string; title: string; content: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Sponsoring Reports available for backup
  const OFFICIAL_REPORTS = [
    {
      id: 'repo_audit_2026',
      title: 'AMRA MANUSH FOUNDATION - FY 2026 Financial Audit Statement',
      desc: 'Independent Chartered Auditor report detailing complete public direct-aid ratios.',
      content: `AMRA MANUSH FOUNDATION
=======================================
OFFICIAL AUDIT REPORT (FY 2026-2027)
Registered Office: Hindmotor, Hooghly, West Bengal - 712233
UDYAM Reg ID: UDYAM-WB-07-0130195
Report Date: June 12, 2026
---------------------------------------

GOVERNANCE METRICS:
* Direct Hunger Aid Allocation Ratio: 95.3%
* Operational Overhead & Infrastructure: 4.7%
* Independent Inspection Signatures: Verified

DIAL COUNTERS (ACTUALS TO DATE):
* Nutritious Meals Distributed: 1,540
* Marginalized Children Sheltered & Fed: 125
* Active Civic Volunteer Network: 15+
* Regional Outreach Drives Terminated: 6

---------------------------------------
Certified as sound under full SC Category Representative leadership.`
    },
    {
      id: 'repo_hunger_concept',
      title: 'Ekbelar Aahar Abhiyan - Sourcing Prospectus',
      desc: 'System design rules for our dual-signature sub-kitchen redundancy loops.',
      content: `EKBELAR AAHAR ABHIYAN (Sourcing Prospectus)
=======================================
AMRA MANUSH FOUNDATION CORE OPERATIONS
---------------------------------------

OBJECTIVE:
To address extreme nutrition gaps in slum-pockets and transit centers via 
centralized sub-kitchen supply loops.

OPERATIONAL PRINCIPLES:
1. Zero Middlemen Rule: All products sourced directly from agricultural producers.
2. Dual Inspection Chain: Kitchen supervisor and volunteer lead inspect every transport module.
3. Hygiene Integrity: HACCP cleanliness checklist enforced for preparing 150 daily meals.

SUPPORT & CONCENTRATE:
To review registries physically, write to amramanushfoundation@gmail.com.`
    }
  ];

  // Auth setup listener on load
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch files whenever directory, filters, or accessToken changes
  useEffect(() => {
    if (accessToken) {
      fetchDriveFiles();
    }
  }, [accessToken, currentFolderId, filterType]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setTokenAndFetch(result.accessToken, result.user);
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError('Connection to Google Workspace failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      setNeedsAuth(true);
      setFiles([]);
      setBreadcrumbs([{ id: 'root', name: 'My Drive' }]);
      setCurrentFolderId('root');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const setTokenAndFetch = (token: string, currentUser: User) => {
    setAccessToken(token);
    setUser(currentUser);
    setNeedsAuth(false);
  };

  // Google Drive API File Loader
  const fetchDriveFiles = async (customSearch = '') => {
    if (!accessToken) return;
    setIsLoading(true);
    setError(null);

    try {
      const qParts: string[] = ['trashed = false'];

      // Folder containment condition (only if not searching broadly)
      if (!customSearch && !searchQuery) {
        qParts.push(`'${currentFolderId}' in parents`);
      }

      // Query search filters
      const searchVal = customSearch || searchQuery;
      if (searchVal) {
        qParts.push(`name contains '${searchVal.replace(/'/g, "\\'")}'`);
      }

      // Format types
      if (filterType === 'folders') {
        qParts.push("mimeType = 'application/vnd.google-apps.folder'");
      } else if (filterType === 'files') {
        qParts.push("mimeType != 'application/vnd.google-apps.folder'");
      }

      const qString = qParts.join(' and ');
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?pageSize=30&fields=files(id,name,mimeType,size,iconLink,webViewLink,createdTime)&q=${encodeURIComponent(
          qString
        )}&orderBy=folder,name`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || `API error code: ${response.status}`);
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (err: any) {
      console.error('Failed to load Google Drive files:', err);
      setError(err?.message || 'Unauthorized or expired credentials. Try logging out and signing in again.');
      // If unauthorized, flag auth renew requirement
      if (err?.message?.includes('unauthorized') || err?.message?.includes('401')) {
        setNeedsAuth(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDriveFiles();
  };

  // Folder navigation entering handler
  const handleFolderClick = (folder: DriveFile) => {
    if (folder.mimeType !== 'application/vnd.google-apps.folder') return;
    
    // Clear search bar to show folder list correctly
    setSearchQuery('');
    
    const nextBreadcrumbs = [...breadcrumbs, { id: folder.id, name: folder.name }];
    setBreadcrumbs(nextBreadcrumbs);
    setCurrentFolderId(folder.id);
  };

  // Breadcrumbs navigation clicking jump
  const handleBreadcrumbJump = (index: number) => {
    // Clear search bar for relative folder navigation
    setSearchQuery('');
    
    const nextBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(nextBreadcrumbs);
    setCurrentFolderId(nextBreadcrumbs[index].id);
  };

  // Write Operation 1: Create New Folder (With Validation & Confirmation)
  const executeCreateFolder = async () => {
    if (!newFolderName.trim() || !accessToken) return;
    setIsLoading(true);
    setError(null);
    setActiveModal('none');

    try {
      const metadata = {
        name: newFolderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: currentFolderId !== 'root' ? [currentFolderId] : undefined
      };

      const res = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metadata)
      });

      if (!res.ok) {
        throw new Error('Failed to create folder in remote drive');
      }

      setNewFolderName('');
      setSuccessMessage(`Successfully created folder "${newFolderName}" in your Google Drive.`);
      setActiveModal('success');
      fetchDriveFiles();
    } catch (err: any) {
      setError(err.message || 'Error occurred while creating folder.');
    } finally {
      setIsLoading(false);
    }
  };

  // Write Operation 2: Create Custom Note/Text File (With Validation & Confirmation)
  const executeCreateNote = async () => {
    let filename = newFileName.trim();
    if (!filename || !accessToken) return;
    if (!filename.endsWith('.txt')) {
      filename += '.txt';
    }
    setIsLoading(true);
    setError(null);
    setActiveModal('none');

    try {
      const boundary = 'amra_boundary_multipart';
      const metadata = {
        name: filename,
        mimeType: 'text/plain',
        parents: currentFolderId !== 'root' ? [currentFolderId] : undefined
      };

      const body = `--${boundary}\r\n` +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) + '\r\n' +
        `--${boundary}\r\n` +
        'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
        newFileContent + '\r\n' +
        `--${boundary}--`;

      const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: body
      });

      if (!res.ok) {
        throw new Error('Failed to write custom file to Google Drive');
      }

      setNewFileName('');
      setNewFileContent('');
      setSuccessMessage(`Created note file "${filename}" in your Google Drive folder.`);
      setActiveModal('success');
      fetchDriveFiles();
    } catch (err: any) {
      setError(err.message || 'Failed to write text file.');
    } finally {
      setIsLoading(false);
    }
  };

  // Write Operation 3: Backup Foundation Report into Drive folder
  const executeBackupReport = async () => {
    if (!targetBackupReport || !accessToken) return;
    setIsLoading(true);
    setError(null);
    const reportTitle = targetBackupReport.title;
    setActiveModal('none');

    try {
      const boundary = 'amra_backup_boundary';
      const filename = `${reportTitle.replace(/[^a-zA-Z0-9_\- ]/g, '_')}.txt`;
      const metadata = {
        name: filename,
        mimeType: 'text/plain',
        parents: currentFolderId !== 'root' ? [currentFolderId] : undefined
      };

      const body = `--${boundary}\r\n` +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) + '\r\n' +
        `--${boundary}\r\n` +
        'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
        targetBackupReport.content + '\r\n' +
        `--${boundary}--`;

      const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: body
      });

      if (!res.ok) {
        throw new Error('Backup writing failed on remote drive API');
      }

      setSuccessMessage(`Verified report backed up successfully as "${filename}" in your Drive!`);
      setActiveModal('success');
      setTargetBackupReport(null);
      fetchDriveFiles();
    } catch (err: any) {
      setError(err.message || 'Report backup transfer failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Write Operation 4: Delete File (With Validation & Confirmation)
  const executeDeleteFile = async () => {
    if (!targetFileToDelete || !accessToken) return;
    setIsLoading(true);
    setError(null);
    const fileName = targetFileToDelete.name;
    setActiveModal('none');

    try {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${targetFileToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!res.ok && res.status !== 204) {
        throw new Error(`Failed to delete requested resource (Status code ${res.status})`);
      }

      setSuccessMessage(`Successfully deleted "${fileName}" from your Google Drive.`);
      setActiveModal('success');
      setTargetFileToDelete(null);
      fetchDriveFiles();
    } catch (err: any) {
      setError(err.message || 'An error occurred during deletion.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper size formatter
  const formatBytes = (bytesStr?: string) => {
    if (!bytesStr) return '—';
    const bytes = parseInt(bytesStr, 10);
    if (isNaN(bytes)) return '—';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div id="drive-vault" className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl mt-12 overflow-hidden relative">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#fbbf24] px-2 py-0.5 rounded bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase font-semibold">
            Google Workspace Secured Integration
          </span>
          <h3 className="font-display font-medium text-[#1E293B] dark:text-slate-100 text-xl tracking-tight flex items-center gap-2 mt-1">
            <HardDrive className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Amra Manush Cloud Drive Vault
          </h3>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Backup compliance audit reports or coordinate documents on your own Drive storage</p>
        </div>
        
        {/* Connection status indicator */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 px-3 py-1.5 rounded-lg text-orange-700 dark:text-orange-400 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-orange-500 dark:bg-orange-500 animate-pulse" />
              Connected
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-[#64748B] dark:text-slate-400 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-slate-600" />
              Not Connected
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {needsAuth ? (
          /* Connect Call to Action Page */
          <motion.div 
            key="auth-gate"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-center justify-center py-12 text-center max-w-lg mx-auto"
          >
            <div className="h-16 w-16 bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-5 relative">
              <HardDrive className="h-8 w-8" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 rounded-2xl blur-md -z-10 animate-pulse" />
            </div>
            
            <h4 className="font-display font-semibold text-[#1E293B] dark:text-white text-base">Authorize Support Vault Integration</h4>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 mt-2 mb-6 leading-relaxed">
              Authenticate via Google to directly backup reports, save donation receipts, or manage audit journals. We adhere strictly to the least-privilege paradigm and store authentication access keys solely in memory.
            </p>

            {/* Compliant Google Login CTA */}
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="px-6 py-3 bg-white dark:bg-[#1A2332] text-[#0F172A] dark:text-white font-medium rounded-xl text-xs flex items-center gap-3 shadow-lg hover:bg-[#F0F7FF] dark:bg-[#111827] dark:hover:bg-[#1A2332] transition-all font-sans cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-[#1E293B]" />
                  Requesting Authorization...
                </>
              ) : (
                <>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4.5 w-4.5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                  <span>Sign in with Google Account</span>
                </>
              )}
            </button>
            
          </motion.div>
        ) : (
          /* Logged In Google Drive Explorer workspace */
          <motion.div
            key="workspace-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* User Profile Card Header */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || "Google User"} 
                    className="h-10 w-10 rounded-full border border-slate-700 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 flex items-center justify-center font-bold text-orange-600 dark:text-orange-400 font-mono">
                    {user?.displayName?.[0] || 'U'}
                  </div>
                )}
                <div>
                  <h5 className="font-semibold text-[#1E293B] dark:text-white text-xs sm:text-sm">{user?.displayName}</h5>
                  <p className="text-[10px] text-[#64748B] dark:text-slate-400 font-mono">{user?.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setNewFolderName('');
                    setActiveModal('newFolder');
                  }}
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderPlus className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  New Folder
                </button>
                <button
                  onClick={() => {
                    setNewFileName('');
                    setNewFileContent('');
                    setActiveModal('newNote');
                  }}
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  Create Note
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Disconnect
                </button>
              </div>
            </div>

            {/* Main grid split: Sourcing System Reports, File browser */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Sourcing Reports Vault Sync - 5 Columns */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800">
                  <h4 className="font-display font-semibold text-xs tracking-widest uppercase text-[#fbbf24] mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    Verified Report Fast backups
                  </h4>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400 font-sans mb-4 leading-normal">
                    Quickly back up our certified governance papers directly to your Google Drive folder as secure audit-trail text documents with a single click.
                  </p>

                  <div className="space-y-3">
                    {OFFICIAL_REPORTS.map((report) => (
                      <div 
                        key={report.id}
                        className="p-3 rounded-lg bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3"
                      >
                        <div>
                          <h5 className="text-xs font-bold text-[#1E293B] dark:text-slate-200 leading-normal">{report.title}</h5>
                          <p className="text-[10px] text-[#64748B] dark:text-slate-400 font-sans leading-normal mt-0.5">{report.desc}</p>
                        </div>
                        <button
                          onClick={() => {
                            setTargetBackupReport(report);
                            setActiveModal('confirmBackup');
                          }}
                          className="w-full py-1.5 bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 hover:bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/20 border border-blue-600/20 dark:border-cyan-400/30 text-orange-600 dark:text-orange-400 text-[10px] font-mono tracking-wider uppercase rounded font-bold cursor-pointer transition-all"
                        >
                          Backup to My Drive ↗
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status or error container */}
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 text-red-400 text-xs flex items-start gap-2">
                    <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block uppercase font-mono tracking-widest text-[10px]">Error Statement</span>
                      <p className="font-sans text-[#334155] dark:text-slate-300 mt-1">{error}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Google Drive Explorer Component - 7 Columns */}
              <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3.5 mb-4">
                  {/* Title & Filter dropdown */}
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <h4 className="font-display font-semibold text-[#fbbf24] text-xs uppercase tracking-wider font-mono">
                      Remote File Registry
                    </h4>
                    
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[11px] text-[#334155] dark:text-slate-300 rounded px-2.5 py-1.5 font-mono focus:outline-none focus:border-blue-600/20 dark:border-cyan-400/30"
                    >
                      <option value="all">Show All</option>
                      <option value="folders">Folders Only</option>
                      <option value="files">Files Only</option>
                    </select>
                  </div>

                  {/* Quick search input */}
                  <form onSubmit={handleSearchSubmit} className="relative flex-grow sm:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search Drive files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 placeholder-slate-500 dark:placeholder-slate-400 text-xs text-[#0F172A] dark:text-white rounded-lg pl-3 pr-8.5 py-1.5 focus:outline-none focus:border-blue-600/20 dark:border-cyan-400/30"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-slate-400 hover:text-[#334155] dark:text-slate-300">
                      <Search className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>

                {/* Directory breadcrumb navigation trail */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs text-[#64748B] dark:text-slate-400 font-mono border-b border-slate-200 dark:border-slate-800/40 pb-3 mb-4">
                  {breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={crumb.id}>
                      {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#334155] dark:text-slate-300" />}
                      <button
                        onClick={() => handleBreadcrumbJump(idx)}
                        disabled={idx === breadcrumbs.length - 1}
                        className={`hover:text-orange-600 dark:text-orange-400 cursor-pointer text-[11px] ${
                          idx === breadcrumbs.length - 1 ? 'text-[#fbbf24] font-medium' : 'text-[#64748B] dark:text-slate-400'
                        }`}
                      >
                        {crumb.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                {/* Remote content loader screen */}
                <div className="relative min-h-[280px]">
                  {isLoading ? (
                    <div className="absolute inset-0 bg-white dark:bg-[#1A2332]/80 flex flex-col items-center justify-center">
                      <RefreshCw className="h-6 w-6 animate-spin text-orange-600 dark:text-orange-400" />
                      <p className="text-[11px] text-[#64748B] dark:text-slate-400 mt-2 font-mono uppercase tracking-widest">Querying Cloud Drive...</p>
                    </div>
                  ) : null}

                  {files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-[#64748B] dark:text-slate-400">
                      <Inbox className="h-10 w-10 text-[#334155] dark:text-slate-300 mb-2" />
                      <p className="text-xs font-mono">No files identified in directory</p>
                      <p className="text-[10px] text-[#334155] dark:text-slate-300 mt-1 font-sans">Create some files or folders using the controls above</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {files.map((file) => {
                        const isFolder = file.mimeType === 'application/vnd.google-apps.folder';

                        return (
                          <div
                            key={file.id}
                            className="p-2.5 rounded-lg bg-white dark:bg-[#1A2332]/80 border border-slate-200 dark:border-slate-800/70 hover:border-slate-200 dark:border-slate-800 transition-all flex items-center justify-between gap-3 text-xs"
                          >
                            <div 
                              className={`flex items-center gap-3 overflow-hidden flex-grow ${
                                isFolder ? 'cursor-pointer hover:text-blue-600 dark:text-cyan-400' : ''
                              }`}
                              onClick={() => isFolder && handleFolderClick(file)}
                            >
                              <div className={`p-1.5 rounded-md ${
                                isFolder 
                                  ? 'bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10' 
                                  : 'bg-indigo-500/10 text-indigo-400'
                              }`}>
                                {isFolder ? (
                                  <Folder className="h-4 w-4" />
                                ) : (
                                  <FileText className="h-4 w-4" />
                                )}
                              </div>
                              <div className="overflow-hidden min-w-0">
                                <span className={`block truncate font-medium ${
                                  isFolder ? 'text-[#0F172A] dark:text-slate-200' : 'text-[#334155] dark:text-slate-300'
                                }`}>
                                  {file.name}
                                </span>
                                <span className="text-[9px] text-[#64748B] dark:text-slate-400 font-mono uppercase tracking-wider block">
                                  {isFolder ? 'Folder' : formatBytes(file.size)}
                                </span>
                              </div>
                            </div>

                            {/* Actions bar */}
                            <div className="flex items-center gap-1">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open in Drive"
                                  className="p-1 px-1.5 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded text-[#64748B] dark:text-slate-400 hover:text-blue-600 dark:text-cyan-400/90 hover:border-blue-600/20 dark:border-cyan-400/30 cursor-pointer"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => {
                                  setTargetFileToDelete(file);
                                  setActiveModal('confirmDelete');
                                }}
                                title="Delete representative file"
                                className="p-1 px-1.5 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded text-[#64748B] dark:text-slate-400 hover:text-red-400 hover:border-red-400/40 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP MODALS FRAMEWORK (With custom styled security screens) */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <div className="fixed inset-0 bg-white dark:bg-[#1A2332]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveModal('none')}
                className="absolute top-4 right-4 p-1 rounded-lg bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {activeModal === 'newFolder' && (
                /* New Folder Form */
                <div>
                  <h4 className="font-display font-semibold text-[#1E293B] dark:text-white text-sm uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
                    <FolderPlus className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    Create New Folder
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mb-4 font-sans">
                    Enforce structural directories inside the current folder path: <span className="text-[#fbbf24] font-mono">{breadcrumbs[breadcrumbs.length - 1].name}</span>.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 uppercase font-bold block mb-1.5">Folder Identifier Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Audit_FY26"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-600/20 dark:border-cyan-400/30"
                        autoFocus
                      />
                    </div>

                    <div className="bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 p-3 rounded-lg flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-[#334155] dark:text-slate-300 leading-normal font-sans">
                        Requires permission to initialize structural adjustments inside your cloud space. Please confirm the write action.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setActiveModal('none')}
                        className="flex-1 py-2 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 hover:bg-white dark:bg-[#1A2332] text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={executeCreateFolder}
                        disabled={!newFolderName.trim()}
                        className="flex-1 py-2 rounded-xl bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0 text-white font-semibold hover:brightness-105 text-xs cursor-pointer disabled:opacity-50"
                      >
                        Confirm Creation
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'newNote' && (
                /* Create custom Text document */
                <div>
                  <h4 className="font-display font-semibold text-[#1E293B] dark:text-white text-sm uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    Write Custom Note Memo
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mb-4">
                    Draft a text document directly to your Google Drive directory.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 uppercase font-bold block mb-1.5">File Name</label>
                      <input
                        type="text"
                        placeholder="sponsorship_memo.txt"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 uppercase font-bold block mb-1.5">Note/Memo Content</label>
                      <textarea
                        rows={4}
                        placeholder="Write audit notes or corporate sponsor logs..."
                        value={newFileContent}
                        onChange={(e) => setNewFileContent(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setActiveModal('none')}
                        className="flex-1 py-2 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 hover:bg-white dark:bg-[#1A2332] text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={executeCreateNote}
                        disabled={!newFileName.trim()}
                        className="flex-1 py-2 rounded-xl bg-orange-600 dark:bg-orange-500 text-white font-semibold hover:brightness-105 text-xs cursor-pointer disabled:opacity-50"
                      >
                        Confirm File Write
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'confirmBackup' && targetBackupReport && (
                /* Report Backup Confirmation (User permission dialogue) */
                <div>
                  <h4 className="font-display font-semibold text-[#1E293B] dark:text-white text-sm uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-4 w-4 text-[#fbbf24]" />
                    Safe-Backup Authorization
                  </h4>
                  <p className="text-xs text-[#334155] dark:text-slate-300 leading-normal mb-4">
                    Confirm backing up the following official ledger component as metadata to your personal Google Drive storage?
                  </p>
                  
                  <div className="p-3.5 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-xl mb-4 font-mono text-xs text-orange-600 dark:text-orange-400 select-all max-h-32 overflow-y-auto">
                    {targetBackupReport.title}
                  </div>

                  <p className="text-[10px] text-[#64748B] dark:text-slate-400 leading-relaxed font-sans border-t border-slate-200 dark:border-slate-800 pt-3 mb-4">
                    This writes a dedicated readable text document inside directory: <span className="text-[#fbbf24] font-mono">{breadcrumbs[breadcrumbs.length - 1].name}</span>.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveModal('none')}
                      className="flex-1 py-2 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 hover:bg-white dark:bg-[#1A2332] text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white text-xs font-semibold cursor-pointer"
                    >
                      Bail Out
                    </button>
                    <button
                      onClick={executeBackupReport}
                      className="flex-1 py-2 rounded-xl bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0 text-white font-bold hover:brightness-105 text-xs cursor-pointer"
                    >
                      Authorize Write
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'confirmDelete' && targetFileToDelete && (
                /* Delete Confirmation modal - MANDATORY */
                <div>
                  <h4 className="font-display font-semibold text-[#fb7185] text-sm uppercase tracking-widest font-mono flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4.5 w-4.5 text-red-400" />
                    Destructive Action Pending!
                  </h4>
                  <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed mb-4">
                    Are you sure you want to permanently delete <strong className="text-[#0F172A] dark:text-white select-all">"{targetFileToDelete.name}"</strong>? This calls Google Drive APIs directly to purge the resource and cannot be undone.
                  </p>

                  <div className="p-3.5 bg-red-950/10 border border-red-900/20 rounded-xl mb-5 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#64748B] dark:text-slate-400">Resource ID</span>
                      <span className="font-mono text-[#64748B] dark:text-slate-400 select-all truncate max-w-[200px]">{targetFileToDelete.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B] dark:text-slate-400">Resource Type</span>
                      <span className="text-[#64748B] dark:text-slate-400 truncate max-w-[200px]">{targetFileToDelete.mimeType === 'application/vnd.google-apps.folder' ? 'Folder System' : 'Blob Document File'}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveModal('none')}
                      className="flex-1 py-2 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 hover:bg-white dark:bg-[#1A2332] text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white text-xs font-semibold cursor-pointer"
                    >
                      Abort
                    </button>
                    <button
                      onClick={executeDeleteFile}
                      className="flex-1 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 text-xs cursor-pointer"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'success' && (
                /* Complete/Success confirmation modal */
                <div className="text-center py-4">
                  <div className="h-12 w-12 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-display font-semibold text-[#1E293B] dark:text-white text-sm uppercase tracking-wider font-mono mb-2">Operation Complete</h4>
                  <p className="text-xs text-[#334155] dark:text-slate-300 leading-normal mb-5 max-w-sm mx-auto">{successMessage}</p>
                  <button
                    onClick={() => setActiveModal('none')}
                    className="w-full py-2 bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Return to Workspace
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
