import { useCallback, useEffect, useState, useRef } from "react";

const PriceRangeSlider = ({
  min,
  max,
  trackColor = "#cecece",
  onChange,
  rangeColor = "#ff0303",
  width = "300px",
  currencyText = "ETB",
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  // Update range fill dynamically
  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Debounced onChange to prevent excessive state updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({ min: minVal, max: maxVal });
    }, 200); // 200ms debounce delay

    return () => clearTimeout(timeout);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full flex items-center justify-center flex-col space-y-4">
      <div className="w-full px-4 flex items-center justify-between gap-x-5">
        <p className="text-sm text-gray-600 font-semibold">{minVal}</p>
        <div className="flex-1 border-dashed border border-gray-300 mt-1"></div>
        <p className="text-sm text-gray-600 font-semibold">{maxVal}</p>
      </div>

      <div className="multi-slide-input-container relative" style={{ width }}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value); // Update state immediately
          }}
          className="thumb thumb-left absolute w-full h-0 appearance-none pointer-events-none"
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value); // Update state immediately
          }}
          className="thumb thumb-right absolute w-full h-0 appearance-none pointer-events-none"
          style={{ zIndex: maxVal < min + 100 ? 5 : undefined }}
        />
        <div className="slider relative w-full h-2">
          <div
            className="track-slider absolute w-full h-full rounded-full"
            style={{ backgroundColor: trackColor }}
          />
          <div
            ref={range}
            className="range-slider absolute h-full rounded-full"
            style={{ backgroundColor: rangeColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
