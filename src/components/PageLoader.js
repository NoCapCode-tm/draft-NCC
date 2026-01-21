import { useEffect, useState } from "react";
import styles from "../CSS/PageLoader.module.css";
import gsap from "gsap";

export default function PageLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 2.5, // total visible time ~3s
      onComplete: () => {
        setVisible(false);
        onComplete(); // tell App loader is done
      },
    });

    tl.to(`.${styles.loader}`, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power3.inOut",
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={styles.loader}>
        <video
  className={styles.videoBg}
  autoPlay
  loop
  muted
  playsInline
>
  <source src="/bg2.mp4" type="video/mp4" />
</video>
      <div className={styles.inner}>
        <h1 className={styles.logo}>NoCapCode™</h1>

        <div className={styles.lineLoader}>
          <span />
        </div>
      </div>
    </div>
  );
}
