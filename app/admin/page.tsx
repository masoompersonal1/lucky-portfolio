'use client'

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Login State
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Content State
  const [content, setContent] = useState<any>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState('Hero');

  useEffect(() => {
    // Basic local check for demo purposes
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
      fetchContent();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (res.ok) {
        setContent(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass })
      });
      if (res.ok) {
        localStorage.setItem('admin_auth', 'true');
        setIsAuthenticated(true);
        fetchContent();
      } else {
        const data = await res.json();
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      setLoginError('Network error');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setContent(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      if (res.ok) {
        alert('Saved successfully!');
      } else {
        alert('Failed to save');
      }
    } catch (err) {
      alert('Error saving data');
    }
    setSaving(false);
  };

  // Upload handler for Cloudinary
  const handleFileUpload = async (file: File, oldPublicId: string, pathCallback: (url: string, publicId: string) => void) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('oldPublicId', oldPublicId);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        pathCallback(data.url, data.publicId);
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      alert('Upload error');
    }
  };

  // Very basic string update helper
  const updateNestedField = (path: string[], value: any) => {
    const newContent = { ...content };
    let current = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 font-sans text-white">
        <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-xl w-full max-w-sm flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
          <input 
            type="text" 
            placeholder="Username" 
            className="p-3 bg-zinc-800 rounded outline-none"
            value={loginUser} onChange={e => setLoginUser(e.target.value)} required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="p-3 bg-zinc-800 rounded outline-none"
            value={loginPass} onChange={e => setLoginPass(e.target.value)} required 
          />
          <button type="submit" className="bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (!content) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error loading content</div>;

  const tabs = ['Hero', 'About', 'Works', 'Services', 'Exhibitions', 'Footer', 'Credentials'];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-zinc-900 p-6 flex flex-col space-y-2 md:min-h-screen">
        <h1 className="text-xl font-bold mb-8">Squidwod Admin</h1>
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`text-left px-4 py-2 rounded transition ${activeTab === tab ? 'bg-zinc-800 font-bold' : 'text-gray-400 hover:bg-zinc-800'}`}
          >
            {tab}
          </button>
        ))}
        <div className="flex-grow"></div>
        <button onClick={handleLogout} className="text-red-400 text-left px-4 py-2 hover:bg-zinc-800 rounded mt-8">Logout</button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">{activeTab} Settings</h2>
          {activeTab !== 'Credentials' && (
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-green-600 px-6 py-2 rounded font-bold hover:bg-green-500 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>

        {/* Dynamic Form Content */}
        <div className="space-y-8 max-w-4xl">
          
          {activeTab === 'Hero' && (
            <div className="space-y-6">
              <label className="block"><span className="text-gray-400 block mb-2">Top Subheading</span>
                <textarea className="w-full p-4 bg-zinc-900 rounded outline-none h-32" value={content.hero.topSubheading} onChange={e => updateNestedField(['hero', 'topSubheading'], e.target.value)} />
              </label>
              <label className="block"><span className="text-gray-400 block mb-2">Signature Subtext</span>
                <textarea className="w-full p-4 bg-zinc-900 rounded outline-none h-24" value={content.hero.signatureSubtext} onChange={e => updateNestedField(['hero', 'signatureSubtext'], e.target.value)} />
              </label>
              <div className="bg-zinc-900 p-6 rounded">
                <span className="text-gray-400 block mb-4">Background Media (Image or Video)</span>
                <div className="flex items-center space-x-6">
                  {content.hero.mediaUrl && (
                    content.hero.mediaUrl.match(/\.(mp4|webm|ogg)$/i) 
                      ? <video src={content.hero.mediaUrl} className="w-32 h-32 object-cover rounded" autoPlay muted loop />
                      : <img src={content.hero.mediaUrl} className="w-32 h-32 object-cover rounded" alt="Hero Media" />
                  )}
                  <input type="file" accept="image/*,video/*" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0], content.hero.mediaPublicId, (url, pid) => {
                        updateNestedField(['hero', 'mediaUrl'], url);
                        updateNestedField(['hero', 'mediaPublicId'], pid);
                      });
                    }
                  }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'About' && (
            <div className="space-y-6">
              <label className="block"><span className="text-gray-400 block mb-2">Title</span>
                <input type="text" className="w-full p-4 bg-zinc-900 rounded outline-none" value={content.about.title} onChange={e => updateNestedField(['about', 'title'], e.target.value)} />
              </label>
              <label className="block"><span className="text-gray-400 block mb-2">Description</span>
                <textarea className="w-full p-4 bg-zinc-900 rounded outline-none h-48" value={content.about.description} onChange={e => updateNestedField(['about', 'description'], e.target.value)} />
              </label>
              
              <div className="bg-zinc-900 p-6 rounded">
                <span className="text-gray-400 block mb-4">Slider Media Images/Videos</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {content.about.mediaList.map((media: any, idx: number) => (
                    <div key={idx} className="relative group">
                      {media.url.match(/\.(mp4|webm|ogg)$/i) 
                        ? <video src={media.url} className="w-full h-32 object-cover rounded" muted loop />
                        : <img src={media.url} className="w-full h-32 object-cover rounded" alt="Media" />
                      }
                      <button 
                        onClick={() => {
                          const newArr = [...content.about.mediaList];
                          newArr.splice(idx, 1);
                          updateNestedField(['about', 'mediaList'], newArr);
                        }}
                        className="absolute top-2 right-2 bg-red-600 p-1 rounded text-xs hidden group-hover:block"
                      >Delete</button>
                    </div>
                  ))}
                  <div className="flex items-center justify-center bg-zinc-800 rounded h-32 border border-dashed border-gray-600 relative overflow-hidden">
                    <span className="text-sm text-gray-400">+ Add File</span>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*,video/*" onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], "", (url, pid) => {
                          const newArr = [...content.about.mediaList, { url, publicId: pid }];
                          updateNestedField(['about', 'mediaList'], newArr);
                        });
                      }
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Works' && (
            <div className="space-y-6">
              <label className="block"><span className="text-gray-400 block mb-2">Year</span>
                <input type="text" className="w-full p-4 bg-zinc-900 rounded outline-none" value={content.works.year} onChange={e => updateNestedField(['works', 'year'], e.target.value)} />
              </label>
              <label className="block"><span className="text-gray-400 block mb-2">Title</span>
                <input type="text" className="w-full p-4 bg-zinc-900 rounded outline-none" value={content.works.title} onChange={e => updateNestedField(['works', 'title'], e.target.value)} />
              </label>
              <label className="block"><span className="text-gray-400 block mb-2">Description</span>
                <textarea className="w-full p-4 bg-zinc-900 rounded outline-none h-48" value={content.works.description} onChange={e => updateNestedField(['works', 'description'], e.target.value)} />
              </label>

              <div className="bg-zinc-900 p-6 rounded">
                <span className="text-gray-400 block mb-4">Gallery Media</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {content.works.mediaList.map((media: any, idx: number) => (
                    <div key={idx} className="relative group">
                      {media.url.match(/\.(mp4|webm|ogg)$/i) 
                        ? <video src={media.url} className="w-full h-32 object-cover rounded" muted loop />
                        : <img src={media.url} className="w-full h-32 object-cover rounded" alt="Media" />
                      }
                      <button 
                        onClick={() => {
                          const newArr = [...content.works.mediaList];
                          newArr.splice(idx, 1);
                          updateNestedField(['works', 'mediaList'], newArr);
                        }}
                        className="absolute top-2 right-2 bg-red-600 p-1 rounded text-xs hidden group-hover:block"
                      >Delete</button>
                    </div>
                  ))}
                  <div className="flex items-center justify-center bg-zinc-800 rounded h-32 border border-dashed border-gray-600 relative overflow-hidden">
                    <span className="text-sm text-gray-400">+ Add File</span>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*,video/*" onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], "", (url, pid) => {
                          const newArr = [...content.works.mediaList, { url, publicId: pid }];
                          updateNestedField(['works', 'mediaList'], newArr);
                        });
                      }
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Services' && (
            <div className="space-y-6">
              <label className="block"><span className="text-gray-400 block mb-2">Description</span>
                <textarea className="w-full p-4 bg-zinc-900 rounded outline-none h-48" value={content.services.description} onChange={e => updateNestedField(['services', 'description'], e.target.value)} />
              </label>

              <div className="space-y-4">
                <span className="text-gray-400 block">Services List</span>
                {content.services.list.map((item: any, idx: number) => (
                  <div key={idx} className="bg-zinc-900 p-4 rounded flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <input type="text" className="w-full md:w-1/2 p-3 bg-zinc-800 rounded outline-none" value={item.title} onChange={e => {
                      const newArr = [...content.services.list];
                      newArr[idx].title = e.target.value;
                      updateNestedField(['services', 'list'], newArr);
                    }} />
                    <div className="flex items-center space-x-4">
                       {item.mediaUrl && (
                        item.mediaUrl.match(/\.(mp4|webm|ogg)$/i) 
                          ? <video src={item.mediaUrl} className="w-16 h-16 object-cover rounded" muted />
                          : <img src={item.mediaUrl} className="w-16 h-16 object-cover rounded" alt="Media" />
                      )}
                      <input type="file" accept="image/*,video/*" className="text-sm max-w-[200px]" onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], item.mediaPublicId, (url, pid) => {
                            const newArr = [...content.services.list];
                            newArr[idx].mediaUrl = url;
                            newArr[idx].mediaPublicId = pid;
                            updateNestedField(['services', 'list'], newArr);
                          });
                        }
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Exhibitions' && (
            <div className="space-y-6">
              <label className="block"><span className="text-gray-400 block mb-2">Year</span>
                <input type="text" className="w-full p-4 bg-zinc-900 rounded outline-none" value={content.exhibitions.year} onChange={e => updateNestedField(['exhibitions', 'year'], e.target.value)} />
              </label>
              <label className="block"><span className="text-gray-400 block mb-2">Title</span>
                <input type="text" className="w-full p-4 bg-zinc-900 rounded outline-none" value={content.exhibitions.title} onChange={e => updateNestedField(['exhibitions', 'title'], e.target.value)} />
              </label>
              <label className="block"><span className="text-gray-400 block mb-2">Description</span>
                <textarea className="w-full p-4 bg-zinc-900 rounded outline-none h-48" value={content.exhibitions.description} onChange={e => updateNestedField(['exhibitions', 'description'], e.target.value)} />
              </label>

              <div className="space-y-4">
                <span className="text-gray-400 block">Exhibitions Cards</span>
                {content.exhibitions.list.map((item: any, idx: number) => (
                  <div key={idx} className="bg-zinc-900 p-4 rounded flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    <textarea className="w-full md:w-1/2 p-3 bg-zinc-800 rounded outline-none h-24" value={item.text} onChange={e => {
                      const newArr = [...content.exhibitions.list];
                      newArr[idx].text = e.target.value;
                      updateNestedField(['exhibitions', 'list'], newArr);
                    }} />
                    <div className="flex flex-col space-y-4">
                       {item.mediaUrl && (
                        item.mediaUrl.match(/\.(mp4|webm|ogg)$/i) 
                          ? <video src={item.mediaUrl} className="w-32 h-24 object-cover rounded" muted />
                          : <img src={item.mediaUrl} className="w-32 h-24 object-cover rounded" alt="Media" />
                      )}
                      <input type="file" accept="image/*,video/*" className="text-sm max-w-[200px]" onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], item.mediaPublicId, (url, pid) => {
                            const newArr = [...content.exhibitions.list];
                            newArr[idx].mediaUrl = url;
                            newArr[idx].mediaPublicId = pid;
                            updateNestedField(['exhibitions', 'list'], newArr);
                          });
                        }
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Footer' && (
            <div className="space-y-6">
              <div className="bg-zinc-900 p-6 rounded">
                <span className="text-gray-400 block mb-4">Background Media (Behind CONTACT)</span>
                <div className="flex items-center space-x-6">
                  {content.footer.mediaUrl && (
                    content.footer.mediaUrl.match(/\.(mp4|webm|ogg)$/i) 
                      ? <video src={content.footer.mediaUrl} className="w-64 h-32 object-cover rounded" autoPlay muted loop />
                      : <img src={content.footer.mediaUrl} className="w-64 h-32 object-cover rounded" alt="Footer Media" />
                  )}
                  <input type="file" accept="image/*,video/*" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0], content.footer.mediaPublicId, (url, pid) => {
                        updateNestedField(['footer', 'mediaUrl'], url);
                        updateNestedField(['footer', 'mediaPublicId'], pid);
                      });
                    }
                  }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Credentials' && (
             <CredentialUpdateForm />
          )}

        </div>
      </div>
    </div>
  );
}

function CredentialUpdateForm() {
  const [oldUser, setOldUser] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Updating...');
    try {
      const res = await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldUsername: oldUser,
          oldPassword: oldPass,
          newUsername: newUser,
          newPassword: newPass
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Success! Please relogin.');
        setTimeout(() => {
          localStorage.removeItem('admin_auth');
          window.location.reload();
        }, 1500);
      } else {
        setMsg(data.error || 'Failed to update credentials');
      }
    } catch (err) {
      setMsg('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded max-w-md space-y-6">
      <h3 className="text-xl font-bold mb-4">Update Admin Login</h3>
      {msg && <p className="text-yellow-400">{msg}</p>}
      <input type="text" placeholder="Current Username" required className="w-full p-3 bg-zinc-800 rounded outline-none" value={oldUser} onChange={e=>setOldUser(e.target.value)} />
      <input type="password" placeholder="Current Password" required className="w-full p-3 bg-zinc-800 rounded outline-none" value={oldPass} onChange={e=>setOldPass(e.target.value)} />
      <hr className="border-zinc-700" />
      <input type="text" placeholder="New Username" required className="w-full p-3 bg-zinc-800 rounded outline-none" value={newUser} onChange={e=>setNewUser(e.target.value)} />
      <input type="password" placeholder="New Password" required className="w-full p-3 bg-zinc-800 rounded outline-none" value={newPass} onChange={e=>setNewPass(e.target.value)} />
      <button type="submit" className="w-full bg-red-600 hover:bg-red-500 py-3 rounded font-bold">Update Credentials</button>
    </form>
  )
}
