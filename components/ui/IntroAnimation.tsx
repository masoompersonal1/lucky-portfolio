'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [zooming, setZooming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Prevent scrolling while intro is playing
    document.body.style.overflow = 'hidden';
    
    // 1. Auto click the shutter almost immediately
    const snapTimer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.checked = true;
      }
    }, 500);

    // 2. The photo drops and "develops" (takes about 4.6s)
    // After it develops, we trigger the zooming scale effect
    const zoomTimer = setTimeout(() => {
      setZooming(true);
    }, 5500);

    // 3. After the zoom effect finishes (1.2s), we unmount
    const unmountTimer = setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 6700);

    return () => {
      clearTimeout(snapTimer);
      clearTimeout(zoomTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.cameraWrapper}>
        <input 
          type="checkbox" 
          id="snap" 
          className={styles.shutterInput} 
          ref={inputRef} 
          readOnly 
        />
        <div className={styles.flashOverlay} />
        
        <div className={styles.cameraBody}>
          <div className={styles.rainbowStripe} />
          <div className={styles.viewfinder} />
          <div className={styles.flashUnit} />
          <div className={styles.lensHousing}>
            <div className={styles.lensRing} />
            <div className={styles.lensGlass}>
              <div className={styles.aperture} />
            </div>
          </div>
          <div className={styles.labelPlate}>ONE-STEP</div>
          <div className={styles.shutterBtn}>
            <label htmlFor="snap" className={styles.shutterLabel} />
          </div>
          <div className={styles.bottomLip} />
        </div>
        
        <div className={`${styles.filmSlot} ${zooming ? styles.zooming : ''}`}>
          <div className={styles.filmImage}>
            <div className={styles.filmContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
