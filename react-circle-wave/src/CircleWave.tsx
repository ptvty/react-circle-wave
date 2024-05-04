import React from 'react';
import { useEffect, useRef } from "react";
import { animatePath, config, Config } from "./utils";

export type CircleWaveProps = {
    size: number;
    speed?: number;
    points?: number;
    opacity?: number;
    amplitude?: number;
    stopped?: boolean;
    color?: string;
    colors?: string[];
    gradient?: { offset: number, color: string }[];
    gradientRotation?: number;
    children?: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * A visually appealing circle with a wave effect animation around it
 */

export const CircleWave = ({
    size = 100,
    speed = 1000,
    points = 9,
    opacity = .5,
    amplitude = 0.2,
    stopped = false,
    color = 'blue',
    colors,
    gradient,
    gradientRotation = 90,
    children = undefined,
    style = {},
    ...props
}: CircleWaveProps): React.JSX.Element => {
    const p1Ref = useRef<SVGPathElement>(null);
    const p2Ref = useRef<SVGPathElement>(null);
    const cx = size / 2;
    const cy = cx;
    const p1ConfRef = useRef<Config>({ ...config, size, stopped, points, speed });
    const p2ConfRef = useRef<Config>({ ...config, size, stopped, points, speed, offsetAngle: 0.5 });
    const isFirstRender = useRef(true);

    const circleRadius = (size - size * amplitude) / 2;
    const waveStrokeWidth = circleRadius;

    useEffect(() => {
        if (!p1Ref.current || !p2Ref.current) return;        
        animatePath(p1Ref.current, p1ConfRef.current);
        animatePath(p2Ref.current, p2ConfRef.current);
    }, []);

    useEffect(() => {
        p1ConfRef.current.stopped = stopped;
        p2ConfRef.current.stopped = stopped;
    }, [stopped]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        p1ConfRef.current.skip = true;
        p2ConfRef.current.skip = true;
        p1ConfRef.current.size = size;
        p2ConfRef.current.size = size;
        p1ConfRef.current.speed = speed;
        p2ConfRef.current.speed = speed;
        p1ConfRef.current.points = points;
        p2ConfRef.current.points = points;
        p1ConfRef.current.amplitude = amplitude;
        p2ConfRef.current.amplitude = amplitude;
    }, [size, amplitude, points, speed]);

    const fill = (colors || gradient) ? 'url(#g)' : color;

    return <div {...props} style={{ ...style, width: size, height: size, position: 'relative' }}>
        <div style={{ width: size, height: size, lineHeight: `${size}px`, position: 'absolute', textAlign: 'center' }}>
            {children}
        </div>
        <div>
            <svg width={size} height={size}>
                <defs>
                    <linearGradient id="g" gradientTransform={`rotate(${gradientRotation})`}>
                        {colors && !gradient &&
                            colors.map((color, i) =>
                                <stop
                                    key={i}
                                    offset={`${i * 100 / (colors.length - 1)}%`}
                                    stopColor={color}
                                />
                            )
                        }
                        {gradient &&
                            gradient.map((stop, i) =>
                                <stop
                                    key={i}
                                    offset={`${stop.offset}%`}
                                    stopColor={stop.color}
                                />
                            )
                        }
                    </linearGradient>
                </defs>
                <path ref={p1Ref} stroke={fill} strokeWidth={waveStrokeWidth} strokeOpacity={opacity} fill="none" strokeLinejoin="round" />
                <path ref={p2Ref} stroke={fill} strokeWidth={waveStrokeWidth} strokeOpacity={opacity} fill="none" strokeLinejoin="round" />
                <circle fill={fill} cx={cx} cy={cy} r={circleRadius} />
            </svg>
        </div>
    </div>;
};
