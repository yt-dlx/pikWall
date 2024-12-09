// src/app/upload/page.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function UploadForm({ onUpload }: { onUpload: (formData: FormData) => Promise<void> }): JSX.Element {
  const [commitMessage, setCommitMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [colorScheme, setColorScheme] = useState("");
  const [artStyle, setArtStyle] = useState("");
  const [progress, setProgress] = useState(0);
  const chunkSize = 1024 * 1024;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;
    setIsUploading(true);
    setProgress(0);
    const totalFiles = files.length;
    let totalUploaded = 0;
    for (const file of files) {
      const totalChunks = Math.ceil(file.size / chunkSize);
      for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("artStyle", artStyle);
        formData.append("imageName", file.name);
        formData.append("chunkIndex", String(i));
        formData.append("colorScheme", colorScheme);
        formData.append("commitMessage", commitMessage);
        formData.append("totalChunks", String(totalChunks));
        await onUpload(formData);
        setProgress(((totalUploaded + (i + 1) / totalChunks) / totalFiles) * 100);
      }
      totalUploaded += 1;
    }
    setIsUploading(false);
  };

  return (
    <motion.form onSubmit={handleSubmit} transition={{ duration: 0.5 }} animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} className="bg-[#2e3440] p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#eceff4]">Upload New Wallpaper</h2>
      <div className="mb-4">
        <label htmlFor="artStyle" className="block text-sm font-medium text-[#d8dee9] mb-1">
          Art Style
        </label>
        <input
          required
          type="text"
          id="artStyle"
          value={artStyle}
          disabled={isUploading}
          onChange={(e) => setArtStyle(e.target.value)}
          className={`w-full px-3 py-2 bg-[#3b4252] text-[#eceff4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88c0d0] ${isUploading ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="colorScheme" className="block text-sm font-medium text-[#d8dee9] mb-1">
          Color Scheme
        </label>
        <input
          required
          type="text"
          id="colorScheme"
          value={colorScheme}
          disabled={isUploading}
          onChange={(e) => setColorScheme(e.target.value)}
          className={`w-full px-3 py-2 bg-[#3b4252] text-[#eceff4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88c0d0] ${isUploading ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="commitMessage" className="block text-sm font-medium text-[#d8dee9] mb-1">
          Commit Message
        </label>
        <input
          required
          type="text"
          id="commitMessage"
          value={commitMessage}
          disabled={isUploading}
          onChange={(e) => setCommitMessage(e.target.value)}
          className={`w-full px-3 py-2 bg-[#3b4252] text-[#eceff4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88c0d0] ${isUploading ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="files" className="block text-sm font-medium text-[#d8dee9] mb-1">
          Image Files
        </label>
        <input
          required
          id="files"
          type="file"
          multiple
          disabled={isUploading}
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className={`w-full px-3 py-2 bg-[#3b4252] text-[#eceff4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#88c0d0] ${isUploading ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
      </div>
      <button type="submit" disabled={isUploading} className={`w-full py-2 px-4 bg-[#5e81ac] text-[#eceff4] rounded-md transition-colors duration-300 ${isUploading ? "cursor-not-allowed bg-[#4c566a]" : "cursor-pointer hover:bg-[#81a1c1]"}`}>
        {isUploading ? "Uploading Please Wait!" : "Upload Data!"}
      </button>
      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-[#3b4252] rounded-full h-2.5">
            <div className="bg-[#88c0d0] h-2.5 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-[#d8dee9] mt-2">{progress.toFixed(2)}% completed</p>
        </div>
      )}
    </motion.form>
  );
}
function FolderStructure({ structure, onDelete }: { structure: any; onDelete: (path: string, isFolder: boolean) => Promise<void> }): JSX.Element {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const handleDelete = async (path: string, isFolder: boolean) => {
    if (window.confirm(`Are you sure you want to delete ${isFolder ? "this folder" : "this image"}?`)) await onDelete(path, isFolder);
  };
  const toggleFolder = (folderName: string) => setOpenFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  const renderStructure = (data: any, parentPath = "") => {
    if (!data) return null;
    return (
      <ul className="pl-4">
        {data.parent.map((artStyle: any) => {
          const folderPath = `${parentPath}${artStyle.ArtStyle}`;
          const isOpen = openFolders[folderPath];

          return (
            <li key={artStyle.ArtStyle} className="mb-4">
              <div className="flex items-center justify-between">
                <span onClick={() => toggleFolder(folderPath)} className="font-bold text-xl text-[#88c0d0] cursor-pointer">
                  {isOpen ? "▼" : "▶"} {artStyle.ArtStyle}
                </span>
                <button onClick={() => handleDelete(`images/${artStyle.ArtStyle}`, true)} className="ml-2 text-red-500">
                  Delete
                </button>
              </div>
              {isOpen && (
                <ul className="pl-4 mt-2">
                  {artStyle.ColorScheme.map((colorScheme: any) => {
                    const colorPath = `${folderPath}/${colorScheme.name}`;
                    const isColorOpen = openFolders[colorPath];

                    return (
                      <li key={colorScheme.name} className="mb-3">
                        <div className="flex items-center justify-between">
                          <span onClick={() => toggleFolder(colorPath)} className="text-lg text-[#a3be8c] cursor-pointer">
                            {isColorOpen ? "▼" : "▶"} {colorScheme.name}
                          </span>
                          <button onClick={() => handleDelete(`images/${artStyle.ArtStyle}/${colorScheme.name}`, true)} className="ml-2 text-red-500">
                            Delete
                          </button>
                        </div>
                        {isColorOpen && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                            {colorScheme.images.map((image: { name: string; paths: string; commitMessage: string }) => (
                              <div key={image.name} className="bg-[#3b4252] rounded-lg overflow-hidden shadow-md">
                                <Image src={image.paths} alt={image.name} width={200} height={200} className="w-full h-40 object-cover" />
                                <p className="text-[#d8dee9] p-2 text-sm">{image.name}</p>
                                <p className="text-[#d8dee9] p-4 text-justify text-xs">{image.commitMessage}</p>
                                <button onClick={() => handleDelete(`images/${artStyle.ArtStyle}/${colorScheme.name}/${image.name}`, false)} className="text-red-500 px-2 py-1">
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <motion.div className="bg-[#2e3440] p-6 rounded-lg shadow-lg mt-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <h2 className="text-2xl font-bold mb-4 text-[#eceff4]">Current Folder Structure</h2>
      {renderStructure(structure)}
    </motion.div>
  );
}
export default function UploadPage(): JSX.Element {
  const [folderStructure, setFolderStructure] = useState<any>(null);
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      await fetchFolderStructure();
    })();
  }, []);
  const fetchFolderStructure = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch("/api/github");
      if (!response.ok) {
        const errorText = await response.text();
        setIsError(`Failed to fetch folder structure: ${errorText}`);
        return;
      }
      const data = await response.json();
      setFolderStructure(data);
    } catch (error: any) {
      setIsError(`Error fetching folder structure: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpload = async (formData: FormData) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch("/api/github", { method: "POST", body: formData });
      if (!response.ok) {
        const errorText = await response.text();
        setIsError(`Upload failed: ${errorText}`);
        return;
      }
      await fetchFolderStructure();
    } catch (error: any) {
      setIsError(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (path: string, isFolder: boolean) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch(`/api/github?path=${encodeURIComponent(path)}&isFolder=${isFolder}`, { method: "DELETE" });
      if (!response.ok) {
        const errorText = await response.text();
        setIsError(`Delete failed: ${errorText}`);
        return;
      }
      await fetchFolderStructure();
    } catch (error: any) {
      setIsError(`Error deleting file/folder: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-7xl font-Brittany animate-pulse">Loading, please wait...</p>
      </div>
    );
  } else if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-7xl font-Brittany animate-pulse">Error: {isError}</p>
      </div>
    );
  } else {
    return (
      <main className="bg-gradient-to-t from-black via-[#151618] to-[#1c1e20] font-bold font-Kurale text-[#eceff4] min-h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#eceff4] scrollbar-track-[#151618] relative">
        <nav className="navbar sticky top-0 z-50 backdrop-blur-lg p-4 bg-black/60 text-[#eceff4]/60 shadow-2xl shadow-black">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="nord-text">Frequently Asked</a>
                </li>
                <li>
                  <a className="nord-text">About StoryWalls</a>
                </li>
                <li>
                  <a className="nord-text">Contact Developer</a>
                </li>
              </ul>
            </div>
            <a className="font-bold text-xl text-[#ffffff] nord-text">StoryWalls</a>
          </div>
          <div className="navbar-end">
            <a className="font-bold text-[#ffffff] nord-text">Copyright (c)</a>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">
          <motion.h1 data-text="Upload Wallpaper" animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} initial={{ opacity: 0, y: -50 }} className="text-4xl sm:text-6xl md:text-7xl text-center mb-8 nord-text glitch">
            Upload Wallpaper
          </motion.h1>
          <UploadForm onUpload={handleUpload} />
          {folderStructure && <FolderStructure structure={folderStructure} onDelete={handleDelete} />}
        </div>
        <footer className="text-[#eceff4] p-8">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold text-[#ffffff] mb-2 nord-text">StoryWalls</h2>
              <p className="text-sm">© 2024 StoryWalls. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    );
  }
}
