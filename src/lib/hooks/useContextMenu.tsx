import { useState, useEffect } from "react";

const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    path: "",
  });

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ visible: false, x: 0, y: 0, path: "" });
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleContextMenu = (event: React.MouseEvent, path: string) => {
    if (path) {
      event.preventDefault();
      setContextMenu({
        visible: true,
        x: event.pageX,
        y: event.pageY,
        path,
      });
    }
  };

  const handleOpenInNewTab = () => {
    if (contextMenu.path) {
      window.open(contextMenu.path, "_blank");
      setContextMenu({ visible: false, x: 0, y: 0, path: "" });
    }
  };

  const handleOpenInNewWindow = () => {
    if (contextMenu.path) {
      window.open(contextMenu.path, "_blank", "width=#, height=#, menubar=yes");
      setContextMenu({ visible: false, x: 0, y: 0, path: "" });
    }
  };

  return {
    contextMenu,
    handleContextMenu,
    handleOpenInNewTab,
    handleOpenInNewWindow,
  };
};

export default useContextMenu;
