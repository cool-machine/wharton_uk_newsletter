import React, { useState, useRef, useCallback } from 'react';
import NewsletterBuilder from './NewsletterBuilder';
import NewsletterPreview from './NewsletterPreview';

// Type declaration for File System Access API
declare global {
  interface Window {
    showSaveFilePicker: (options?: {
      suggestedName?: string;
      types?: Array<{
        description: string;
        accept: Record<string, string[]>;
      }>;
    }) => Promise<FileSystemFileHandle>;
    showOpenFilePicker: (options?: {
      types?: Array<{
        description: string;
        accept: Record<string, string[]>;
      }>;
    }) => Promise<FileSystemFileHandle[]>;
  }
}

export interface NewsletterSection {
  id: string;
  type: 'highlights' | 'events' | 'partner-events' | 'alumni-spotlight' | 'community-links' | 'custom' | 'rich-text';
  title: string;
  items: Array<{
    title: string;
    description: string;
    date?: string;
    time?: string;
    location?: string;
    registrationUrl?: string;
    url?: string;
    partner?: string;
    name?: string;
    class?: string;
    readMoreUrl?: string;
  }>;
  // Rich text section fields
  richContent?: string;
  sectionUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface NewsletterData {
  headerTitle: string;
  title: string;
  month: string;
  year: string;
  salutation: string;
  greeting: string;
  sections: NewsletterSection[];
  
  // Fixed sections
  communityLinks: Array<{
    title: string;
    description: string;
    url: string;
  }>;
  signature: string;
}

function App() {
  const [showPreview] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const [showHtml, setShowHtml] = useState(false);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const [currentFilePath, setCurrentFilePath] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string>('Untitled Newsletter');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isNewFile, setIsNewFile] = useState(true);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null); // For File System Access API
  const [hasValidFileHandle, setHasValidFileHandle] = useState(false);

  const [newsletterData, setNewsletterData] = useState<NewsletterData>({
    headerTitle: '<p>March 2024 Newsletter</p>',
    title: '<p>The Wharton Club of the United Kingdom Newsletter</p>',
    month: '<p>March</p>',
    year: '<p>2024</p>',
    salutation: '<p>{{recipient.first_name_or_friend}} --</p>',
    greeting: '<p>We hope this newsletter finds you well. We\'re excited to share updates about our recent activities and upcoming events.</p>',
    
    sections: [],
    
    communityLinks: [
      {
        title: 'Become a Club Member',
        description: 'Join The Wharton Club of the United Kingdom to access exclusive events, networking opportunities, and career resources.',
        url: 'https://www.whartonclubuk.net/become_a_member'
      },
      {
        title: 'Join our Community',
        description: 'Stay connected with fellow alumni through our main WhatsApp group.',
        url: 'https://forms.gle/CDvFgFGrgLFZB3HL9'
      },
      {
        title: 'Join The Wharton Alumni AI Studio',
        description: 'Connect with AI and deep tech enthusiasts in our growing global community.',
        url: 'https://forms.gle/CoDwPjqsn8Hn1X8v7'
      }
    ],
    signature: '<p>Thank you again to all our event organizers and participants who made this year exceptional.</p><p>We look forward to building even more connections in the coming year!</p><p><strong>Warm regards,</strong></p><p><strong>George Gvishiani WG\'08</strong></p><p><em>President, The Wharton Club of the United Kingdom</em></p>'
  });

  // Load autosaved data for this window
  React.useEffect(() => {
    const windowId = sessionStorage.getItem('newsletterWindowId') || Date.now().toString();
    sessionStorage.setItem('newsletterWindowId', windowId);
    
    const autosaved = localStorage.getItem(`newsletterAutosave_${windowId}`);
    if (autosaved) {
      try {
        const autosavedData = JSON.parse(autosaved);
        setNewsletterData(autosavedData.data);
        setCurrentFileName(autosavedData.fileName || 'Untitled Newsletter');
        setCurrentFilePath(autosavedData.filePath || '');
        setIsNewFile(!autosavedData.filePath);
        setLastSaved(new Date(autosavedData.timestamp));
        setHasUnsavedChanges(autosavedData.hasUnsavedChanges || false);
        setHasValidFileHandle(autosavedData.hasValidFileHandle || false);
        
        // Warn user if they had a file handle but it's now lost (can't be serialized)
        if (autosavedData.hasValidFileHandle && !fileHandle) {
          console.warn('File handle was lost during session - saves will download new files');
        }
      } catch {
        console.log('Error loading autosaved data');
      }
    }
  }, [fileHandle]);

  // Autosave functionality for current window (localStorage only)
  React.useEffect(() => {
    const autosaveInterval = setInterval(() => {
      const windowId = sessionStorage.getItem('newsletterWindowId');
      if (!windowId) return;
      
      const autosaveData = {
        data: newsletterData,
        fileName: currentFileName,
        filePath: currentFilePath,
        timestamp: new Date().toISOString(),
        hasUnsavedChanges: hasUnsavedChanges,
        hasValidFileHandle: hasValidFileHandle
      };
      
      // Only save to localStorage for autosave - no file downloads
      localStorage.setItem(`newsletterAutosave_${windowId}`, JSON.stringify(autosaveData));
      
      // Don't update lastSaved if we have a valid file handle - this prevents interference
      if (!hasValidFileHandle) {
        setLastSaved(new Date());
      }
    }, 30000); // Autosave every 30 seconds

    return () => clearInterval(autosaveInterval);
  }, [newsletterData, currentFileName, currentFilePath, isNewFile, hasUnsavedChanges, hasValidFileHandle]);

  // Track changes
  React.useEffect(() => {
    setHasUnsavedChanges(true);
  }, [newsletterData]);

  // Handle window close - prompt to save if unsaved changes
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Update document title with current file name
  React.useEffect(() => {
    const title = `${currentFileName}${hasUnsavedChanges ? '*' : ''} - Newsletter Builder`;
    document.title = title;
  }, [currentFileName, hasUnsavedChanges]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            newFile();
            break;
          case 'o':
            e.preventDefault();
            openFile();
            break;
          case 's':
            e.preventDefault();
            saveCurrentFile();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasUnsavedChanges, isNewFile, currentFileName, newFile, openFile, saveCurrentFile]);

  const copyToClipboard = () => {
    if (newsletterRef.current) {
      // Find the table element inside the newsletter ref (skip the preview header)
      const tableElement = newsletterRef.current.querySelector('table');
      if (tableElement) {
        const html = tableElement.outerHTML;
        navigator.clipboard.writeText(html);
        alert('Newsletter HTML copied to clipboard! Ready to paste into NationBuilder.');
      } else {
        alert('Newsletter content not found!');
      }
    }
  };

  const getHtml = () => {
    if (newsletterRef.current) {
      const tableElement = newsletterRef.current.querySelector('table');
      return tableElement?.outerHTML || '';
    }
    return '';
  };

  // Check if browser supports File System Access API
  const supportsFileSystemAccess = () => {
    return 'showSaveFilePicker' in window;
  };

  const handleSaveAsNewFile = useCallback(async () => {
    const fileName = prompt('Enter file name:', currentFileName);
    if (!fileName) return;

    const template = {
      name: fileName,
      data: newsletterData,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    const dataStr = JSON.stringify(template, null, 2);

    if (supportsFileSystemAccess()) {
      try {
        // Use File System Access API for modern browsers
        const newFileHandle = await window.showSaveFilePicker({
          suggestedName: `${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`,
          types: [{
            description: 'JSON files',
            accept: { 'application/json': ['.json'] }
          }]
        });

        const writable = await fileHandle.createWritable();
        await writable.write(dataStr);
        await writable.close();

        // Update current file info
        setCurrentFileName(fileName);
        setCurrentFilePath(fileHandle.name);
        setFileHandle(newFileHandle);
        setHasValidFileHandle(true);
        setIsNewFile(false);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        
        alert(`File "${fileName}" saved successfully!`);
      } catch {
        console.log('User cancelled save or error occurred');
      }
    } else {
      // Fallback to download for older browsers
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      // Update current file info
      setCurrentFileName(fileName);
      setCurrentFilePath(link.download);
      setHasValidFileHandle(false);
      setIsNewFile(false);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      alert(`File "${fileName}" downloaded successfully! Note: Your browser doesn't support file updates - each save creates a new file.`);
    }
  }, [currentFileName, newsletterData, fileHandle]);

  const saveCurrentFile = useCallback(async () => {
    if (isNewFile) {
      // If it's a new file, use saveAsNewFile logic inline
      const fileName = prompt('Enter file name:', currentFileName);
      if (!fileName) return;

      const template = {
        name: fileName,
        data: newsletterData,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };

      const dataStr = JSON.stringify(template, null, 2);

      if (supportsFileSystemAccess()) {
        try {
          const newFileHandle = await window.showSaveFilePicker({
            suggestedName: `${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`,
            types: [{
              description: 'JSON files',
              accept: { 'application/json': ['.json'] }
            }]
          });

          const writable = await newFileHandle.createWritable();
          await writable.write(dataStr);
          await writable.close();

          setCurrentFileName(fileName);
          setCurrentFilePath(newFileHandle.name);
          setFileHandle(newFileHandle);
          setHasValidFileHandle(true);
          setIsNewFile(false);
          setLastSaved(new Date());
          setHasUnsavedChanges(false);
          
          alert(`File "${fileName}" saved successfully!`);
        } catch {
          console.log('User cancelled save or error occurred');
        }
      } else {
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        setCurrentFileName(fileName);
        setCurrentFilePath(link.download);
        setHasValidFileHandle(false);
        setIsNewFile(false);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        
        alert(`File "${fileName}" downloaded successfully! Note: Your browser doesn't support file updates - each save creates a new file.`);
      }
      return;
    }

    // For existing files, update the file in place if possible
    const template = {
      name: currentFileName,
      data: newsletterData,
      lastModified: new Date().toISOString()
    };

    const dataStr = JSON.stringify(template, null, 2);

    // Check if we think we have a valid file handle but actually don't
    if (hasValidFileHandle && !fileHandle) {
      console.warn('File handle flag is true but fileHandle is null - resetting flag');
      setHasValidFileHandle(false);
    }

    if (supportsFileSystemAccess() && fileHandle && hasValidFileHandle) {
      try {
        // Use File System Access API to update existing file
        const writable = await fileHandle.createWritable();
        await writable.write(dataStr);
        await writable.close();
        
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        
        alert(`File "${currentFileName}" updated successfully in place!`);
        return; // Exit early on successful update
      } catch (error) {
        console.error('Error updating file:', error);
        // If file handle is invalid, reset the flags
        setFileHandle(null);
        setHasValidFileHandle(false);
        alert('File handle expired. Falling back to download method.');
      }
    }
    
    // Debug info
    console.log('File System Access API support:', supportsFileSystemAccess());
    console.log('File handle exists:', !!fileHandle);
    console.log('Has valid file handle:', hasValidFileHandle);
    console.log('Is new file:', isNewFile);
    
    // Fallback to download method
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFilePath || (currentFileName.toLowerCase().replace(/[^a-z0-9]/gi, '_') + '.json');
    link.click();
    
    URL.revokeObjectURL(url);
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
    
    console.log(`File "${currentFileName}" downloaded (browser limitation prevents updating existing file)`);
  }, [isNewFile, currentFileName, newsletterData, fileHandle, hasValidFileHandle, currentFilePath]);

  const openFile = useCallback(async () => {
    if (hasUnsavedChanges && !confirm('You have unsaved changes. Are you sure you want to open a new file?')) {
      return;
    }

    if (supportsFileSystemAccess()) {
      try {
        // Use File System Access API for modern browsers
        const [newFileHandle] = await window.showOpenFilePicker({
          types: [{
            description: 'JSON files',
            accept: { 'application/json': ['.json'] }
          }]
        });

        const file = await newFileHandle.getFile();
        const contents = await file.text();
        
        try {
          const template = JSON.parse(contents);
          if (template.data) {
            setNewsletterData(template.data);
            setCurrentFileName(template.name || file.name.replace('.json', ''));
            setCurrentFilePath(file.name);
            setFileHandle(newFileHandle);
            setHasValidFileHandle(true);
            setIsNewFile(false);
            setHasUnsavedChanges(false);
            setLastSaved(null);
            alert(`File "${template.name || file.name}" opened successfully!`);
          }
        } catch {
          alert('Invalid template file!');
        }
      } catch {
        console.log('User cancelled file selection');
      }
    } else {
      // Fallback to file input for older browsers
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const template = JSON.parse(e.target?.result as string);
            if (template.data) {
              setNewsletterData(template.data);
              setCurrentFileName(template.name || file.name.replace('.json', ''));
              setCurrentFilePath(file.name);
              setFileHandle(null); // No file handle for fallback method
              setHasValidFileHandle(false);
              setIsNewFile(false);
              setHasUnsavedChanges(false);
              setLastSaved(null);
              alert(`File "${template.name || file.name}" opened successfully! Note: Your browser doesn't support file updates - saves will create new files.`);
            }
          } catch {
            alert('Invalid template file!');
          }
        };
        reader.readAsText(file);
      };
      input.click();
    }
  }, [hasUnsavedChanges]);

  const relinkFile = async () => {
    if (!currentFilePath) {
      alert('No file path to relink. Please use "Save As..." to create a new file first.');
      return;
    }

    if (supportsFileSystemAccess()) {
      try {
        // Prompt user to select the same file to re-establish the handle
        const [newFileHandle] = await window.showOpenFilePicker({
          types: [{
            description: 'JSON files',
            accept: { 'application/json': ['.json'] }
          }]
        });

        // Verify it's the same file by checking the name
        const file = await newFileHandle.getFile();
        if (file.name === currentFilePath || confirm(`Link to "${file.name}"? Current file is "${currentFilePath}".`)) {
          setFileHandle(newFileHandle);
          setHasValidFileHandle(true);
          alert(`File "${file.name}" relinked successfully! Saves will now update the original file.`);
        }
      } catch {
        console.log('User cancelled relink or error occurred');
      }
    } else {
      alert('File relinking requires a modern browser with File System Access API support.');
    }
  };

  const newFile = useCallback(() => {
    if (hasUnsavedChanges && !confirm('You have unsaved changes. Are you sure you want to create a new file?')) {
      return;
    }

    setNewsletterData({
      headerTitle: '<p>March 2024 Newsletter</p>',
      title: '<p>The Wharton Club of the United Kingdom Newsletter</p>',
      month: '<p>March</p>',
      year: '<p>2024</p>',
      salutation: '<p>{{recipient.first_name_or_friend}} --</p>',
      greeting: '<p>We hope this newsletter finds you well. We\'re excited to share updates about our recent activities and upcoming events.</p>',
      
      sections: [],
      
      communityLinks: [
        {
          title: 'Join our Community',
          description: 'Stay connected with fellow alumni through our main WhatsApp group.',
          url: 'https://forms.gle/CDvFgFGrgLFZB3HL9'
        },
        {
          title: 'Become a Club Member',
          description: 'Join The Wharton Club of the United Kingdom to access exclusive events, networking opportunities, and career resources.',
          url: 'https://forms.gle/CoDwPjqsn8Hn1X8v7'
        },
        {
          title: 'Join The Wharton Alumni AI Studio',
          description: 'Connect with AI and deep tech enthusiasts in our growing global community.',
          url: 'https://forms.gle/CoDwPjqsn8Hn1X8v7'
        }
      ],
      signature: '<p>Thank you again to all our event organizers and participants who made this year exceptional.</p><p>We look forward to building even more connections in the coming year!</p><p><strong>Warm regards,</strong></p><p><strong>George Gvishiani WG\'08</strong></p><p><em>President, The Wharton Club of the United Kingdom</em></p>'
    });
    
    setCurrentFileName('Untitled Newsletter');
    setCurrentFilePath('');
    setFileHandle(null);
    setHasValidFileHandle(false);
    setIsNewFile(true);
    setHasUnsavedChanges(false);
    setLastSaved(null);
  }, [hasUnsavedChanges]);


  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#011F5B',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>
          📧 The Wharton Club of the United Kingdom Newsletter Builder
        </h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
          Create and customize your newsletter, then copy the HTML for NationBuilder
        </p>
      </div>

      {/* Toggle Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => setShowEditor(!showEditor)}
          style={{
            padding: '12px 24px',
            backgroundColor: showEditor ? '#990000' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {showEditor ? '🙈 Hide Editor' : '📝 Show Editor'}
        </button>
        
        <button 
          onClick={copyToClipboard}
          style={{
            padding: '12px 24px',
            backgroundColor: '#011F5B',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          📋 Copy HTML for NationBuilder
        </button>
        
        <button 
          onClick={() => setShowHtml(!showHtml)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {showHtml ? '🙈 Hide HTML' : '👁 Show HTML'}
        </button>
      </div>

      {/* File Info and Status */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#495057',
          fontWeight: 'bold'
        }}>
          📄 {currentFileName}{isNewFile ? ' (unsaved)' : ''}
        </div>
        {(lastSaved || hasUnsavedChanges) && (
          <div style={{
            padding: '8px 16px',
            backgroundColor: hasUnsavedChanges ? '#fff3cd' : '#d1edff',
            border: `1px solid ${hasUnsavedChanges ? '#ffeaa7' : '#b3d7ff'}`,
            borderRadius: '4px',
            fontSize: '14px',
            color: hasUnsavedChanges ? '#856404' : '#0056b3'
          }}>
            {hasUnsavedChanges ? '⚠️ Unsaved changes' : '✅ Saved'} 
            {lastSaved && ` • Last saved: ${lastSaved.toLocaleTimeString()}`}
          </div>
        )}
        {!supportsFileSystemAccess() && (
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#856404'
          }}>
            ⚠️ Browser limitation: saves create new files
          </div>
        )}
        {supportsFileSystemAccess() && !isNewFile && hasValidFileHandle && (
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#155724'
          }}>
            🔗 File linked - saves update original
          </div>
        )}
        {supportsFileSystemAccess() && !isNewFile && currentFilePath && !hasValidFileHandle && (
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#856404'
          }}>
            ⚠️ File handle lost - saves will create new files (use Re-link button)
          </div>
        )}
      </div>

      {/* File Menu */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={newFile}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          🆕 New
        </button>
        
        <button 
          onClick={openFile}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          📁 Open
        </button>
        
        <button 
          onClick={saveCurrentFile}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          💾 Save
        </button>
        
        <button 
          onClick={handleSaveAsNewFile}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          💾 Save As...
        </button>
        
        {/* Show relink button when file handle is lost */}
        {!isNewFile && currentFilePath && !hasValidFileHandle && supportsFileSystemAccess() && (
          <button 
            onClick={relinkFile}
            style={{
              padding: '10px 20px',
              backgroundColor: '#fd7e14',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
            title="Re-establish connection to original file for in-place updates"
          >
            🔗 Re-link File
          </button>
        )}
      </div>


      {/* Main Content */}
      <div style={{
        display: 'flex',
        gap: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Editor Panel */}
        {showEditor && (
          <div style={{
            flex: showPreview ? '1' : '1',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <NewsletterBuilder 
              data={newsletterData} 
              onChange={setNewsletterData} 
            />
          </div>
        )}

        {/* Preview Panel - Always visible */}
        <div style={{
          flex: showEditor ? '1' : '1',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <div ref={newsletterRef}>
            <NewsletterPreview data={newsletterData} />
          </div>
        </div>
      </div>

      {/* HTML Code Display */}
      {showHtml && (
        <div style={{
          maxWidth: '1400px',
          margin: '20px auto',
          padding: '0 20px'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            color: '#f0f0f0',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'monospace',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            <h3 style={{ color: '#4CAF50', marginBottom: '16px' }}>
              📋 HTML Code (Ready for NationBuilder)
            </h3>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {getHtml()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;