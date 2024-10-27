
declare module 'qrcode.react' {
    import { Component } from 'react';

    interface QRCodeProps {
        value: string;
        size?: number;
        id?: string; // Add this line
        bgColor?: string;
        fgColor?: string;
        level?: 'L' | 'M' | 'Q' | 'H';
        renderAs?: 'canvas' | 'svg';
        includeMargin?: boolean;
        image?: string | { src: string; x: number; y: number; width: number; height: number; };
        style?: React.CSSProperties;
    }

    export class QRCodeCanvas extends Component<QRCodeProps> {}
}
