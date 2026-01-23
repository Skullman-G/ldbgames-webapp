import { useEffect, useRef, useState } from "react";

function Dropdown({ label, items, getKey, renderItem, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button
        className="dropdown-btn"
        onClick={() => setOpen(o => !o)}
      >
        {label}
      </button>

      {open && (
        <div className="dropdown-menu">
          {items.map(item => (
            <div
              key={getKey(item)}
              className="dropdown-item"
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
