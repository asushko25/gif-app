import { useState } from 'react';
import axios from 'axios';
import { GIFData } from '../../api/giphy';
import './GIFDetail.scss';

interface GIFDetailProps {
  gif: GIFData;
  onClose: () => void;
}

type DownloadStatus = 'idle' | 'downloading' | 'success';

export const GIFDetail = ({ gif, onClose }: GIFDetailProps) => {
  const [copied, setCopied] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('idle');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(gif.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloadStatus('downloading');
      const response = await axios.get(gif.images.original.url, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${gif.title || 'gif'}.gif`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 2000);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadStatus('idle');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="gif-detail-overlay" onClick={onClose}>
      <div className="gif-detail" onClick={(e) => e.stopPropagation()}>
        <button className="gif-detail__close" onClick={onClose}>
          ×
        </button>
        
        <div className="gif-detail__content">
          <div className="gif-detail__image-wrapper">
            <img
              src={gif.images.original.url}
              alt={gif.title}
              className="gif-detail__image"
            />
          </div>
          
          <div className="gif-detail__info">
            <h2 className="gif-detail__title">{gif.title || 'No Title'}</h2>
            
            <div className="gif-detail__meta">
              <div className="gif-detail__meta-item">
                <span className="gif-detail__meta-label">Author:</span>
                <span className="gif-detail__meta-value">
                  {gif.username || 'Unknown'}
                </span>
              </div>
              
              <div className="gif-detail__meta-item">
                <span className="gif-detail__meta-label">Created:</span>
                <span className="gif-detail__meta-value">
                  {formatDate(gif.import_datetime)}
                </span>
              </div>
              
              <div className="gif-detail__meta-item">
                <span className="gif-detail__meta-label">Size:</span>
                <span className="gif-detail__meta-value">
                  {gif.images.original.width} × {gif.images.original.height}
                </span>
              </div>
            </div>
            
            <div className="gif-detail__actions">
              <button
                className="gif-detail__button gif-detail__button--copy"
                onClick={handleCopyLink}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              
              <button
                className="gif-detail__button gif-detail__button--download"
                onClick={handleDownload}
                disabled={downloadStatus === 'downloading'}
              >
                {downloadStatus === 'downloading'
                  ? 'Downloading...'
                  : downloadStatus === 'success'
                  ? 'Downloaded!'
                  : 'Download GIF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

