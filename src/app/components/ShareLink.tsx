import React, { useState } from 'react';
import { FaShare, FaCheck, FaCopy } from 'react-icons/fa';

interface ShareLinkProps {
  currentNodeId: string;
  history: string[];
}

const ShareLink: React.FC<ShareLinkProps> = ({ currentNodeId, history }) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const generateShareUrl = (): string => {
    // Create URL with path history as query parameters
    const baseUrl = window.location.origin + window.location.pathname;
    const pathParam = history.join(',');
    return `${baseUrl}?path=${encodeURIComponent(pathParam)}&node=${encodeURIComponent(currentNodeId)}`;
  };
  
  const handleCopyLink = () => {
    const shareUrl = generateShareUrl();
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setShowTooltip(true);
        
        // Hide the "Copied!" tooltip after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        
        // Hide the tooltip after 3 seconds
        setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy URL: ', err);
      });
  };
  
  return (
    <div className="relative">
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow transition-colors"
        aria-label="Share this recommendation"
      >
        {copied ? (
          <>
            <FaCheck />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <FaShare />
            <span>Share via Link</span>
          </>
        )}
      </button>
      
      {showTooltip && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-gray-900 text-white text-sm rounded shadow-lg z-10 whitespace-nowrap">
          Shareable link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ShareLink; 