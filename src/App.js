import React, { useMemo, useRef, useState, useEffect } from 'react';
import './App.css';
import logo from './exampleLogo2.png';
import altLogo from './exampleLogo.png'; // 교체할 로고

const Intro = ({ onClickLogo, fadeOut }) => {
  const videoRef = useRef(null);

  const videoSources = useMemo(
    () => [
      '/videos/background1.mp4',
      '/videos/background2.mp4',
      '/videos/background3.mp4',
      '/videos/background5.mp4',
      '/videos/background6.mp4',
      '/videos/background7.mp4',
      '/videos/background8.mp4',
      '/videos/background9.mp4',
      '/videos/background10.mp4',
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.playbackRate = 1;
    v.play().catch(() => {});
  }, [currentIndex]);

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 1;
    v.play().catch(() => {});
  };

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videoSources.length);
  };

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % videoSources.length);
  };

  const currentSrc = videoSources[currentIndex];

  // 여러 개 인덱스에서 스타일 바꾸기
  const specialIndexes = [6, 7, 8]; // 바꿀 영상 인덱스들
  const isSpecialVideo = specialIndexes.includes(currentIndex);

  return (
    <div
      className={`intro-container ${fadeOut ? 'fade-out' : ''}`}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        className="bg-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        <source key={currentSrc} src={currentSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="intro-content">
        <img
          src={isSpecialVideo ? altLogo : logo}
          alt="로고"
          className="intro-logo"
        />
        <h1
          className="intro-title"
          style={{ color: isSpecialVideo ? 'black' : 'white' }}
        >
          2025<br />
          DSWU SOFTWARE<br />
          GRADUATION EXHIBITION
        </h1>
      </div>
    </div>
  );
};

export default Intro;
