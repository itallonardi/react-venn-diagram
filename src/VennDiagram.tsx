import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface VennDiagramProps {
  data: {
    a: number;
    b: number;
    intersection: number;
  };
  width: number;
  height: number;
  labels?: {
    labelA?: string;
    labelB?: string;
    labelIntersection?: string;
  };
  colors?: {
    colorA?: string;
    colorB?: string;
    fontColorA?: string;
    fontColorB?: string;
    fontColorIntersection?: string;
  };
}

const VennDiagram: React.FC<VennDiagramProps> = ({
  data: { a, b, intersection },
  width,
  height,
  labels = {},
  colors = {}
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const scale = d3.scaleSqrt()
      .domain([0, Math.max(a, b)])
      .range([0, width / 5]);

    const radiusA = scale(a);
    const radiusB = scale(b);

    const positions = {
      A: { cx: width / 2 - radiusB / 2, cy: height / 2 },
      B: { cx: width / 2 + radiusA / 2, cy: height / 2 },
    };

    const handleMouseOver = function (this: SVGCircleElement) {
      d3.select(this)
        .transition()
        .duration(300)
        .style('fill-opacity', 0.7);
    };

    const handleMouseOut = function (this: SVGCircleElement) {
      d3.select(this)
        .transition()
        .duration(300)
        .style('fill-opacity', 0.5);
    };

    const drawCircleAndText = (key: keyof typeof positions, value: number, label: string, color: string, fontColor: string) => {
      const pos = positions[key];
      const radius = key === 'A' ? radiusA : radiusB;

      const circle = svg.append('circle')
        .attr('cx', pos.cx)
        .attr('cy', pos.cy)
        .attr('r', 0)
        .style('fill', color)
        .style('fill-opacity', 0.5)
        .transition()
        .duration(800)
        .attr('r', radius)
        .on('end', function () {
          d3.select(this)
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)
            .on('touchstart', handleMouseOver)
            .on('touchend', handleMouseOut);
        });

      const textX = key === 'A' ? pos.cx - radius : pos.cx + radius;
      const textAnchor = key === 'A' ? 'start' : 'end';

      const textElement = svg.append('text')
        .attr('x', textX)
        .attr('y', pos.cy)
        .style('fill', fontColor)
        .style('font-size', '14px')
        .style('font-family', 'Arial, sans-serif')
        .attr('text-anchor', textAnchor)
        .style('opacity', 0);

      textElement.transition()
        .duration(800)
        .style('opacity', 1);

      textElement.append("tspan")
        .attr('x', textX)
        .attr('dy', '0em')
        .style('font-weight', 'bold')
        .text(`${value}`);

      textElement.append("tspan")
        .attr('x', textX)
        .attr('dy', '1.2em')
        .text(label);
    };

    drawCircleAndText('A', a, labels.labelA || 'Group A', colors.colorA || '#9467bd', colors.fontColorA || 'white');
    drawCircleAndText('B', b, labels.labelB || 'Group B', colors.colorB || '#2ca02c', colors.fontColorB || 'white');

    const intersectionCenterX = (positions.A.cx + positions.B.cx) / 2;

    const intersectionTextElement = svg.append('text')
      .attr('x', intersectionCenterX)
      .attr('y', height / 2)
      .style('fill', colors.fontColorIntersection || 'white')
      .style('font-size', '12px')
      .style('font-family', 'Arial, sans-serif')
      .attr('text-anchor', 'middle')
      .style('opacity', 0);

    intersectionTextElement.transition()
      .duration(800)
      .style('opacity', 1)
      .tween("text", function() {
        const self = this;
        return function() {
          d3.select(self).text(`${intersection}`);
        };
      })
      .on("end", function() {
        d3.select(this).append("tspan")
          .attr('x', intersectionCenterX)
          .attr('dy', '1.2em')
          .style('font-weight', 'normal')
          .text(labels.labelIntersection || 'Intersection');
      });

  }, [a, b, intersection, width, height, labels, colors]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default VennDiagram;