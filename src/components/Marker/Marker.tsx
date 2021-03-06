import styles from "./Marker.module.scss";
import cx from "classnames";

import { OverlayView as GoogleOverlayView } from "@react-google-maps/api";

type MarkerProps = {
  isActive: boolean;
  isHover: boolean;
  position: {
    lat: number;
    lng: number;
  };
  onClick: () => void;
  onMouseOver: () => void;
  onMouseLeave: () => void;
};

const Marker = ({
  isActive,
  isHover,
  position,
  onClick,
  onMouseOver,
  onMouseLeave,
}: MarkerProps) => {
  const className = cx([
    styles["marker"],
    isActive ? styles["is-active"] : null,
    isHover ? styles["is-hover"] : null,
  ]);

  return (
    <GoogleOverlayView
      mapPaneName={GoogleOverlayView.OVERLAY_MOUSE_TARGET}
      position={position}
    >
      <div
        className={className}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      />
    </GoogleOverlayView>
  );
};

export default Marker;
