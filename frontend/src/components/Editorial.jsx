import { useState, useRef, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (video) setCurrentTime(video.currentTime);
    };

    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl select-none bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="w-full aspect-video bg-black cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-primary/50 rounded-2xl"
        tabIndex="0"
        aria-label="Video player"
      />

      {/* Controls Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-6 py-5 flex flex-col gap-4 transition-opacity duration-350 ease-in-out pointer-events-auto rounded-b-2xl ${
          isHovering || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="btn btn-circle btn-primary flex items-center justify-center shadow-lg hover:scale-110 focus:ring-4 focus:ring-primary focus:outline-none transition-transform duration-200"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            type="button"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>

          {/* Time and Progress Bar */}
          <div className="flex items-center flex-1 ml-6 gap-5">
            <span className="text-white text-base font-mono tabular-nums w-14 text-left select-none">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Number(e.target.value);
                }
              }}
              className="
                range range-primary range-md flex-1 cursor-pointer
                focus:ring-4 focus:ring-primary rounded-lg
                transition-colors duration-200 ease-in-out
              "
              aria-label="Video progress slider"
            />

            <span className="text-white text-base font-mono tabular-nums w-14 text-right select-none">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Enhance the range input's thumb and track for better UX */
        input[type='range'] {
          -webkit-appearance: none;
          height: 8px;
          border-radius: 9999px;
          background: var(--tw-bg-opacity) none transparent;
        }
        input[type='range']::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 9999px;
          background: rgba(129, 140, 248, 0.6);
          transition: background-color 0.2s ease-in-out;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: #6366f1; /* Indigo-500 */
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(99, 102, 241, 0.8);
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
          border: none;
          margin-top: -5px; /* Align thumb vertically */
        }
        input[type='range']:focus::-webkit-slider-thumb {
          background: #4f46e5; /* Indigo-600 */
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(79, 70, 229, 0.9);
        }
        input[type='range']:hover::-webkit-slider-thumb {
          background: #4f46e5;
        }
        /* Firefox */
        input[type='range']::-moz-range-track {
          height: 8px;
          border-radius: 9999px;
          background: rgba(129, 140, 248, 0.6);
        }
        input[type='range']::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #6366f1;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(99, 102, 241, 0.8);
          border: none;
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        input[type='range']:focus::-moz-range-thumb {
          background: #4f46e5;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(79, 70, 229, 0.9);
        }
        input[type='range']:hover::-moz-range-thumb {
          background: #4f46e5;
        }
      `}</style>
    </div>
  );
};

export default Editorial;
