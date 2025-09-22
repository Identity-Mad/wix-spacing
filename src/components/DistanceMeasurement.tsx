import React, { useEffect, useRef, useState } from "react";

interface DistanceMeasurementProps {
  isEnabled: boolean;
  children: React.ReactNode;
}

interface MeasurementLine {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  distance: number;
  direction: "horizontal" | "vertical";
  label: string;
}

export const DistanceMeasurement: React.FC<DistanceMeasurementProps> = ({
  isEnabled,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
    null
  );
  const [measurementLines, setMeasurementLines] = useState<MeasurementLine[]>(
    []
  );

  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target ||
        target === container ||
        target.closest("[data-measurement-ignore]")
      )
        return;

      setHoveredElement(target);

      // Find the section container (colored box) for the hovered element
      const sectionContainer = target.closest(
        ".bg-blue-50, .bg-green-50, .bg-orange-50, .bg-purple-50, .bg-gray-50"
      ) as HTMLElement;

      if (!sectionContainer) {
        setMeasurementLines([]);
        return;
      }

      // Find all measurable elements within the same section (excluding the hovered one)
      const sectionElements = sectionContainer.querySelectorAll(
        "*:not([data-measurement-ignore])"
      );
      const targetRect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const lines: MeasurementLine[] = [];
      let lineId = 0;

      // Find elements that are actually adjacent in the layout
      const adjacentElements = {
        above: null as HTMLElement | null,
        below: null as HTMLElement | null,
        left: null as HTMLElement | null,
        right: null as HTMLElement | null,
      };

      sectionElements.forEach((element) => {
        if (element === target || !(element instanceof HTMLElement)) return;

        const elementRect = element.getBoundingClientRect();

        // Check if element is directly above (vertical alignment)
        if (
          Math.abs(elementRect.left - targetRect.left) < 50 &&
          elementRect.bottom <= targetRect.top
        ) {
          if (
            !adjacentElements.above ||
            elementRect.bottom >
              adjacentElements.above.getBoundingClientRect().bottom
          ) {
            adjacentElements.above = element as HTMLElement;
          }
        }

        // Check if element is directly below (vertical alignment)
        if (
          Math.abs(elementRect.left - targetRect.left) < 50 &&
          elementRect.top >= targetRect.bottom
        ) {
          if (
            !adjacentElements.below ||
            elementRect.top < adjacentElements.below.getBoundingClientRect().top
          ) {
            adjacentElements.below = element as HTMLElement;
          }
        }

        // Check if element is to the left (horizontal alignment)
        if (
          Math.abs(elementRect.top - targetRect.top) < 50 &&
          elementRect.right <= targetRect.left
        ) {
          if (
            !adjacentElements.left ||
            elementRect.right >
              adjacentElements.left.getBoundingClientRect().right
          ) {
            adjacentElements.left = element as HTMLElement;
          }
        }

        // Check if element is to the right (horizontal alignment)
        if (
          Math.abs(elementRect.top - targetRect.top) < 50 &&
          elementRect.left >= targetRect.right
        ) {
          if (
            !adjacentElements.right ||
            elementRect.left <
              adjacentElements.right.getBoundingClientRect().left
          ) {
            adjacentElements.right = element as HTMLElement;
          }
        }
      });

      // Create measurement lines for adjacent elements
      const targetLeft = targetRect.left - containerRect.left;
      const targetRight = targetRect.right - containerRect.left;
      const targetTop = targetRect.top - containerRect.top;
      const targetBottom = targetRect.bottom - containerRect.top;

      // Check above element
      if (adjacentElements.above) {
        const elementRect = adjacentElements.above.getBoundingClientRect();
        const elementLeft = elementRect.left - containerRect.left;
        const elementRight = elementRect.right - containerRect.left;
        const elementBottom = elementRect.bottom - containerRect.top;

        const distance = targetTop - elementBottom;

        lines.push({
          id: `line-${lineId++}`,
          startX: (targetLeft + targetRight) / 2,
          startY: targetTop,
          endX: (elementLeft + elementRight) / 2,
          endY: elementBottom,
          distance: distance,
          direction: "vertical",
          label: `${Math.round(distance)}px`,
        });
      }

      // Check below element
      if (adjacentElements.below) {
        const elementRect = adjacentElements.below.getBoundingClientRect();
        const elementLeft = elementRect.left - containerRect.left;
        const elementRight = elementRect.right - containerRect.left;
        const elementTop = elementRect.top - containerRect.top;

        const distance = elementTop - targetBottom;

        lines.push({
          id: `line-${lineId++}`,
          startX: (targetLeft + targetRight) / 2,
          startY: targetBottom,
          endX: (elementLeft + elementRight) / 2,
          endY: elementTop,
          distance: distance,
          direction: "vertical",
          label: `${Math.round(distance)}px`,
        });
      }

      // Check left element
      if (adjacentElements.left) {
        const elementRect = adjacentElements.left.getBoundingClientRect();
        const elementRight = elementRect.right - containerRect.left;
        const elementTop = elementRect.top - containerRect.top;
        const elementBottom = elementRect.bottom - containerRect.top;

        const distance = targetLeft - elementRight;

        lines.push({
          id: `line-${lineId++}`,
          startX: targetLeft,
          startY: (targetTop + targetBottom) / 2,
          endX: elementRight,
          endY: (elementTop + elementBottom) / 2,
          distance: distance,
          direction: "horizontal",
          label: `${Math.round(distance)}px`,
        });
      }

      // Check right element
      if (adjacentElements.right) {
        const elementRect = adjacentElements.right.getBoundingClientRect();
        const elementLeft = elementRect.left - containerRect.left;
        const elementTop = elementRect.top - containerRect.top;
        const elementBottom = elementRect.bottom - containerRect.top;

        const distance = elementLeft - targetRight;

        lines.push({
          id: `line-${lineId++}`,
          startX: targetRight,
          startY: (targetTop + targetBottom) / 2,
          endX: elementLeft,
          endY: (elementTop + elementBottom) / 2,
          distance: distance,
          direction: "horizontal",
          label: `${Math.round(distance)}px`,
        });
      }

      setMeasurementLines(lines);
    };

    const handleMouseOut = () => {
      setHoveredElement(null);
      setMeasurementLines([]);
    };

    container.addEventListener("mouseover", handleMouseOver);
    container.addEventListener("mouseout", handleMouseOut);

    return () => {
      container.removeEventListener("mouseover", handleMouseOver);
      container.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Element Highlight */}
      {hoveredElement && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-500/10 pointer-events-none z-40"
          data-measurement-ignore
          style={{
            left:
              hoveredElement.getBoundingClientRect().left -
              containerRef.current!.getBoundingClientRect().left,
            top:
              hoveredElement.getBoundingClientRect().top -
              containerRef.current!.getBoundingClientRect().top,
            width: hoveredElement.getBoundingClientRect().width,
            height: hoveredElement.getBoundingClientRect().height,
          }}
        />
      )}

      {/* Measurement Lines */}
      {measurementLines.length > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-50"
          data-measurement-ignore
        >
          {measurementLines.map((line, index) => {
            // Calculate label offset to avoid overlaps
            const labelOffset = index * 30; // Space labels 30px apart

            // Calculate label position with better spacing
            let labelX, labelY;

            if (line.direction === "horizontal") {
              labelX = (line.startX + line.endX) / 2 - 20;
              labelY = line.startY - 30 - labelOffset;
            } else {
              labelX = line.endX + 10 + labelOffset;
              labelY = (line.startY + line.endY) / 2 - 10;
            }

            return (
              <div key={line.id}>
                {/* Measurement Line */}
                <div
                  className="absolute bg-red-500"
                  style={{
                    left: Math.min(line.startX, line.endX),
                    top: Math.min(line.startY, line.endY),
                    width:
                      line.direction === "horizontal"
                        ? Math.abs(line.endX - line.startX)
                        : 2,
                    height:
                      line.direction === "vertical"
                        ? Math.abs(line.endY - line.startY)
                        : 2,
                  }}
                />

                {/* Distance Label */}
                <div
                  className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded font-mono shadow-lg"
                  style={{
                    left: labelX,
                    top: labelY,
                  }}
                >
                  {line.label}
                </div>

                {/* Start Marker */}
                <div
                  className="absolute w-3 h-3 bg-red-500 transform -translate-x-1.5 -translate-y-1.5"
                  style={{
                    left: line.startX,
                    top: line.startY,
                  }}
                />

                {/* End Marker */}
                <div
                  className="absolute w-3 h-3 bg-red-500 transform -translate-x-1.5 -translate-y-1.5"
                  style={{
                    left: line.endX,
                    top: line.endY,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
